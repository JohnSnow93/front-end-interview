# React面试题

[[toc]]

## React和Vue有什么不同
不同点：
- React是一个专注视图层(View)的库，而Vue是MVVM框架
- React使用JSX语法，Vue一般使用模板(Vue中也可以用JSX，不过不常见)
- React使用单向数据流，Vue中常用双向数据绑定

相似点：
- 都采用了虚拟DOM(`Virtual DOM`)
- 都有各自的组件化方案

## 什么是Virtual DOM
虚拟DOM(`Virtual DOM`)是指用JavaScript 对象结构表示 DOM 树的结构。由于真实DOM操作比较消耗性能，React引入了虚拟DOM，在数据变化时，虚拟DOM首先发生变化，React会对比新旧的虚拟DOM树的差异，然后将DOM操作批量应用到真实DOM中。

## React中的Component和Element有什么区别

## 说说class组件和function组件，以及他们的区别
## React中的key的作用是什么
## Controlled Component(受控组件) 与 Uncontrolled Component(非受控组件)之间的区别是什么
## React的生命周期
## React 16.X的生命周期，以及为何要替换掉以前的？
## React组件间的通信机制有哪些
- 父子组件通信
- 兄弟组件通信
- 跨多层级组件通信
- 任意组件
## setState原理，什么时候是同步的？
## 什么是高阶组件
## React中的事件机制
## React 16.X 的Fiber原理
## React Hooks相对高阶组件和Class组件有什么优势/缺点？
## React跨平台的实现原理。
## 说一说Redux和Flux，以及他们之间的不同
## React性能优化的方法有哪些

