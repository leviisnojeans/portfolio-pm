# Portfolio-PM 项目母文件

> 本文件记录 portfolio-pm 项目的完整需求和约束条件。**后续所有改动必须以本文件为参考依据。**
> 如有不确定之处，必须先向我确认再执行。

---

## 1. 项目目标

将 `source/` 目录下的所有内容整合到 `portfolio-pm.html` 中，构建一个完整的中英双语产品经理个人作品集网站。

## 2. 核心要求

### 2.1 内容完整展示
- 所有内容在 portfolio 页面内展示，不打开新网页/新标签页
- 项目案例：在页面内通过 modal/overlay 展示完整案例内容
- 小作品（HTML 格式）：在页面内通过 modal/overlay 预览体验，附产品说明书
- 写作文章：在页面内通过 modal/overlay 阅读

### 2.2 语言对应规则（重要）

网站支持中英文切换，源文件中的内容按以下规则加载：

**项目案例**（全部有双语版本，通过页面内展开/收起（accordion）展示）：
| 项目 | 中文（ZH 时加载） | 英文（EN 时加载） |
|------|-------------------|-------------------|
| 弹幕体验优化 | `bullet_comment_case_study_zh.html` | `bullet_comment_case_study.html` |
| 直播间框架重构 | `bilibili_live_room_case_study_zh.html` | `bilibili_live_room_case_study.html` |
| PC 开播工具改版 | `bilibili_streaming_tool_case_study_zh.html` | `bilibili_streaming_tool_case_study.html` |
| 春晚直播专项 | `spring_festival_case_study_zh.html` | `spring_festival_case_study.html` |

**小作品**（语言不敏感，所有模式下展示；通过页面内 modal 预览体验 + 产品说明）：
| 小作品 | 说明 |
|--------|------|
| Levi's Travel Map | React 应用，UI 以中文为主，双语均可展示。需创建 product-description.md |
| The Philosopher's Forum | React 应用，界面为英文，已有双语 product-description |

**写作**（部分单语，通过页面内 modal/iframe 阅读；仅展示 § V 独立板块）：
| 文章 | ZH 时加载 | EN 时加载 | 备注 |
|------|-----------|-----------|------|
| SONGKRAN Field Notes | 无中文版（不展示） | `Songkran_Final_2026.html` | **仅展示英文版** |
| 少即是多：C端界面降噪 | `decluttering_retention_conversion_zh.html` | `decluttering_retention_conversion_en.html` | 双语 HTML |
| 直播间的社交引擎 | `parasocial_analysis.html` | `parasocial_analysis_en.html` | ZH 版无 _zh 后缀 |

**不展示的文章**：
- `公共空间的隐形门槛.md` — 不纳入 portfolio
- `Songkran_Final_2026.md` — 不展示中文版

**关键规则**：
- 中文模式下 → 仅显示中文内容（有 ZH 版本显示 ZH，无 ZH 版本则标注"仅中文"）
- 英文模式下 → 仅显示英文内容（有 EN 版本显示 EN，无 EN 版本则隐藏该条目）
- 小作品的语言不敏感，所有模式下都展示

### 2.3 同步更新
- 源文件（`source/` 目录）更新后，portfolio 能同步展示更新后的内容
- 实现方式：portfolio 通过动态加载（iframe 等）直接引用源文件路径

### 2.4 UI 与内容分离
- 后续修改 UI（样式、布局）不应影响内容展示
- 所有文本内容单独管理，不硬编码在 HTML 结构中
- 创建 `content.js` 作为独立数据层，所有文本内容、索引、配置集中管理

### 2.5 纠正已有问题
- 照片 `我的照片.PNG` → 重命名为 `levi-profile.jpg`，放在 **portfolio 根目录**
- Google Fonts 国内镜像替换（`fonts.loli.net`）
- 简历 PDF 路径修正（使用 ASCII 文件名或编码方式）
- 当前 portfolio 中案例链接指向 `互联网项目/` 路径，需要修正为正确的源文件路径
- 字节跳动项目 → **保持现状**，不补充案例

## 3. 项目结构

