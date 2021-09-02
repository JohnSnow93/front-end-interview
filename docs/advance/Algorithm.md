# JS相关算法

[[toc]]

## 冒泡排序
```javascript
function bubble(array) {
  checkArray(array);
  for (let i = array.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (array[j] > array[j + 1]) swap(array, j, j + 1)
    }
  }
  return array;
}
```
## 快速排序
```javascript
function quickSort(arr, left, right) {
    if (left >= right) return;
    let i = left,
        j = right;
    const baseVal = arr[j];
    while (i < j) {
        while (i < j && arr[i] <= baseVal) {
            i++
        }
        arr[j] = arr[i]
        while (j > i && arr[j] >= baseVal) {
            j--
        }
        arr[i] = arr[j]
    }
    arr[j] = baseVal;
    quickSort(arr, left, j - 1);
    quickSort(arr, j + 1, right);
    return arr;
}
```
## 斐波那契数列
递归版
```javascript
function fib(n) {
  if (n < 2 && n >= 0) return n
  return fib(n - 1) + fib(n - 2)
}
```
非递归版
```javascript
function fib(n) {
  let array = new Array(n + 1).fill(null)
  array[0] = 0
  array[1] = 1
  for (let i = 2; i <= n; i++) {
    array[i] = array[i - 1] + array[i - 2]
  }
  return array[n]
}
```
