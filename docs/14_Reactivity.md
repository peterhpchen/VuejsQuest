# 響應系統

到現在我們對**改變 vue 實體上的資料就可以重新渲染畫面**這件事已經習以為常了，但實際上是如何運作的呢?

今天會介紹 Vue.js 如何以它的響應系統同步資料及頁面渲染。

## 響應系統流程圖

Vue.js 官方提供了下面的流程圖:

![data](../image/14_Reactivity/data.png)

這張圖分為了幾個部分:

* **Component Render Function**
* **Virtual DOM Tree**
* **Data**
* **Watcher**

下面我們依序說明。

### Component Render Function

稱做渲染函數，**Virtual DOM Tree** 會依照渲染函數的設定建立。

目前還未講到渲染函數，可是我們之前介紹很多的模板語法會被 Vue.js 的編譯器轉為渲染函數，所以由此可知，渲染函數是定義畫面結構及綁定資料的函數。

### Virtual DOM Tree

當我們定義好渲染函數或是模板語法後，在建立實體的時候會依照函數的設定建立 Virtual DOM Tree ，這棵樹會直接連接頁面上的每個 DOM 元素。

### Data

當實體建立時， Vue.js 會將所有定義在 **data** 的屬性設定 `getter` 及 `setter` ，當 `setter` 觸發時會觸動監聽器行動。

### Watcher

負責監看 `data` 是否有變化，當變化發生時，會將所有跟發生變化的 `data` 有關的屬性收集起來並叫用渲染函數重新渲染。

## 流程

上節介紹了每一個區塊的名詞解釋，現在來說明區塊間的箭頭做了哪些事情。

### 建立實體

建立實體時會將選項物件中定義資料屬性都設上 `getter` 及 `setter` ，並將每個資料的初始值丟給渲染函數去建立 Virtual DOM Tree 。

頁面會依照 Virtual DOM Tree 所定義的方式去配置，這時我們可以看到以初始資料渲染而成的頁面。

### 資料變化

頁面上配置的資料被改變時，監聽器會被 `data` 的 `setter` 給喚醒，收集所有跟變化相關的資料後，叫用渲染函數重新建立 Virtual DOM Tree ，觸發頁面配置改變。

## 未在初始資料屬性上的資料

由上面的流程可以知道 vue.js 是在實體初始的時候設定全部資料的 `getter` 及 `setter` ，所以在初始化後再新增或是刪除資料，會因為 `getter` 及 `setter` 不會再重新設置而無法同步至頁面上，以下面的程式為例:

```js
var vm = new Vue({
  el: '#app',
  data: {
    a: 1
  },
  created() {
    this.b = 1;
  }
});
```

在 `created` 鉤子函數，也就是實體已經建立後，在實體上加上 `b` 屬性，並設為 `1` 。

接著是 HTML 代碼:

```html
<div id="app">
  <div>
    <button @click="a+=1">a++</button>
    {{a}}
  </div>
  <div>
    <button @click="b+=1">b++</button>
    {{b}}
  </div>
</div>
```

設置兩個按鈕分別對 `a` 及 `b` 做加的動作。

現在可以先按 `a++` 的按鈕， a 的數值如實反映在畫面上，但當按下 `b++` 時，畫面不會出現任何變化，但是在按完 `b++` 後再回去按 `a++` 會發現 `a` 跟 `b` 被同時更新了，這是因為:

* `a++` 按鈕會觸發 `data` 中的 `setter` 更新 `a` 的數值，而 `setter` 會觸發監聽器去啟動渲染函數。
* `b++` 按紐會更新 `b` 的數值，但因為沒有 `setter` 所以不會觸發監聽器。
* `a++` 在 `b++` 按鈕後按了之後依然會觸發監聽器，因此會啟動渲染函數，這時函數去抓的資料 a 及 `b` 資料都會是最新的數值，因此 `b` 會被更新。

由上面可知， `b` 的數值雖然更新了，但沒有觸發到監聽器，因此要修正 `b++` 按鈕的問題，可以使用 `vm.$forceUpdate()` 強迫更新畫面:

```js
var vm = new Vue({
  el: '#app',
  data: {
    a: 1
  },
  created() {
    this.b = 1;
  },
  methods: {
    plusB() {
      this.b += 1;
      this.$forceUpdate();
    }
  }
});
```

```html
<div id="app">
  <div>
    <button @click="a+=1">a++</button>
    {{a}}
  </div>
  <div>
    <!-- <button @click="b+=1">b++</button> -->
    <button @click="plusB">b++</button>
    {{b}}
  </div>
</div>
```

## Update Queue

Vue 不會資料一產生變化就馬上重新渲染畫面，它會在事件循環(又稱 `tick` )中所有的程式碼執行完成後再去重新渲染畫面，避免不必要的計算及元素的操作。

在一般使用 vue 的情況下，我們都只會對 `data` 做處理，所以不會注意到 vue 有這樣的處理，但當我們需要對 DOM 做處理時，這件事常常造成我們的困擾，例如下面這個例子:

```html
<div id="app2">{{a}}</div>
```

```js
var vm = new Vue({
  el: '#app2',
  data: {
    a: 1
  },
  mounted() {
    this.a = 2;
    console.log(this.$el.textContent === '2');  // false
  }
});
```

修改 `a` 為 `2` 後，我們想要對 DOM 元素做處理，但由 `this.$el.textContent === '2'` 的結果為 `false` 可以知道 DOM 元素還未更新，這是因為兩行代碼都在同個事件循環( `tick` )中，所以還未重新渲染畫面。

為此我們要在下個 `tick` 才能去判斷 `this.$el.textContent === '2'` 的結果，可以使用 `nextTick` 中的 callback 函數做下個 `tick` 要做的處理:

```js
var vm = new Vue({
  el: '#app2',
  data: {
    a: 1
  },
  mounted() {
    this.a = 2;
    console.log(this.$el.textContent === '2');  // false
    this.$nextTick(() => {
      console.log(this.$el.textContent === '2'); // true
    })
  }
});
```

## DEMO

* [CodePen](https://codepen.io/peterhpchen/pen/ZqPjxB)

## 小結

本章先說明整個響應系統的流程及名詞解釋，之後說明 `forceUpdate` 及 `nextTick` 的用法。

`forceUpdate` 只會去強迫重新渲染而已，並不會重新設置 `getter` 及 `setter` ，因此屬性並不能被監聽器或是計算屬性所設置，在下一章我們將學會如何使用 `$set` 在實體上設置一個新的屬性，使用 `$set` 所設置的屬性就會擁有自己的 `getter` 及 `setter` ，會是一個完整的資料屬性。

## 參考資料

* [Vue.js Guide: Reactivity in Depth](https://vuejs.org/v2/guide/reactivity.html)
