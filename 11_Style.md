# 樣式綁定

前面講了 Class 的特殊綁定方式，今天要來看看樣式的綁定方式。

## 字串綁定

Style 是 Key Value 做為一組，單個 DOM 元素可以設置多個 Style，以 `;` 區隔各個 Style ，像下面這樣:

```html
<span style="font-size:12px;font-weight:bold">Static Style</span>
```

這是個靜態的 Style 設定，使用 Vue.js 後，可以利用實體中的資料，綁定 Style 的字串:

```js
var vm = new Vue({
  data: {
    inlineStyle: "font-size:12px;font-weight:bold"
  }
});
```

```html
<span :style="inlineStyle">Hello Style Binding</span>
```

在 Vue 實體中可以修改 `inlineStyle` 的值，例如向下面的例子:

```html
<button @click="plusInlineFontSize">+</button>
<button @click="minusInlineFontSize">-</button>
<span :style="inlineStyle">Hello Style Binding</span>
```

這裡多兩個按鈕，分別為加跟減 Style 的字體大小，而 `plusInlineFontSize` 及 `minusInlineFontSize` 方法可以用下面的方法實作:

```js
var vm = new Vue({
  data: {
    inlineStyle: "font-size:12px;font-weight:bold"
  },
  methods: {
    plusInlineFontSize() {
      let styles = this.inlineStyle.split(';');
      this.inlineStyle = styles.map(style => this.countFontSize(style, true)).join(';');
    },
    minusInlineFontSize() {
      let styles = this.inlineStyle.split(';');
      this.inlineStyle = styles.map(style => this.countFontSize(style, false)).join(';');
    },
    countFontSize(style, isPlus){
      let fontSizeIndex = style.indexOf('font-size:');
      if(fontSizeIndex === -1) return style;
      let size = parseInt(style.substring(0 + 'font-size:'.length, style.indexOf('px')));
      size = isPlus ? ++size : --size;
      return `font-size:${size}px`;
    }
  }
});
```

這裡為了改變字體大小需要:

* 以 `;` 切開字串，取得各個 Style 。
* 每個 Style 檢查是否是 `font-size` ，如果是，將數值取出來做加減。

這樣的處理可以使字體大小變化，但這樣的處理脫離了本來操作 Style 的單純動作，已經是在處理字串的重組。

## 物件綁定

Vue.js 提供了使用物件綁定 Style 的功能，例如下面可以使用計算屬性改寫本來用字串綁定的範例:

```js
var vm = new Vue({
  data: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  computed: {
    objStyle() {
      return {
        fontSize: `${this.fontSize}px`,
        fontWeight: this.fontWeight
      };
    }
  }
});
```

```html
<div>
  <button @click="fontSize += 1">+</button>
  <button @click="fontSize -= 1">-</button>
  <span :style="objStyle">Hello Style Binding by obj</span> 
</div> 
```

這樣只要對 `fontSize` 做加減，字體就會變大變小了，跟之前字串綁定時的方法相比，是不是繼簡潔又易讀呢?

> `objStyle` 物件中的 `fontSize` 及 `fontWeight` 在轉換為 Style 時會變為將**大寫前面加上 `-`** ，並**轉大寫為小寫**， 像是 `font-size` 及 `font-weight` 來符合 CSS 的語法，所以在物件中可以放心寫一般物件的命名方式，當然要寫 CSS 的屬性名也是可以，使用引號括起來即可(例如 `'font-size'` 或是 `"font-size"`)。

## 陣列綁定

如果多組的 Style 要綁定在同個 DOM 元素，例如說有一個物件是字體的設定，而另一個是背景的設定，我們可以像下面這樣設定:

```html
<span :style="[fontStyleObj, backgroundStyleObj]">Hello Style Binding by arr</span>
```

```js
var vm = new Vue({
  data: {
    fontStyleObj: {
      color: 'red',
      fontStyle: 'italic'
    },
    backgroundStyleObj: {
      background: 'blue'
    }
  }
});
```

加上陣列的方法， Style 的設定又可以更有彈性，可以輕鬆的完成各種需求。

## 樣式前綴字自動補上

使用 Vue.js 綁定 Style 時， Vue 會幫忙把 `-webkit-` 、 `-moz-` ... 等特定瀏覽器的特殊屬性所需的前綴字加上，就不需要自己寫上全部的前綴字了。

## 綁定多個屬性值

而如果設定的 CSS 屬性在每個瀏覽器的值不同，在 Value 的地方可以使用陣列寫出不同瀏覽器上的屬性值， Vue.js 會從最後一個開始驗證是否可以用在目前的瀏覽器上，找到的話就用此屬性設定樣式。

例如使用 `flexbox` 的時候可以像下面這樣設定:

```html
<div v-bind:style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

當使用的瀏覽器可以使用 `flexbox` 的話，就會使用 `flex` ，要不然就會在往前找，找到符合的為止。

> 可以把順序移動一下，例如說把 IE 專用 `-ms-flexbox` 放到最後的話，在 Chrome 開啟的時候依然會用 `flex` 渲染。

## Demo

* [CodePen](https://codepen.io/peterhpchen/pen/KGbazN)

## 小結

Style 在 Vue 中有多種綁定方式，本文從字串開始介紹，依序為物件、陣列，最後在講解 Vue.js 幫我們處理掉了瀏覽器前綴字的判斷，讓我們可以更簡潔的設定 CSS 。

## 參考資料

* [Vue.js Guide: Binding Inline Styles](https://vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles)