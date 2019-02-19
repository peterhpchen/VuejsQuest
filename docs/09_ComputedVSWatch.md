# 計算屬性與監聽器的比較

Vue 的計算屬性會在有關的資料產生變化時觸發 `callback` 函數更新屬性值，而監聽器則是以監聽單個資料變化為主，當監聽的資料產生變化時會觸發 `callback` 函數，執行後續的處理，在情境上，它們都有不能取代的地方，現在讓我們來看看哪些情境適合使用哪個功能。

## 計算屬性適用場景

計算屬性在處理**資料連動**時有個很大的優勢，單個計算屬性就可以監聽多個資料變化，例如下面的例子:

```js
var vm = new Vue({
  el: '#app',
  data: {
    a: 1,
    b: -1
  },
  computed: {
    aplusb() {
      return this.a + this.b;
    }
  }
});
```

可是 `watch` 卻要像下面這樣子寫:

```js
var vm = new Vue({
  el: '#app',
  data: {
    a: 1,
    b: -1,
    aplusb : 0
  },
  watch: {
    a: function(val) {
      this.aplusb = val + this.b;
    },
    b: function(val) {
      this.aplusb = val + this.a;
    }
  }
});
```

`watch` 會需要監聽多個資料以達到相同的目的，相較之下計算屬性就直覺得多了。

### 使用 $watch 替代 watch 解法

`$watch` 的監聽對象可以是函數，因此也可以像是計算屬性一樣監聽多個值的變化，代碼如下:

```js
var vm = new Vue({
  el: '#app',
  data: {
    a: 1,
    b: -1,
    aplusb : 0
  },
  created() {
    this.$watch(function() {
      return this.a + this.b;
    }, function(val) {
      this.aplusb = val;
    });
  }
});
```

在實體內使用 `$watch` 會需要在 `created` 中處理，這樣的方式較 `watch` 繁瑣，所以一般還是使用計算屬性處理這類的需求。

## 監聽器適用場景

### 跟資料無關的處理

在一般情況下，資料連動使用計算屬性較為合適，但如果資料變化後的處理跟資料本身無關的話，例如說**紀錄 Log** 這樣的處理，跟資料本身無關，那就會比較適合使用監聽器:

```js
watch: {
  a: function(val) {
    this.recordLog('a', val);
  };
}
```

### 使用非同步處理取得的資料

計算屬性沒辦法叫用非同步方法來傳回資料結果，因此這樣的情況只能使用 `watch` 。

```js
var vm = new Vue({
  el: '#app',
  data: {
    asyncSource: 0,
    asyncData: null
  },
  watch: {
    asyncSource: {
      handler: function(val){
        Promise.resolve(val*2).then((res) => {
          this.asyncData = res;
        });
      },
      immediate: true
    }
  }
});
```

在這裡我們可以在 `then` 的 `callback` 函數中用 `this` 指到實體上的資料 `asyncData` ，將結果設置給 `asyncData` 。

#### 使用 vue-async-computed

使用 [vue-async-computed](https://github.com/foxbenjaminfox/vue-async-computed) 這個第三方工具，我們可以輕鬆的在計算屬性中使用非同步的方式取得資料。

```html
<script src="https://unpkg.com/vue-async-computed"></script>
```

```js
Vue.use(AsyncComputed);

var vm = new Vue({
  el: '#app',
  data: {
    asyncSource: 0,
    // asyncData: null
  },
  asyncComputed: {
    asyncData: function() {
      return Promise.resolve(this.asyncSource*2);
    }
  }
});
```

在選項中使用 `asyncComputed` 為鍵值定義的計算屬性可以回傳 `async` 的結果。

## Demo

* [CodePen](https://codepen.io/peterhpchen/pen/PydrVO)

## 小結

今天介紹了計算屬性與監聽器各自合適的使用場景。

先介紹計算屬性適合使用在**同步的資料連動**上，而 `$watch` 雖然可以用函數設置多個監聽目標回傳值，但在實體中必須在 `created` 內使用，較 `watch` 來的繁瑣。

再來介紹監聽器適用於跟**資料無關**或是**取得非同步資料**的處理，在非同步資料的取得上，雖然計算屬性可以用第三方工具 [vue-async-computed](https://github.com/foxbenjaminfox/vue-async-computed) 達到此需求，但會需要多引入工具庫，喜不喜歡就見仁見智了。

## 參考資料

* [Vue.js Guide: Watchers](https://vuejs.org/v2/guide/computed.html#Watchers)
* [GitHub: vue-async-computed](https://github.com/foxbenjaminfox/vue-async-computed)
