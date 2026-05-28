# PM 项目工作区协议

本目录是一个 PM 项目工作区。Claude Code 必须遵守下面的协议。核心原则：**把"讨论"和"产出物"分开**，让 PRD/原型不会被讨论污染，也不会和讨论脱节。

## 目录结构

### 产出物（最终交付，所有写入需 diff 审阅）
- `prd.md` 或 `prd/` — PRD 正文。两者**只用一个**：
  - `prd.md`：单文件模式，适合中小项目（一份 PRD 一两千字内）
  - `prd/`：拆章节目录模式，适合大项目（多个模块、长 PRD、多人协作）
  - 启动项目时**删掉不用的那个**。两个同时存在 Claude 必须停下来报错，让你确认用哪个。
- `prd-snapshots/` — 已 freeze 的 PRD 历史版本。命名 `v{N.N}-YYYYMMDD.md`。
- `prototypes.md` — 原型版本登记本。Figma 在外面，这里只登记引用 + 变更说明。

### 讨论（探索性思考，写入比产出物宽松）
- `subtopics/` — 子话题文档，`NN-slug.md`。
- `decisions.md` — 决策日志。**只增不删**。推翻旧决策新增条目注明"推翻 #N"。

### 外部输入（只读归档）
- `inputs/user-research.md` — 用研结论
- `inputs/eng-feedback.md` — 技术评审纪要
- `inputs/design-feedback.md` — 设计评审纪要
- `inputs/business-asks.md` — 运营/业务方需求
- 这是别人给你的输入。**Claude 不能替别人改观点**，只能读、引用、做冲突核查。要反驳某条 feedback，写到 subtopic 或 decisions。

### 元
- `_master.md` — 项目总览
- `conflicts.md` — 冲突记录
- `CLAUDE.md` — 本文件

## 每轮对话协议

### 开始时
1. 读 `_master.md` 拿项目状态、当前 PRD 版本指针、未决问题、冲突计数。
2. 判定 PRD 模式：检查 `prd.md` 和 `prd/` 哪个存在。两个都在 → 停下报错。
3. 扫 `subtopics/` 和 `inputs/`，了解上下文。
4. 判断我这轮发言属于哪类：
   - **讨论**（探索性思考、对比、推演）→ 进对应 subtopic
   - **PRD 修订**（明确要改 PRD）→ 进 prd.md 或 prd/某章
   - **登记输入**（贴评审纪要、用研结论、老板需求）→ 进对应 inputs/
   - **原型更新** → 进 prototypes.md
   - **决策**（明确说"就这么定"）→ 进 decisions.md 并同步 _master.md
   - 不确定 → **先问我**，别猜。

### 进行中
5. 处理对应文件。讨论类追加；产出物类只出 diff 不直接写。
6. 每次更新讨论性结论时，**必须判定一次**："这条结论要不要进 PRD？放哪章？"
   - 要进 → diff 提议里同时给出 PRD 改动
   - 暂不进 → 在 subtopic 里标 `🟡 暂缓进 PRD`
   - 永不进 → 标 `⚫ 不进 PRD`
7. 跨文件冲突核查范围：
   - 子话题 之间
   - 子话题 vs 当前 PRD
   - 新 inputs vs 当前 PRD（**最重要**——新评审反馈最容易和已写的 PRD 冲突）
   - 原型版本变更 vs PRD 章节
8. 发现冲突 → 写入 `conflicts.md`，本轮回复**明确提出**。不替我决定。

### 结束前
9. 输出 diff 提议（不直接写入），格式：

```
## 本轮 diff 提议

### subtopics/02-gift-tier-design.md（追加）
+ 判断：xxx
+ 进 PRD 判定：🟡 暂缓——等技术评审

### prd.md（或 prd/04-功能详述.md）（修订）
~ 4.2 节末尾追加："xxx"
~ 4.3 前提"用户已登录"改为"用户已登录且实名"

### prototypes.md（新增版本）
+ v1.3 / Figma 链接 / 变更点 / 影响 PRD 4.1,4.2

### conflicts.md（新增）
+ 冲突 #4：eng-feedback 0815 "推送延迟 200ms 不可达" vs PRD 4.2 假设"100ms 内"

### decisions.md（新增）
+ 决策 #7：礼物特效按主播等级差异化展示
```

10. 等 `ok 写入` / `改一下：xxx` / `只写 subtopic 不写 PRD` / `不写` 再实际落盘。**默认不主动写**。

## 切换命令

| 命令 | 含义 |
|---|---|
| `继续 NN` / `切到 NN` | 切到子话题 NN |
| `开新子话题 X` | 创建 `subtopics/NN-X.md` |
| `回 master` | 焦点回 `_master.md` |
| `进 PRD 第 X 章` | 进 PRD 对应章节 |
| `登记纪要：xxx`（或粘贴） | 进对应 inputs/ 文件 |
| `原型 vX.Y 更新` | 进 prototypes.md |
| `定下来：xxx` | 进 decisions.md |
| `检查冲突` | 跑全量冲突核查，输出报告，不写入 |
| `freeze PRD vX.Y` | 当前 PRD 拷贝到 prd-snapshots/，更新 _master.md |
| `归档 NN` | 子话题标记已完结 |

## 回复格式

每轮顶部加状态行：

```
[项目] <项目名>  [PRD] v<N.N>  [焦点] <subtopic/prd/inputs/prototypes>
```

正文回答。结尾按上面格式输出 diff 提议。

## 边界

- PRD 改动只精确改我指明的内容。**不主动"帮你润色一下整段"**——产品文档怕的就是 AI 改腔调。
- inputs/ 里别人的话不可替别人改。
- 不要美化冲突，发现就报，哪怕是小事。
- 同时打开 >4 个未归档子话题主动提示我先收。
- `decisions.md` 和 `_master.md` 决策日志只增不删。
- 没说要 freeze 之前不主动 freeze PRD 版本。
- 任何看起来"正式"的文字（PRD、上线方案、风险评估）默认都是草稿，**不要假定已经过 review**。
