## Iterator和for...of循环

> 为不同的数据结构提供统一的访问机制
>
> 作用：
>
> - 为各种数据结构提供统一的，便捷的访问接口
> - 是的数据结构成员能够按照某种次序排列
> - for...of 循环

#### 默认Iterator接口

> 为了提供统一的访问机制，for....of
>
> `ES6` 默认的Iterator接口部署在数据结构的`Symbol.iterator`属性，只要具有`Symbol.iterator`属性，就可以认为可以遍历

#### 调用Iterator接口的场合

1.解构赋值

2.扩展运算符

3.`yield`*

4.其他场合：for..of `Array.from()` 等

#### 字符串的Iterator接口

```javascript
var someString = "hi";
typeof someString[Symbol.iterator]
// "function"

var iterator = someString[Symbol.iterator]();

iterator.next()  // { value: "h", done: false }
iterator.next()  // { value: "i", done: false }
iterator.next()  // { value: undefined, done: true }
```

#### Iterator接口和Generator函数

```javascript
let myIterable = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  }
}
[...myIterable] // [1, 2, 3]

// 或者采用下面的简洁写法

let obj = {
  * [Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  }
};

for (let x of obj) {
  console.log(x);
}
```

#### 遍历器的return() 和throw（）

遍历器的next方法是必有，持外还有return和throw方法是可选的

遍历过程中，出现break或者抛出异常都会除非return，

throw主要是配合Generator函数使用一般用不到这个方法

#### for..of

数组：获取每一项的键值，for...in 不能直接获取键值，只能获得索引

Set和Map可以使用for...of

字符串

对象：不能直接使用，除非是部署了Iterator接口