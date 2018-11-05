# 組件註冊

組件有兩個方式可以註冊: **全域**註冊及**區域**註冊。

全域註冊是直接在 Vue 物件中註冊組件，在整個 Vue.js 應用程式中都可以使用這個組件。

而區域註冊是在各個實體中的選項物件設定，這樣的設定方式只有這個實體才可以使用這個組件。

## 全域註冊

在註冊全域組件時要給予兩個參數: **組件名稱**及**選項物件**:

```js
Vue.component('component-a', {
  // options
  template: `
    <div>a</div>
  `
});
```

這樣一來我們就可以之後的任何實體中使用這個組件:

```js
var vm = new Vue({
  el: '#app'
});
```

```html
<div id="app">
  <component-a></component-a>
</div>
```

不只是 `new Vue` 實體可以使用，連其他組件也可以使用:

```js
Vue.component('component-a-copy', {
  template: `
    <component-a></component-a>
  `
});
```

## 區域註冊

全域註冊有個缺點: 不管有沒有使用到這個組件，只要使用全域註冊就一定會載入，因此使用全域註冊會將原本不需要的組件也載入進來，拖慢載入的時間。

所以針對某些特定實體設計的組件就可以用區域註冊的方式，註冊在需要它的組件中。

區域註冊會是一個**選項物件**:

```js
const componentC = {
  // options
  template: `
    <div>c</div>
  `
};
```

這個物件可以由 `components` 這個選項物件屬性載入實體內:

```js
var vm = new Vue({
  el: '#app',
  components: {
    'component-c': componentC
  }
});
```

除了 `new Vue` 實體外，也可以在組件中使用:

```js
Vue.component('component-d', {
  components: {
    'component-c': componentC
  },
  template: `
    <component-c></component-c>
  `
});
```

`components` 的 `key` 值是這個**組件的名稱**，而 `value` 值就是**組件的選項物件**。

## 全域跟區域註冊的差別

這樣就完成註冊了，我們建立兩個實體看看這兩種註冊方法的差別:

```js
Vue.component('component-a', {
  template: `
    <div>a</div>
  `
});

const componentC = {
  template: `
    <div>c</div>
  `
};

var vm = new Vue({
  el: '#app',
  components: {
    'component-c': componentC
  }
});

var vm2 = new Vue({
  el: '#app2'
});
```

我們有 `vm` 及 `vm2` 兩個實體， 而使用的組件有 `a` 及 `c` ， `a` 是全域組件，而 `c` 是區域組件，只有 `vm` 有註冊 `c` 組件。

現在我們在頁面上配置 `app` 及 `app2` ，兩個都載入 `a` 及 `c` 組件:

```html
<h2>app</h2>
<div id="app">
  <component-a></component-a>
  <component-c></component-c>
</div>
<h2>app2</h2>
<div id="app2">
  <component-a></component-a>
  <component-c></component-c>
</div>
```

結果如下:

![diff](image\22_ComponentRegistration\diff.PNG)

可以看到因為 `app2` 沒有載入 `c` 區域組件，所以它不知道如何渲染 `c` 組件，就照原樣放在 HTML 上。

而 `a` 組件因為是全域組件，所以在任何的實體上都可以使用。

## 組件命名

組件的名稱需要依照 [W3C](https://www.w3.org/TR/custom-elements/#concepts) 的客製標籤名稱(全部小寫並且需要包含連字符號( `-` ))來命名，避免發生衝突。

### 使用 kebab-case 命名

剛剛的例子都是使用 kebab-case 命名:

```js
Vue.component('component-a', {  // kebab-case
  template: `
    <div>a</div>
  `
});

...

var vm = new Vue({
  el: '#app',
  components: {
    'component-c': componentC   // kebab-case
  }
});
```

kebab-case 會是全小寫，並且在字與字之間用連字符號( `-` )串聯。

### 使用 PascalCase

```js
Vue.component('componentB', {   // PascalCase
  template: `
    <div>b</div>
  `
});

var vm = new Vue({
  el: '#app',
  components: {
    componentC: componentC  // PascalCase
  }
});
```

PascalCase 的字首大寫，並且每個字開頭都大寫。

在 [ES2015+](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Property_definitions) 中可以把 `componentC: componentC` 改為 `componentC` ，這樣的設定方是代表 `key` 跟 `value` 都是設定 `componentC` 的意思。

PascalCase 的名稱在 DOM 中使用只能轉換為 kebab-case 使用:

```js
<div id="app">
  <component-b></component-b>
  <component-c></component-c>
</div>
```

## DEMO

* [CodePen](https://codepen.io/peterhpchen/pen/PxwgNb)

## 結語

本文介紹了組件的兩種註冊方式: **全域**及**區域**，以及兩種命名方式: **kebab-case** 及 **PascalCase** 。

## 參考資料

* [Vue.js Guide: Component Registration](https://vuejs.org/v2/guide/components-registration.html)