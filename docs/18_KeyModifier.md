# `v-on` 的修飾符 Part 2 - 按鍵修飾符

當我們監聽鍵盤或是按鈕事件時，通常會需要設定要以哪一個按鈕觸發事件，一般寫 JavaScript 時要在進入事件時先判斷是否為目標按鍵後才能做想做邏輯處理， Vue.js 希望事件方法專注在邏輯上，而 DOM 事件的處理則應盡量避免，這樣可以最大限度的單純化方法，增加可重用性及可測試性，而 Vue.js 的解決方式就是使用修飾符來設定 DOM 相關的處理，因此 Vue.js 提供了按鍵修飾符來設定想要觸發的按鈕判斷。

## 設定鍵盤修飾符

電腦會將鍵盤上每一個按鈕編上[編號( Key Code )](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)，我們可以在修飾符上設定想要觸發的按鍵編號，這樣只有在按下這個按鈕後才會觸發事件。

如下例，只有在輸入框中按下按鍵編號為 `13` 的 `Enter` 才會觸發事件:

```html
<div id="app">
  <input @keyup.13="what='keyup.13'" />
  <span>You trigger event by <strong>{{what}}</strong></span>
</div>
```

### 使用別名替代編號設置

使用編號設定因為可讀性低，常常都會需要再加個註解來補充這個按鈕的說明，因此 Vue.js 提供了幾個常用的按鈕別名，讓我們可以輕鬆直覺的設定修飾符。

同上例的 `Enter` ，我們可以把原本的 `13` 改為 `enter` ，會擁有一樣的效果:

```html
<div id="app">
  <input @keyup.enter="what='keyup.enter'" />  
  <span>You trigger event by <strong>{{what}}</strong></span>
</div>
```

Vue.js 提供的別名清單如下:

* `.enter`
* `.tab`
* `.delete` (Delete 跟 Backspace 按鈕都會觸發)
* `.esc`
* `.space`
* `.up`
* `.down`
* `.left`
* `.right`

### 客製別名

除了官方提供的別名外， Vue.js 也提供可以自訂義別名的功能。

在 `Vue.config.KeyCodes` 物件中設定自定義的別名:

* `key` : 別名名稱，不可使用 camelCase 設定名稱，但是可以使用雙引號綁定 kebab-case 的別名。
* `value` : 對應的按鍵編號，可以使用陣列同時綁定多個編號。

使用下面的例子解釋:

```js
Vue.config.keyCodes = {
  f1: 112, // f1
  up: [38, 87], // 數字鍵 8 跟 w
  // insertMode: 73, // won't work
  "insert-mode": 73 // i
};
```

```html
<div id="app">
  <input @keyup.f1="what='keyup.f1'" @keyup.up="what='keyup.up'" @keyup.insert-mode="what='keyup.insert-mode'" />
  <span>You trigger event by <strong>{{what}}</strong></span>
</div>
```

在模板上可以直接當成修飾符使用。

## 自動匹配按鍵修飾符

只要是在 [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) 上的按鍵名稱都可以用 kebab-case 的方式設定在修飾符上。

以 [page down 按鈕](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys)為例:

```html
<div id="app">
  <input
    @keyup.page-down="what='keyup.page-down'"
  />
  <span>You trigger event by <strong>{{what}}</strong></span>
</div>
```

這樣設定時， Vue.js 會在函數中使用 `$event.key === 'PageDown'` 判斷式決定是否為目標按鈕。

> 有些按鈕在不同的瀏覽器會有不同的名稱，像是 `ESC` 按鈕在 IE9 或是 Firefox 36 或是更早的版本，是使用 `Esc` 當作名稱，但是目前的瀏覽器都是使用 `Escape` 當作名稱。

## 系統修飾鍵

除了一般的按鍵，我們也可以在修飾符上設定系統按鈕，跟一般的按鈕一起設定可以用相黏鍵的方式觸發。

下面的例子按下 `Alt + c` 或是按住 `Ctrl` 同時點擊輸入框觸發事件:

```html
<div id="app">
  <input
    @keyup.alt.67="what='keyup.alt.67'"
    @click.ctrl="what='click.ctrl'"
  />
  <span>You trigger event by <strong>{{what}}</strong></span>
</div>
```

### 系統修飾鍵不同之處

使用系統修飾鍵設定修飾符的 `keyup` 事件只有在該系統鍵按住的狀態下才會觸發事件，以下面的例子來說:

```html
<div id="app">
  <input"
    @keyup.ctrl="what='keyup.ctrl'"
    @keyup.17="what='keyup.17'"
  />
  <span>You trigger event by <strong>{{what}}</strong></span>
</div>
```

* `@keyup.ctrl` : 要在按住 `Ctrl` 鍵的狀況下釋放其他按紐才會觸發。
* `@keyup.17` : 只要釋放 `Ctrl` 按鈕就會觸發。

## `.exact` 修飾符

設定 `.exact` 修飾符代表一定要完全符合修飾符的設定才會觸發事件，如下所示:

```html
<div id="app">
  <button
    @click.ctrl="what='click.ctrl'"
    @click.ctrl.exact="what='click.ctrl.exact'"
    @click.exact="what='click.exact'"
    @click="what='click'"
  >click me</button>
  <span>You trigger event by <strong>{{what}}</strong></span>
</div>
```

* `@click.ctrl` : 按住 `Ctrl` 點擊觸發事件，因為未加上 `.exact` 修飾符，所以除了按住 `Ctrl` 外，同時按住 `Alt` 或是 `Shift` 也會觸發事件。
* `@click.ctrl.exact` : 只有按住 `Ctrl` 點擊才會觸發事件。
* `@click.exact` : 什麼按紐都不按點擊按鈕才會觸發事件。
* `@click` : 在點擊時按住任何按鈕都會觸發事件。

## 滑鼠按鍵修飾符

Vue.js 提供左中右三顆按鈕的修飾符:

* `.left`
* `.right`
* `.middle`

```html
<div id="app">
  <button
    @click.left="what='click.left'"
    @click.middle="what='click.middle'"
    @click.right="what='click.right'"
  >try left, middle and right</button>
  <span>You trigger event by <strong>{{what}}</strong></span>
</div>
```

## Demo

* [CodePen](https://codepen.io/peterhpchen/pen/jegQMZ)

## 結語

今天介紹了各種的按鈕修飾符使用方式，有按紐編號、別名及按鈕名稱的設定方式可以選擇，要設定系統按鍵也可以使用系統修飾鍵，接著 `.exact` 修飾符可以更精確的設定觸發條件，最後 Vue.js 還提供滑鼠的修飾符供設定。

## 參考資料

* [Vue.js Guide: Key Modifiers](https://vuejs.org/v2/guide/events.html#Key-Modifiers)
* [Vue.js API: keyCodes](https://vuejs.org/v2/api/#keyCodes)
* [MDN: Key Code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)
* [MDN: Key Values](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
