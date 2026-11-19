/**
 * ============================================================
 *  站点配置 —— 全站内容都从这里读取
 * ============================================================
 *  修改本文件即可更新网站内容，无需改动页面组件。
 *  开发环境下保存后页面会自动热更新。
 *
 *  修改顺序建议：
 *  1. 先替换 profile / seo 里的占位信息（名字、邮箱、简介）；
 *  2. 再替换 projects / experience / skills / socials；
 *  3. 头像图片放到 public/ 目录后，把 profile.avatar 设为 '/avatar.png'。
 */

const site = {
  /* ---------------- 基本信息 ---------------- */
  profile: {
    name: '你的名字',
    role: '前端工程师',
    tagline: '用代码把想法变成有温度的产品。',
    intro: '关注 Web 体验与工程化，喜欢把复杂的问题拆解成清晰的组件与流程。',
    // bio 是段落数组：每一项渲染成一个段落
    bio: [
      '你好，我是「你的名字」，一名专注于 Web 前端开发的工程师。日常工作是设计并实现高质量的前端界面与交互，同时关注工程化、性能与可维护性。',
      '过去几年里，我参与过数据可视化平台、物联网设备管理系统和组件库的从 0 到 1 建设，喜欢在真实的业务问题里打磨技术方案。工作之外，我会写一些技术文章，也乐于把踩过的坑整理成可复用的经验。',
    ],
    location: '中国 · 杭州',
    email: 'hello@example.com',
    avatar: '', // 例：'/avatar.jpg'（图片放 public/ 下）或任意图片 URL；留空则显示首字头像
    resumeUrl: '', // 可选：简历链接，例如 '/resume.pdf'
    // 首页 Hero 下方的数据展示，可自由增删
    stats: [
      { value: '3+', label: '年开发经验' },
      { value: '20+', label: '交付项目' },
      { value: '8', label: '技术文章' },
    ],
  },

  /* ---------------- 顶部导航 ---------------- */
  // to 对应 src/router/index.js 里的路由地址
  nav: [
    { label: '首页', to: '/' },
    { label: '项目', to: '/projects' },
    { label: '关于', to: '/about' },
  ],

  /* ---------------- 社交链接 ---------------- */
  // icon 可选：github / linkedin / mail / link（默认）
  socials: [
    { label: 'GitHub', url: 'https://github.com/yourname', icon: 'github' },
    { label: '掘金', url: 'https://juejin.cn/', icon: 'link' },
    { label: '邮箱', url: 'mailto:hello@example.com', icon: 'mail' },
  ],

  /* ---------------- 技能 ---------------- */
  skills: [
    {
      group: '前端开发',
      items: ['Vue 3', 'TypeScript', 'Vite', 'Pinia', 'HTML / CSS', '响应式布局'],
    },
    {
      group: '工程化 & 工具',
      items: ['Git', 'ESLint', 'CI / CD', 'Docker', '单元测试'],
    },
    {
      group: '后端 & 数据',
      items: ['Node.js', 'Express', 'MySQL', 'Redis', 'RESTful API'],
    },
    {
      group: '协作 & 软技能',
      items: ['技术方案设计', '需求分析', '技术分享', '团队协作'],
    },
  ],

  /* ---------------- 项目 ---------------- */
  // slug 决定详情页地址：/projects/<slug>，请保持全站唯一
  // accent 可选：indigo / violet / cyan / emerald / amber / rose（封面渐变色调）
  // featured: true 的项目会出现在首页「精选项目」
  projects: [
    {
      slug: 'ai-dashboard',
      title: 'AI 数据洞察看板',
      year: '2025',
      accent: 'indigo',
      featured: true,
      summary: '面向运营团队的数据分析平台，把分散的业务指标汇成一张可下钻的可视化看板。',
      description: [
        '这个项目解决的是「数据分散、口径不一」的问题：把多个业务系统的数据通过统一接口聚合，再用可视化组件呈现关键指标，支持按时间、渠道、区域多维下钻。',
        '我负责整体前端架构设计，包括组件划分、状态管理与图表性能优化。通过虚拟滚动、按需渲染和请求缓存，把大屏首屏加载时间从 4.2s 降到 1.6s。',
      ],
      highlights: [
        '基于 Pinia 拆分领域 store，页面间共享筛选状态、减少重复请求',
        '封装 ECharts 图表组件，统一主题、提示框与响应式表现',
        '接入 WebSocket 实时推送，指标变化延迟低于 1 秒',
      ],
      tags: ['Vue 3', 'TypeScript', 'Pinia', 'ECharts'],
      links: { demo: '', repo: '' },
      cover: '', // 可选封面图，例如 '/projects/ai-dashboard.png'
    },
    {
      slug: 'iot-platform',
      title: '物联网设备管理平台',
      year: '2024',
      accent: 'cyan',
      featured: true,
      summary: '统一管理数万台 IoT 设备的在线状态、告警与固件升级，覆盖设备全生命周期。',
      description: [
        '平台面向设备管理员，提供设备分组、实时状态监控、告警规则配置与远程升级等能力。前端需要处理大量实时数据，并保证操作路径足够短。',
        '我主导了设备列表与详情页的重构：采用虚拟列表承载万级设备，配合 WebSocket 增量更新；同时抽象出可配置的「设备动作」机制，让新增操作无需改动页面代码。',
      ],
      highlights: [
        '虚拟列表 + 增量更新，万级设备列表滚动保持 60fps',
        '配置驱动的设备操作面板，新增动作只需补充配置',
        '告警规则可视化编辑器，支持条件组合与优先级排序',
      ],
      tags: ['Vue 3', 'Element Plus', 'WebSocket', 'Node.js'],
      links: { demo: '', repo: '' },
      cover: '',
    },
    {
      slug: 'design-system',
      title: '组件库与设计系统',
      year: '2023',
      accent: 'violet',
      featured: true,
      summary: '为公司多套产品统一视觉与交互的组件库，覆盖设计规范、组件实现与文档站点。',
      description: [
        '随着业务线增多，各产品页面风格与交互逐渐分裂。我们决定沉淀一套内部设计系统：以设计令牌（Design Token）为源头，统一颜色、间距、字号与动效规范。',
        '我负责组件实现与文档站点：使用 Vite 构建组件库，Storybook 展示用法，并通过 CSS 变量支持亮暗主题切换；同时编写了从设计稿到组件 API 的约定。',
      ],
      highlights: [
        '40+ 基础组件，支持按需引入与亮暗双主题',
        '基于 CSS 变量的设计令牌体系，主题切换零成本',
        'Storybook 文档 + 使用示例，降低团队接入成本',
      ],
      tags: ['Vue 3', 'Vite', 'Storybook', '设计系统'],
      links: { demo: '', repo: '' },
      cover: '',
    },
    {
      slug: 'mini-blog',
      title: '极简博客系统',
      year: '2023',
      accent: 'emerald',
      featured: false,
      summary: '基于 Markdown 的个人博客，支持文章分类、全文搜索与浅色 / 深色阅读模式。',
      description: [
        '一个用于记录技术笔记的小项目：文章以 Markdown 文件维护，构建时生成静态页面，部署在 GitHub Pages 上，零服务器成本。',
      ],
      highlights: ['Markdown 驱动的内容管理', '构建期生成静态页面，首屏极快', '支持全文搜索与阅读进度条'],
      tags: ['Vue 3', 'Markdown', 'VitePress'],
      links: { demo: '', repo: '' },
      cover: '',
    },
  ],

  /* ---------------- 工作经历 ---------------- */
  // 按时间倒序排列；首页只展示前 2 条
  experience: [
    {
      period: '2023.07 — 至今',
      title: '高级前端工程师',
      company: '某某科技有限公司',
      summary:
        '负责数据可视化产品线的前端架构与核心功能开发，推动组件库在 4 条业务线落地，主导性能优化专项，页面平均加载耗时下降 45%。',
      tags: ['Vue 3', 'TypeScript', '可视化', '架构设计'],
    },
    {
      period: '2021.07 — 2023.06',
      title: '前端开发工程师',
      company: '某某网络科技有限公司',
      summary:
        '参与物联网管理平台从 0 到 1 的建设，负责设备管理、告警中心等模块；沉淀通用表格、表单方案，团队开发效率提升约 30%。',
      tags: ['前端开发', '工程化', 'WebSocket'],
    },
    {
      period: '2020.03 — 2021.06',
      title: '前端实习生',
      company: '某某设计工作室',
      summary: '参与官网与营销活动页开发，负责响应式适配与交互动效实现，积累了与设计师协作的完整经验。',
      tags: ['响应式', '动效', '协作'],
    },
  ],

  /* ---------------- 教育背景 ---------------- */
  education: [
    {
      period: '2016 — 2020',
      school: '某某大学',
      major: '计算机科学与技术',
      degree: '本科',
      summary: '主修 Web 开发、数据结构与算法；担任校技术社团负责人，组织过多场前端分享。',
    },
  ],

  /* ---------------- SEO ---------------- */
  seo: {
    siteName: '你的名字 · 前端工程师',
    description: '前端工程师的个人网站：项目作品、技术栈、工作经历与联系方式。',
    keywords: ['前端工程师', 'Vue', '个人网站', '作品集'],
  },
}

export default site
