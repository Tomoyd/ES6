## Promise

> 异步编程的解决方案
>
> ES6 将其写入了标准，统一了用法

特点：

- 对象状态不受外界影响：

  > 只有**异步的结果**才能决定当前处于那种状态，其他任何操作都无法改变这个状态，像是一种承诺（Promise）

  - pending（进行中）
  - fulfilled（已成功）
  - rejected（已失败）

- 一旦状态改变就不会再变，任何时候都可以得到这个结果：

  - Promise的状态改变只有两种，从pending变成fulfilled,从pending变为rejected
  - 改变已经发生，再对Promise对象添加回回调函数，也会立即得到这个结果。

- 无法取消Promise

- 不设置回调函数，Promise内部抛出的错误不会反应到外部，不会影响程序的运行

- 处于Pending时无法判断目前阶段处于哪个阶段

#### Promise.prototype.then

> Promise的实例具有then方法
>
> 第一个参数是resolved状态的回调函数
>
> 第二个参数为rejected状态的回调函数（可选的）
>
> 返回值：为新的Promise实例

#### Promise.prototype.catch

> - 可以捕获到rejected状态以及，then方法中抛出的错误
> - 如果已经resolved了，在抛出错误，也不会被catch捕获
> - Promise对象的错误具有冒泡性质，会一直向后传递直到被捕获为止
> - 一般不要在then中指定rejected状态的回调函数，总是使用catch方法
> - 与try/catch不同的是，即使没有使用catch，错误也不会影响外层代码的运行
> - 如果已经Promise已经与运行结束了，Promise中的代码在下一轮事件循环再抛出错误，这种错误会影响到外层代码的
> - 一般建议总是跟着catch方法

#### Promise.prototype.finally

> 总是会执行的操作，ES2018引入
>
> 本质上是then的特例

#### Promise.all()

> 用于将多个Promise实例包装成一个Promise实例，
>
> 可以接受一个数组作为参数，或者具有Iterator接口的，返回的每个成员都是Promise的数据类型
>
> 如果数组中有不是Promise实例的，会调用Promse.resolve将其转换为Promise

包装成的新的Promise由Promise，参数成员决定，

只要全变成fulfilled时候，才变成fulfilled状态

有一个rejected，就变成rejected

#### Promise.race

> 与all参数相同

只要有一个改变就改变

#### Promise.allSettled

> 接受一组Promise实例作为参数
>
> 包装成新的

不管是fulfilled还石rejected，只有等到这些参数都返回解构，包装的实例才会接受，结束状态总是fulfilled，传入一个数组值，每项都有一个status属性，只可能是字符串，"fulfilled"或者”rejected“，fulfilled时候，有value属性，否则：有reason属性

#### Promise.any()

> 如果有一个fulfilled，则包装的实例fulfilled
>
> 全部的都变为rejected，才会rejected

#### Promise.resolve()

> 将非Promise的转换为Promise

- 如果参数是Promise实例，将不会做任何修改，返回这个实例
- 如果参数是一个thenable对象，具有then方法的对象，将这个对象转化为Promise，并且立即执行里面的then方法
- 参数不具有then方法或者根本不是对象，返回一个新的Promise且状态变为resolved
- 不带任何参数直接返回一个resolved状态的Promise对象

#### Promise.reject()

> 返回一个新的Promise实例，该实例的状态为rejected
>
> 参数会原封不动的变成reject的reason，变成后续方法的参数

#### Promise.try()

> 同步函数同步执行，异步函数异步执行
>
> - (()=>new Promise(reslove=>{f()}))()
> - 和 （async ()=>{f()}）()
> - Promise.try(f)