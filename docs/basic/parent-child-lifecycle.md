# 父元件及子元件間的生命週期(Lifecycle)

之前已經有提到 [Vue 實體的生命週期](/basic/04_Lifecycle.md)，現在我們來研究一下如果加上子元件的話整個生命週期會是怎麼跑的。

## 建立父元件

使用 Vue 的 root 當作父元件：

```html
<div id="app" style="background-color: green;">
  root count: {{count}}
  <button @click="count++">+1 for root</button>
  <button @click="$destroy()">destroy root</button>
  ...
</div>
```

* 設置 `count` 並變動其值以便測試 `update` 鉤子
* 設置 `$destroy` 事件 trigger 以便測試 `destroy` 鉤子

```js
var vm = new Vue({
  el: "#app",
  data: {
    count: 0
  },
  beforeCreate() {
    console.log("root beforeCreate");
  },
  created() {
    console.log("root create");
  },
  beforeMount() {
    console.log("root beforeMount");
  },
  mounted() {
    console.log("root mounted");
  },
  beforeUpdate() {
    console.log("root beforeUpdate");
  },
  updated() {
    console.log("root updated");
  },
  beforeDestroy() {
    console.log("root beforeDestroy");
  },
  destroyed() {
    console.log("root destroyed");
  }
});
```

在各個 hook 上設置 `console.log` 以便觀察其觸發的時機。

## 建立子元件

