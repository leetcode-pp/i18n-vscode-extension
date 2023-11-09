# 介绍

leetcode-cheatsheet 的 i18n 悬浮提示插件，该插件仅用于配合 [Leetcode Cheat](https://github.com/leetcode-pp/leetcode-cheat)项目开发使用

## 使用说明

1. 安装 `.vsix` 扩展包，如下：

![](https://raw.githubusercontent.com/leetcode-pp/i18n-vscode-extension/main/assets/install.jpg)


2. 鼠标悬浮在 `t` 函数上就可以看到对应的中英文信息了

![](https://raw.githubusercontent.com/leetcode-pp/i18n-vscode-extension/main/assets/demo.jpg)

## 插件规则

本插件会读取 `src/locales` 文件夹下的 `zh.js` 和 `en.js` 文件，插件内部有一个  `t` 函数( 和 `src/locales/index.js` 中的 `t` 逻辑相同 )，用以获得对应语言包的文本信息

### 注意
1. `zh.js` 和 `en.js` 文件必须使用 `module.exports`导出，暂时不知道在插件中如何处理 ESModule

2. 目前是写死的读取`zh.js` 和 `en.js` 文件，如果后续增加语言，则需要同时修改本插件

3. `t` 函数逻辑修改可能导致插件失效


> 某些固定配置是可以通过vscode初始化插件时读取设定值的，但目前功能较少，以实现为主（简单粗暴）

> 后续或许可以通过插件实现更多功能，比如为在 vscode 中刷题提供一些能力支持
