# new 原理
:::tip
在 JavaScript 中 new 关键词的作用是执行一个构造函数并返回一个实例对象
:::

执行 new 的过程如下：
1. 创建一个新对象
2. 对象原型绑定
3. 绑定this到 1 步骤中创建的对象
4. 返回新对象

步骤很简单，但可能不太容易理解，下面使用代码实现一个 new 关键字的函数，以便于更好的理解 new 的执行过程
```js{2}
function myNew(constrFunc, ...params) {
  // 创建一个对象,并绑定原型
  const obj = Object.create(constrFunc.prototype);
  // 绑定 this
  const newObj = constrFunc.apply(obj, params);
  // 返回对象
  return (newObj != null && typeof newObj == 'object') ? newObj : obj; 
}
```