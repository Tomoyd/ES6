#### Set

> 基本用法
>
> 提供了Set，值是唯一的，没有重复的值，本身是构造函数可以构造数据

可以向set构造函数传入数组

且会认为`NaN`等于自身

实例的属性和方法

`Set.prototype.constructor`:

`Set.prototype.size`:

###### 方法

- add（）添加
- delete（）删除某个值
- has（）是否有某个值
- clear（）清除

遍历方法：

`Set.prototype.keys()`:返回键名的遍历器

`Set.prototype.values()`:返回值得遍历器

`Set.prototype.entries()`:返回键值对的遍历器

`Set.prototype.forEach()`:回调函数遍历

#### WeakSet

成员只能是对象不能是其他类型，不可遍历的

 方法：add（） delete（） has（）