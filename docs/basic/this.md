# This
:::tip
不同的调用方式，this 的指向也会不同。注：在 es6 的箭头函数中没有 this，箭头函数中的 this 是指向箭头函数最接近的函数。
:::

![this指向](/assets/images/this.png)

JavaScript 中的 this 只有如下几种情况，并按他们的优先级从低到高划分如下：
1. 独立函数调用，如getUserName()，此时 this 指向全局对象 window。
2. 对象调用，例如 user.getUserName()，此时 this 指向调用的对象 user。
3. 使用 call()、apply() 和 bind() 这些方法来改变上下文，this 的指向取决于这些方法的第一个参数。当第一个参数为 null 时，this 指向全局对象 window。
4. 箭头函数没有自己的 this，它的 this 只取决于包裹箭头函数的第一个普通函数的 this。
5. 在使用 new 构造函数调用时，this 永远指向构造函数返回的实例，具有最高的优先级。

**这些规则决定了 this 的指向在不同上下文中的行为。**
