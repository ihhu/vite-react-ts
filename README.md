# react-standard-template `react`前端工程项目模版


[x] `ant-design` 组件库

[x] `react-i18n` 多语言支持

[x] `react-router-dom` 路由

[x] `recoil` 状态管理

[x] `eslint` 配置




## 如何升级到 React 18

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

## 使用`husky`创建git勾子

https://typicode.github.io/husky/#/
