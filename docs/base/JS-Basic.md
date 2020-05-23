---
title: JavaScript基础
---
# JavaScript基础

[[toc]]

## JavaScript数据类型有哪些
6种基础数据类型：
- `undefined`
- `null`
- `string`
- `boolean`
- `number`
- `symbol`(ES6中新增)

1种引用类型：
- `object`
## JavaScript中的变量提升
JS中的变量提升(`Hoisting`)是指在JS代码中的函数定义(`function`)和变量声明(`var`)语句在执行时有被提前的效果。

例子：
```javascript
sayHi(); // Hi there!

function sayHi() {
    console.log('Hi there!')
}

name = 'John Doe'
console.log(name);   // John Doe
var name
```
上面例子中，变量`name`和函数`sayHi()`在他们定义之前就被使用了，但是没有报错，原因就是函数定义和变量声明被提前处理了(可以粗略认为被提前到了整段代码顶部);

变量提升有如下这些规则：
1. 函数优先：作用域中的函数定义比起变量声明，函数定义会被提升到变量声明之前
    - 函数定义会被优先提升，但函数变量/函数表达式只会被当做普通变量去提升，例：
    - 函数定义：`function a(){}`
    - 函数变量/函数表达式：`var a = function (){}`
2. `var`声明变量会提前，但赋值语句不会，如果声明前使用了尚未定义的变量，它的值将会是`undefined`
3. 每个**作用域**都会进行提升操作
    - 提升在每个作用域中都会进行，在ES5中，可以被提升到的作用域是**函数级作用域**和**全局作用域**
    - **函数的定义**有例外情况：如果块级作用域(`if语句块`或`try...catch语句块`)中有函数定义，**函数定义**会提升到它所在的**块级作用域**的顶部。而`变量声明`的提升中则没有块级作用域的概念。

注：ES6中的`let`、`const`和`class`不能在声明前被使用，否则会报`ReferenceError`错误。

例题：写出下面代码执行结果
```javascript
var a = 0;
if(true){
    a = 1;
    function a(){}
    a = 21;
    console.log("里面",a);
}
console.log("外部",a);
```
答案：
- `里面 21` 
- `外部 1`

### 为什么会变量提升
JS虽然是动态/解释型语言，但JS代码执行之前会有非常短暂的编译阶段，此时会对JS代码进行词法分析，在词法分析时遇到声明(包括变量定义和函数声明)，这些声明被添加到名为词法环境(`Lexical Environment`)的JavaScript数据结构内并保存在内存中(即将变量和其所在的词法作用域关联起来)，所以这些变量和函数能在它们真正被声明之前使用。

## 什么是词法作用域
词法作用域就是在你写代码时将变量和块作用域写在哪里来决定，也就是词法作用域是静态的作用域，在你书写代码时就确定了。

注意，JS中不是所有的地方都是遵循词法作用域，在使用`eval`和`with`时有其单独的作用域。

## 简单说一下对闭包的理解
在JS中，函数可以记住并访问所在的词法作用域，即使函数在当前词法作用域之外执行，这就产生了闭包。

例子：
```javascript
function outerFunc() {
  let name = 'Tom';

  return function innerFunc() {
    console.log(name);
  }
}

const funcReturned = outerFunc(); // outerFunc执行后返回innerFunc
funcReturned(); // 输出 Tom
```
本例中`innerFunc`定义在`outerFunc`中，所以`innerFunc`即使在`outerFunc`之外被执行时也可以访问`outerFunc`作用域内的变量`name`。

::: details 一道经典的闭包面试题
1. 写出下面代码的输入结果
    ```javascript
    for (var i = 1; i <= 5; i++) {
      setTimeout(function timer() {
        console.log(i);
      }, i * 1000)
    }
    ```
    答案：输出五次数值6
    解析：这里的变量`i`定义成全局变量，在循环结束后，`i`的值是6，又因为setTimeout是内的函数是异步执行的，最后输出了五次i都是数值6

2. 如果想要依次输出数值1到5，上述代码该如何修改?
   - 通过闭包实现：
       ```javascript
        for (var i = 1; i <= 5; i++) {
          ~(function(j) { // 立即执行函数
            setTimeout(function timer() { // 这里形成了闭包
              console.log(j)
            }, j * 1000)
          })(i)
        }
       ```
   - 通过setTimeout第三个参数实现，setTimeout的第三个参数会作为其异步任务函数的参数而被传入。
        ```javascript
        for (var i = 1; i <= 5; i++) {
          setTimeout(
            function timer(j) {
              console.log(j)
            },
            i * 1000, // setTimeout的第二个参数
            i  // setTimeout的第三个参数
          )
        }
        ```
   - 使用ES6中的`let`，在`for`循环中使用`let`定义循环变量时，每次都会产生一个独立块级作用域。
        ```javascript
        for (let i = 1; i <= 5; i++) {
          setTimeout(function timer() {
            console.log(i); // 每次循环都会产生一个块级作用域，其中包含了当前循环变量i
          }, i * 1000)
        }
        ```
:::

## 说说JavaScript中的执行上下文

## 描述一下JavaScript中的作用域链
## 描述一下JavaScript中的原型和原型链
## ES5中实现继承
## 判断一个对象的类型有哪些方法
## == 和 === 有什么区别
## 说说JS中的隐式转换
## JavaScript中的严格模式是什么
## JavaScript中为什么0.1 + 0.2 !== 0.3
## 说说JavaScript中的事件循环(`Event Loop`)
## JavaScript中的`this`指向有哪些情况
## `apply`、`call`、`bind` 之间有什么区别
## 手写实现`apply`、`call`、`bind`
## 什么是节流(`throttle`)和防抖(`debounce`)，手动实现节流和防抖
### 防抖 debounce
在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
```
function debounce(fun, delay) {
    return function (args) {
        let that = this
        let _args = args
        clearTimeout(fun.id)
        fun.id = setTimeout(function () {
            fun.call(that, _args)
        }, delay)
    }
}
```
### 节流 throttle

规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
```
  function throttle(fun, delay) {
        let last, deferTimer
        return function (args) {
            let that = this
            let _args = arguments
            let now = +new Date()
            if (last && now < last + delay) {
                clearTimeout(deferTimer)
                deferTimer = setTimeout(function () {
                    last = now
                    fun.apply(that, _args)
                }, delay)
            }else {
                last = now
                fun.apply(that,_args)
            }
        }
    }
```
### 节流和防抖应用场景
#### debounce
search搜索联想，用户在不断输入值时，用防抖来节约请求资源。
window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次
#### throttle
鼠标不断点击触发，mousedown(单位时间内只触发一次)
监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断

## 实现浅拷贝和深拷贝
## 说说前端储存数据 Cookie、LocalStorage、SessionStorage、IndexDB
## escape,encodeURI,encodeURIComponent 有什么区别？
## JavaScript的垃圾回收机制是怎样的
