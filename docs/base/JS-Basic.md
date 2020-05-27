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

::: tip
ES6中的`let`、`const`和`class`不能在声明前被使用，否则会报`ReferenceError`错误。
:::

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
执行上下文(`Execution Context` 简称 `EC`) 是指JS引擎在运行代码前的做准备工作、为代码执行准备运行环境，例如变量对象的定义、作用域链的扩展、提供调用者的对象引用等信息。

### ES3中的执行上下文
ES3中有三种执行上下文：
- 全局执行上下文：全局唯一的基础执行环境
- 函数执行上下文: 每当一个函数被调用时，都会创建一个新的函数执行上下文
- eval 函数执行上下文: 执行在 eval 函数内部的代码也会有它属于自己的执行上下文

ES3中执行上下文的内容：
- 变量对象 `variable object`：包含当前函数内的arguments、函数声明、变量声明
- 活动对象 `activation object`：函数执行阶段，变量对象被激活为活动对象，此时可以访问到其中的各种属性
- 作用域链 `scope chain`：详见[描述一下JavaScript中的作用域链](#描述一下JavaScript中的作用域链)
- `this` 指向，详见[JavaScript中的`this`指向有哪些情况](#JavaScript中的this指向有哪些情况)

### ES5中的执行上下文
ES5中执行上下文去除了`变量对象`和`活动对象`，取而代之的是词法环境组件（ `LexicalEnvironment component`） 和 变量环境组件（ `VariableEnvironment component`）

- 词法环境组件：一种持有`标识符—变量映射`的结构。这里的`标识符`指的是变量/函数的名字，而`变量`是对实际对象（包含函数类型对象）或原始数据的引用。
- 变量环境组件: 也是一种`词法环境组件`，在ES6中词法环境用于处理函数声明和变量（`let` 和 `const`）绑定，变量环境组件用于处理`var`变量绑定

### 执行上下文栈
当 JS 引擎开始解析脚本代码时，会首先创建一个全局执行上下文，压入栈底（这个全局执行上下文从创建一直到程序销毁，都会存在于栈的底部）。

每当引擎发现一处函数调用，就会创建一个新的函数执行上下文压入栈内，并将控制权交给该上下文，待函数执行完成后，即将该执行上下文从栈内弹出销毁，将控制权重新给到栈内上一个执行上下文。

### 描述一下JavaScript中的作用域链
`作用域`规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级（词法层面上的父级）执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做`作用域链`。

函数的作用域在函数创建时就已经确定了。

详见[面试官：说说执行上下文吧](https://juejin.im/post/5ebced85e51d454dc1467664)

## JavaScript中的`this`指向有哪些情况
1. 函数作为构造函数用，那么其中的this就代表它**即将**`new`出来的对象
2. 如果函数作为对象的一个属性时，并且作为对象的一个属性被调用时，函数中的this指向该对象。即便是在整个原型链中，this代表的也都是当前对象。
3. 当一个函数被`call/apply/bind`调用时，this的值是`call/apply/bind`传入的第一个参数
4. 在全局环境下/普通函数在调用时，this永远是`window`
5. 绑定到DOM上的函数，若DOM传入this，则函数中的this表示该DOM
6. ES6箭头函数中的this，就是定义该箭头函数时所在的包裹环境中的this

## 描述一下JavaScript中的原型和原型链
### `prototype`
在JS中，每个函数都有一个`prototype`属性，被常作为原型，这是一个显式原型属性，它的值也是一个对象，所以又称为原型对象。
```javascript
function Animal(){};
Animal.prototype; // 原型
Animal.prototype.constructor === fun; // true
```
`prototype`原型对象上，有以下几个重要的属性
- `constructor` 构造函数，指向拥有该原型对象的函数

### `__proto__`
每个对象，都有一个隐藏属性`__proto__`，指向创建该对象的构造函数的原型：
```javascript
const dog = new Animal(); // Animal是dog对象的构造函数
dog.__proto__ === Animal.prototype; // true, Animal.prototype是dog的原型
```

注意: `prototype`也是一个对象，所以它也有`__proto__`隐藏属性。

### 属性查找机制和原型链
在访问一个对象的属性时，首先会查找对象本身是否有该属性，如果没有，则会沿着对象的`__proto__`属性，一层一层向上查找，直到访问到`Object.prototype`为止，因为`Object.prototype.__proto__`是`null`，无法再继续访问。

至此可以给出原型链的概念：原型链是由对象`__proto__`属性连成的链条，`Object.prototype.__proto__`是原型链的顶端。

如下图：
![原型链](./img/prototype.png)

由于`__proto__`是隐藏属性，并不规范，JS中给出了`Reflect.getPrototypeOf()` 与 `Object.getPrototypeOf()` 用于返回一个对象的原型

## ES5中实现继承
在ES6的class出现后，ES5的继承使用的没有以前那么多了，这部分建议仅供了解，下面列举一些常见的ES5实现继承的方式：
1. 类式继承，子类的`prototype`为父类的一个实例。
缺点：如果父类的共有属性是引用类型，那父类的共有属性就会在**子类的所有实例**中共用，容易造成修改的混乱，且在在继承时，父类的共有属性是固定的，无法通过传参修改。
```javascript
// 声明父类
function Father() {
  this.age = 30;
}
// 添加父类的共有方法
Father.prototype.getAge = function() {
  return this.age; // 父类的共有属性
}
// 声明子类
function Son() {
  this.name = 'tom';
}
// 继承父类
Son.prototype = new Father();
```

2. 构造函数继承，在子类中调用父类的构造函数。
```javascript
// 声明父类
function Father(id) {
  this.id = id;
  this.books = ['html', 'css', 'js'];
}
// 添加父类的方法
Father.prototype.getBooks = function() {
  return this.books;
}
// 声明子类
function Son(id) {
  Father.call(this, id); // 继承父类
}
```
有点是可以对父类构造函数进行传参，缺点是父类`prototype`上的方法没有被子类继承到。

3. 组合继承，结合了上面两种继承方法的优点
```javascript
// 声明父类
function Father(id) {
  this.id = id;
  this.books = ['html', 'css', 'js'];
}
// 添加父类的方法
Father.prototype.getBooks = function() {
  return this.books;
}

// 声明子类
function Son(id) {
  Father.call(this, id); // 继承父类的共有属性
}
Son.prototype = new Father(); // 继承父类的方法
```

4. 原型式继承，利用JS自带的原型链实现继承，缺点是父对象的共有属性如果是引用类型的依然会被所有子类的实例共享。
```javascript
function inheritObj(obj) {
  // 声明一个过渡的函数对象
  function F() {};
  // 过度对象的原型为父类对象
  F.prototype = obj;
  // 返回过渡对象的一个实例，该实例继承了父对象
  return new F();
}
// 使用方法
// 父对象
var book = {
  name: 'css book',
  tags: ['css', 'style']
}
var newBook = inheritObj(book);

```
注意，原型式继承的父类是一个普通的对象

5. 寄生式继承，对原型式继承的一种封装
```javascript
var book = {
  name: 'css book',
  tags: ['css', 'style']
}
function createBook(bookObj) {
  // 先通过原型继承创建新对象
  var tempObj = inheritObj(bookObj);
  // 添加方法
  tempObj.getName = function() {
    return this.name;
  }
  // 返回创建的新对象
  return tempObj;
}
```
缺点：使用该继承方式，在为对象添加函数的时候，没有办法做到函数的复用。

6. 寄生组合式继承，结合了寄生式与组合式的优点
```javascript
// 先定义一个工具函数
function inheritPrototype(subClass, superClass){
  // 将父类的原型复制一份
  var prototype = inheritObj(superClass.prototype);
  // 修正因重写subClass原型导致constructor不正确
  prototype.constructor = subClass;
  // 给子类设置新的原型
  subClass.prototype = prototype;
}

// 使用方法：
// 声明父类
function Father(id) {
  this.id = id;
  this.books = ['html', 'css', 'js'];
}
// 添加父类的方法
Father.prototype.getBooks = function() {
  return this.books;
}

// 声明子类
function Son(id) {
  Father.call(this, id); // 继承父类的共有属性
}
// 寄生式继承父类的原型
inheritPrototype(Son, Father)
```

## 判断一个对象的类型有哪些方法
1. `typeof`操作符，常用来判断基本数据类型，例子：
```javascript
typeof 0;  //number;
typeof true;  //boolean;
typeof undefined;  //undefined;
typeof "hello world"   //string;
typeof function(){};   //function;

typeof null; //object
typeof {};  //object;
typeof []; //object
```
不足：`typeof`判断对象、数组、null都为`object`

2. `instanceof`操作符，主要是用于判断引用类型是否是某个父类型的实例
```javascript
const a = {};
a instanceof Object;  //true
a instanceof Array;     //false
```
原理：`instanceof`会在左侧值的原型链上查右侧值的`prototype`，如果找到就返回true

3. `constructor`属性：实例对象的`__proto__.constructor` 会指向该实例的构造函数
4. `Object.prototype.toString.call()`
```javascript
Object.prototype.toString.call(123); //"[object Number]"

Object.prototype.toString.call('str'); //"[object String]"

Object.prototype.toString.call(true); //"[object Boolean]"

Object.prototype.toString.call({}); //"[object Object]"

Object.prototype.toString.call([]); //"[object Array]"
```
## == 和 === 有什么区别
## 说说JS中的隐式转换
## JavaScript中的严格模式是什么
## JavaScript中为什么0.1 + 0.2 !== 0.3
## 说说JavaScript中的事件循环(`Event Loop`)
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
