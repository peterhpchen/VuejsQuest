# `v-on` 的修飾符 Part 1 - 事件修飾符

講解事件時有提到 `v-on` 所綁定的事件後面可以以點( `.` )來區隔事件及修飾符，像是 `@click.prevent` 中 `click` 是事件，而 `prevent` 就是修飾符，表示會避免原本預設的行為。

## 修飾符

修飾符依照功能可以大概分為下面兩類:

* **事件**修飾符: 事件相關的處理或設定。
* **按鍵**修飾符: 鍵盤或是按鈕的事件中觸發的按鍵設定。

今天講解的是**事件**修飾符。

## 事件修飾符

在事件中，我們常常需要叫用像是 `event.preventDefault()` 或 `event.stopPropagation()` 這類的處理， Vue.js 提供給我們一些常用處理的修飾符，讓我們可以直接設定在屬性上，除了減少代碼量外，最大的目的是讓方法盡量只是單純處理邏輯，而不用多去擔心相關的 DOM 處理。

Vue.js 提供的事件修飾符有下面這幾個:

* `.stop` : 停止觸發上層 DOM 元素事件。
* `.prevent` : 避免瀏覽器預設行為。
* `.capture` : 不管觸發事件的目標是否是下層， 設定 `capture` 的事件一定會先觸發。
* `.self` : 只有觸發此 DOM 元素本身才會觸發 `self` 事件。
* `.once` : 此事件只觸發一次。
* `.passive` : 無視 `prevent` 功能。

## 本文範例

