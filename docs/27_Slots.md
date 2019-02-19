# 插槽

Vue.js 實作了 [Web Component 的 Slots](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Slots-Proposal.md) ， Slots 可以將父組件所設定的內容分配至子組件中。

## 插槽內容

在子組件中設定 `<slot>` ，可以將父組件中的元素內容配置在這個 `<slot>` 中。

如下例的 `base-button` :

```js
Vue.component('base-button', {
  template: `
    <button>
      <slot></slot>
    </button>
  `
});
```

在 `<button>` 中設定 `<slot>` 。

接著在父組件內加上要配置在 `<slot>` 的內容:

```html
<base-button>Hello Button</base-button>
```

如此一來 `<slot>` 會被置換成 Hello Button ，所以會渲染為下面這樣:

```html
<button>Hello Button</button>
```

上面就是最基本的 Slots 應用。

### 在 slots 中加入 HTML

slots 中不只能設定字串，也能用 HTML 內容作設定。

例如將剛才的 `base-button` 改成下面這樣配置:

```html
<base-button><span style="color: red;">Hi</span> Button</base-button>
```

結果如下:

```html
<button><span style="color: red;">Hi</span> Button</button>
```

### 在 Slots 中使用客製組件

slots 中也可以加上客製組件。

現在我們加上一個 `base-title` 的組件:

```js
Vue.component('base-title', {
  props: ['title'],
  template: `
    <div>
      <h2>{{title}}</h2>
      <slot></slot>
    </div>
  `
});
```

接著在父組件的 `slots` 中設置 `base-button` :

```html
<base-title title="Title">
  <base-button>Big Button</base-button>
</base-title>
```

最後的結果如下:

```html
<div><h2>Title</h2> <button>Big Button</button></div>
```

> 如果在子組件中沒有設定 `<slot>` 標籤，在父組件內的內容將會被忽略。

## 有名字的插槽

有時候會需要嵌入數個不同位置的內容，常發生在 Layout 組件上，這時可以使用 `<slot>` 的 `name` 屬性來定義不同位置的 Slots 內容。

如下例的 `base-layout` 組件:

```js
Vue.component('base-layout', {
  template: `
    <div class="container">
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  `
});
```

在模板上設定三個 `<slot>` :

* `<slot name="header">` : 在 `<header>` 標籤中。
* `<slot>` : 在 `<main>` 標籤中。
* `<slot name="footer">` : 在 `<footer>` 標籤中。

接著在父組件中用 `slot` 屬性設定對應名稱的內容:

```html
<base-layout>
  <template slot='header'>Header</template>
  Content
  <template slot='footer'>Footer</template>
</base-layout>
```

如此一來，模板會依照 `slot` 的位置渲染各個不同名稱的 `<slot>` ，結果如下:

```html
<div class="container">
    <header>Header</header>
    <main>Content</main>
    <footer>Footer</footer>
</div>
```

這裡有三點要注意:

* `Content` 字串因為沒有設定 `slot` 屬性，所以會被當作沒有名字的 `<slot>` 內容。
* `<template>` 會是一個不會出現在頁面上的標籤，當 Slots 中的內容有多個元素時，可以使用 `<template>` 設定 `slot` 。
* 雖然上例是用 `<template>` 設定 `<slot>` ，但 `slot` 也可以設置在一般的元素(像是 `<p>` )或是客製組件上(像是 `base-button` )。

## 預設內容

有時插槽的內容是比較固定的，只有一些比較特別的時候會需要自己做設置，如果每次都一定要設置內容的話會變得很繁瑣，因此 Slots 提供了預設內容的功能。

如下例所示:

```js
Vue.component('base-button', {
  template: `
    <button>
      <slot>BASE</slot>
    </button>
  `
});
```

我們在 `base-button` 中的 `<slot>` 加上內容 `BASE` ，這樣當我們在父組件不設置任何的內容時就會使用 `BASE` 當作內容渲染:

```html
<base-button></base-button>
```

這樣渲染的結果會是以 `BASE` 為名稱的按鈕:

```html
<button>BASE</button>
```

## 插槽的 Scope

Scope 會決定目前內容可以使用的變數有哪些，在 slots 中，雖然它是渲染在子組件內，但因為它是在父組件中的模板定義，所以它的 **scope 會是父組件的模板**。

我們用 `base-title` 當作範例，它的模板如下:

```html
<div>
  <h2>{{title}}</h2>
  <slot></slot>
</div>
```

現在設定父組件:

```js
var vm = new Vue({
  el: '#app',
  data: {
    content: 'parent contecnt'
  }
});
```

```html
<base-title title="child content">Your content is {{content}}</base-title>
```

`content` 是父組件中的資料屬性，可以設定在 Slots 中。

接著我們看如果是要使用 `title` 這個子組件的資料會發生什麼事:

```html
<base-title title="child content">Your title is {{title}}</base-title>
```

![undefined](../image/27_Slots/undefined.png)

由於 Slots 內的 scope 是父組件的，所以子組件的 `title` 資料是找不到的。

## Scoped Slots

有時候，你還是會需要在 Slots 中設定子組件的資料，因此 Vue.js 允許你使用 `slot-scope` 屬性設定子組件的 scope 物件，讓父組件在設定內容時也可以使用子組件的資料。

以剛剛的 `base-title` 為例:

```html
<div>
  <h2>{{title}}</h2>
  <slot :child-title="title"></slot>
</div>
```

在 `<slot>` 上綁定 `title` 設為 `child-title` ，這麼做是因為只有綁定在 `<slot>` 的屬性才能被 scope 設定所綁定。

> 可以同時綁定多個屬性，像是 `<slot :child-title="title" :child-data="childData"></slot>` ，也可以綁定物件。

接著看父組件:

```html
<base-title title="child content">
  <template slot-scope="child">
    <div>content: {{content}}</div>
    <div>title: {{child.childTitle}}</div>
  </template>
</base-title>
```

在 `<template>` 上設定的 `slot-scope` 是要設置子組件的 scope 名字，在內容中就可以像一般資料一樣使用 `{{}}` 綁定。

## 解構 `slot-scope`

`slot-scope` 會把每個綁定的屬性當作物件的屬性，因此我們可以使用 [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring) 來取得想要的屬性。

如下例所示:

```html
<base-title title="child content">
  <template slot-scope="{ childTitle }">
    <div>content: {{content}}</div>
    <div>title: {{childTitle}}</div>
  </template>
</base-title>
```

我們只把需要的 `childTile` 取出來，這樣在配置的時候就可以少寫一層了。

## DEMO

* [CodePen](https://codepen.io/peterhpchen/pen/zMKYBQ)

## 結語

本文講述了 Slots 的概念及使用方式，其中比較重要的有 named slot 以及 scoped slot ， named slot 可以用名稱來配置不同的區塊，而 scoped slot 可以使用 `slot-scope` 讓我們在寫 Slots 的模板時可以使用子組件的資料。

## 參考資料

* [Vue.js Guide: Slots](https://vuejs.org/v2/guide/components-slots.html)
