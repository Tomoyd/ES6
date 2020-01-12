## 语法

引入class关键字

```javascript
class  类名{
	constructor(param){ //可选
        // code here
    }
    //code

}
```

ES5 中的构造函数就对应着这里的constructor方法

完全可以看做是构造函数的另一种写法

```javascript
class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true
```

类的所有方法都定义在类的prototype属性上面

类里面定义的方法都是不可枚举的

#### constructor方法

- 是类的默认访问，通过new命令时，自动调用该方法，一个类必须有constructor方法，如果没有显示定义，会被默认添加，constructor默认返回实例对象this，也可通过return返回另外一个对象

- 类必须使用new调用，否则报错，普通构造函数不用new也可以

#### 类的实例

- 类必须通过new命令来创建实例
- 实例的属性除非显示定义在其本身（即this上），否则都是定义在原型上
- 类的所有实例都共享一个原型对象

#### 取值函数与存值函数（getter与setter）

> 类中也可以使用存值get和set关键字，对于某个属性设置存值和取值函数拦截该属性的存取行为

在两个函数是设置在Descriptor对象上的

可以通过`Object.getOwnPropertyDescriptor`验证

```javascript
class GetterAndSetter{
    constructor(name) {
        this.val=name
    }
    get name(){
        return this.val
    }
    set name(val){
        this.val=val
    }
}
let handler=new GetterAndSetter("hu")
console.log(handler.name)
let descriptor=Object.getOwnPropertyDescriptor(GetterAndSetter.prototype,'name')
console.log(descriptor)
console.log("get" in descriptor)// true
```

#### 属性表达式

类的属性，可以采用表达式

```javascript
let methodName = 'getArea';

class Square {
  constructor(length) {
    // ...
  }

  [methodName+0]() {
    // ...
  }
}
console.log(Square.prototype.getArea0)
```

#### class 表达式

可以使用表达式形式定义

类的名字只能在内部使用，在外部只能使用外部引用的标识名

```javascript
const MyClass= class Person{
    getPersonName(){
        return Person.name
    }
}
let person1=new MyClass()
person1.getPersonName()

```

如果在内部不使用的话，也可以省略类名

```javascript
const MyClass= class {
    getPersonName(){
        return "hu"
    }
}
let person1=new MyClass()
person1.getPersonName()
```

1. class内部默认就是严格模式

2. 类不存在变量提升

3. 函数的属性很多特性被class继承，name属性就是

4. Generator方法，如果方法之前加上分号那么表示该方法是一个Generator函数

5. 类的方法背部如果含有`this`，默认只想类的实例，但是一旦单独使用该方法很可能会报错，单独使用该方法时，this会指向该方法运行时所在的环境，严格模式下，this指向的是undefined

   ```javascript
   class Logger {
     printName(name = 'there') {
       this.print(`Hello ${name}`);
     }
   
     print(text) {
       console.log(text);
     }
   }
   
   const logger = new Logger();
   logger.printName()
   const { printName } = logger;
   printName(); // TypeError: Cannot read property 'print' of undefined
   ```

   解决方法是在构造函数中绑定this

   ```javascript
   class Logger {
     constructor() {
       this.printName = this.printName.bind(this);
     }
   
     // ...
   }
   ```

   这样this就会为当前实例，而不是undefined

   另一种解决方法是使用箭头函数，箭头函数内部的this总是指向定义他时所在的对象上，在构造函数中定义箭头函数时，生效时是执行构造函数的时候，这是this总是会执行对象实例

   ```javascript
   class Obj {
     constructor() {
       this.getThis = () => this;
     }
   }
   
   const myObj = new Obj();
   myObj.getThis() === myObj
   ```

#### 静态方法

如果在一个方法加上static关键字，表示该方法不会被实例继承，而是通过类来调用，这就称为静态方法

- 静态方法通过类来直接调用
- 不会被实例继承
- 静态方法中的this指向类
- 静态方法可以与其他方法重名
- 父类的静态方法可以被子类继承
- 静态方法也可以在super对象上调用

#### 属性的新写法

- 在构造方法中this上面
- 在类的顶层些，不需要加this和关键字

#### 静态属性

- 类名.属性名=属性值
- 在类中：static 属性名=属性值

#### 私有属性和私有方法

只能在类内部访问的方法和属性

- 方法1：前面加下划线`_`,与共有属性以区别，但是不遵守约定也可以直接调用

- 方法2：将私有方法移出类，在内部使call绑定this调用
- 使用Symbol值，但是Reflect.ownKeys依然可以拿到

私有属性：

- 在属性名之前使用#表示，在外部使用就会报错
- 也可以表示私有方法
- 在私有变量私有方法之前加static 表示是静态私有，只能在内部访问

> 私有属性只要在内部引用，实例也可以引用私有属性，不局限于this引用

#### new.target属性

> 如果不是通过new命令或者Reflect.constructor()调用构造函数，这个属性就会返回undefined
>
> 否则返回当前的作用的构造函数

## class 的继承

extends关键字是想继承

- 子类必须在constructor方法中调用super方法，因为子类的this对象必须通过父类的构造函数完成塑造，得到与父类同样的实例和方法
- 要使用this，必须在构造函数中先调用super方法

#### super关键字

- 作为函数使用时，代表父类的构造函数
- super作为对象使用，在普通方法中，指向父类的原型对象，静态函数中使用，指向父类
- super引用不到实例中的属性

- super调用父类方法时，方法内部的this相当于当前子类的实例
- 通过super对某个属性赋值时，这是super就是相当于this，赋值的属性会变成子类实例的属性
- 在子类的静态方法中，通过super调用父类的方法时，方法内部的this指向的是当前的子类
- 在使用super时必须指定他是作为函数还是对象
- 可以再任何一个对象中，使用super关键字

#### 类 __proto\_\_和prototype属性

class作为构造函数的语法糖以及作为对象同时有__proto\_\_和prototype属性

1）子类的__proto\_\_标识构造函数的继承，总是指向父类

2）子类的prototype的__proto\_\_，表示方法的继承总是指向父类的prototype属相

#### 实例的__proto\_\_属性

子类实例的原型的原型指向父类实例的原型

#### 可以继承原生的构造函数

#### Mixin模式的实现

多个对象合成一个对象，新对象具有各个成员的接口

