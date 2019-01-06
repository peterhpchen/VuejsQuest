# 依賴注入

前面介紹到可以使用 `$parent` 來訪問父組件的實體，這樣的方式限制了存取的實體一定要與被引用的組件是直接的關係，這樣的存取方式會使組件間變得有強大的耦合，限縮了組件的彈性，本文要介紹的依賴注入方式可以減少兩個組件間的關聯性，增加各組件的彈性。

## 使用 `$parent` 的限制

以一個樹的組件來解釋使用 `$parent` 的問題，假設有兩個組件: `root` 跟 `node` :

```js
Vue.component('root', {
  name: 'root',
  template: `
    <div>
      {{nodeName}}
      <slot></slot>
    </div>
  `,
  props: ['nodeName']
});

Vue.component('node', {
  name: 'node',
  template: `
    <div @click.stop="showRoot">
      {{nodeName}}
      <slot></slot>
    </div>
  `,
  props: ['nodeName'],
  methods: {
    showRoot: function() {
      alert('Root Name: ' + this.$parent.nodeName);
    }
  }
});

var vm = new Vue({
  el: '#app'
});
```

點擊 `node` 組件時會觸發事件，顯示出樹根的名字，這裡使用 `this.$parent.nodeName` 取得樹根的名字，在下面這樣單層的結構中是沒有問題的:

```html
<div id="app">
  <root node-name="Root">
    <node node-name="Node">
    </node>
  </root>
</div>
```

但如果是三層以上的結構會變為下面這樣:

```html
<div id="app">
  <root node-name="Root">
    <node node-name="Node">
      <node node-name="NodeOfNode">
      </node>
    </node>
  </root>
</div>
```

當結構是如此時， `this.$parent.nodeName` 取得的就不再是 `Root` 了，而會取到 `Node` ，因此使用 `$parent` 限制了整個樹組件的可用性，接下來我們使用依賴注入改寫這個例子。

## 使用依賴注入

使用依賴注入有兩個要設定的地方:

* 要注入的物件需要由 `inject` 設置。
* 被注入的物件需要由 `provide` 設置。

上面的例子中注入的物件為 `root` 組件的 `nodeName` ，所以要在 `root` 組件中使用 `provide` 屬性來提供 `rootName` 的值為 `nodeName` 的設定:

```js
Vue.component('root', {
  ...
  provide: function() {
    return {
      rootName: this.nodeName
    };
  }
});
```

接著我們在注入給 `node` 組件，使用 `inject` 屬性設置要注入的 `rootName` 物件:

```js
Vue.component('node', {
  ...
  inject: ['rootName'],
  methods: {
    showRoot: function() {
      alert('Root Name: ' + this.rootName);
    }
  }
});
```

如此一來就可以直接在 `node` 實體中使用 `rootName` 了。

## 依賴注入不用每層都做 `inject` 設定

在上面的例子中由於除了 `root` 組件外下層都是使用 `node` 組件做設定的，這樣可能會形成每層都需要設置 `inject` 的錯誤觀念，實際上 Vue.js 的依賴注入不管中間的組件有沒有 `inject` 都可以在下層的組件中做注入的動作。

下面我們修改一下上面的例子，使用在 `root` 跟 `node` 外多加一個 `leaf` 組件，再來將 `node` 中的注入拔除:

```js
Vue.component('node', {
  name: 'node',
  template: `
    <div @click.stop="showRoot">
      {{nodeName}}
      <slot></slot>
    </div>
  `,
  props: ['nodeName'],
  // inject: ['rootName'],
  // methods: {
  //   showRoot: function() {
  //     alert('Root Name: ' + this.rootName);
  //   }
  // }
});

Vue.component('leaf', {
  name: 'leaf',
  template: `
    <div @click.stop="showRoot">
      {{nodeName}}
      <slot></slot>
    </div>
  `,
  props: ['nodeName'],
  inject: ['rootName'],
  methods: {
    showRoot: function() {
      alert('Root Name: ' + this.rootName);
    }
  }
});
```

```html
<div id="app">
  <root node-name="Root">
    <node node-name="Node">
      <node node-name="NodeOfNode">
        <leaf node-name="Leaf">
        </leaf>
      </node>
    </node>
  </root>
</div>
```

在上面的結構下， `root` 跟 `leaf` 沒有直接的關係，但是 `inject` 依然有效，說明了 `inject` 不用是直接的上下層關係。

## `provide` 及 `inject` 屬性使用方式

### `provide`

將要被注入到其他組件的物件定義在 `provide` 屬性，其它的組件才可以注入這些物件， `provide` 有兩個設定方式: 物件及函式:

```js
// Object
var Provider = {
  provide: {
    foo: 'bar'
  }
}

// () => Object
var Provider = {
  provide: function() {
    return {
      foo: 'bar'
    }
  }
}
```

設定的變數為固定的時候(例如: `string` 或 `number` )，可以直接使用物件設定就好，但像是上面的例子( `this.nodeName` )那樣的變數就要使用函式才能設置。

### `inject`

`inject` 的基本設置就是陣列，陣列中的字串是要注入的物件名稱:

```js
inject: ['foo']
```

這樣就可以把 `foo` 給注入到組件中做使用。

另一個設定方式為物件，物件的 `Key` 為注入的物件名稱，而 `Value` 是一個物件，這個物件有兩個可選的屬性: `from` 及 `default` :

* `from` : 目標物件名稱，在注入的組件中想要改變被注入物件的名稱時使用此屬性設置。
* `default` : 當上層沒有相符的被注入物件時使用此數值當作預設值。

下面繼續使用之前的樹組件當作例子:

```js
Vue.component('leaf', {
  ...
  inject: {
    rootAlias: {
      from: 'rootName'
    }
  },
  methods: {
    showRoot: function() {
      alert('Root Name: ' + this.rootAlias);
    }
  }
});
```

這裡將注入進來的 `rootName` 改名為 `rootAlias` ，因此在 `leaf` 組件中就可以使用 `rootAlias` 取得 `rootName` 的資料了。

接著我們將樹組件的結構改為下面這樣:

```html
<node node-name="Node">
  <node node-name="NodeOfNode">
    <leaf node-name="Leaf">
    </leaf>
  </node>
</node>
```

將 `root` 組件從結構中拔除，這意味著 `leaf` 已經拿不到 `rootName` 了，所以點擊後 `Root` 的名稱會變為 `undefined` ，這時可以在設定上加上 `default` :

```js
Vue.component('leaf', {
  ...
  inject: {
    rootAlias: {
      from: 'rootName',
      default: 'Default Root'
    }
  },
  methods: {
    showRoot: function() {
      alert('Root Name: ' + this.rootAlias);
      // alert('Root Name: ' + this.rootName);
    }
  }
});
```

這樣就可以避免上層沒有注入而導致錯誤的情形。

## DEMO

* [CodePen](https://codepen.io/peterhpchen/pen/rovBed)

## 結語

依賴注入在一般的開發上使用到的機會比較少，但如果是在開發或是使用一些底層或是通用的工具時就可能要了解依賴注入的使用方式，像是 [VeeValidate](https://baianat.github.io/vee-validate/concepts/injections.html#injecting-parent-validator) 中如果要在不同的組件使用相同的驗證器的話就需要使用依賴注入。

## 參考資料

* [Vue.js Guide: Dependency Injection](https://vuejs.org/v2/guide/components-edge-cases.html#Dependency-Injection)
* [Vue.js API: provide / inject](https://vuejs.org/v2/api/#provide-inject)