使用 `Vue.component` [註冊元件](/basic/22_ComponentRegistration.md#全域註冊)。

```js
Vue.component("child-component", {
  template: `
    <div :style="style">{{$options.name}} count: {{count}}
      <button
        @click="count++"
      >+1 for child</button>
      <button
        @click="$destroy()"
      >destroy child</button>
    </div>`,
  data() {
    return {
      count: 0,
      style: "background-color: pink;"
    };
  },
  beforeCreate() {
    console.log(`${this.$options.name} beforeCreate`);
  },
  created() {
    console.log(`${this.$options.name} create`);
  },
  beforeMount() {
    console.log(`${this.$options.name} beforeMount`);
  },
  mounted() {
    console.log(`${this.$options.name} mounted`);
  },
  beforeUpdate() {
    console.log(`${this.$options.name} beforeUpdate`);
  },
  updated() {
    console.log(`${this.$options.name} updated`);
  },
  beforeDestroy() {
    console.log(`${this.$options.name} beforeDestroy`);
  },
  destroyed() {
    console.log(`${this.$options.name} destroyed`);
  }
});
```

與父元件相同使用 `count` 及 `$destroy` 觀察 `update` 及 `destroy` 鉤子，並在各個 hook 加上 `console.log` 。

## 將子元件加入父元件中

```html
<div id="app" style="background-color: green;">
  root count: {{count}}
  <button @click="count++">+1 for root</button>
  <button @click="$destroy()">destroy root</button>
  <child-component class="child" ref="childComponent" />
</div>
```

父元件 `mounted` 結束後會是下面這樣的結果：

```bash
"root beforeCreate"
"root create"
"root beforeMount"
"child-component beforeCreate"
"child-component create"
"child-component beforeMount"
"child-component mounted"
"root mounted"
```

父元件在 `beforeMount` 鉤子執行完後會去做創建子元件的實體並且完成渲染後才會叫用 `mounted` 鉤子。

接著按下父元件中的 `+1 for root` 按鈕：

```bash
"root beforeUpdate"
"root updated"
```

會發現只有父元件的 `update` 鉤子會被觸發。

再來按下子元件中的 `+1 for child` 按鈕：

```bash
"child-component beforeUpdate"
"child-component updated"
```

會發現子元件的更新也不會觸發父元件的 `update` 鉤子。

接著在父元件中按下 `destroy root` 按鈕：

```bash
"root beforeDestroy"
"child-component beforeDestroy"
"child-component destroyed"
"root destroyed"
```

root 在執行 `beforeDestroy` 後會執行完 child 的 `destroy` 後再執行 `destroyed` 鉤子。

接著因為 Vue 實體已經 `destroy` ，因此需要重新整理頁面以恢復原本的狀態。

重整後按下子元件的 `destroy` ：

```bash
"child-component beforeDestroy"
"child-component destroyed"
```

只有 child 的 `destroy` 鉤子被觸發。

## 父元件使用 ref 變動子元件 data

經由剛剛的測試我們知道父元件更新自身的數值是不會觸發子元件的 `update` 鉤子，那如果在父元件上使用 ref 變動子元件的 data 呢？

為了測試，在父元件中加上 `sync child` 按鈕：

```html{5}
<div id="app" style="background-color: green;">
  root count: {{count}}
  <button @click="count++">+1 for root</button>
  <button @click="$destroy()">destroy root</button>
  <button @click="sync">sync child</button>
  <child-component class="child" ref="childComponent" />
</div>
```

```js{5}
var vm = new Vue({
  ...
  methods: {
    sync() {
      this.$refs.childComponent.count = this.count;
    }
  }
});
```

按下 `sync child` 後，結果如下：

```bash
"child-component beforeUpdate"
"child-component updated"
```

雖然是在 root 觸發變動，但只有 child 的 `update` 會被執行，因為只有 child 的 `data` 有被變動。

## 使用 props 變動子元件 data

上面直接用 `ref` 修改子元件內部的 `data` ，這次使用 `props` 試試看。

使用原本的 `count` 會將父元件的 `template` ，為避免因此而觸發父元件的 `update` ，在父元件中加入 `parentCount` :

```js{5}
var vm = new Vue({
  ...
  data: {
    count: 0,
    parentCount: 0
  },
  ...
});
```

另外在 `template` 中加入 `+1 for root parent count` 按鈕，並且將 `parentCount` 傳入 child 中:

```html{4,6}
<div id="app" style="background-color: green;">
  root count: {{count}}
  <button @click="count++">+1 for root</button>
  <button @click="parentCount++">+1 for root parent count</button>
  <button @click="$destroy()">destroy root</button>
  <child-component class="child" :parent-count="parentCount" />
</div>
```

```js
Vue.component("child-component", {
  ...
  props: ['parentCount']
  ...
});
```

按下後結果如下：

```bash
"root beforeUpdate"
"child-component beforeUpdate"
"child-component updated"
"root updated"
```

雖然 `parentCount` 沒有變動 root 的模板，但依然觸發了 `update` 鉤子，由此可知，不管 `data` 有沒有掛到畫面上，變動 `data` 就會觸發 `update` 鉤子。

## 多個子元件

剛剛的例子只有一個子元件，現在來看看多個子元件會是怎麼運作的：

```js
var mixin = {
  template: `
    <div :style="style">{{$options.name}} count: {{count}}
      <button
        @click="count++"
      >+1 for child</button>
      <button
        @click="$destroy()"
      >destroy child</button>
    </div>`,
  data() {
    return {
      count: 0,
      style: "background-color: pink;"
    };
  },
  props: ['parentCount'],
  watch: {
    parentCount(val) {
      this.count = val;
    }
  },
  beforeCreate() {
    console.log(`${this.$options.name} beforeCreate`);
  },
  created() {
    console.log(`${this.$options.name} create`);
  },
  beforeMount() {
    console.log(`${this.$options.name} beforeMount`);
  },
  mounted() {
    console.log(`${this.$options.name} mounted`);
  },
  beforeUpdate() {
    console.log(`${this.$options.name} beforeUpdate`);
  },
  updated() {
    console.log(`${this.$options.name} updated`);
  },
  beforeDestroy() {
    console.log(`${this.$options.name} beforeDestroy`);
  },
  destroyed() {
    console.log(`${this.$options.name} destroyed`);
  }
};

Vue.component("child-component", {
  mixins: [mixin],
});
Vue.component("child-two-component", {
  mixins: [mixin],
  data() {
    return {
      style: "background-color: yellow"
    };
  }
});
Vue.component("child-three-component", {
  mixins: [mixin],
  data() {
    return {
      style: "background-color: gray"
    };
  }
});
```

將剛剛的 child `options` 拉出來變成 `mixin` ，並使用 `mixin` 定義子元件，為了區分使用不同的顏色當背景。

並且加進 root 中：

```html
<div id="app" style="background-color: green;">
  root count: {{count}}
  <button @click="count++">+1 for root</button>
  <button @click="parentCount++">+1 for root parent count</button>
  <button @click="$destroy()">destroy root</button>
  <div>
    <child-component class="child" :parent-count="parentCount" />
  </div>
  <div>
    <child-two-component class="child" :parent-count="parentCount" />
  </div>
  <div>
    <child-three-component class="child" :parent-count="parentCount" />
  </div>
</div>
```

可以看到再渲染時的鉤子觸發順序：

```bash
"root beforeCreate"
"root create"
"root beforeMount"
"child-component beforeCreate"
"child-component create"
"child-component beforeMount"
"child-two-component beforeCreate"
"child-two-component create"
"child-two-component beforeMount"
"child-three-component beforeCreate"
"child-three-component create"
"child-three-component beforeMount"
"child-component mounted"
"child-two-component mounted"
"child-three-component mounted"
"root mounted"
```

對各別 child 按下 `+1 for child`：

```bash
"child-component beforeUpdate"
"child-component updated"

```bash
"child-two-component beforeUpdate"
"child-two-component updated"
```

```bash
"child-three-component beforeUpdate"
"child-three-component updated"
```

各個 child 是互不影響的，都只會觸發自身的 `update` 鉤子。

現在因為按下 `+1` 的關係，所有的 child 的 `count` 都是 `1`，這時再按 `+1 for root parent count` 的話，結果如下：

```bash
"root beforeUpdate"
"root updated"
```

雖然 `parentCount` 變為 `1` ，但是因為跟 child `count` 的值相同，所以不會觸發 `update` 。

這時再按下 `+1 for root parent count` 會看到 child 的 `update` 觸發：

```bash
"root beforeUpdate"
"child-component beforeUpdate"
"child-two-component beforeUpdate"
"child-three-component beforeUpdate"
"child-three-component updated"
"child-two-component updated"
"child-component updated"
"root updated"
```

可以看到鉤子依序觸發 `beforeUpdate` ，再以反序觸發 `updated` 。

## 多個子元件的 destroy

按下 root 的 `destroy` 按鈕觀察 `destroy` 的情形：

```bash
"root beforeDestroy"
"child-component beforeDestroy"
"child-component destroyed"
"child-two-component beforeDestroy"
"child-two-component destroyed"
"child-three-component beforeDestroy"
"child-three-component destroyed"
"root destroyed"
```

個別的子元件依序觸發了 `destory` 。

### DEMO

* [CODEPEN](https://codepen.io/peterhpchen/pen/mdJvyvv?editors=1111)

<iframe height="265" style="width: 100%;" scrolling="no" title="Parent Child Lifecycle" src="https://codepen.io/peterhpchen/embed/mdJvyvv?height=265&theme-id=light&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/peterhpchen/pen/mdJvyvv'>Parent Child Lifecycle</a> by Peter Chen
  (<a href='https://codepen.io/peterhpchen'>@peterhpchen</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 結論

之前介紹了各個生命週期的的定義及觸發時機，這次介紹了元件間交互的生命週期，定義及交互都瞭解對於開發是很有幫助的，也可以減少叫用錯誤的問題。