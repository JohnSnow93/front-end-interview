---
title: CSS应用和布局
---
# CSS应用和布局
[[toc]]
## 让一个元素水平垂直居中
假设DOM结构如下：
```html
<div class="father">
    <div class="child">  
    </div>
</div>

<style>
    .father {
        width: 300px;
        height: 300px;
    }
</style>
```

1. child为行内元素时：text-align + line-height
```css
.father{
text-align: center;
line-height: 300px; // 行高设置为父元素高度
}
```
2. child 是块级元素 且 定宽定高：absolute + 负margin
```css
.father{
  position: relative;
}
.child{
  position: absolute;
  top: 50%; // top、left、margin为百分比时参照父元素的高宽
  left: 50%;
  margin: -50px 0 0 -50px; // 50px是child高度的50%
}
/* 或者(固定高宽元素绝对定位时可以用此方法居中) */
.child{
  position: absolute;
  left: 0;
  top: 0; 
  right: 0; 
  bottom: 0;
  margin: auto;
}
```

3. child 高宽不定(高宽都不定基本就不是块级元素) ： absolute + translate
```css
.father{
  position: relative;
}
.child{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%); // translate百分比依据是元素自身的高宽
}
```

4. child 高宽不定： flex
```css
.father{
  display: flex; 
}
.child{
  justify-content: center;
  align-items: center;
}
```

5. table-cell 居中法
```css
.father{
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
```

6. grid 居中法

注意和flex居中的写法进行区分
```css
.father{
    display: grid;
    align-items: center;
    justify-items: center;  
}
```


## 使用`border`制作一个三角形
原理：盒模型的四个border接缝处是一个斜边，每一个方向的border都是一个梯形，如下图:

![边框实例](./img/borderShapeDemo.png)

只要合理设置盒子的高宽并将部分边框颜色设置为`transparent`，就可以实现一个三角形。示例代码如下:
```css
#triangle-up{
    width:0;
    height:0;
    border-left:50px solid transparent;
    border-right:50px solid transparent;
    border-bottom:100px solid red;
}
```
效果如下：

![三角形](./img/triangleUp.png)

扩展问题：分别实现尖头方向朝着上下左右四个部同方向的三角形。

## 实现圣杯布局
圣杯布局由页头、内容、页脚组成，其中内如又分为左中右三栏，如下图：
![圣杯布局](./img/grail.png)

圣杯布局有以下几点要求
- 上下部之间的部分(container)是一个三栏布局。
- 三栏布局中两侧宽度固定，中间宽度自适应。
- 中间部分在DOM结构上优先，以便先行渲染
- 允许三列中的任意一列成为最高列

假设DOM结构如下：
```html
<div class="header">header</div>
<div class="container">
    <div class="center">center</div>
    <div class="left">left</div>
    <div class="right">right</div>
</div>
<div class="footer">footer</div>
```
### 1. 浮动+相对定位实现
```css
.right, .left, .center{
  float: left;
}
.container{
  padding-left: 200px; // 假设左栏宽200px
  padding-right: 150px; // 假设右栏宽1500px
}
.center{
  width: 100%;
}
.left{
  width: 200px;
  margin-left: -100%; // margin的百分比值参照其包含块的宽度进行计算
  position: relative;
  right: 200px;
}
.right{
  width: 150px;
  margin-right: -150px;
}
.footer{
  clear: both;
}
```
### 2. flex弹性盒子实现
```css
.container {
  display: flex;
}
.center {
  flex: 1;
}
.left {
  width: 200px;        
}
.right {
  width: 150px;           
}
```
## CSS移动端适配方案有哪些
