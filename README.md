# 个人网站

一个可直接使用的个人主页，基于 **Vue 3 + Vite + Pinia + Vue Router** 构建。全站内容由一份配置文件驱动，改内容不需要碰组件代码。

## 特性

- **内容丰富**：首页（Hero / 技能 / 精选项目 / 经历 / 联系）、项目列表（按技术标签筛选）、项目详情页、关于页、404 页
- **亮暗双主题**：默认跟随系统，可手动切换并记住选择；首屏无闪烁
- **配置驱动**：姓名、简介、技能、项目、经历、社交链接、SEO 全部集中在 `src/config/site.js`
- **状态管理**：Pinia 管理主题与界面状态（例如项目筛选在返回后不丢失）
- **细节打磨**：滚动入场动画、页面切换过渡、响应式布局、无障碍标签、`prefers-reduced-motion` 适配
- **零外部依赖**：不加载外部字体 / 图片，图标为内联 SVG，开箱即用

## 快速开始

需要 Node.js 18 及以上。

```bash
npm install
npm run dev       # 启动开发服务器（默认 http://localhost:5173）
npm run build     # 构建到 dist/
npm run preview   # 本地预览构建产物
```

## 目录结构

```
├── index.html                  # HTML 入口（含首屏主题预设脚本）
├── vite.config.js              # Vite 配置（别名 @、部署 base）
├── public/
│   └── favicon.svg             # 站点图标（可替换）
└── src/
    ├── main.js                 # 应用入口：Pinia / Router / 指令注册
    ├── App.vue                 # 应用外壳：头部 + RouterView + 页脚
    ├── config/
    │   └── site.js             # ★ 站点配置：内容都改这里
    ├── router/index.js         # 路由表与滚动行为
    ├── stores/
    │   ├── theme.js            # 亮暗主题状态（Pinia）
    │   └── site.js             # 移动端菜单、项目筛选等界面状态
    ├── composables/
    │   └── usePageMeta.js      # 页面标题 / 描述（SEO）
    ├── directives/
    │   └── reveal.js           # v-reveal 滚动入场动画指令
    ├── styles/
    │   └── main.css            # 设计令牌（CSS 变量）+ 通用样式
    ├── components/
    │   ├── AppHeader.vue       # 顶部导航（含移动端抽屉菜单）
    │   ├── AppFooter.vue       # 页脚
    │   ├── SiteIcon.vue        # 内联 SVG 图标集
    │   ├── ThemeToggle.vue     # 主题切换按钮
    │   ├── SectionHeading.vue  # 区块标题
    │   ├── ProjectCard.vue     # 项目卡片
    │   └── TimelineList.vue    # 经历时间线
    └── views/
        ├── HomeView.vue        # 首页
        ├── ProjectsView.vue    # 项目列表（标签筛选）
        ├── ProjectDetailView.vue  # 项目详情
        ├── AboutView.vue       # 关于
        └── NotFoundView.vue    # 404
```

## 如何修改内容

**所有内容都在 [`src/config/site.js`](src/config/site.js)，改完保存即可。**

| 字段 | 对应位置 | 说明 |
| --- | --- | --- |
| `profile` | 首页 Hero、关于页、页头页脚 | 姓名、职位、简介、邮箱、所在地、头像、简历链接、数据统计 |
| `nav` | 顶部导航、页脚导航、移动端菜单 | `{ label, to }`，`to` 对应路由地址 |
| `socials` | Hero、关于页、页脚 | 社交链接，`icon` 可选 `github` / `linkedin` / `mail` / `link` |
| `skills` | 首页、关于页 | 按分组的技术栈标签 |
| `projects` | 首页精选、项目列表、项目详情 | 项目列表，见下方说明 |
| `experience` | 首页（前 2 条）、关于页 | 工作经历，按时间倒序 |
| `education` | 关于页 | 教育背景 |
| `seo` | 全站 | 站点名称、默认描述、关键词 |

### 换头像

把图片放进 `public/` 目录（如 `public/avatar.jpg`），然后设置：

```js
profile: {
  avatar: '/avatar.jpg',
}
```

留空则自动显示姓名首字的渐变头像。

### 新增一个项目

在 `projects` 数组里追加一项：

```js
{
  slug: 'my-project',        // 必填且唯一，决定访问地址 /projects/my-project
  title: '项目名称',
  year: '2026',
  accent: 'cyan',            // 封面渐变：indigo / violet / cyan / emerald / amber / rose
  featured: true,            // 是否出现在首页「精选项目」
  summary: '一句话介绍。',
  description: ['段落一', '段落二'],
  highlights: ['关键成果 1', '关键成果 2'],
  tags: ['Vue 3', 'Vite'],
  links: { demo: 'https://...', repo: 'https://...' },  // 留空则不显示按钮
  cover: '',                 // 可选封面图，如 '/projects/my-project.png'
}
```

`slug` 重复会导致详情页错乱，请保持唯一。项目页的标签筛选会自动根据 `tags` 生成。

### 修改 SEO / 站点标题

在 `seo` 中修改 `siteName`（浏览器标题后缀）、`description`、`keywords`。
另外记得替换 `index.html` 中的 `<title>` 与 `<meta name="description">`（作为首屏静态兜底）。

## 主题与配色

- 亮/暗主题的**所有颜色**都是 `src/styles/main.css` 顶部的 CSS 变量：
  - `:root` —— 亮色主题
  - `:root[data-theme='dark']` —— 暗色主题
- 想换强调色，改 `--accent` / `--accent-2` / `--accent-3` 三个变量即可，渐变、按钮、高亮会一起变化。
- 主题逻辑在 `src/stores/theme.js`；用户选择存在 `localStorage` 的 `theme-mode` 键中，删除该键即恢复「跟随系统」。

## 部署

```bash
npm run build
```

将 `dist/` 目录部署到任意静态托管（Vercel、Netlify、Cloudflare Pages、对象存储等）。

**GitHub Pages 注意**：如果部署在 `https://<user>.github.io/<repo>/` 这样的子路径下，需要把 `vite.config.js` 里的 `base` 改为 `'/<repo>/'`，并使用 hash 路由或在托管侧配置 SPA 回退（404.html 重定向到 index.html）。Vercel / Netlify 的 SPA 部署通常无需额外配置。

## 后续可扩展方向

- 博客：新增 `src/views/BlogView.vue` + Markdown 渲染（如 `markdown-it`），或在 `config` 中加 `posts`
- 动画：引入 `@vueuse/motion` 或给 Hero 增加打字机效果
- 数据接口：把 `site.js` 换成接口请求，配合 Pinia 缓存
- 多语言：接入 `vue-i18n`，在 `config` 里维护多语言文案
- 表单联系：接入 Formspree / EmailJS 等服务，替换 `mailto:` 链接
