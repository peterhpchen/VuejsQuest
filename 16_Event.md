# 事件處理

Vue.js 中可以使用 `v-on` 監聽 DOM 事件，當事件觸發時可以叫用設定的函數或是 JavaScript 陳述式做相關的處理。

## 使用 JavaScript 表達式綁定事件

`v-on` 可以使用 JavaScript 陳述式設定，如下例所示:

```js
var vm = new Vue({
  el: '#app',
  data: {
    a: 1,
    b: 10
  }
});
```

```html
<div id="app">
  <button @click="a += 1;b -= 1;">a+ and b-</button>
  {{a}}:{{b}}
</div>
```

> `v-on` 可以用 `@` 縮寫表達。

當按下按紐時，由 `v-on` 監聽的 `click` 事件會去執行設定的陳述式 `a += 1;b -= 1;` ，因此可以看到 `a` 做了加一而 `b` 做了減一的變化。

這裡的陳述式( Statement )並不是表達式( Expression )，表達式是會是一個數值，而陳述式則是一段完整的程式碼，所以我們可以在 `v-on` 的 Value 中寫出像是 `a += 1;b -= 1;` 這樣的程式碼。

## 使用事件名稱綁定事件

上節講的是一個極為簡單的例子，一般的情況下，事件內的處理不會如此的單純，這意味著如果要用陳述式撰寫事件函數，將會導致模板的混亂，因此 Vue.js 提供了設定方法名稱的方式:

```html
<div id="app">
  <div>
    <button @click="aPlus1AndbMinus">a+ and b-</button>
    {{a}}:{{b}}
  </div>
</div>
```

```js
var vm = new Vue({
  el: '#app',
  data: {
    a: 1,
    b: 10
  },
  methods: {
    aPlus1AndbMinus: function(event) {
      this.a += 1;
      this.b -= 1;

      console.log(`You clicked ${event.target.tagName}`);
    }
  }
});
```

我們先從**方法的設定**開始講起，在選項物件中使用 `methods` 屬性設定方法， `methods` 屬性中的每個鍵值都是一個**方法的名稱**(如上例的 `aPlus1AndbMinus` )，而 Value 就是**方法的函數**。

> 方法中的 `this` 會指向 Vue 實體，所以不能使用會將 `this` 指向上層內容的 arrow function 。

現在回來說事件綁定，當使用事件名稱綁定時，方法中的第一個參數會是**原生的 DOM 事件物件**，所以你可以使用這個物件來操作**叫用此事件的元素**(例如: 顯示標籤名稱)。

## 直接使用事件綁定

除了上面兩種定義方式外，事件還可以直接使用 JavaScript 陳述式設定叫用的方法，使用方式如下:

```html
<div id="app">
  <div>
    <button @click="clickWhat('hi', $event)">hi</button>
    <button @click="clickWhat('yo', $event)">yo</button>
    You click {{what}} {{tag}}
  </div>
</div>
```

```js
var vm = new Vue({
  el: '#app',
  data: {
    what: '',
    tag: '',
  },
  methods: {
    clickWhat: function(what, event) {
      this.what = what;
      this.tag = event.target.tagName;
    }
  }
});
```

方法可以傳入參數，而當你需要原生的 DOM 事件物件時，可以用 `$event` 當作參數傳入方法中，在方法裡就可以使用。

## 使用物件綁定事件

使用物件綁定的方式可以在同個屬性上綁定多個事件，但這些物件都只能用**事件名稱**設定，不能用事件或是陳述式設定。

設定的方法如下例所示:

```html
<div id="app">
  <div>
    <button v-on="{ mousedown: showDown, mouseup: showUp }">click me</button>
    {{doWhat}}
  </div>
</div>
```

```js
var vm = new Vue({
  el: '#app',
  data: {
    doWhat: ''
  },
  methods: {
    showUp: function(event) {
      this.doWhat = `up ${event.target.tagName}`;
    },
    showDown: function(event) {
      this.doWhat = `down ${event.target.tagName}`;
    }
  }
});
```

以 Key 為欲綁定的事件名稱， Value 為觸發事件時想要叫用的方法名稱。

> 物件的設定方式不能使用簡寫的 `@` 。

> 在物件中的設定不能使用任何的修飾符，關於修飾符在下一篇會詳細講解。

## 只綁定修飾符

最後要介紹的是沒有任何 Value 的設定方式，單純只使用事件修飾符。

> 像是 `event.preventDefault()` 或 `event.stopPropagation()` 這類的處理常常會在事件中用到， Vue.js 中可以設定相關的事件修飾符，以減少方法中的代碼量。

```html
<form @submit.prevent>
  <button type="submit">submit</button>
</form>
```

`prevent` 修飾符會叫用 `event.preventDefault()` 以阻止表單送出，可以把例子中的 `@submit.prevent` 拔掉，比較看看按下 `submit` 按鈕的差異。

在沒有 `@submit.prevent` 的情況下，頁面會閃一下，這時頁面已送出表單並重新載入了，而加上 `@submit.prevent` 後畫面不會重新載入。

## DEMO

* [CodePen](https://codepen.io/peterhpchen/pen/OBYZWe)

## 小結

今天介紹了五種設定事件處理的方式:

* 使用 JavaScript 陳述式: 這樣的設定方式適合簡單的事件處理。
* 使用方法名稱: 在選項物件中設定 `methods` 屬性，可以叫用對應的方法，而傳入的第一個參數為原生的 DOM 事件物件。
* 使用 JavaScript 陳述式叫用方法: 可以傳入自定義參數，如果要使用原生 DOM 事件物件可以用 `$event` 傳入方法中。
* 使用物件定義: 物件可以設定多個方法，但限制是只能使用方法名稱設置，並且不能使用修飾符。
* 只使用事件修飾符: 只執行事件修飾符中設定的代碼。

下一章會介紹各種修飾符的功能及使用方式。

## 參考資料

* [Vue.js Guide: Event Handling](https://vuejs.org/v2/guide/events.html)
* [Vue.js API: v-on](https://vuejs.org/v2/api/#v-on)