```
my portfolio/
├── portfolio-pm.html          ← 主站文件（展示层：UI 结构 + 样式 + 交互）
├── content.js                 ← 数据层：所有文本内容、索引、配置（新建）
├── portfolio-pm.md            ← 内容草稿（不修改）
├── portfolio-review/          ← 复盘分析 React 应用（不动）
├── source/                    ← 源文件仓库（不动，读引用）
│   ├── 简历/
│   │   ├── 刘维杰-产品经理简历.md
│   │   ├── 刘维杰-用户产品经理-三年经验-上海.pdf   ← ZH 简历
│   │   └── LiuWeijie_PM_Shanghai.pdf                 ← EN 简历
│   ├── 项目/
│   │   ├── 项目介绍-html格式/       ← 案例 HTML（iframe 加载源）
│   │   ├── 项目结构化材料/          ← 详细复盘文档（暂不展示在 portfolio）
│   │   ├── 项目源材料/              ← 原始文档和图片
│   │   └── 🧭PRD模板/ 🧭通用复盘模板/  ← 模板工具（不动）
│   ├── 小作品/
│   │   ├── levi's travel map/       ← React 应用
│   │   └── the philosopher's forum/ ← React 应用 + 产品说明
│   └── 写作/                        ← 文章 HTML/MD
└── _master.md                  ← 本文件
```

## 4. 板块结构

```
Nav: Levi | 经历 | 能力 | 小作品 | 写作 | 关于 | [EN/中文]

Hero: 产品驱动增长. 数据定义价值.     ← 可优化的 POV 文案
      [查看项目经历] [下载简历 PDF]

§ I   项目经历（5 个项目，含案例 modal 嵌入）
§ II  核心能力（4 个维度卡片）
§ III 关于我
§ IV  小作品（2 个：Travel Map + Philosopher's Forum，可交互预览）
§ V   写作（4+ 篇文章，modal 阅读）
Footer: 联系信息 + 简历下载
```

## 5. 交互方式

- **项目案例**：点击"查看完整案例"→ **页面内展开（accordion）**，在项目行下方展开显示完整案例 HTML
  - 展开区域通过 iframe 加载对应语言版本的案例 HTML
  - 可再次点击收起
  - iframe 加载时显示 loading spinner
  - iframe 加载失败时显示错误提示
- **小作品**：点击"体验"→ 弹出 modal，iframe 加载交互式应用
  - modal 上方叠加产品说明书（中文/英文对应）
  - 移动端注意 iframe 高度适配
- **写作**：点击"阅读"→ 弹出 modal，iframe 加载 HTML 文章

## 6. 设计约束

- 保留现有暗色主题视觉风格（`#0D0C0B` 底色 + `#D4935A` accent 色）
- 保留现有字体组合（Cormorant Garamond + Syne）
- 保留现有交互细节（自定义光标、滚动动画、section 标记、双语切换）
- 新增板块需与现有视觉语言一致
- 中英双语切换功能保留并扩展

## 7. 不修改的文件

- `source/` 目录下所有源文件
- `portfolio-review/` 目录
- `portfolio-pm.md`

## 8. 当前已知问题（需纠正）

| # | 问题 | 修复方式 |
|---|------|----------|
| 1 | 照片 `我的照片.PNG` 含中文 | 重命名为 `levi-profile.jpg`（根目录） |
| 2 | Google Fonts 直连 `fonts.googleapis.com` | 替换为 `fonts.loli.net` |
| 3 | 案例链接指向 `互联网项目/` 路径 | 修正为 `source/项目/项目介绍-html格式/` |
| 4 | 简历 PDF 路径含中文 | 使用 ASCII 文件名或编码方式 |
| 5 | 缺少 Writing 板块 | 新增 § V 写作板块（3 篇文章） |
| 6 | 缺少 Small Works 板块 | 新增 § IV 小作品板块（2 个 + product-description） |
| 7 | 案例需新标签页打开 | 改为页面内 accordion 展开 |
| 8 | 字节跳动项目无案例、指标弱 | **保持现状**，不补充 |
| 9 | 无 OG meta 标签 | 补充 og:title/description/image |
