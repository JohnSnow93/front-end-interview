# Vue面试题(work in progress)

## Vue的响应式原理
### Vue2.x
Object.defineProperty
### Vue3
Proxy
## Vue的生命周期
- beforeCreate
- created: 实例创建后，可访问data、watcher、events、methods
- beforeMount：DOM挂载前，将HTML解析生成AST节点，再根据AST节点动态生成渲染函数。相关render函数首次被调用
- mounted：DOM挂载后，此时可以操作DOM、访问ref
- beforeUpdate：vm.data更新之后，虚拟dom重新渲染之前被调用。在这个钩子可以修改vm.data，并不会触发附加的冲渲染过程
- updated：虚拟dom重新渲染后调用，不要在此生命周期里修改vm.data，会触发死循环
- beforeDestroy：实例销毁前
- destroyed：销毁后

### 一般在哪个生命周期里请求数据
在`created`生命周期时就可以进行数据请求了，因为此时实例的`data`已经完成初始化了。
如果需要在挂载后进行请求，则应该将请求放入`mounted`生命周期。

## v-model的本质是什么
## .sync有用过吗
## vuex有哪些属性
- state
- getters(类似计算属性)
- mutations 改变state, mutation 必须是同步函数
- actions: Action提交的是mutation，而不是直接变更状态。Action 可以包含任意异步操作。
- modules：用于拆分store

## vue的diff运算
## v-show 和 v-if的区别
- `v-show`：当隐藏结构时是在该结构的style中加上display:none，结构依然保留。
- `v-if`：当隐藏结构时该结构会直接从整个dom树中移除；

可见，在需要对元素进行频繁显示隐藏切换时，使用`v-show`更好
## vue中的路由有几种，各有什么区别
- hash路由：使用 URL hash 值来作路由，兼容性好
- history路由：依赖 HTML5 History API 和服务器配置
- abstract路由：路由信息保存在内存中，适合非浏览器环境(如node)
## 为什么组件的data要设置成函数
在Vue中组件是可以复用的，组件的data必须是函数，这样每次创建组件时得到的就是一份新的`data`对象，数据会得到隔离。
## computed和watch的区别
- computed是计算属性，会缓求值结果，只有依赖变化时才会再次求值。
- watch是监听，目的是在某些值变化时去执行相应的动作。
## Vue中组件间的通信方式有哪些
- 父子组件通信：父组件通过Props向子组件传递数据，子组件可以通过`emit`发送事件向父组件传递数据
