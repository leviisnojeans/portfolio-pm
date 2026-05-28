#!/usr/bin/env python3
"""
构建脚本：将 source/ 中的内容自动整合为 portfolio 数据文件。

功能：
1. 预处理项目案例 HTML（提取 base64 图片、复制项目图片、生成案例数据）
2. 自动扫描 source/写作/ 下的文章 HTML，读取元数据生成条目
3. 自动扫描 source/小作品/ 下的子目录，读取元数据生成条目
4. 生成 content-auto.js（运行时与 content.js 合并）

用法：python3 build.py
"""

import os, re, base64, hashlib, json, shutil, glob

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CASE_DIR = os.path.join(BASE_DIR, 'source/项目/项目介绍-html格式')
IMG_DIR = 'assets/case-images'
PROJ_IMG_SRC = os.path.join(BASE_DIR, 'source/项目/项目源材料/项目图片')
PROJ_IMG_DST = 'assets/project-images'
WRITING_DIR = os.path.join(BASE_DIR, 'source/写作')
SMALL_WORK_DIR = os.path.join(BASE_DIR, 'source/小作品')
OUTPUT_FILE = 'content-auto.js'

# project id → {zh: filename, en: filename}
CASE_FILES = {
    'bullet': {
        'zh': 'bullet_comment_case_study_zh.html',
        'en': 'bullet_comment_case_study.html',
    },
    'liveroom': {
        'zh': 'bilibili_live_room_case_study_zh.html',
        'en': 'bilibili_live_room_case_study.html',
    },
    'streamtool': {
        'zh': 'bilibili_streaming_tool_case_study_zh.html',
        'en': 'bilibili_streaming_tool_case_study.html',
    },
    'springfest': {
        'zh': 'spring_festival_case_study_zh.html',
        'en': 'spring_festival_case_study.html',
    },
}

# 项目图片 → 对应案例的映射
IMAGE_INJECTIONS = {}
# 内嵌图片替换规则
EMBED_REPLACEMENTS = {}


# ── Case Study Processing (unchanged) ──

def extract_images(html, out_dir_rel):
    count = 0
    img_dir_abs = os.path.join(BASE_DIR, out_dir_rel)
    os.makedirs(img_dir_abs, exist_ok=True)
    pattern = r'src="data:image/(png|jpeg|jpg|gif|webp);base64,([^"]+)"'
    def replacer(m):
        nonlocal count
        ext = m.group(1)
        data = m.group(2)
        h = hashlib.md5(data.encode()[:100]).hexdigest()[:16]
        filename = f'case-img-{h}.{ext}'
        filepath = os.path.join(img_dir_abs, filename)
        if not os.path.exists(filepath):
            try:
                img_bytes = base64.b64decode(data)
                with open(filepath, 'wb') as f:
                    f.write(img_bytes)
                count += 1
            except Exception as e:
                print(f'  [WARN] Failed to decode image: {e}')
                return m.group(0)
        return f'src="{out_dir_rel}/{filename}"'
    return re.sub(pattern, replacer, html), count

def copy_project_images():
    dst_abs = os.path.join(BASE_DIR, PROJ_IMG_DST)
    os.makedirs(dst_abs, exist_ok=True)
    count = 0
    if os.path.exists(PROJ_IMG_SRC):
        for fname in os.listdir(PROJ_IMG_SRC):
            if fname.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp')):
                src = os.path.join(PROJ_IMG_SRC, fname)
                dst = os.path.join(dst_abs, fname)
                shutil.copy2(src, dst)
                count += 1
    return count

def inject_project_images(body, proj_id):
    if proj_id not in IMAGE_INJECTIONS:
        return body
    for img_name, marker in IMAGE_INJECTIONS[proj_id]:
        img_tag = f'\n<img src="{PROJ_IMG_DST}/{img_name}" style="width:100%;max-width:680px;border-radius:8px;margin:1.5rem 0;display:block;box-shadow:0 2px 12px rgba(0,0,0,0.3);">\n'
        pos = body.find(marker)
        if pos >= 0:
            body = body[:pos + len(marker)] + img_tag + body[pos + len(marker):]
    return body

def extract_case_content(html):
    style_match = re.search(r'<style>([\s\S]*?)</style>', html)
    body_match = re.search(r'<body>([\s\S]*?)</body>', html)
    css = style_match.group(1) if style_match else ''
    body = body_match.group(1) if body_match else html
    return css, body

