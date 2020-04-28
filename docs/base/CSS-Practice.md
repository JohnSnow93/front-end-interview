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


## 使用CSS制作一个三角形

## CSS移动端适配方案有哪些
