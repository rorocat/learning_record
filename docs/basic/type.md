# JavaScript数据类型
![2b9774034b61952ec7f44dbeb240bb1a](/assets/images/types.png)
::: tip
**JavaScript数据类型可分为两大类，即基础类型和引用类型**
:::

## 基础类型

- Number
- String
- Boolean
- Undefined
- Null
- Symbol
- BigInt

其中 Symbol 为 ES6 新增的类型，每一个 Symbol 都是独一无二，而 BigInt 是 ES10 中新增的类型，由于Number类型的最大范围为正负9007199254740991（2的55次幂 - 1）之间的整数，一旦超出该范围，Number就会失去精度。因此BigInt的出现就是为了弥补Number在超出范围精度丢失的问题。

## 引用类型

- Object
- Array
- Date
- Function
- RegExp

## 各数据类型是如何在内存中存储的

::: tip
在 JavaScript 中，原始类型的赋值会完整复制变量值，而引用类型的赋值是复制引用地址
:::


在 JavaScript 的执行过程中，存在三种主要内存空间：**代码空间**、**栈空间**和**堆空间**。**代码空间**用于存储可执行代码，而原始数据类型如Number、String、Null、Undefined、Boolean、Symbol、BigInt的值直接存储在栈中，引用类型的值存储在堆中。在**栈空间**（执行上下文）中，原始数据类型存储变量的实际值，而引用类型存储它们在**堆空间**中的引用地址。当 JavaScript 需要访问这些数据时，它通过栈中的引用地址进行访问，这就引入了一个额外的访问层。

## 数据类型检测方式

#### 1、typeof

```js{2}
console.log(typeof 1)                    // 输出：number
console.log(typeof '字符串')              // 输出：string
console.log(typeof false)                // 输出：boolean
console.log(typeof undefined)            // 输出：undefined
console.log(typeof null)                 // 输出：object
console.log(typeof Symbol('Symbol'))     // 输出：symbol
console.log(typeof {})                   // 输出：object
console.log(typeof [])                   // 输出：object
console.log(typeof new Date())           // 输出：object
console.log(typeof /[a-z]/)              // 输出：object
console.log(typeof function func() {})   // 输出：function
```

使用 typeof 检测基础数据类型时，除了 null 均可正确的识别，这是由于 JavaScript 历史遗留问题，早期 JavaScript 的版本中使用的是32位系统，使用低位存储变量的类型信息，000开头代表对象，而null就代表全零，所以将它错误的判断成Object，而对于引用数据类型来说，使用 typeof 检测除了 function，其他都为 Object，显然对引用类型使用typeof判断一个变量的类型并不是正确的选择，因此可选用 instanceof 

#### 2、instanceof

```js{2}
console.log(1 instanceof Number)                      // 输出：false  
console.log('字符串' instanceof String)               // 输出：false  
console.log({} instanceof Object)                    // 输出：true
console.log([] instanceof Array)                     // 输出：true
console.log(new Date() instanceof Date)              // 输出：true
console.log(/[a-z]/ instanceof RegExp)               // 输出：true
console.log(function func() {} instanceof Function)  // 输出：true
...
```

显然使用 instanceof 可以正确的判断引用类型，但是对于基础类型就束手无策，这是由于 instanceof 是通过判断对象原型链中的是否能找到类型的 prototype

#### 3、Object.prototype.toString.call()

```js{2}
console.log(Object.prototype.toString.call(1))            // 输出：'[object Number]'
console.log(Object.prototype.toString.call(null))         // 输出：'[object Null]'
console.log(Object.prototype.toString.call(undefined))         // 输出：'[object Undefined]'
console.log(Object.prototype.toString.call({}))           // 输出：'[object Object]'
console.log(Object.prototype.toString.call(new Date()))   // 输出：'[object Date]'
console.log(Object.prototype.toString.call(/[a-z]/))      // 输出：'[object RegExp]'
...
```

对于 Object 对象，直接调用 toString() 就能返回 [object Object]；而对于其他对象，则需要通过 call 来调用，才能返回正确的类型信息。toString() 是 Object 的原型方法，方法返回格式为 [object Xxx] 的字符串，其中 Xxx（首字母大写） 就是对象的类型。因此使用 Object.prototype.toString.call() 判断一个变量的类型是目前最好的方法。

#### 4、检测类型函数封装
在日常开发中为了代码有更好的语义化，不建议直接使用 Object.prototype.toString.call(1) == '[object Number]' 的形式，为了代码的可读性，我们应该封装一次工具函数以便于反复利用且提高代码的可读性，代码如下。
```js{2}
function is(val, type) {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
}

/**
 * 判断是类型是否为 Number 类型
 */
function isNumber(val) {
  return is(val, 'Number');
}

/**
 * 判断是类型是否为 String 类型
 */
function isString(val) {
  return is(val, 'String');
}

/**
 * 判断是类型是否为 Boolean 类型
 */
function isBoolean(val) {
  return is(val, 'Boolean');
}

/**
 * 判断是类型是否为 Null
 */
function isNull(val) {
  return is(val, 'Null');
}

/**
 * 判断是类型是否为 Undefined
 */
function isUndefined(val) {
  return is(val, 'Undefined');
}


/**
 * 判断是类型是否为 Date
 */
function isDate(val) {
  return is(val, 'Date');
}

...
```