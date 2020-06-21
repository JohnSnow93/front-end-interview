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
## 发布订阅模式
## 观察者模式
## 外观模式
