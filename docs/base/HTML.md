---
title: HTML相关面试题
---

# HTML面试题
[[toc]]
## DOCTYPE 的作用是

## 对前端语义化的理解
web 语义化是指通过 HTML 标记表示页面包含的信息，包含了 HTML 标签的语义化和 css 命名的语义化。 HTML 标签的语义化是指：通过使用包含语义的标签（如 h1-h6）恰当地表示文档结构。 css 命名的语义化是指：为 html 标签添加有意义的 class、id 补充未表达的语义。

为什么需要语义化：

- 去掉样式后页面呈现清晰的结构
- 盲人使用读屏器更好地阅读
- 搜索引擎更好地理解页面，有利于收录
- 便团队项目的可持续运作及维护

## HTML5 有哪些新内容，废除了哪些内容
HTML5新增的内容非常丰富，下面仅列出一些常见的部分：
### 新HTML标签
- 用于媒介回放的 video 和 audio 元素
- 语意化更好的内容元素，比如 article、footer、header、nav、section
- input控件的类型(type)更加丰富，比如calendar、date、time、email、url

### 新的API
- 新的本地储存机制：LocalStorage/SessionStorage/IndexedDB
- Canvas 绘图
- SVG 矢量图
- Drag & Drop 拖放
- HTML Web Worker
- 新的和服务器双向通信方式 WebSocket

### HTML5中变更或不再建议使用的部分
- 移除纯表现的元素basefont ，big，center，font, s，strike，tt，u
- HTML5的DOCTYPE 声明与之前不同。HTML 4.01 基于 [SGML](https://wiki.mbalib.com/wiki/SGML)，而 HTML 5 不基于 SGML，因此不需要对 DTD 进行引用
    ```html
    <!-- HTML5的DOCTYPE -->
    <!DOCTYPE HTML>
    
    <!-- HTML4的三种DOCTYPE声明，基本不再使用，仅供了解 -->
    <!-- 严格型：严格的DTD，不允许使用任何表现层的标识和属性 -->
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <!-- 过渡型：宽松标准，允许在页面中使用HTML4.01的标识（符合xhtml语法标准） -->
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <!-- 框架型：用于框架集网页 -->
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
    
    ```

## 标准模式与兼容模式各有什么区别

## 移动端常见的meta标签有哪些，具体的意义是什么

## viewport是什么

## SEO

## SVG与Canvas有什么区别
- SVG 是一种使用 XML 描述 2D 图形的语言。
- Canvas 通过 JavaScript 来绘制 2D 图形。
- SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。您可以为某个元素附加 JavaScript 事件处理器。
- 在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。
- Canvas 是逐像素进行渲染的。在 canvas 中，一旦图形被绘制完成，它就不会继续得到浏览器的关注。如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象。

## 说说你对 WebSocket 的理解和其应用

## 说说<script>标签的 async 和 deffer 属性有什么不同
在浏览器解析到<script>标签时，回去加载<script>内的脚本并执行，此时

## iframe 有那些缺点

