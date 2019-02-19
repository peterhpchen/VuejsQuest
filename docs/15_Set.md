# 使用 `set` 新增實體中的屬性

在 vue 中，建立實體後才加入的屬性因為沒有被給予 getter 及 setter ，所以不會被響應系統察覺，但使用 `set` 方法加入的屬性則會被賦予 getter 及 setter ，因此使用 `set` 加入的屬性都可以被響應在頁面上。

## vue 無法在建立實體後增加屬性

只有一開始定義在選項物件上的屬性才會被 vue 當作響應物件，其他未在選項物件上的屬性都無法用直接加入的方式使其成為響應物件。

可以用下面的例子來說明這情形:

```js
var vm = new Vue(
    {
        el: "#app",
        data: {
            a: 1
        },
        created() {
            this.b = 1;
        }
    }
);
```

這裡我們在實體上設了兩個屬性: `a` 、 `b` ，其中 `a` 是用選項物件上的 `data` 設定，而 `b` 是在 `created` 鉤子函數裡直接在實體( `this` )中新增。

頁面的配置如下:

```html
<div id="app">
    a: {{a}}, b: {{b}}
</div>
```

配置好之後，我們依序對 `a` 及 `b` 做加一的動作，得到的結果如下:

![notreactivity](../image/15_Set/notreactivity.png)

在 `a` 做加一後，頁面會響應變化，可是輪到 `b` 的時候頁面卻不會刷新。

這個原因在前面有提過，是因為之後設置的屬性不會有 getter 及 setter ，我們可以觀察實體來確認這件事，在 Console 鍵入 `vm` 可以看到實體中的屬性，你會發現實體中只有 `a` 的 `get` 及 `set` 方法。

![instanceprop](../image/15_Set/instanceprop.png)

為了使新加入的屬性擁有 getter 及 setter ，我們要使用 `set` 方法。

## `set` 方法

`set` 方法可以在響應物件上加上屬性，使得此屬性也是響應的，但 `set` 有一個限制: **對象不能是 Vue 實體或是 Vue 實體的 root 資料物件**，這項限制代表我們無法將上例的 `b` 變為響應，因為 Vue 實體的 root 資料物件，但我們能新增資料物件中的屬性，如下例所示:

```js
var vm = new Vue(
    {
        el: "#app",
        data: {
            user: {
                firstName: 'Peter', // reactive
            },
        },
        created() {
            this.user.lastName = 'Chen'; // not reactive
        }
    }
);
```

設定一個 `user` 的資料物件，一開始 `user` 的屬性只有 `firstName` ，在 `created()` 時新增了 `lastName` ，現在設定頁面配置:

```html
<div id="app">
    <div>
        first name: {{user.firstName}}, last name: {{user.lastName}}
    </div>
</div>
```

接著分別修改 `firstName` 及 `lastName` ，大家復習一下會發生什麼事情:

* `firstName` 修改的結果**會**響應至頁面上。
* `lastName` 修改後頁面**不會**響應變化。

來看看是不是如此:

![objnotreactivity](../image/15_Set/objnotreactivity.png)

就如上面所述的結果，並且在物件裡因為沒有實體中其他的屬性，我們可以更清楚的看出只有 `firstName` 有 `get` 及 `set` 方法，而 `lastName` 沒有。

這個問題可以透過 `set` 來處理，其定義如下:

```js
Vue.set( target, key, value )
```

* `target` : 目標物件或是目標陣列。
* `key` : 目標屬性或是陣列元素位置。
* `value` : 欲賦予的資料值。

現在我們使用 `set` 將 `lastName` 加入響應系統中:

```js
var vm = new Vue(
    {
        el: "#app",
        data: {
            user: {
                firstName: 'Peter', // reactive
            },
        },
        created() {
            this.$set(this.user, 'lastName', 'Chen');
        }
    }
);
```

照之前在 Console 上的操作再操作一次，這次 `lastName` 可以響應在頁面上了。

![reactivity](../image/15_Set/reactivity.png)

## 物件新增多個屬性

有時你可能不會只想要新增一個屬性，這時可以有兩種方式:

* 叫用多次 `se`t 設定每個屬性。
* 使用 `Object.assign()` 或是 `_.extend()` 這類合併多個物件的方法。

