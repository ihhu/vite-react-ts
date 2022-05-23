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

## 指定Git换行符转换方案
Git会自动对换行符进行转换。转换的方案有3种：
- 在提交时将CRLF转换为LF，在拉取（检出checkout）时将UNIX换行符（LF）替换成CRLF。（Windows系统推荐使用，我们在windows上安装git的时候，如果一路next，默认是使用这个方案）
- 在提交时将CRLF转换为LF，在拉取（检出checkout）时不进行转换。（Linux/Unix和Mac OS和Mac OS X推荐使用，在Unix或者类Unix操作系统上安装git，默认使用这种方案）
- 不进行转换（这种方案对于跨平台项目不推荐使用）。
```
// 提交时转换为LF，检出时转换为CRLF
git config --global core.autocrlf true   

// 提交时转换为LF，检出时不转换
git config --global core.autocrlf input   

// 提交检出均不转换
git config --global core.autocrlf false
```
在项目中，换行符规范一般交给eslint和编辑器来处理，所以运行第三条命令关闭Git换行符转换。


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