* [CodePen](https://codepen.io/peterhpchen/pen/NOZEML)

本文範例是 Vue.js 版本的 [MDN - EventTarget.addEventListener() 的 Example of options usage](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Example_of_options_usage) ，並補齊 Vue.js 相關的修飾符例子，所以本文每個修飾符的範例都會是這個範例的子集，而 css 及 js 在這章比較不重要的就不再重貼，我們會聚焦在 Vue 模板的設定上。

## `.stop` 修飾符

`.stop` 修飾符會叫用 `event.stopPropagation()` ，`stopPropagation` 方法會停止事件的冒泡。

在預設的情況下，觸發了下層 DOM 元素的事件後，會往上叫用其他 DOM 元素的事件，可是當加上 `stopPropagation` 後，就只會到目前的事件為止，不會往上層觸發。

下例可以說明此情況:

```html
<div class="outer" @click="alert('outer, none-once, default')">
  outer
  <div class="middle" target="_blank" @click="alert('middle, none-capture, default')">
    middle
    <div class="inner3" target="_blank" @click.stop="alert('inner3, not trigger upper except capture')">
      inner3, stopPropagation(not trigger upper except capture)
    </div>
  </div>
</div>
```

當按下 `inner3` 後， `middle` 跟 `outer` 的事件會因為 `inner3` 的 `click` 加入了 `.stop` 修飾符而不被觸發。

## `.prevent` 修飾符

`.prevent` 修飾符會叫用 `event.preventDefault()` ，`preventDefault` 會停止瀏覽器的預設行為，像是 `checkbox` 的勾選/取消勾選行為、 `form` 的 `submit` 送出表單行為都會因為 `preventDefault` 而沒有觸發。

以下面的 `<a>` 標籤做說明:

```html
<a class="inner2" href="https://developer.mozilla.org/" target="_blank" @click.prevent="alert('inner2, none-passive, default, not open new page')">
    inner2, none-passive & preventDefault(not open new page)
</a>
```

原本按下超連結後會直接開啟 `href` 設定的頁面，可是因為 `click` 事件有設定 `.prevent` 修飾符，所以不會開啟連結。

## `.capture` 修飾符

不管觸發事件的 DOM 元素是誰，使用 `.capture` 修飾符的事件會優先觸發。

我們來看下面的例子:

```html
<div class="middle" target="_blank" @click.capture="alert('middle, capture')" @click="alert('middle, none-capture, default')">
  middle, capture & none-capture & self
  <a class="inner1" href="https://www.mozilla.org" target="_blank" @click="alert('inner1, passive, open new page')">
    inner1, passive & preventDefault(which is not allowed)
  </a>
</div>
```

當按下 `inner1` 時，可以看到 `alert('middle, capture')` 先被觸發，再來是 `alert('inner1, passive, open new page')` ，最後才是 `alert('middle, none-capture, default')` ，由此現象可知 `capture` 會打破由內而外的事件傳遞規則，先行觸發。

## `.self` 修飾符

`.self` 修飾符使事件的觸發限制在只有自己觸發的時候在會叫用，由其他元素所觸發的事件都不會叫用此方法。

```html
<div class="middle" target="_blank" @click.self="alert('middle, self')">
  middle, self
  <div class="inner4" target="_blank" @click="alert('inner4')">
    inner4
  </div>
</div>
```

如果按下 `inner4` 則只會觸發 `inner4` 的點擊事件，而 `middle` 因為 `.self` 修飾符的關係只有在點擊 `middle` 自己時才會觸發。

### 修飾符的順序

在設定修飾符時要注意排序，排序在前的修飾符會先被建立，因此觸發的效果也會有先後，以 `prevent` 跟 `self` 為例:

```html
<a class="inner4" href="https://developer.mozilla.org/" target="_blank" @click.prevent.self="alert('inner4, prevent then self, not open new page')">        
    inner4, prevent then self
  <div class="deepest">
    click me would not open new page 
  </div>
</a>
<a class="inner5" href="https://developer.mozilla.org/" target="_blank" @click.self.prevent="alert('inner5, self then prevent, not open new page')">
  inner5, self then prevent
  <div class="deepest">
    click me would open new page 
  </div>
</a>
```

* `inner4` 是先 `prevent` 再 `self` ，而 `inner5` 是先 `self` 再 `prevent` ，當你按下 `click me would not open new page` 時，事件會往上傳遞。
  * 在 `inner4` 時的 `click` 事件會先執行 `prevent` 阻止瀏覽器的預設行為，所以不會開啟連結頁面，之後會執行 `self` 判斷觸發者是否為自己，發現不是後，不會觸發事件。
  * 在 `inner5` 時的 `click` 事件會先執行 `self` 判斷觸發者是否為自己，發現不是後，直接結束事件，所以不會執行 `prevent` ，因此會開啟連結頁面。

## `.once` 修飾符

`.once` 修飾符使事件只會觸發一次。

如下例所示:

```html
<div class="outer" @click.once="alert('outer, once')" @click="alert('outer, none-once, default')">
  outer
</div>
```

`outer` 上有兩個事件，一個有使用 `once` 修飾符，另一個沒有。

當點擊第一次的時候兩個事件都會被觸發，可是之後都只有沒有 `once` 修飾符的事件會被觸發。

## `.passive` 修飾符

`.passive` 修飾符會無視 `event.preventDefault()` 的功能，因此只要加上此修飾符就一定會觸發瀏覽器的預設行為。

如下例所示:

```html
<a class="inner1" href="https://www.mozilla.org" target="_blank" @click.passive.prevent="alert('inner1, passive, open new page')">
    inner1, passive & preventDefault(which is not allowed)
</a>
```

由於 `passive` 會使 `preventDefault` 無效，所以就算在 `passive` 後面加上 `prevent` 還是會開啟連結頁面。

## 小結

本文依序介紹 `.stop` 、 `.prevent` 、 `.capture` 、 `.self` 、 `.once` 、 `.passive` ，每個都有不同的功能及使用情境，搭配範例演繹各個功能。

下一篇會介紹**按鍵**修飾符。

## 參考資料

* [Vue.js Guide: Event Handling](https://vuejs.org/v2/guide/events.html)
* [Vue.js API: v-on](https://vuejs.org/v2/api/#v-on)
* [MDN - addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Example_of_options_usage)
* [MDN - stopPropagation](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation)
* [MDN - preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
* [MDN - Example 5: Event_Propagation](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Examples#Example_5:_Event_Propagation)
* [Harry's Tech World: [jQuery] event.preventDefault() 與 event.stopPropagation() 的差異](https://dotblogs.com.tw/harry/2016/09/10/131956)
* [vue事件处理：@click.prevent.self和@click.self.prevent区别](https://www.oschina.net/question/1785591_2273843)
