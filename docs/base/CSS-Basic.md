---
title: CSS基础
---
# CSS基础面试题
[[toc]]
## 什么是CSS盒子模型
## 块级元素和行内元素
## 什么是BFC
## 清除浮动指的是什么，有哪些清除浮动的方法
## margin塌陷和margin合并
## 说说常用的CSS选择器
## CSS选择器的优先级是如何计算的
## link和@import有什么区别
## CSS3有哪些新特性
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


