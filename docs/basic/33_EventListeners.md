# 事件監聽器

目前為止介紹了下面幾種事件監聽的時機：

* 元素上使用 `v-on` 監聽原生事件
* 父組件設定 `v-on` 設定所需要監聽的事件，子組件用 `$emit` 觸發事件
* 在 Vue 實體上設定生命週期鉤子監聽各個鉤子事件

上面的方式都是在組件被定義時就要做的設定，也就是靜態的定義方式，但如果要在執行時去動態增減事件的監聽，這時就需要用到 `$on`, `$once` 及 `$off` 這些 JS 函式來做設定。

## 靜態事件監聽

開始說明動態方式之前，先來複習一下靜態的方式。

### 元素上使用 `v-on` 監聽原生事件

```html
<div id="app">
    <button @click="alert('native')">native</button>
</div>
```

```js
var vm = new Vue({
  el: '#app'
});
```

簡單使用 `v-on` 註冊原生事件，就可以設定事件的監聽。

### 父組件設定 `v-on` 設定所需要監聽的事件，子組件用 `$emit` 觸發事件

如果要使用自定義事件，在子組件中設定 `$emit` 發送信號表示欲叫用何種事件，這時父組件如果有使用 `v-on` 註冊該事件，就會觸發事件。

```html
<div id="app">
  <my-button @component-click="alert('component')">component</my-button>
</div>
```

```js
Vue.component('my-button', {
  template: `<button @click="$emit('component-click')"><slot></slot></button>`
});

var vm = new Vue({
  el: '#app'
});
```

在 `<my-button>` 按下按鈕後，送出的 `component-click` 信號會被 `v-on` 所註冊的 `component-click` 接收並觸發事件。

### 在 Vue 實體上設定生命週期鉤子監聽各個鉤子事件

鉤子事件的觸發可以在 Vue 實體上設定各個 `hook` 的函式。

```js
var vm = new Vue({
  el: '#app',
  mounted: function() {
    alert('mounted');
  }
});
```

設定 `mounted` 函式，就可以監聽 `mounted` 鉤子。

## 動態註冊事件監聽器

在整個專案都是使用 Vue.js 構築時，使用靜態註冊事件監聽器是足夠的，但如果專案中 Vue.js 只佔了一部分，要配合其他框架或工具設定監聽事件的話，這時就要靠動態註冊事件。

下面的例子模擬在其他非 Vue 元素建立後，要去註冊對應的事件使 Vue 可以觸發。

```html
<div id="app">
  <div id="vue-app">
    <button @click="$emit('on')">Emit</button>
  </div>
  <div id="other-app">
    <button onclick="otherAppClick()">Add Event</button>
    <button onclick="otherAppClick('once')">Add Event ( once )</button>
    <button onclick="otherAppClick('off')">Off All Event</button>
  </div>
</div>
```

```js
let echoFunc = (echoStr) => () => {alert(echoStr)};

var vm = new Vue({
  el: '#vue-app'
});

function otherAppClick(type) {
  if (type === 'once') {
    vm.$once('on', echoFunc('once'));
  } else if (type === 'off') {
    vm.$off('on');
  } else {
    vm.$on('on', echoFunc('on'));
  }
}
```

* 在 Vue 實體中的按鈕點擊事件觸發 `on` 事件
* 在 Vue 實體外按鈕點擊中模擬 `$on`, `$once` 及 `$off` 方法

如果沒有使用函式註冊事件的話，在 Vue 實體以外的事件是不能被 `$emit` 所觸發的。

### 動態註冊鉤子方法

在使用第三方庫(ex: Pikaday)時，最需要注意的就是在 Vue 實體銷毀時也要一併把庫所建立的實體銷毀，以避免 memory leak 的問題。

一般我們會像下面這樣寫：

```js
new Vue({
  el: '#app',
  data: {
    date: null,
    picker: null
  },
  mounted: function () {
    this.picker = new Pikaday({
      field: this.$refs.dateInput,
      format: 'YYYY-MM-DD'
    });
  },
  beforeDestroy: function() {
    this.picker.destroy();
  }
});
```

* 使用 picker 當作接收 Pikaday 實體的物件
* 於 `mounted` 鉤子中建立 Pikaday 實體
* 在 `beforeDestroy` 時叫用 Pikaday 的 `destroy` 方法

這樣做有兩個壞處：

* 需要管理 picker 物件，但這物件只是為了銷毀 Pickaday 實體使用，跟此 Vue 實體沒有關係
* 建立及銷毀 Pickaday 實體的代碼分離並散落在實體中，在開發時實體上充斥著這些與此實體無關的代碼，造成開發上的麻煩

為了避免這個問題，我們可以使用 `$once` 在建立 Pickaday 實體的同時去註冊銷毀的事件：