上面已經試過 `set` 方法了，這次改用 `Object.assign` 試試看:

```js
Object.assign(this.info, {lastName: 'Chen', account: 'peter3598768'});
```

現在用 Console 輸出 `vm.info` ，結果發現與上例的相同問題: `lastName` 及 `account` 沒有 getter 及 setter 。

這是因為這樣的方式並沒有改變 `info` ，只是在上面加了屬性而已，而要解決此問題就是要直接去更新整個 `info` ，可以將代碼改成下面這樣:

```js
this.info = Object.assign({}, this.info, {lastName: 'Chen', account: 'peter3598768'});
```

我們創了一個全新的空物件，並把 `info` 及想要加入的屬性合併進去，接著在設定給 `info` ，這樣一來就可以觸發 `info` 的 setter 使其重新設置所有的屬性為響應的。

## 修改陣列內元素

陣列的問題跟物件相似，如果直接修改元素或是長度， Vue 會沒辦法響應變化。

> 其實陣列就是一個特殊的物件，由鍵值為數字(0,1,2...)的屬性所組成。

以下面的範例來說:

```js
var vm = new Vue(
    {
        el: "#app",
        data: {
            arr: [
                'a', 'b', 'c',
            ],
        },
    }
);
```

設置一個 `arr` 陣列，它有三個元素 `a` 、 `b` 及 `c` ，接著把他們輸出在頁面上:

```html
<ul>
    <li v-for="item in arr">{{item}}</li>
</ul>
```

現在用 `vm.arr[0] = 'd'` 來修改第一個元素的值，結果如下:

![arrnoreactivity](../image/15_Set/arrnoreactivity.png)

它並沒有響應在頁面上，這時就要藉由 `set` 將改變響應至畫面:

```js
vm.$set(vm.arr, 0, 'd');
```

當 `set` 的第一個參數是陣列時，第二個參數就會變為欲修改元素的 `index` 。

## 處理陣列時的響應

在 js 中，陣列提供了許多的處理陣列的方法，這些方法分為兩類:

* 改變自身陣列的結果，稱為 **mutation methods** 。
* 將結果建為新的陣列並當作回傳值， 稱為 **non-mutating methods** 。

Vue 封裝了幾個 **mutation methods** ，使陣列執行這些方法後，其結果會響應:

* `push()`
* `pop()`
* `shift()`
* `unshift()`
* `splice()`
* `sort()`
* `reverse()`

再來對於那些未封裝的方法，像是 `filter()` 、 `concat()` 等等，我們可以仿照物件新增多個屬性時直接更改整個物件的方式，直接重設整個陣列。

> 當你重設整個陣列， Vue 並不會重新渲染整個陣列， Vue 會盡可能的重複使用元素，使其不造成浪費。

```js
vm.arr = vm.arr.filter((item) => {return item !== 'c'});
```

如此一來， `arr` 的 setter 會被觸發，讓頁面重新渲染，因此頁面上就看不到 `c` 了。

## DEMO


* [GitHub](https://github.com/peterhpchen/VuejsQuest/demo/15_Set/index.html)
* [CodePen](https://codepen.io/peterhpchen/pen/wYZyZX)

> 本文建議使用代碼自己跑起來， CodePen 上的 Console 功能陽春，沒辦法像 Chrome 有這麼多的細節。

## 小結

本節以新增屬性會遇到的響應問題開始，介紹在物件及陣列上如何做處理才能使結果響應在頁面上。

## 參考資料

* [[那些關於 Vue 的小細節 ] 為什麼畫面沒有隨資料更新 - Vue 響應式原理（Reactivity）](https://pjchender.blogspot.com/2017/05/vue-vue-reactivity.html)
* [Reactivity In Vue.js (And Its Pitfalls)](https://medium.com/js-dojo/reactivity-in-vue-js-and-its-pitfalls-de07a29c9407)
* [Vue.js Gudie: List Rendering](https://vuejs.org/v2/guide/list.html)
* [Vue.js Gudie: Reactivity in Depth](https://vuejs.org/v2/guide/reactivity.html)
* [Vue.js API: set](https://vuejs.org/v2/api/#Vue-set)
