# 设计语言博物馆 — 图片版权审计报告

> 审计日期：2026-06-22 | 审计人：Claude Code | 项目：art gallery / data/styles.json

---

## 审计摘要

| 指标 | 数值 |
|------|------|
| 总流派数 | 12 |
| 已填充封面图 | **9** / 12 |
| 已填充代表作 | **14** 张 |
| 版权可用（公有领域） | 4 个流派 |
| 版权需注明（CC 授权） | 5 个流派 |
| 版权禁用（保持空） | 3 个流派 |

---

## 完整审计表

### ✅ 可用（公有领域）

| 流派 | 现状 | 建议图片来源 | 直链 URL | 版权结论 | 风险等级 |
|------|------|-------------|----------|---------|---------|
| **浮世绘** | ✅ 已填 | Wikimedia Commons / Met Museum CC0 | [神奈川冲浪里](https://upload.wikimedia.org/wikipedia/commons/0/0a/The_Great_Wave_off_Kanagawa.jpg)、[赤富士](https://upload.wikimedia.org/wikipedia/commons/6/6f/Katsushika_Hokusai...Red_Fuji...jpg)、[蒲原夜雪](https://upload.wikimedia.org/wikipedia/commons/d/d2/Hiroshige16_kanbara.jpg) | 公有领域（作者逝世超 70 年） | ✅ 可用 |
| **构成主义** | ✅ 已填 | Wikimedia Commons | [红色楔子](https://upload.wikimedia.org/wikipedia/commons/1/13/Beat_the_Whites_with_the_Red_Wedge.jpg)、[第三国际纪念塔](https://upload.wikimedia.org/wikipedia/commons/f/ff/Tatlin%27s_Tower_maket_1919_year.jpg)、[Proun²](https://upload.wikimedia.org/wikipedia/commons/f/f0/Proun%C2%B2_by_El_Lissitzky.jpg) | 公有领域（El Lissitzky 1941 逝世，Tatlin 1953 逝世） | ✅ 可用 |
| **新艺术运动** | ✅ 已填 | Wikimedia Commons | [Gismonda](https://upload.wikimedia.org/wikipedia/commons/1/13/Mucha_-_Gismonda.jpg)、[百合花](https://upload.wikimedia.org/wikipedia/commons/c/c4/Alfons_Mucha_-_1898_-_The_Flowers_Lily.jpg) | 公有领域（Mucha 1939 逝世） | ✅ 可用 |
| **侘寂** | ✅ 已填 | Wikimedia Commons | [破墨山水](https://upload.wikimedia.org/wikipedia/commons/8/8b/Sesshu_-_Haboku-Sansui_-_complete.jpg)、龙安寺、宫岛茶室 | 公有领域（雪舟 1506 逝世，古籍扫描） | ✅ 可用 |

### ⚠️ 需注明（CC 授权建筑摄影）

| 流派 | 现状 | 建议图片来源 | 直链 URL | 版权结论 | 风险等级 |
|------|------|-------------|----------|---------|---------|
| **粗野主义** | ✅ 已填 | Wikimedia Commons | [Barbican](https://upload.wikimedia.org/wikipedia/commons/5/5b/London_barbican_20.JPG)（CC BY-SA 3.0）、[Habitat 67](https://upload.wikimedia.org/wikipedia/commons/a/a5/Habitat_67.jpg)（CC BY-SA 3.0）、[National Theatre](https://upload.wikimedia.org/wikipedia/commons/2/20/National_Theatre%2C_London.jpg)（CC BY-SA 2.0） | 建筑摄影，各自 CC 许可，须署名 | ⚠️ 需注明 |
| **包豪斯** | ✅ 已填 | Wikimedia Commons | [德绍校舍](https://upload.wikimedia.org/wikipedia/commons/e/e1/Bauhaus.JPG)（公有领域）、[瓦西里椅](https://upload.wikimedia.org/wikipedia/commons/a/a6/Bauhaus_3_Chair.jpg)（CC BY 2.0） | 校舍图作者放弃版权；椅子图 CC BY 2.0 须署名 | ⚠️ 需注明 |
| **解构主义** | ✅ 已填 | Wikimedia Commons | [古根海姆 Bilbao](https://upload.wikimedia.org/wikipedia/commons/1/16/Guggenheim_bilbao.JPG)（CC BY-SA 3.0）、[广州大剧院](https://upload.wikimedia.org/wikipedia/commons/2/2f/Guangzhou_Opera_House%28Near%29.JPG)（CC BY 3.0） | 建筑摄影，CC 许可，须署名 | ⚠️ 需注明 |
| **装饰艺术** | ✅ 已填 | Wikimedia Commons | [克莱斯勒大厦](https://upload.wikimedia.org/wikipedia/commons/f/f8/Chrysler_Building_NYC-20090519-RM-094845.jpg)（CC BY-SA 4.0 Reinhold Möller）、[上海外滩](https://upload.wikimedia.org/wikipedia/commons/f/fc/Shanghai%27s_Bund_District.jpg)（CC BY-SA 3.0） | 建筑摄影，CC 许可，须署名 | ⚠️ 需注明 |
| **新艺术运动**（建筑） | ✅ 已填 | Wikimedia Commons | [Casa Batlló](https://upload.wikimedia.org/wikipedia/commons/6/6b/CasaBatllo_0170.JPG)（CC BY-SA 2.5） | 建筑摄影，CC 许可，须署名 | ⚠️ 需注明 |

### 🔴 禁用（版权期内 / 无合规图）

| 流派 | 现状 | 替代策略 | 版权结论 | 风险等级 |
|------|------|---------|---------|---------|
| **孟菲斯** | ⬜ 封面有图但版权敏感 | 用风格化几何/撞色示意图替代；Sottsass 2007 逝世，版权至 2037 | Sottsass Carlton 书架设计仍在版权期；当前使用的 Wikimedia 图可能需谨慎 | 🔴 禁用 |
| **波普艺术** | ⬜ 保持空 | 建议自创波普风格网点/撞色示意图 | Warhol（1987 逝世） / Lichtenstein（1997 逝世）原作均在版权期 | 🔴 禁用 |
| **瑞士国际主义** | ⬜ 保持空 | 使用 Helvetica 字体样张或网格系统示意图 | Müller-Brockmann（1996 逝世）海报仍在版权期 | 🔴 禁用 |
| **赛博朋克** | ⬜ 保持空 | 建议 AI 生成霓虹街景/故障文字示意图 | 无现成公有领域图像资源 | 🔴 禁用 |

---

## 署名要求清单

以下图片使用时须标注作者（按许可协议要求）：

| 图片 | 须标注作者 | 许可 |
|------|-----------|------|
| Barbican Estate | Dirk Ingo Franke (Southgeist) | CC BY-SA 3.0 |
| Habitat 67 | Cricu | CC BY-SA 3.0 / GFDL |
| National Theatre, London | Aurelien Guichard | CC BY-SA 2.0 |
| Casa Batlló | tato grasso (Esculapio) | CC BY-SA 2.5 |
| 广州大剧院 | Mr a (Mraandthebigbrother) | CC BY 3.0 |
| 克莱斯勒大厦 | Reinhold Möller (Ermell) | CC BY-SA 4.0 |
| 上海外滩 Bund | 见各文件描述页 | CC BY-SA 3.0 |
| 龙安寺枯山水 | BMR & MAM | CC BY-SA 2.0 |
| 瓦西里椅 | Lorkan (via Flickr) | CC BY 2.0 |
| 德绍包豪斯校舍连接翼 | 见文件描述页 | CC BY-SA 3.0 |
| Guggenheim Bilbao | 见文件描述页 | CC BY-SA 3.0 / GFDL |

---

## 备注

- 所有 `upload.wikimedia.org` 直链可热链，无需下载再托管
- 浮世绘、构成主义、新艺术（Mucha）作品全球公有领域，最安全
- 建筑摄影图均为 CC 许可，前台展示时应标注作者署名
- 赛博朋克 / 波普艺术 / 瑞士国际主义 三流派建议保留 themeColor 色块占位或用自创示意图
