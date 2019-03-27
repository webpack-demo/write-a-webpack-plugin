# write a plugin

## what

写一个简单的 plugin，[官网](https://webpack.js.org/contribute/writing-a-plugin/) | [中文](https://webpack.docschina.org/contribute/writing-a-plugin/)

其实 demo 就是 [官网例子](https://webpack.js.org/contribute/writing-a-plugin/#example)

用 `npm run dev` 命令启动后，可以在 <http://localhost:7788/webpack-dev-server> 看到多了个 filelist.md 的资源文件；当然 `npm run build` 打包后也会生成 filelist.md 文件

webpack 暴露给了开发者很多事件钩子（[Compiler Hooks](https://webpack.js.org/api/compiler-hooks) | [Compilation Hooks](https://webpack.js.org/api/compilation-hooks)）

比如 demo 就是在 compiler [emit](https://webpack.js.org/api/compiler-hooks#emit) 的时候进行处理（emit：Executed right before emitting assets to output dir）

## how

一个 webpack 的插件包含以下几个条件：

1. 一个 js 命名函数
2. 在原型链上存在一个 apply 方法
3. 为该插件指定一个 webpack 的事件钩子函数
4. 使用 webpack 内部的实例对象（compiler 或者 compilation）具有的属性或者方法
5. 如果是异步事件，当功能完成后，需要执行 webpack 的回调函数

compiler 对象：代表了 webpack 完整的可配置环境，该对象在 webpack 启动的时候会被创建，被传入一些可控的配置，如 options、loaders、plugins。当插件被实例化的时候，会收到一个 compiler 对象，通过这个对象可以访问 webpack 内部环境，这个对象会在 webpack 被启动的时候进行实例化，全局且唯一的。

complication 对象：这个对象会作为 plugin 内置事件回调函数的参数。包含了当前的模块资源，编译生成的资源，变化的文件等信息。如果我们运行在开发模式，每当检测到一个文件的变化，就会生成一个新的 compilation 对象。该对象表示本地打包的模块、编译的资源、文件改变和监听的依赖文件的状态

所以，compiler 代表了 webpack 从启动到关闭的整个生命周期，而 compilation 仅仅代表了一次新的编译。
