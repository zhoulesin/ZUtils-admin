# ZUtils Admin

插件市场管理后台，供管理员审核和管理插件。

## 功能

- **仪表盘** — 插件/用户统计
- **插件管理** — 列表查看、删除、GitHub 文件状态
- **插件审核** — 待审核列表，通过/驳回操作
- **用户管理** — 创建用户、启用/禁用，角色分配

## 技术栈

React 19 + TypeScript + Vite 6 + Tailwind CSS 3 + Zustand + Axios

## 启动

```bash
cd ZUtils-admin
npm install
npm run dev        # 启动在 http://localhost:3001
```

## 权限

- `admin / admin123` — 管理员
- `zutils-team / admin123` — 开发者（无法访问管理后台）
