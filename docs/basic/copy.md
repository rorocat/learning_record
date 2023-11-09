# 深拷贝与浅拷贝
:::tip
由于JavaScript中对象是引用类型，保存的是地址，深、浅拷贝的区别是，当拷贝结束后，在一定程度上改变原对象中的某一个引用类型属性的值，新拷贝出来的对象依然受影响的话，就是浅拷贝，反之就是深拷贝。
:::

### 浅拷贝的实现方式

1. 使用Object.assign
2. 使用es6的扩展运算符(...)

```js{2}
const user = {
  age: 21,
  name: '张三',
  address: {
    province: '广东省',
    city: '广州市',
    area: '天河区',
  }
}
const newUser1 = Object.assign({}, user);
const newUser2 = {
  ...user
};
newUser1.age = 24;
newUser2.age = 24;
newUser1.address.area = '荔湾区'
console.log(user.age)                 // 输出：21
console.log(newUser1.age)              // 输出：24
console.log(newUser2.age)              // 输出：24
console.log(user.address.area)        // 输出：荔湾区
console.log(newUser1.address.area)     // 输出：荔湾区
console.log(newUser2.address.area)     // 输出：荔湾区
```

### 深拷贝的实现方式

1. JSON.stringify 与 JSON.parse 配合使用，局限性较大，会会忽略值为 undefined 、 function 的属性以及属性为Symbol的属性
2. 采用递归循环的方式将每一项属性添加到一个新对象里面
3. 使用 loadsh 第三方工具库（推荐）

```js{2}
const student = {
  name: '李四',
  number: '20220809',
  nativePlace: {
    province: '广东省',
    city: '广州市',
    area: '天河区',
  },
  print() {
    console.log('hello')
  },
  [Symbol()]: 'Symbol',
  undef: undefined,
}
const cloneData1 = JSON.parse(JSON.stringify(student));
cloneData1.nativePlace.area = '越秀区';
console.log(student.nativePlace.area);      // 输出：天河区
console.log(cloneData1.nativePlace.area);   // 输出：越秀区


function isObject(val) {
  return typeof val === 'object' && val !== null;
}

// 自定义深拷贝函数
function cloneDeep(val) {
  if(!isObject(val)) {
    return val;
  }
  var isArray = Array.isArray(val);
  var newObj = isArray ? [] : {};
  Reflect.ownKeys(val).forEach(key => {
    newObj[key] = isObject(val[key]) ? cloneDeep(val[key]) : val[key];
  })
  return newObj;
}
```