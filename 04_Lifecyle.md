# Vue 實體的生命週期

一個 Vue 實體有生老病死，而 Vue 實體會在各個生命階段提供鉤子事件(Hook Event)讓開發者可以在不同的階段做想要的處理，本文介紹各個 Hook 的叫用時機。

## 各階段的鉤子函式

官方製作了一張詳細的[生命週期鉤子函式示意圖](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram):

![Lifecyle](image/04_Lifecycle/lifecycle.png)

紅框白底的是各個鉤子函式的名稱，這些鉤子代表 Vue 實體的每個階段，分別的介紹如下:

* beforeCreate : 實例初始化立即叫用，這時還未創建實例，所以任何 Vue 實體中的設定(例如: data)都還未配置。
* created : 完成創建實例，這時 Vue 實體中的配置除了 $el 外已全部配置，而 $el 要在掛載模板後才會配置。
* beforeMount : 

> 鉤子函式會因為引用了其他的工具(例如: [vue-router](https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards))或是 Vue 實體配置的不同(例如: [keep-alive](https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components))而有所增減。

## 實際演練

> 由於 Vue 會將 Vue 實體綁定在 this 上，所以在 Vue 實例中只要有使用到 this 的函式都不能使用箭頭函數，因箭頭函數的 this 會綁定上層(父親)的內容，所以箭頭函數中的 this 不會是期望的 Vue 實體。

## 參考資料

* [Nic Rin's Blog: 搞懂生命週期 (LifeCycle)](https://blog.niclin.tw/2017/10/08/%E6%90%9E%E6%87%82%E7%94%9F%E5%91%BD%E9%80%B1%E6%9C%9F-lifecycle/)
* [Tony Blog: Vue.js (8) - Vue 實體與生命週期](http://blog.tonycube.com/2017/04/vuejs-8-lifecycle.html)
* [Summer。桑莫。夏天: Vue Instance](https://cythilya.github.io/2017/04/11/vue-instance/)