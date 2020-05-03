---
title: CSS基础
---
# CSS基础面试题
[[toc]]
## 什么是CSS盒子模型
每个HTML元素都可以看成一个矩形盒子(`box`)，CSS盒模型本质上就是这样一个盒子，封装周围的HTML元素，它包括：外边距`margin`，边框`border`，填充`padding`，和实际内容`content`（按盒子从外到内的顺序）。
- `Margin`(外边距)  盒子与盒子之间的间隙，是完全透明的。
- `Border`(边框)  围绕在盒子`Padding`和内容外的边框。
- `Padding`(填充/内边距)  盒子中实际内容和边框间的间隙。
- `Content`(内容)  盒子的实际内容。

![盒模型图片](./img/cssBox.gif)

### W3C标准盒模型和IE盒模型
目前盒模型有两类：W3C标准盒模型和IE盒模型，他们之间的区别：
- IE盒模型尺寸计算时，按照盒模型的`Border`(边框)的尺寸计算
- W3C标准盒模型尺寸按照盒子`Content`(内容)的尺寸计算

![盒模型图片](./img/cssBoxTwo.png)

使用CSS的`box-sizing`可以改变元素盒模型的类型，`box-sizing`可以取以下两个值
- `content-box` 使用W3C盒模型
- `border-box` 使用IE盒模型

除老版本IE外，现代浏览器默认的盒模型为W3C标准盒模型。

## 替换元素和非替换元素
替换元素/可替换元素(`replaced element`)：元素内的显示内容需要引用其他位置的资源或是由用户输入决定，如`img`就是一个替换元素，`img`标签的内容最后会被显示成其`src`属性所引用到的一张图片。常见的替换元素还有`video`、`iframe`、`input`。

在 CSS 中，替换元素的展现效果不是由 CSS 来控制的。这些元素是一种外部对象，它们外观的渲染，是独立于 CSS 的。
简单来说，它们的内容不受当前文档的样式的影响。CSS 可以影响替换元素的位置，但不会影响到可替换元素自身的内容。某些可替换元素，例如
iframe 元素，可能具有自己的样式表，但它们不会继承父文档的样式。

非替换元素(`non-replaced element`)：指该元素将直接告诉浏览器应该显示什么内容，常见的`div`、`p`、`span`等都是非替换元素。

## 块级元素和行内元素
- 块级元素；`display: block` 一个块级元素独占一行，有独立的高宽，`div`、`p`、`section` 都是常见的块级元素
- 行内元素：`display: inline` 行内元素占用的尺寸是其内容的实际高宽，多个行内元素在宽度足够的一行内会一个挨着一个显示。对行内元素设置CSS属性`height`、`width`、`上下margin`、`上下padding` 将不会生效。
- 注意：如果一个元素是行内元素，也是[可替换元素](#替换元素和非替换元素)，那它和块级元素一样可以设置宽高以及正常设置margin

## 什么是BFC
BFC(`Block Formatting Context`) 是 块级格式化上下文。BFC表示的是浏览器中块状(block)的一块渲染区域，并且有一套渲染规则。

指定一个元素为BFC，该元素满足如下规则中的一种即可:
- html根元素
- float的值**不是**none
- position属性为absolute或fixed
- display属性为 inline-block、table-cell、flex、inline-flex
- overflow的值**不是**visible

### BFC的布局规则
- 内部的Box会在垂直方向，一个接一个地放置(按照正常文档流规则)。
- Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。
每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
- BFC的区域不会与float box重叠。
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
- 计算BFC的高度时，浮动元素也参与计算

## 清除浮动指的是什么，有哪些清除浮动的方法
## margin塌陷和margin合并
## 说说常用的CSS选择器
## CSS选择器的优先级是如何计算的
## link和@import有什么区别
## CSS3有哪些新特性
## line-height是如何计算的
## 谈谈使用flex布局
## 伪类与伪元素的区别
## 用过哪些CSS预处理器他们之间的区别是什么
## 谈谈物理像素、逻辑像素、PPI、DPR
## 说说对响应式布局的理解
## 隐藏一个元素有哪些方法以及其区别
## 什么是CSS Hack、常见的CSS Hack
早期不同浏览器对CSS解析能力不同，有些还有一些独特的BUG，CSS Hack是指利用这些特性来进行一些针对不同浏览器的兼容性处理。下面列举一些常见的CSS Hack方式：
### 浏览器前缀
| 前缀  | 浏览器  |
| ------------ | ------------ |
| -ms-  | IE  |
|  -webkit- | Chrome/Safari  |
| -moz-  | Firfox  |
| -o- | Opera  |

示例：
```css
-webkit-box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
-moz-box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
-o-box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
```
### IE条件注释
IE的条件注释是IE的私有写法，可以让HTML文档内的部分代码针对特定版本的IE
```html
<!--[if expression]>
针对特定版本IE的代码写在这里
<!-->
```
`expression`可以取以下几种值:
- `lt` ：Less than的简写，也就是小于的意思。
- `lte` ：Less than or equal to的简写，也就是小于或等于的意思。
- `gt`：Greater than的简写，也就是大于的意思。
- `gte`：Greater than or equal to简写，也就是大于或等于的意思。
- `!`: 不等于

示例：`if lt IE8` 表示`版本小于IE8`

备注：IE10以及之后的IE已不再支持条件注释。

### IE的CSS属性前缀
在CSS属性前加一些特殊前缀字符，某些特定版本的IE会将这种错误写法的CSS解析出来。

| 前缀 | 兼容的浏览器 | 示例 |
| --- | --- | --- |
| _ | IE6 | _height: 10px |
| * | IE6、 IE7 | *height: 10px |
|+ |  IE6、 IE7 | +height: 10px |
| \0 | IE8+ | height: 10px\0 |
| \9 | IE6+ | height: 10px\9 |

## 什么是渐进增强和优雅降级
- 渐进增强（`progressive enhancement`）：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。
- 优雅降级（`graceful degradation`）：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。

区别：优雅降级是从复杂的现状开始，并试图减少用户体验的供给，而渐进增强则是从一个非常基础的、能够起作用的版本开始，并不断扩充，以适应未来环境的需要。

## 前端常用的CSS优化手段


