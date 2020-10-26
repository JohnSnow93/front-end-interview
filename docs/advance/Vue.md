# Vue面试题(work in progress)

## Vue的响应式原理
### Vue2.x
### Vue3
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
## vuex的action和mutation的区别
## vue的diff运算
## v-show 和 v-if的区别
## vue中的路由有几种，各有什么区别
## 为什么data要设置成函数
## computed和watch的区别
