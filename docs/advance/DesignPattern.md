# 设计模式

[[toc]]

## 单例模式
单例模式是指：保证一个类仅有一个实例，并提供一个访问它的全局访问点。

如：jQuery中的`$`、浏览器中的`window`对象都是常见的单例模式。
```javascript
class Singleton {
  static instance;
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }
}

// 无论new 多少次都是一个单例
new Singleton() === new Singleton(); // true
```

单例模式的具体实现由很多种，我们只要保证全局只有一个实例并且可以访问它。

## 工厂模式
工厂模式用于创建对象，无需指定创建对象的具体类。

例子：
```javascript
const TEACHER_TYPE = {
  CODING: 'coding',
  MUSIC: 'music'
};
class CodingTeacher {
  constructor(properties) {
    this.name = properties.name;
    this.programmingLanguage = properties.programmingLanguage;
  }
}
 
class MusicTeacher {
  constructor(properties) {
    this.name = properties.name;
    this.instrument = properties.instrument;
  }
}

// 生成各种Teacher的工厂
class TeacherFactory {
  static getTeacher(type, properties) {
    if (type === TEACHER_TYPE.CODING) {
      return new CodingTeacher(properties);
    } else if (type === TEACHER_TYPE.MUSIC) {
      return new MusicTeacher(properties);
    } else {
      throw new Error('Wrong teacher type chosen');
    }
  }
}

// 使用工厂生产对象
const codingTeacher = TeacherFactory.getTeacher(TEACHER_TYPE.CODING, {
  programmingLanguage: 'JavaScript',
  name: 'John'
});
 
const musicTeacher = TeacherFactory.getTeacher(TEACHER_TYPE.MUSIC, {
  instrument: 'Guitar',
  name: 'Andy'
});
```

## 适配器模式
适配器模式(`Adapter`)主要解决两个不兼容接口之间的匹配问题。

例子：
```javascript
// googleMap 和 baiduMap 的接口不一致，导致renderMap方法不能使用 baiduMap
const googleMap = {
 show: function(){
  console.log( '开始渲染谷歌地图' );
 }
};
const baiduMap = {
 show: function(){
  console.log( '开始渲染百度地图' );
 }
};

// 定义baiduMap的适配器
const baiduMapAdapter = {
 show: function(){
  return baiduMap.display(); 
 }
}

const renderMap = function( map ){
 if ( map.show instanceof Function ){
  map.show();
 }
};

// 直接使用适配器即可
renderMap(googleMap);
renderMap(baiduMapAdapter);
```
- 适配器模式不会改变原对象的接口
- 适配器模式不会增加或简化原对象的功能

## 装饰器模式
装饰器模式(`Decorator`)允许向一个现有的对象添加新的功能，同时又不改变其结构。

这种模式创建了一个装饰类，用来包装原有的类，并在保持类方法签名完整性的前提下，提供了额外的功能。

ES6中的装饰器既可以装饰类，也可以装饰类的属性，关于ES6中的装饰器，详见：[装饰器 - ECMAScript 6入门](https://es6.ruanyifeng.com/#docs/decorator)

### 类装饰器的例子：
```javascript
// 定义一个装饰器
function testable(target) {
  target.prototype.isTestable = true;
}

// 使用装饰器
@testable
class MyTestableClass {}

let obj = new MyTestableClass();
obj.isTestable // true
```

### 属性装饰器的例子
```javascript
function readonly(target, name, descriptor){
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}

class Person {
  @readonly
  name() { return `${this.first} ${this.last}` } // 经过装饰后的name属性是只读的
}
```
## 代理模式
代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。

例子：
```javascript
let BankAccounts = function() {
    //constructor
};

BankAccounts.prototype = {
    add(bankAccountData) {
        // funtionality for adding a new bank account
    },
    find(bankAccount) {
        // searching the list of bank accounts
    },
    getList() {
        // return a list of all the bank accounts
    }
};

// 创建代理
var BankAccountsProxy = function() {
    // getting a reference to the original object
    this.bankAccounts = new BankAccounts();
};

BankAccountsProxy.prototype = {
    addBankAccount(bankAccountData) {
        // some funtionality before calling the add method on BankAccounts
        return this.bankAccounts.add();
    },
    findBankAccount(bankAccount) {
        // some funtionality before calling the find method on BankAccounts
        return this.carList.find();
    },
    getBankAccountsList() {
        // some funtionality before calling the getList method on BankAccounts
        return this.carList.getList();
    }
};
```
- 代理的接口和原对象(被代理)的接口是一致的
- 保护代理：通过代理来处理一些不必要的东西，过滤掉无用信息
- 虚拟代理：虚拟代理把一些开销很大的对象，延迟到真正需要它的时候才去创建

## 观察者模式
观察者模式(`Observer`)又称为发布-订阅模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。在 JavaScript 开发中，我们常用事件模型来替代传统的观察者模式。

下面是一个非事件模型的简单观察者模式的实现：
```javascript
class Subject {
  observers = new Set(); // ES6之前常用数组来保存观察者

  subscribe(observer) {
    this.observers.add(observer);
  }
 
  unsubscribe(observer) {
    this.observers.delete(observer);
  }
 
  notify(message) {
    this.observers.forEach((observer) => {
      observer(message);
    })
  }
}

// 使用方法
const subject = new Subject();
 
subject.subscribe((message) => {
  console.log(message);
});
 
subject.notify('Hello world!');
```

## 外观模式
外观模式为外部提供了一个接口，隐藏了内部的逻辑，更加方便外部调用。

下面是兼容多种浏览器的添加事件方法的一个例子：
```javascript
function addEvent(element, eventType, callback, useCapture) {
  if (element.addEventListener) {
    element.addEventListener(eventType, callback, useCapture);
  } else if (element.attachEvent) {
    element.attachEvent("on" + eventType, callback);
  } else {
    element["on" + eventType] = callback
  }
}
```

React中的可以自定义Hooks封装复杂的业务逻辑，对外暴露出简单的接口，这也可以认为是外观模式

- 外观模式是在原对象的接口之上封装了对外的新接口
