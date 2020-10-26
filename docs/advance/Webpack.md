# Webpack相关面试题
webpack 是一个现代 JavaScript 应用程序的静态模块打包器(`module bundler`)
[[toc]]

## 简单说下Webpack的打包过程
Webpack 的运行流程是一个串行的过程,从启动到结束会依次执行以下流程 :

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数,得出最终的参数。
2. 开始编译：用上一步得到的参数初始化 Compiler 对象,加载所有配置的插件,执行对象的 run 方法开始执行编译。
3. 确定入口：根据配置中的 entry 找出所有的入口文件。
4. 编译模块：从入口文件出发,调用所有配置的 Loader 对模块进行翻译,再找出该模块依赖的模块,再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
5. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后,得到了每个模块被翻译后的最终内容以及它们之间的依赖关系。
6. 输出资源：根据入口和模块之间的依赖关系,组装成一个个包含多个模块的 Chunk,再把每个 Chunk 转换成一个单独的文件加入到输出列表,这步是可以修改输出内容的最后机会。
7. 输出完成：在确定好输出内容后,根据配置确定输出的路径和文件名,把文件内容写入到文件系统。

在以上过程中,Webpack 会在特定的时间点广播出特定的事件,插件在监听到感兴趣的事件后会执行特定的逻辑,并且插件(`PlugIn`)可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

## 常用的Webpack配置有哪些
webpack的配置文件一般是`webpack.config.js`，一些常用的配置如下
- `mode` 开发模式(`development`)、生产模式(`production`)
- `entry` 入口
- `output` 输出
- `target` 构建目标 `web`(默认) 或 `node`
- `loader`
- `plugins` 插件
## Webpack中Loader和PlugIn有什么区别
- loader可以使webpack拥有加载和解析非js文件的能力
- plugin 可以扩展webpack的功能，使得webpack更加灵活。可以在构建的过程中通过webpack的api改变输出的结果

例子：
- `less-loader` 用于处理编译`.less`文件，将其转为css文件代码
- `json-loader` 加载 JSON 文件
- `mini-css-extract-plugin` 将CSS抽取成一个独立的文件(不打包到HTML里)
- `HtmlWebpackPlugin` 此插件为你生成一个HTML文件

### Loader
webpack中，loader是一个导出为函数的JavaScript模块。loader函数将接受上一个loader(如果有的话)产生的结果或者资源文件：
```javascript
module.exports = function(content, map, meta) {
  return someSyncOperation(content);
};
```
- 第二个和第三个参数是可选的

更多关于`Loader`的信息请参考：[loader API](https://www.webpackjs.com/api/loaders/)

### PlugIn
webpack中，plugin实际是一个类，通过在plugins配置中实例化进行调用：
```javascript
const ExamplePlugin = require('example-plugin');

module.exports = {
  plugins: [new ExamplePlugin({ options })]
};
```
一个最基础的 Plugin 的代码是这样的：
```javascript
class BasicPlugin{
  // 在构造函数中获取用户给该插件传入的配置
  constructor(options){
  }
  
  // Webpack 会调用 BasicPlugin 实例的 apply 方法给插件实例传入 compiler 对象
  apply(compiler){
    compiler.plugin('compilation',function(compilation) {
    })
  }
}

// 导出 Plugin
module.exports = BasicPlugin;
```
更多关于`Plugin`的信息请参考：[Webpack原理-编写Plugin](https://segmentfault.com/a/1190000012840742) 、[Plugin API](https://www.webpackjs.com/api/plugins/)