```js
new Vue({
  el: '#app',
  data: {
    date: null,
    // picker: null
  },
  mounted: function () {
    // this.picker =
    const picker = new Pikaday({
      field: this.$refs.dateInput,
      format: 'YYYY-MM-DD'
    });
    this.$once('hook:beforeDestroy', function() {
      picker.destroy();
    });
  },
  // beforeDestroy: function() {
  //   this.picker.destroy();
  // }
});
```

這樣不僅可以減少 picker 資料物件，也可以使代碼集中至真正處理的地方，以避免模糊焦點。

以下列出全部的鉤子事件；

```js
// https://github.com/vuejs/vue/blob/dev/src/shared/constants.js#L9
export const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
]
```

## 事件監聽方法

上面說明使用情境，現在來講解各個方法的使用。

### `vm.$on( event, callback )`

註冊事件及其叫用的函式。

```html
<div id="app">
  <button @click="$emit('on')">on</button>
  <button @click="$emit('on2')">on2</button>
</div>
```

```js
var vm = new Vue({
  el: '#app',
  mounted: function() {
    let echoFunc = (echoStr) => () => {alert(echoStr)};

    let echoOn = echoFunc('on');
    let echoOn2 = echoFunc('on2');

    this.$on('on', echoOn);
    this.$on(['on', 'on2'], echoOn2);
  }
});
```

* 使用 `$on` 註冊 `on` 事件，當觸發 `on` 事件時，會觸發 `echoOn` 方法
* `$on` 註冊事件支援陣列形式，可以同時對多個事件註冊相同的方法，例子中使用 `echoOn2` 同時註冊 `on` 及 `on2` 事件

### `vm.$once( event, callback )`

註冊事件及其叫用的函式，但只觸發一次。

```html
<div id="app">
  <button @click="$emit('once')">once</button>
</div>
```

```js
var vm = new Vue({
  el: '#app',
  mounted: function() {
    let echoFunc = (echoStr) => () => {alert(echoStr)};

    let echoOnce = echoFunc('once');

    this.$once('once', echoOnce);
  }
});
```

使用 `$once` 監聽的事件只會觸發一次。

### `vm.$off( [event, callback] )`

刪除監聽事件。

```html
<div id="app">
  <button @click="$emit('once')">once</button>
  <button @click="$emit('on')">on</button>
  <button @click="$emit('on2')">on2</button>
  <button @click="$emit('off-all')">off all</button>
  <button @click="$emit('off-on')">off on</button>
  <button @click="$emit('off-echo-on2')">off echo on2</button>  
  <button @click="$emit('off-on-and-once')">off on and once</button>
</div>
```

```js
var vm = new Vue({
  el: '#app',
  mounted: function() {
    let echoFunc = (echoStr) => () => {alert(echoStr)};
    
    let echoOnce = echoFunc('once');    
    
    let echoOn = echoFunc('on');
    let echoOn2 = echoFunc('on2');
    
    this.$once('once', echoOnce);
    
    this.$on('on', echoOn);
    this.$on(['on', 'on2'], echoOn2);
    
    this.$on('off-all', () => {
      this.$off(); // 註銷此實體上所有事件監聽器
    });
    
    this.$on('off-on', () => {
      this.$off('on'); // 註銷特定名稱事件監聽器
    });
    
    this.$on('off-echo-on2', () => {
      this.$off('on', echoOn2); // 註銷特定名稱的特定事件監聽器
    });
    
    this.$on('off-on-and-once', () => {
      this.$off(['on', 'once']); // 註銷多個特定名稱的事件監聽器
    });
  }
});
```

* 如果沒有任何參數，刪除此實體上所有事件監聽器
* 第一個參數可以指定特定名稱的事件，同時可以是陣列以選擇多個特定名稱的事件
* 第二個參數如果沒有指定，會將特定名稱的所有事件刪除
* 第二個參數如果有指定事件，則將其特定事件刪除

## 代碼

* [CodePen: Listener](https://codepen.io/peterhpchen/pen/MLgGMd)
* [CodePen: Dynamic Listener](https://codepen.io/peterhpchen/pen/JqQaGv)
* [CodePen: Vue pikaday](https://codepen.io/peterhpchen/pen/YboOWd)

## 總結

使用方法註冊事件監聽器使 Vue.js 的事件處理更加的靈活，並且在跟其他第三方庫或是現存專案的整合上更有彈性。

## 參考資料

* [Vue.js guide: Programmatic Event Listeners](https://vuejs.org/v2/guide/components-edge-cases.html#Programmatic-Event-Listeners)
* [Vue.js API: Instance Methods / Events](https://vuejs.org/v2/api/#Instance-Methods-Events)