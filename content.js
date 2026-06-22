/**
 * Portfolio-PM 数据层
 *
 * 所有文本内容和配置集中管理。
 * 修改内容（文案、项目描述等）请修改此文件。
 * 修改样式/布局请修改 portfolio-pm.html。
 */

const PORTFOLIO_DATA = {

  // ── 简历路径 ──
  resume: {
    zh: 'source/简历/刘维杰-PM-3年经验-上海.html',
    en: 'source/简历/LiuWeijie_PM_Shanghai.html',
  },

  // ── 翻译字符串 ──
  translations: {
    zh: {
      'page-title':      '刘维杰 · 产品经理',
      'nav-work':        '经历',
      'nav-skills':      '能力',
      'nav-playground':  '作品',
      'nav-writing':     '写作',
      'nav-about':       '关于',
      'nav-contact':     '联系',

      'hero-mark':       '产品经理 · 互联网 · 2022 — 至今',
      'hero-l1':         '产品人，',
      'hero-l2':         '关注内容、出海与 AI<span class="accent-period">.</span>',
      'hero-byline':     '在寻找新机会 · 上海',
      'hero-sub':        'B站 · 阿里 · 字节｜3年+内容平台与商业化经验',
      'hero-value-prop': '擅长从复杂场景中定义问题，用结构化方法驱动增长与体验提升',
      'hero-stat-1-val': '3年+',
      'hero-stat-1-lbl': '内容平台经验',
      'hero-stat-2-val': '千万级',
      'hero-stat-2-lbl': '直播用户覆盖',
      'hero-stat-3-val': '千万级',
      'hero-stat-3-lbl': '营收增量贡献',
      'hero-cta-work':   '查看项目经历',
      'hero-cta-resume': '查看简历',
      'scroll-label':    '向下滚动',

      'tag-interaction': '互动设计',
      'tag-realtime':    '实时系统',
      'tag-modeling':    '量化建模',
      'tag-system':      '系统设计',
      'tag-ux-arch':     'UX架构',
      'tag-monetize':    '商业化',
      'tag-tool':        '工具设计',
      'tag-governance':  '产品治理',
      'tag-zero-one':    '0→1创新',
      'tag-cross-team':  '跨团队协作',
      'tag-supply':      '供给侧',
      'tag-creator':     '创作者生态',
      'tag-data':        '数据驱动',

      'sec1-title':      '项目经历',
      'sec1-meta':       '精选 · 2021 — 至今',

      'w1-co':    '哔哩哔哩',
      'w1-role':  '直播业务 · 高级产品经理',
      'w1-pull':  '重构直播间框架，从系统层解决用户体验碎片化',
      'w1-body':  '将问题定义为「交易成本」问题而非UI优化问题。建立商业接入治理框架，统一视觉层级，将变现工具与内容类型强绑定，消除用户认知错位。',

      'w2-co':    '哔哩哔哩',
      'w2-role':  '直播业务 · 高级产品经理',
      'w2-pull':  '弹幕体验再设计：把可读性问题转化为营收驱动力',
      'w2-body':  '建立滚速-丢弃率量化模型，重构视觉层级，将引导提示改为行为触发式。核心洞察：弹幕的社交可读性是打赏行为的先决条件，而非边缘体验。',

      'w5-co':    '哔哩哔哩',
      'w5-role':  '直播业务 · 高级产品经理',
      'w5-pull':  'PC 开播工具改版：以治理视角解决体验熵增问题',
      'w5-body':  '66% 主播认为页面复杂难用。审计 230+ 页面，统一信息架构，优化官方玩法入口与状态反馈，设计官方活动资源位，同步完成性能优化。',

      'w3-co':    '优酷（阿里巴巴）',
      'w3-role':  '直播活动 · 产品经理',
      'w3-pull':  '从零设计优酷春晚直播互动产品',
      'w3-body':  '将直播春晚的产品问题重构为情感问题：亿级用户想要「同一时刻共同庆祝」，而非「与主播互动」。在4周内发明新互动格式，协调6+团队完成从0到1交付。',

      'w4-co':    '字节跳动',
      'w4-role':  '达人营销 · 产品实习',
      'w4-pull':  '从0搭建平台供给侧培育体系，驱动创作者增长与留存',
      'w4-body':  '独立负责平台供给侧培育模块：升级样片筛选工具提升撮合效率60%；从0搭建创作者课堂与审核教育专项，培育渗透率达20%，创作者留存率提升4pp；设计头部创作者权益标识体系，主页PV/UV增长35%；搭建供给侧全链路转化漏斗，为需求验证提供数据支撑。',

      'case-link':    '查看完整案例',

      'm-paid-rev':   '自然实付流水',
      'm-likes':      '人均点赞',
      'm-cta':        'CTA 点击率',
      'm-comment-vol':'弹幕发送量',
      'm-watchtime':  '观看时长',
      'm-spend':      '人均消费',
      'm-start-conv': '开播转化',
      'm-feature-pen':'玩法渗透',
      'm-memory':     '内存占用',
      'm-revenue':    '营收 YoY',
      'm-wt-yoy':     '时长 YoY',
      'm-teams':      '协调团队',
      'm-cross':      '跨业务线落地',
      'm-infra':      '基础架构',
      'm-match-vol':  '周撮合量提升',
      'm-retention':  '创作者留存率提升',
      'm-pvuv':       '主页PV/UV增长',

      'sec2-title':   '核心能力',
      'sec2-meta':    '四个维度',

      'sk1-title': '产品设计',
      'sk1-body':  '从模糊的业务目标出发，拆解用户核心需求，定义问题框架，推动从0到1完整交付。习惯在高模糊度环境中找到正确的问题，而非直接解决给定的问题。',
      'sk1-t1': '需求分析', 'sk1-t2': '原型设计', 'sk1-t3': 'PRD 撰写', 'sk1-t4': '0-to-1',

      'sk2-title': '数据与实验',
      'sk2-body':  '量化建模优先于直觉拍板。在开发前先通过数据模型预测实验结果，降低试错成本。弹幕滚速模型即是典型案例：实验前已确定参数范围。',
      'sk2-t1': 'A/B 实验', 'sk2-t2': '指标建模', 'sk2-t3': '漏斗分析', 'sk2-t4': '定量研究',

      'sk3-title': '领域专长',
      'sk3-body':  '三年深耕直播与内容平台，深度理解社交互动机制与商业变现联动的底层逻辑。了解UGC、推荐系统、内容分发的产品链路与数据体系。',
      'sk3-t1': '直播产品', 'sk3-t2': '内容平台', 'sk3-t3': 'UGC', 'sk3-t4': '社交增长',

      'sk4-title': '跨团队协作',
      'sk4-body':  '曾在4周内协调6个以上团队完成0-1产品交付。习惯在高模糊、高压缩的时间窗口内对齐研发、设计、运营，推动复杂项目落地。',
      'sk4-t1': '研发对齐', 'sk4-t2': '设计协作', 'sk4-t3': '多团队协调', 'sk4-t4': '项目管理',

      'sec3-title':   '关于我',
      'sec3-meta':    '简介',

      'about-pull':   '系统之内<span class="accent">，</span><br>问题之前<span class="accent">，</span><br>框架之上<span class="accent">。</span>',
      'about-p1':     '过去三年，我在中国头部内容平台的产品核心层工作。<em>哔哩哔哩、优酷、字节跳动</em>——这些平台在承载内容的同时，也在塑造文化。',
      'about-p2':     '我的产品方法论始于重构问题本身：弹幕可读性问题是营收问题；春晚互动问题是情感问题；直播间UI问题是交易成本问题。找到正确的框架，解法往往比预期简单。',
      'about-p3':     '英语专业出身，具备中英双语工作能力。对AI、平台治理与科技对社会的影响有持续的深度关注。',

      'sec4-title':   '小作品',
      'sec4-meta':    '动手做',

      'sw1-name':     "Levi's Travel Map",
      'sw1-desc':     '一个帮你找到最佳旅行时机的交互工具。结合气候数据与个人偏好，可视化呈现全球目的地的适宜出行窗口。',
      'sw2-name':     "The Philosopher's Forum",
      'sw2-desc':     '沉浸式思想圆桌应用。把真实问题交给历史上的哲学家，看他们如何回应、辩论、碰撞。',
      'sw-btn-try':   '体验',
      'sw-btn-desc':  '产品说明书',
      'loading-tip':  '首次加载可能较慢，请稍等或先查看其他内容',
      'loading-error':'加载失败，请刷新重试',

      'sec5-title':   '写作',
      'sec5-meta':    '思考记录',

      'wr1-title':    '少即是多：C端界面降噪如何撬动用户停留与转化',
      'wr1-tag':      '产品分析',
      'wr2-title':    '直播间的社交引擎：Parasocial Relationship 如何驱动互动与营收',
      'wr2-tag':      '产品分析',
      'wr3-title':    'SONGKRAN: Field Notes on Legitimacy, Joy, and Who Gets to Take Up Space',
      'wr3-tag':      '文化观察',
      'wr4-title':    'C端AI产品的冷启动悖论',
      'wr4-tag':      '产品分析',
      'wr-btn-read':  '阅读',

      'footer-end':        '联系',
      'footer-who-label':  '微信',
      'footer-who-val':    '<span class="copy-wechat" onclick="copyWechat()" style="cursor:pointer;border-bottom:1px dashed var(--faint);">LeviLiu85</span>',
      'footer-where-label':'坐标',
      'footer-where-val':  '上海',
      'footer-how-label':  '联系方式',
      'resume-download':   '查看简历',
    },

    en: {
      'page-title':      'Levi Liu · Product Manager',
      'nav-work':        'Work',
      'nav-skills':      'Skills',
      'nav-playground':  'Playground',
      'nav-writing':     'Writing',
      'nav-about':       'About',
      'nav-contact':     'Contact',

      'hero-mark':       'Product Manager · Internet Industry · 2022 — Present',
      'hero-l1':         'Building Products at the Intersection of Content, Growth, and AI<span class="accent-period">.</span>',
      'hero-l2':         '',
      'hero-byline':     'Open to opportunities · Shanghai',
      'hero-sub':        'Bilibili · Alibaba · ByteDance｜3+ Years in Content Platforms & Monetization',
      'hero-value-prop': 'I define problems from complex scenarios and use structured methods to drive growth and experience improvements.',
      'hero-stat-1-val': '3+',
      'hero-stat-1-lbl': 'Years in content',
      'hero-stat-2-val': '10M+',
      'hero-stat-2-lbl': 'Live users reached',
      'hero-stat-3-val': '9-figure',
      'hero-stat-3-lbl': 'Revenue impact',
      'hero-cta-work':   'View Work',
      'hero-cta-resume': 'View Resume',
      'scroll-label':    'Scroll',

      'tag-interaction': 'Interaction Design',
      'tag-realtime':    'Real-time Systems',
      'tag-modeling':    'Quantitative Modeling',
      'tag-system':      'System Design',
      'tag-ux-arch':     'UX Architecture',
      'tag-monetize':    'Monetization',
      'tag-tool':        'Tool Design',
      'tag-governance':  'Product Governance',
      'tag-zero-one':    '0→1 Innovation',
      'tag-cross-team':  'Cross-team Leadership',
      'tag-supply':      'Supply-side',
      'tag-creator':     'Creator Ecosystem',
      'tag-data':        'Data-driven',

      'sec1-title':      'Experience',
      'sec1-meta':       'Selected · 2021 — Present',

      'w1-co':    'Bilibili',
      'w1-role':  'Livestreaming · Senior PM',
      'w1-pull':  'Rebuilt the live room framework — solving UX fragmentation at the system level',
      'w1-body':  'Reframed the problem as transaction cost reduction, not UI cleanup. Built a governance framework for business integrations, unified visual hierarchy, and locked monetization tools to content type — eliminating cognitive mismatch.',

      'w2-co':    'Bilibili',
      'w2-role':  'Livestreaming · Senior PM',
      'w2-pull':  'Bullet comment redesign — turned a readability problem into a revenue driver',
      'w2-body':  'Built a quantitative scroll speed model, restructured visual hierarchy, made engagement prompts behavior-triggered. Core insight: social legibility is a precondition for tipping behavior, not a peripheral experience.',

      'w5-co':    'Bilibili',
      'w5-role':  'Livestreaming · Senior PM',
      'w5-pull':  'PC streaming tool redesign — solving UI entropy through governance',
      'w5-body':  '66% of streamers found the tool too complex to navigate. Audited 230+ pages, unified the information architecture, redesigned feature entry points with real-time feedback, and built a governed resource slot for official campaigns.',

      'w3-co':    'Youku (Alibaba)',
      'w3-role':  'Live Events · Product Manager',
      'w3-pull':  'Designed Youku\'s Spring Festival live experience from scratch',
      'w3-body':  'Reframed the product problem as an emotion question: 100M users want to celebrate together at the same moment, not interact with a host. Invented a new ambient interaction format in 4 weeks, coordinating 6+ teams.',

      'w4-co':    'ByteDance',
      'w4-role':  'Talent Marketing · PM Intern',
      'w4-pull':  'Built the creator supply-side cultivation system from scratch',
      'w4-body':  'Owned the creator supply-side cultivation module: upgraded sample screening tool (+60% match volume), built creator academy and compliance education programs (20% penetration, +4pp retention), designed top-creator badge system (+35% profile PV/UV), and built a full-funnel conversion pipeline for data-driven decision making.',

      'case-link':     'View case study',

      'm-paid-rev':    'Organic paid revenue',
      'm-likes':       'Avg. likes / user',
      'm-cta':         'CTA click-through',
      'm-comment-vol': 'Comment volume',
      'm-watchtime':   'Watch time',
      'm-spend':       'Avg. spend / user',
      'm-start-conv':  'Start conversion',
      'm-feature-pen': 'Feature penetration',
      'm-memory':      'Memory footprint',
      'm-revenue':     'Revenue YoY',
      'm-wt-yoy':      'Watch time YoY',
      'm-teams':       'Teams coordinated',
      'm-cross':       'Cross-vertical adoption',
      'm-infra':       'Infrastructure',
      'm-match-vol':   'Weekly match volume',
      'm-retention':   'Creator retention lift',
      'm-pvuv':        'Profile PV/UV growth',

      'sec2-title':    'Capabilities',
      'sec2-meta':     'Four dimensions',

      'sk1-title': 'Product Design',
      'sk1-body':  'Turning fuzzy business goals into well-defined user problems. I focus on framing the right problem before jumping to solutions — shipping 0-to-1 products in high-ambiguity environments.',
      'sk1-t1': 'Requirements', 'sk1-t2': 'Prototyping', 'sk1-t3': 'PRD', 'sk1-t4': '0-to-1',

      'sk2-title': 'Data & Experimentation',
      'sk2-body':  'Model before you test. I build quantitative models upfront to predict experiment outcomes before writing a line of code — cutting iteration cost. The bullet comment scroll-speed model is a concrete example of this approach in action.',
      'sk2-t1': 'A/B Testing', 'sk2-t2': 'Metrics Modeling', 'sk2-t3': 'Funnel Analysis', 'sk2-t4': 'Quant Research',

      'sk3-title': 'Domain Expertise',
      'sk3-body':  'Three years deep in live streaming and content platforms. I understand how social mechanics and monetization connect at a systems level — from UGC and recommendation pipelines to content distribution and engagement loops.',
      'sk3-t1': 'Live Streaming', 'sk3-t2': 'Content Platforms', 'sk3-t3': 'UGC', 'sk3-t4': 'Social Growth',

      'sk4-title': 'Cross-functional',
      'sk4-body':  'Delivered a 0-to-1 product in 4 weeks coordinating 6+ teams. I thrive in ambiguous, compressed-timeline environments — driving alignment across engineering, design, and operations to get things shipped.',
      'sk4-t1': 'Eng Alignment', 'sk4-t2': 'Design Collab', 'sk4-t3': 'Multi-team', 'sk4-t4': 'Project Mgmt',

      'sec3-title':    'About',
      'sec3-meta':     'Bio',

      'about-pull':    'Inside the system<span class="accent">,</span><br>before the problem<span class="accent">,</span><br>above the frame<span class="accent">.</span>',
      'about-p1':      'Three years embedded in the product core of China\'s largest content platforms. <em>Bilibili. Youku. ByteDance.</em> Platforms that carry culture as much as they move it.',
      'about-p2':      'My approach starts with reframing the problem: the bullet comment readability problem was a revenue problem. The Spring Festival interaction problem was an emotion problem. The live room UI problem was a transaction cost problem. Find the right frame, and the solution is usually simpler than it looks.',
      'about-p3':      'English major by training, fluent in both languages and cultures. Deeply interested in AI, platform governance, and the social impact of technology.',

      'sec4-title':   'Playground',
      'sec4-meta':    'Side projects',

      'sw1-name':     "Levi's Travel Map",
      'sw1-desc':     'An interactive tool to find your ideal travel timing. Combines climate data with personal preferences to visualize the best windows for destinations worldwide.',
      'sw2-name':     "The Philosopher's Forum",
      'sw2-desc':     'An immersive roundtable experience. Bring your questions to history\'s greatest thinkers and watch them respond, debate, and collide.',
      'sw-btn-try':   'Try it',
      'sw-btn-desc':  'Product Details',
      'loading-tip':  'First load may be slow. Please wait or browse other content.',
      'loading-error':'Load failed. Please refresh and try again.',

      'sec5-title':   'Writing',
      'sec5-meta':    'Thoughts & analysis',

      'wr1-title':    'Less is More: How UI Decluttering Drives Retention & Conversion',
      'wr1-tag':      'Product Analysis',
      'wr2-title':    'The Social Engine of Live Streaming: How Parasocial Relationships Drive Interaction & Revenue',
      'wr2-tag':      'Product Analysis',
      'wr3-title':    'SONGKRAN: Field Notes on Legitimacy, Joy, and Who Gets to Take Up Space',
      'wr3-tag':      'Cultural Observation',
      'wr4-title':    'The Cold Start Paradox of Consumer AI Products',
      'wr4-tag':      'Product Analysis',
      'wr-btn-read':  'Read',

      'footer-end':        'Contact',
      'footer-who-label':  'Name',
      'footer-who-val':    '<a href="https://linkedin.com/in/levi-wj-liu" target="_blank" style="color:var(--text);text-decoration:none;">Levi_WJ Liu</a>',
      'footer-where-label':'Location',
      'footer-where-val':  'Shanghai, China',
      'footer-how-label':  'Email',
      'resume-download':   'View Resume',
    },
  },

  // ── Hero 数据锚点 ──
  heroStats: [
    { valKey: 'hero-stat-1-val', lblKey: 'hero-stat-1-lbl' },
    { valKey: 'hero-stat-2-val', lblKey: 'hero-stat-2-lbl' },
    { valKey: 'hero-stat-3-val', lblKey: 'hero-stat-3-lbl' },
  ],

  // ── 项目列表 ──
  // 按显示顺序排列（最新的在前）
  projects: [
    {
      id: 'bullet',
      year: "'25",
      coKey: 'w2-co',
      roleKey: 'w2-role',
      pullKey: 'w2-pull',
      bodyKey: 'w2-body',
      tags: ['tag-interaction', 'tag-realtime', 'tag-modeling'],
      metrics: [
        { value: '+33%', labelKey: 'm-comment-vol' },
        { value: '+3.6%', labelKey: 'm-watchtime' },
        { value: '+15%', labelKey: 'm-spend' },
      ],
      caseFiles: {
        zh: 'source/项目/项目介绍-html格式/bullet_comment_case_study_zh.html',
        en: 'source/项目/项目介绍-html格式/bullet_comment_case_study.html',
      },
    },
    {
      id: 'liveroom',
      year: "'24–'25",
      coKey: 'w1-co',
      roleKey: 'w1-role',
      pullKey: 'w1-pull',
      bodyKey: 'w1-body',
      tags: ['tag-system', 'tag-ux-arch', 'tag-monetize'],
      metrics: [
        { value: '+3.18%', labelKey: 'm-paid-rev' },
        { value: '+3.77%', labelKey: 'm-likes' },
        { value: '+1pp', labelKey: 'm-cta' },
      ],
      caseFiles: {
        zh: 'source/项目/项目介绍-html格式/bilibili_live_room_case_study_zh.html',
        en: 'source/项目/项目介绍-html格式/bilibili_live_room_case_study.html',
      },
    },
    {
      id: 'streamtool',
      year: "'23",
      coKey: 'w5-co',
      roleKey: 'w5-role',
      pullKey: 'w5-pull',
      bodyKey: 'w5-body',
      tags: ['tag-tool', 'tag-governance'],
      metrics: [
        { value: '+2.4pp', labelKey: 'm-start-conv' },
        { value: '+17pp', labelKey: 'm-feature-pen' },
        { value: '−15%', labelKey: 'm-memory' },
      ],
      caseFiles: {
        zh: 'source/项目/项目介绍-html格式/bilibili_streaming_tool_case_study_zh.html',
        en: 'source/项目/项目介绍-html格式/bilibili_streaming_tool_case_study.html',
      },
    },
    {
      id: 'springfest',
      year: "'22–'23",
      coKey: 'w3-co',
      roleKey: 'w3-role',
      pullKey: 'w3-pull',
      bodyKey: 'w3-body',
      tags: ['tag-zero-one', 'tag-cross-team', 'tag-monetize'],
      metrics: [
        { value: '+60%', labelKey: 'm-revenue' },
        { value: '+38%', labelKey: 'm-wt-yoy' },
        { value: '6+', labelKey: 'm-teams' },
      ],
      caseFiles: {
        zh: 'source/项目/项目介绍-html格式/spring_festival_case_study_zh.html',
        en: 'source/项目/项目介绍-html格式/spring_festival_case_study.html',
      },
    },
    {
      id: 'bytedance',
      year: "'21",
      coKey: 'w4-co',
      roleKey: 'w4-role',
      pullKey: 'w4-pull',
      bodyKey: 'w4-body',
      tags: ['tag-supply', 'tag-creator', 'tag-data'],
      metrics: [
        { value: '+60%', labelKey: 'm-match-vol' },
        { value: '+4pp', labelKey: 'm-retention' },
        { value: '+35%', labelKey: 'm-pvuv' },
      ],
      // 字节跳动无案例文件
      caseFiles: null,
    },
  ],

  // ── 核心能力 ──
  skills: [
    {
      num: '01',
      titleKey: 'sk1-title',
      bodyKey: 'sk1-body',
      tagKeys: ['sk1-t1', 'sk1-t2', 'sk1-t3', 'sk1-t4'],
    },
    {
      num: '02',
      titleKey: 'sk2-title',
      bodyKey: 'sk2-body',
      tagKeys: ['sk2-t1', 'sk2-t2', 'sk2-t3', 'sk2-t4'],
    },
    {
      num: '03',
      titleKey: 'sk3-title',
      bodyKey: 'sk3-body',
      tagKeys: ['sk3-t1', 'sk3-t2', 'sk3-t3', 'sk3-t4'],
    },
    {
      num: '04',
      titleKey: 'sk4-title',
      bodyKey: 'sk4-body',
      tagKeys: ['sk4-t1', 'sk4-t2', 'sk4-t3', 'sk4-t4'],
    },
  ],

  // ── 关于我（段落用） ──
  aboutParagraphKeys: ['about-p1', 'about-p2', 'about-p3'],

  // ── 小作品 ──
  // 所有语言模式下均展示
  smallWorks: [
    {
      id: 'travelmap',
      nameKey: 'sw1-name',
      descKey: 'sw1-desc',
      file: 'travel-map/',
      productDesc: 'source/小作品/levi\'s travel map/product-description.md',
      productDescInline: {
        zh: 'Levi\'s Travel Map 是一款旅行时机决策工具，帮助用户根据气候偏好和个人约束条件，找到全球目的地的最佳出行窗口。用户选择目的地后，工具会整合历史气候数据（温度、降水、日照），结合用户对拥挤度、预算和假期的偏好，可视化呈现每月的综合适宜度评分。界面采用沉浸式全屏欢迎页 + 横向滚动时间线 + 动态评分卡片，让抽象的"什么时候去最好"变成可交互、可比较的直观体验。它适合旅行规划、灵感探索和行程决策。',
        en: "Levi's Travel Map is a travel timing decision tool that helps users find the best window to visit destinations worldwide based on climate preferences and personal constraints. After selecting a destination, the tool integrates historical climate data (temperature, precipitation, sunshine) with user preferences on crowding, budget, and vacation availability to visualize a monthly composite suitability score. The interface features an immersive full-screen welcome, horizontal-scrolling timeline, and dynamic scoring cards — turning the abstract question of 'when should I go' into an interactive, comparable, and intuitive experience. Ideal for trip planning, travel inspiration, and itinerary decisions.",
      },
    },
    {
      id: 'philforum',
      nameKey: 'sw2-name',
      descKey: 'sw2-desc',
      file: 'source/小作品/the philosopher\'s forum/the philosopher\'s forum.html',
      productDesc: 'source/小作品/the philosopher\'s forum/product-description.md',
      productDescInline: {
        zh: 'The Philosopher\'s Forum 是一款沉浸式思想圆桌应用，让用户把真实问题交给历史上的哲学家共同回应。用户输入一个关于人生、知识、道德、自我或信仰的问题后，系统会匹配相关哲学家，以对话形式呈现他们的立场、语气和代表性观点。界面采用克制的编辑式设计，结合人物席位、讨论流、引用回复和哲学家档案，让抽象思想变得可比较、可追问、可继续讨论。它适合灵感探索、哲学入门、写作启发和深度思考练习。',
        en: "The Philosopher's Forum is an immersive roundtable experience where users bring living questions to history's greatest thinkers. Enter a question about meaning, knowledge, morality, identity, or faith, and the app gathers relevant philosophers into a conversational debate. Each response reflects a distinct school of thought, voice, and intellectual stance, while profile dossiers offer quick context on each thinker's era, work, and worldview. With focused chat, reply, quote, and comparison flows, the product turns abstract philosophy into an approachable, interactive space for reflection, learning, writing inspiration, and deeper inquiry.",
      },
    },
  ],

  // ── 写作 ──
  // langs 字段中，为 null 表示该语言不展示该文章
  writings: [
    {
      id: 'declutter',
      titleKey: 'wr1-title',
      tagKey: 'wr1-tag',
      langs: {
        zh: { file: 'source/文章/decluttering_retention_conversion_zh.html' },
        en: { file: 'source/文章/decluttering_retention_conversion_en.html' },
      },
    },
    {
      id: 'parasocial',
      titleKey: 'wr2-title',
      tagKey: 'wr2-tag',
      langs: {
        zh: { file: 'source/文章/parasocial_analysis.html' },
        en: { file: 'source/文章/parasocial_analysis_en.html' },
      },
    },
    {
      id: 'songkran',
      titleKey: 'wr3-title',
      tagKey: 'wr3-tag',
      langs: {
        zh: null, // 中文版不展示
        en: { file: 'source/文章/Songkran_Final_2026.html' },
      },
    },
    {
      id: 'cold-start',
      titleKey: 'wr4-title',
      tagKey: 'wr4-tag',
      langs: {
        zh: { file: 'source/文章/01-cold-start-paradox_zh.html' },
        en: { file: 'source/文章/01-cold-start-paradox_en.html' },
      },
    },
  ],
};
