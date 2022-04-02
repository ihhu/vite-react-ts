# react-standard-template `react`前端工程项目模版


[x] `ant-design` 组件库

[x] `react-i18n` 多语言支持

[x] `react-router-dom` 路由

[x] `recoil` 状态管理

[x] `eslint` 配置




## 如何升级到 React 18
https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html

```
// Before
import { render } from 'react-dom';
const container = document.getElementById('app');
render(<App tab="home" />, container);

// After
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App tab="home" />);
```

## 使用`husky`添加git钩子

https://typicode.github.io/husky/#/

1. 安装`husky`
```
npm install husky --save-dev
```

2. 启用 Git 挂钩

```
npx husky install
```
要在安装后自动启用 Git 挂钩，请编辑package.json
```
// package.json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

3. 创建一个钩子

要将命令添加到挂钩或创建新命令，请使用 `husky add <file> [cmd]`
```
npx husky add .husky/pre-commit "npx lint-staged"
git add .husky/pre-commit
``` 