# 简介

LNSY动漫社出品

动漫风格的静态网站

本网站前端使用React和CSS开发（同时使用npm作为包管理器）

**项目概览**
- **根目录**: 项目工作区在 `react-amine-web`，实际前端工程在 Amine-Web-react 子目录（该目录包含 `index.html`、`package.json`、`src` 等）。
- **入口 HTML**: `index.html` — 挂载点为 `div#root`，并通过 `<script type="module" src="/src/main.jsx">` 启动前端。
- **入口 JS**: `src/main.jsx` — 负责 React 根渲染、全局样式等。
- **主组件**: `src/App.jsx` — 作为React根组件，导入主页。
- **页面/模块**: `src/community/` — 包含社区相关页面与样式（例如 `index.jsx`、`index.css`）。其他功能应按目录分组放在 `src/` 下。
- **静态资源**: `public/` — 放图标等无需打包的静态文件。
- **图片资源**: `src/assets` — 放加载较慢或不预加载的资源文件。
- **构建/脚本**: `package.json`（在 Amine-Web-react） — 含 `dev`、`build`、`start` 等脚本，使用 Vite（看 `vite.config.js`）来运行与打包。

下一步你可以运行开发服务器（如果当前没启动）：
```powershell
cd ...\react-amine-web\Amine-Web-react
npm install
npm run dev
```

**如何添加新功能（常用流程）**

- 新页面：在 `src/页面名称/` 创建页面组件（例如 `src/About/About.jsx`以及对应的 `.js/.css`文件），然后在 `src/community/index.jsx` 中添加导航逻辑。
- 样式约定：暂时直接从任意一个子页面中复制一个 `.css` 文件即可。
- 资源与接口：把 API 调用封装到 `src/api/`，每个模块一个文件，统一处理 token/错误/请求拦截器。

**开发与提交最佳实践**
- 先在新的 git 分支开发新功能（`feature/xxx`）。
- 本地运行 `npm run dev` 验证界面与交互。
- 添加或更新测试（如果项目有测试套件）。
- 提交并推送 PR，简短描述变更点。