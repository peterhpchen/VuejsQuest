# 尋訪其他組件

Vue.js 的正規開發方式建議使用**屬性**及**事件**對其他組件做處理，但還是會有一些情境中會需要直接使用其他組件的各種功能， Vue.js 也提供了這些尋訪的方式。

## 尋訪根實體

可以在任何的子組件中使用 `$root` 取得根實體，如下例所示:

```js
Vue.component('first-layer', {
  template: `<div>
    I am First Layer. $root.a: {{$root.a}}
    <button @click="$root.adda()">Add a</button>
    <second-layer></second-layer>
  </div>`
});

Vue.component('second-layer', {
  template: `<div>
    I am Second Layer. $root.a: {{$root.a}}
    <button @click="$root.adda()">Add a</button>
  </div>`
});

var vm = new Vue({
  el: '#app',
  data: {
    a: 1
  },
  methods: {
    adda: function() {
      this.a += 1;
    }
  }
});
```

```html
<div id="app">
  <first-layer></first-layer>
</div>
```

有兩個階層的組件: `first-layer` 及 `second-layer` ，這兩個組件中都用 `$root.a` 取得存在於根實體中的 `a` 資料，以及使用 `$root.adda()` 叫用只存在於根實體中的 `adda` 方法。

## 尋訪父組件實體

與尋訪根實體的方式相似， Vue.js 提供了 `$parent` 這個物件使我們可以取得父組件實體。

延續上節的例子，在 `first-layer` 中使用 `$parent` 操作根實體的資料 `a` :

```js
Vue.component('first-layer', {
  template: `<div>
    I am First Layer. 
    $root.a: {{$root.a}}
    <button @click="$root.adda()">Add a by $root.adda()</button>
    <button @click="$parent.adda()">Add a by $parent.adda()</button>
  </div>`
});
```

檔案下 `Add a by $parent.adda()` 按鈕時，也可以看到根實體的資料 `a` 的數值變化。

當然 `$parent` 在多階層組件下還是可以運作的:

```js
Vue.component('first-layer', {
  ...
  data: function() {
    return {
      b: 0
    };
  },
  methods: {
    minusb: function() {
      this.b -= 1;
    }
  }
});

Vue.component('second-layer', {
  template: `<div>
    I am Second Layer.
    $root.a: {{$root.a}}
    <button @click="$root.adda()">Add a</button>
    $parent.b: {{$parent.b}}
    <button @click="$parent.minusb()">Minus b</button>
  </div>`
});
```

在 `first-layer` 組件中加入資料 `b` 以及 `minusb()` 這個對 `b` 做減一的方法，在 `second-layer` 中使用 `$parent` 依然可以取得其父組件 `first-layer` 的實體。

## 尋訪子組件實體

子組件的尋訪是使用 `$children` 物件:

```html
<div id="app">
  <first-layer></first-layer>
</div>
```

```js
var vm = new Vue({
  el: '#app',
  data: {
    a: 1
  },
  mounted: function() {
    console.log(this.$children[0].b);   // 0
  },
  methods: {
    adda: function() {
      this.a += 1;
    }
  }
});
```

因為子組件是複數的，所以使用陣列來存取，使用 `$children[0].b` 就可以取得 `first-layer` 的實體。

>> `$children` 不保證組件的順序，意即不能直接看模板上的順序確定組件在 `$children` 陣列中的位置。

### 使用 $ref

不一定每個子組件都是尋訪的目標，因此使用 `$children` 總會需要另外的處理才能找到目標的子組件，本節介紹的 `ref` 屬性可以在子組件上設定，代表這個子組件是我們想要尋訪的目標:

```html
<base-input ref="customInput"></base-input>
```

如此一來，我們就可以使用 `$ref.customInput` 取得這個子組件的實體。

### 使用情境

以剛才的 `base-input` 做衍伸，通常這類的基底組件都會搭配 HTML 原生元素，如下所示:

```js
Vue.component('base-input', {
  template: `<div>
    I am a input component.
    <input ref="input"></input>
  </div>`,
  methods: {
    focus: function() {
      this.$refs.input.focus()
    }
  }
});
```

我們可以將 `ref` 的屬性用在原生元素上，這樣就可以直接做原生地操作了(像是 `focus()`)。

在外層的組件中使用 `base-input` 也可以藉由 `focus()` 方法，以原生元素的方式使用 `base-input` :

```html
<button @click="$refs.customInput.focus()">focus input</button>
```

### 與 `v-for` 搭配

當子組件以 `v-for` 渲染出多個時，原本的物件會以陣列的形式處理複數的子組件實體:

```html
<base-input v-for="n in 10" ref="moreInput"></base-input>
<button @click="$refs.moreInput[0].focus()">focus input[0]</button>
```

## 應避免直接尋訪其他組件

上面這些直接尋訪的方式比起之前介紹的 `props` 及 `event` 的方式簡單許多，但這樣的方式會對開發造成很大的問題，你的程式會變得:

* 難以測試: 因為組件被尋訪實體的物件綁住，變得不能單獨測試。
* 難以復用: 復用時因為尋訪的物件，需要考慮到組件外部的匹配。
* 難以除錯: Bug 發生的原因不會只在組件內部，會因為尋訪物件而有可能由外部發生。

因此在大型專案中應避免使用這類的方式。

## DEMO

* [CodePen](https://codepen.io/peterhpchen/pen/ebWvEp)

## 結語

我們可以使用 `$root` 直接取得根實體， `$parent` 取得父組件實體，以及 `$children` 取得子組件實體，而子組件實體的尋訪可以使用 `$ref` 來做更精確的操作及定位。

## 參考資料

* [Vue.js Guide: Handling Edge Cases](https://vuejs.org/v2/guide/components-edge-cases.html)