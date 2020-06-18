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
## 适配器模式
## 装饰模式
## 代理模式
## 发布订阅模式
## 观察者模式
## 外观模式
