# 模板定義

一般在定義模板的時候，會直接在 `template` 屬性上設定，像是下面這樣：

```html
<div id="app">
  <h2>Default Template</h2>
  <default-template-component></default-template-component>
</div>
```

```js
Vue.component('default-template-component', {
  data: function() {
    return {
      content: 'default template component content'
    };
  },
  template: `<div>
    {{content}}
    <button @click="clickBtn">alert</button>
  </div>`,
  methods: {
    clickBtn: function() {
      alert(`click ${this.content} button`);
    }
  }
});

var vm = new Vue({
  el: '#app'
});
```

這是最常用的模板定義方式，而 Vue.js 為了使組件設定更為彈性，另外設計了兩種模版定義的方式： **Inline Template** 及 **X-Template** 。

## Inline Template

有時我們在定義組件時會有需求先不定義模板，而是在父組件定義時在做模版的設定，這時使用 `inline-template` 屬性可以將模板定義在組件的內部內容中。

```html
<div id="app">
  <h2>Inline Templates</h2>
  <inline-template-component inline-template>
    <div>
      {{content}}
      <button @click="clickBtn">alert</button>
    </div>
  </inline-template-component>
</div>
```

```js
Vue.component('inline-template-component', {
  data: function() {
    return {
      content: 'inline template content'
    };
  },
  methods: {
    clickBtn: function() {
      alert(`click ${this.content} button`);
    }
  }
});
```

在組件定義中不用設定 `template` 屬性，直接在組件的內容中設定模板，如此一來就可以在父組件上再定義模板了。

### Dynamic Component

在 `<component>` 中也可以使用 `inline-template` 屬性：

```html
<div id="app">
  <h2>Dynamic Component Inline Template</h2>
  <button @click="dynamicComponent='inline-template-component'">component</button>
  <button @click="dynamicComponent='inline-template-component2'">component2</button>
  <component :is='dynamicComponent' inline-template>
    <div>
      {{content}}
      <button @click="clickBtn">alert</button>
    </div>
  </component>
</div>
```

```js
Vue.component('inline-template-component', {
  data: function() {
    return {
      content: 'inline template content'
    };
  },
  methods: {
    clickBtn: function() {
      alert(`click ${this.content} button`);
    }
  }
});

Vue.component('inline-template-component2', {
  data: function() {
    return {
      content: 'inline template content 2'
    };
  },
  methods: {
    clickBtn: function() {
      alert(`click ${this.content} button`);
    }
  }
});

var vm = new Vue({
  el: '#app',
  data: {
    dynamicComponent: 'inline-template-component'
  }
});
```

* 在 `<component>` 上加入 `inline-template` 屬性
* 動態切換組件時只要有 `inline-template` ，就會使用內容做模板的定義

## X-Template

更進一步，如果需要使用 Vue 實體外的 html 結構作為模板定義的話，使用 `<script type="text/x-template">` 標籤設定模板，並且給予 `id` 資訊，在組件中的 `template` 屬性設定目標 `id` ：

```html
<div id="app">
  <h2>X-Template</h2>
  <x-template-component></x-template-component>
</div>
<script type="text/x-template" id="x-template">
  <div>
    {{content}}
    <button @click="clickBtn">alert</button>
  </div>
</script>
```

```js
Vue.component('x-template-component', {
  data: function() {
    return {
      content: 'x-template content'
    };
  },
  template: '#x-template',
  methods: {
    clickBtn: function() {
      alert(`click ${this.content} button`);
    }
  }
});
```

在 Vue app 外設定模板（`<script type="text/x-template" id="x-template">`），在組件的 `template` 設定 `#x-template` 。

## 風險

在增加彈性的同時，也會承受相當的風險：

* 使用 inline template 時由於是定義在 tag 的內容中，容易將模板定義及插件的使用搞混，增加閱讀的困難。
* inline template 及 x-template 的方式會造成組件定義及模板分散，造成維護上的困難。

除了特殊的情況外，最佳的方式還是在組建定義內設定模板以避免上述的風險產生。

## DEMO

* [CodePen](https://codepen.io/peterhpchen/pen/dExdqY)

## 總結

對於模板的定義， Vue.js 提供了 inline template 及 x-template 這兩種方法，使模板的定義方式可以延伸到父組件或是 Vue app 外，增加設定的彈性，但是也要面臨代碼分離及定義模糊等風險。

## 參考資料

* [Vue.js Guide: Alternate-Template-Definitions](https://vuejs.org/v2/guide/components-edge-cases.html#Alternate-Template-Definitions)
* [Vue.js API: component](https://vuejs.org/v2/api/#component)