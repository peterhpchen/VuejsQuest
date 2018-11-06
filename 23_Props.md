# `props` 屬性

子組件可以設定 `props` 屬性，而父組件可以將這些屬性用 DOM 客製屬性設定在子組件上，在子組件內就可以當作實體中的屬性使用，本文會詳細的介紹 `props` 屬性的用法。

## 屬性命名

HTML 屬性需要使用 kebab-case ，全小寫並使用分隔符號( `-` )來設定，因此雖然在 JavaScript 內可以用 camelCase 設定，但在 HTML 屬性上還是要用 kebab-case 給予屬性值。

以下面的例子說明:

```js
// JavaScript 中使用 camelCase
Vue.component('component-string', {
  props: ['firstName', 'lastName'],
  template: `
    <div>
      <div>First Name : {{firstName}}</div>
      <div>Last Name : {{lastName}}</div>
    </div>
  `,
});
```

```html
<!-- HTML 中使用 kebab-case -->
<component-string first-name="Peter" last-name="Chen"></component-string>
```

雖然在 HTML 屬性中一定要使用 kebab-case ，但在字串模板上可以使用 camelCase 。

如下例所示:

```js
var vm = new Vue({
  el: '#app2',
  // 在字串模板上可以用 camelCase 設定屬性
  template: `
    <component-string firstName="Peter" lastName="Chen"></component-string>
  `
});
```

## 傳入靜態或動態屬性

在屬性上我們可以將客製屬性當成一般屬性設定，沒有使用 `v-bind` 的屬性會將值當作**靜態字串**讀入，而有 `v-bind` 的會當作**實體中的物件**對待。

我們繼續用 `component-name` 當作例子:

```html
<component-string first-name="Peter" :last-name="lastName"></component-string>
```

* `first-name` : 靜態屬性，它的值是 `Peter` 字串。
* `last-name` : 動態屬性，它的值是實體中的 `lastName` 資料屬性。

屬性的值也可以綁定 JavaScript 的表達式:

```html
<component-string :full-name="`Peter ${lastName}`"></component-string>
```

上面的例子是綁定 `string` 類型的屬性，下面介紹綁定各個類型的屬性。

### 數字

```html
<component-number age="20" :height="height" :weight="80"></component-number>
```

* `age` : 一般的 HTML 屬性，會將值視為**字串**類型。
* `:height` : 綁定 `height` 資料屬性，類型以資料類型決定。
* `:weight` : 綁定數字，會將值視為數字類型。

在組件中輸出各屬性的值跟其類型:

```js
Vue.component('component-number', {
  props: ['age', 'height', 'weight'],
  template: `
    <div>
      <div>Age : {{age}}, {{typeof age}}</div>
      <div>Height : {{height}}, {{typeof height}}</div>
      <div>Weight : {{weight}}, {{typeof weight}}</div>
    </div>
  `,
})
```

結果如下:

![number](image\23_Props\number.PNG)

### 布林值

```html
<component-boolean :male="isMale" female="false" :love-coding="true"></component-boolean>
```

* `:male` : 綁定 `isMale` 資料屬性。
* `female` : 綁定字串 `false` 。
* `:love-coding` : 綁定 JavaScript 表達式 `true` ，所以得到的值是 `true` 的布林值。

我們在畫面上輸出判斷式及類型:

```js
Vue.component('component-boolean', {
  props: ['male', 'female', 'loveCoding'],
  template: `
    <div>
      <div>Male : {{male}}, {{male ? 'Yes' : 'No'}}, {{typeof male}}</div>
      <div>Female : {{female}}, {{female ? 'Yes' : 'No'}}, {{typeof female}}</div>
      <div>Love coding : {{loveCoding}}, {{loveCoding ? 'Yes' : 'No'}}, {{typeof loveCoding}}</div>
    </div>
  `,
})
```

結果如下:

![boolean](image\23_Props\boolean.PNG)

可以看到 `Female` 的類型因為是字串，所以造成判斷錯誤，這是容易犯的錯，要小心。

### 陣列

```html
<component-array :habits="['movie', 'coding', 'game']"
                 :phones="phones"></component-array>
```

必須使用 `v-bind` 綁定，否則會被視為字串。

### 物件

```html
<component-object :education="{university: 'vue university', highSchool: 'vue high school'}"></component-object>
<component-object :education="education"></component-object>
```

必須使用 `v-bind` 綁定，否則會被視為字串。

### 傳入物件屬性

如果你想要將所有的屬性集合成一個物件傳入，可以直接使用 `v-bind` 綁定。

例如我們要傳入 `firstName` 及 `lastName` ，可以依照下面這樣做:

```html
<component-string v-bind="name"></component-string>
```

使用 `v-bind` 綁定 `name` 資料屬性，而資料結構如下:

```js
var vm = new Vue({
  el: '#app',
  data: {
    name: {
      firstName: 'Peter',
      lastName: 'Chen',
    },
  },
});
```

這樣的綁定方式等於:

```html
<component-string :first-name="firstName" :last-name="lastName"></component-string>
```

## DEMO

* [CodePen](https://codepen.io/peterhpchen/pen/rQVXwZ)

## 結語

本文介紹了 `props` 屬性的命名及各種不同類型的設定方式。

## 參考資料

* [Vue.js Guide: Props](https://vuejs.org/v2/guide/components-props.html)