def rewrite_relative_image_paths(body):
    """将 case study body 中的相对图片路径重写为项目根目录绝对路径。

    源 HTML 在 source/项目/项目介绍-html格式/ 中，图片引用类似
    src="../项目源材料/项目图片/xxx/yyy.png"
    需要改为 src="source/项目/项目源材料/项目图片/xxx/yyy.png"
    """
    body = re.sub(
        r'src="\.\./(项目源材料/项目图片/[^"]+)"',
        r'src="source/项目/\1"',
        body
    )
    return body


# ── Metadata Extraction ──

def extract_metadata(filepath):
    """从 HTML 文件中提取 x-metadata JSON 块"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    match = re.search(r'<script type="x-metadata">\s*(.*?)\s*</script>', content, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(1))
        except json.JSONDecodeError as e:
            print(f'  [WARN] Invalid metadata in {filepath}: {e}')
            return {}
    return {}


# ── Writing Scanner ──

def scan_writings():
    """
    扫描 source/写作/ 下的 HTML 文件，按 base name 分组语言版本。
    文件名约定：name_zh.html / name_en.html / name.html(默认zh)
    """
    files = []
    for f in os.listdir(WRITING_DIR):
        if f.endswith('.html'):
            files.append(f)

    # Group by base name and detect language
    groups = {}  # base → {lang: filename, meta: {}}
    for f in files:
        base = f
        lang = 'zh'
        if base.endswith('_zh.html'):
            base = base[:-8]  # remove _zh.html (8 chars)
            lang = 'zh'
        elif base.endswith('_en.html'):
            base = base[:-8]  # remove _en.html (8 chars)
            lang = 'en'
        elif base.endswith('.html'):
            base = base[:-5]
            lang = 'zh'

        filepath = os.path.join(WRITING_DIR, f)
        meta = extract_metadata(filepath)

        if base not in groups:
            groups[base] = {'langs': {}, 'meta': meta}
        groups[base]['langs'][lang] = f
        # Merge metadata from all variants (prefer later = more complete)
        if meta:
            groups[base]['meta'].update(meta)

    # Build output entries
    writings = []
    translations_zh = {}
    translations_en = {}
    counter = 0

    for base_id in sorted(groups.keys()):
        info = groups[base_id]
        meta = info.get('meta', {})
        title = meta.get('title', {})
        tag = meta.get('tag', {})

        key_prefix = f'auto-wr-{base_id}'
        counter += 1

        translations_zh[f'{key_prefix}-title'] = title.get('zh', title.get('en', ''))
        translations_zh[f'{key_prefix}-tag'] = tag.get('zh', tag.get('en', ''))
        translations_en[f'{key_prefix}-title'] = title.get('en', title.get('zh', ''))
        translations_en[f'{key_prefix}-tag'] = tag.get('en', tag.get('zh', ''))

        # Build langs mapping: lang → file path, or null if not present
        langs = {}
        for lang_code in ['zh', 'en']:
            if lang_code in info['langs']:
                langs[lang_code] = {'file': f'source/写作/{info["langs"][lang_code]}'}
            else:
                langs[lang_code] = None

        # Metadata 'langs' field overrides file-detected lang availability
        meta_langs = meta.get('langs')
        if meta_langs:
            # Find any available file in the group (for lang override scenarios)
            available_files = [v for v in info['langs'].values()]
            for lang_code in ['zh', 'en']:
                if lang_code in meta_langs and meta_langs[lang_code]:
                    if lang_code in info['langs']:
                        langs[lang_code] = {'file': f'source/写作/{info["langs"][lang_code]}'}
                    elif available_files:
                        langs[lang_code] = {'file': f'source/写作/{available_files[0]}'}
                else:
                    langs[lang_code] = None

        writings.append({
            'id': base_id,
            'titleKey': f'{key_prefix}-title',
            'tagKey': f'{key_prefix}-tag',
            'langs': langs,
        })

    print(f'  Writings scanned: {len(writings)} articles')
    return writings, translations_zh, translations_en


# ── Small Work Scanner ──

def scan_small_works():
    """
    扫描 source/小作品/ 下的子目录。
    每个子目录应包含一个 .html 文件和可选的 product-description.md。
    """
    small_works = []
    translations_zh = {}
    translations_en = {}
    counter = 0

    for entry in sorted(os.listdir(SMALL_WORK_DIR)):
        subdir = os.path.join(SMALL_WORK_DIR, entry)
        if not os.path.isdir(subdir):
            continue

        # Find the HTML file in this directory
        html_files = glob.glob(os.path.join(subdir, '*.html'))
        if not html_files:
            continue

        html_path = html_files[0]
        meta = extract_metadata(html_path)
        sw_id = meta.get('id', entry.lower().replace("'", '').replace(' ', '_'))
        name = meta.get('name', {})
        desc = meta.get('desc', {})

        key_prefix = f'auto-sw-{sw_id}'
        counter += 1

        translations_zh[f'{key_prefix}-name'] = name.get('zh', name.get('en', entry))
        translations_zh[f'{key_prefix}-desc'] = desc.get('zh', '')
        translations_en[f'{key_prefix}-name'] = name.get('en', name.get('zh', entry))
        translations_en[f'{key_prefix}-desc'] = desc.get('en', '')

        # Read product-description.md for inline descriptions
        product_desc_path = os.path.join(subdir, 'product-description.md')
        product_desc_inline = {}
        if os.path.exists(product_desc_path):
            with open(product_desc_path, 'r', encoding='utf-8') as f:
                md_content = f.read()
            zh_match = re.search(r'## 中文产品说明\s+(.*?)(?=\n## |\Z)', md_content, re.DOTALL)
            en_match = re.search(r'## English Product Description\s+(.*?)(?=\n## |\Z)', md_content, re.DOTALL)
            if zh_match:
                product_desc_inline['zh'] = zh_match.group(1).strip()
            if en_match:
                product_desc_inline['en'] = en_match.group(1).strip()

        # Relative path from BASE_DIR for the HTML file
        rel_path = os.path.relpath(html_path, BASE_DIR)
        product_desc_rel = os.path.relpath(product_desc_path, BASE_DIR) if os.path.exists(product_desc_path) else None

        small_works.append({
            'id': sw_id,
            'nameKey': f'{key_prefix}-name',
            'descKey': f'{key_prefix}-desc',
            'file': rel_path,
            'productDesc': product_desc_rel,
            'productDescInline': product_desc_inline,
        })

    print(f'  Small works scanned: {len(small_works)} projects')
    return small_works, translations_zh, translations_en


# ── JS Generator ──

def to_js_string(value):
    """Convert a Python value to a JS-safe string representation."""
    if value is None:
        return 'null'
    if isinstance(value, str):
        escaped = value.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
        return f'`{escaped}`'
    return json.dumps(value, ensure_ascii=False)


def generate_auto_js(writings, wr_zh, wr_en, small_works, sw_zh, sw_en):
    """Generate content-auto.js content."""
    lines = [
        '// Auto-generated by build.py - do not edit manually',
        '// Run `python3 build.py` to regenerate',
        '',
        'var PORTFOLIO_AUTO_DATA = {',
    ]

    # Translations
    lines.append('  translations: {')
    lines.append('    zh: {')
    for key in sorted(wr_zh.keys()):
        lines.append(f'      {json.dumps(key)}: {to_js_string(wr_zh[key])},')
    for key in sorted(sw_zh.keys()):
        lines.append(f'      {json.dumps(key)}: {to_js_string(sw_zh[key])},')
    lines.append('    },')
    lines.append('    en: {')
    for key in sorted(wr_en.keys()):
        lines.append(f'      {json.dumps(key)}: {to_js_string(wr_en[key])},')
    for key in sorted(sw_en.keys()):
        lines.append(f'      {json.dumps(key)}: {to_js_string(sw_en[key])},')
    lines.append('    },')
    lines.append('  },')

    # Writings
    lines.append('  writings: [')
    for w in writings:
        langs_json = {}
        for lang_code, val in w['langs'].items():
            if val is None:
                langs_json[lang_code] = None
            else:
                langs_json[lang_code] = {'file': val['file']}
        lines.append('    {')
        lines.append(f'      id: {json.dumps(w["id"])},')
        lines.append(f'      titleKey: {json.dumps(w["titleKey"])},')
        lines.append(f'      tagKey: {json.dumps(w["tagKey"])},')
        lines.append(f'      langs: {json.dumps(langs_json, ensure_ascii=False)},')
        lines.append('    },')
    lines.append('  ],')

    # Small Works
    lines.append('  smallWorks: [')
    for sw in small_works:
        product_desc_inline_json = {}
        for lang_code, val in sw['productDescInline'].items():
            product_desc_inline_json[lang_code] = val
        lines.append('    {')
        lines.append(f'      id: {json.dumps(sw["id"])},')
        lines.append(f'      nameKey: {json.dumps(sw["nameKey"])},')
        lines.append(f'      descKey: {json.dumps(sw["descKey"])},')
        lines.append(f'      file: {json.dumps(sw["file"])},')
        lines.append(f'      productDesc: {json.dumps(sw["productDesc"])},')
        lines.append(f'      productDescInline: {json.dumps(product_desc_inline_json, ensure_ascii=False)},')
        lines.append('    },')
    lines.append('  ],')

    lines.append('};')
    return '\n'.join(lines)


# ── Main Build ──

def build():
    print('=== Building portfolio ===')

    # ── Part 1: Case Studies (existing logic) ──
    print('[1/4] Processing case studies...')
    img_count_pj = copy_project_images()
    print(f'  Project images copied: {img_count_pj}')

    case_studies = {}
    total_images = 0

    for proj_id, langs in CASE_FILES.items():
        case_studies[proj_id] = {}
        for lang, filename in langs.items():
            filepath = os.path.join(CASE_DIR, filename)
            if not os.path.exists(filepath):
                print(f'  [SKIP] {filename} not found')
                case_studies[proj_id][lang] = None
                continue

            with open(filepath, 'r', encoding='utf-8') as f:
                raw = f.read()

            processed, img_count = extract_images(raw, IMG_DIR)
            total_images += img_count

            if proj_id in EMBED_REPLACEMENTS:
                for class_keyword, proj_img in EMBED_REPLACEMENTS[proj_id]:
                    pattern = re.compile(r'<img[^>]*class="[^"]*' + re.escape(class_keyword) + r'[^"]*"[^>]*>')
                    processed = pattern.sub(
                        f'<img src="{proj_img}" style="width:100%;max-width:680px;border-radius:8px;margin:1.5rem 0;display:block;box-shadow:0 2px 12px rgba(0,0,0,0.3);">',
                        processed
                    )

            css, body = extract_case_content(processed)
            body = inject_project_images(body, proj_id)
            body = rewrite_relative_image_paths(body)
            body = body.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')

            case_studies[proj_id][lang] = {'css': css, 'body': body}
            size_kb = len(raw) / 1024
            print(f'  [{lang.upper()}] {filename} ({size_kb:.0f}KB, {img_count} images extracted)')

    # Generate portfolio-data.js for case studies
    case_lines = [
        '// Auto-generated by build.py - do not edit manually',
        'var CASE_DATA = {',
    ]
    for proj_id, langs in case_studies.items():
        case_lines.append(f'  "{proj_id}": {{')
        for lang, data in langs.items():
            if data is None:
                case_lines.append(f'    "{lang}": null,')
                continue
            case_lines.append(f'    "{lang}": {{')
            case_lines.append(f'      "css": `{data["css"]}`,')
            case_lines.append(f'      "body": `{data["body"]}`,')
            case_lines.append('    },')
        case_lines.append('  },')
    case_lines.append('};')

    case_output_path = os.path.join(BASE_DIR, 'portfolio-data.js')
    with open(case_output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(case_lines))

    print(f'  Case data written: portfolio-data.js')

    # ── Part 2: Scan Writings ──
    print('[2/4] Scanning writings...')
    writings, wr_zh, wr_en = scan_writings()

    # ── Part 3: Scan Small Works ──
    print('[3/4] Scanning small works...')
    small_works, sw_zh, sw_en = scan_small_works()

    # ── Part 4: Generate content-auto.js ──
    print('[4/4] Generating content-auto.js...')
    js_content = generate_auto_js(writings, wr_zh, wr_en, small_works, sw_zh, sw_en)

    with open(os.path.join(BASE_DIR, OUTPUT_FILE), 'w', encoding='utf-8') as f:
        f.write(js_content)

    output_size_kb = len(js_content.encode('utf-8')) / 1024
    print(f'\n=== Done ===')
    print(f'  Images: {IMG_DIR}/ ({total_images} images)')
    print(f'  Project images: {PROJ_IMG_DST}/ ({img_count_pj} images)')
    print(f'  Case data: portfolio-data.js')
    print(f'  Auto data: {OUTPUT_FILE} ({output_size_kb:.0f}KB)')
    print(f'  Writings: {len(writings)} articles')
    print(f'  Small works: {len(small_works)} projects')
    print(f'\nRun `python3 build.py` after adding/updating source files.')


if __name__ == '__main__':
    build()
