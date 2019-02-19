# 結尾

本文是鐵人賽的第三十篇文章，在這三十天中，我把 Vue.js 又從頭在看了一遍，原以為已經熟悉的框架，沒想到在寫文章的時候還是遇到了很多不清楚或是觀念模糊的地方，在這些時間內又重新理了一次 Vue.js 相關的知識，之前原本比較模糊的觀念又更加的具體。

本來想要寫到原碼分析的，沒有想到 30 篇的篇幅還是太短了，之後有機會在來深入研究，謝謝每一個閱讀本系列文的人，有任何問題都可以留言，在我能力範圍的都會為各位解答，如果文章有任何的錯誤也請跟我說，謝謝，我們下次還有機會再見。

## 每篇文章的簡介

### 基礎知識

* [初探 Vue.js](02_FirstVue.md) : 基本原理及建立第一支應用
* [Vue 實例](03_Instance.md) : Vue 物件實體及組件
* [Vue 實體的生命週期](04_Lifecycle.md) : Vue 實體的鉤子函數
* [模板語法 Part 1 - Mustache 標籤](05_Mustache.md) : 模板響應及 Mustache 標籤
* [模板語法 Part 2 - Directives](06_Directives.md) : `v-html` 、 `v-if` 、 `v-bind` 及 `v-on` Directives 的介紹
* [計算屬性](07_Computed.md) : 計算屬性及與方法的比較
* [監聽器( watch )](08_Watcher.md) : 監聽器的介紹
* [計算屬性跟監聽器的比較](09_ComputedVSWatch.md) : 比較計算屬性及監聽器的差異
* [Class 的綁定](10_Class.md) : 使用 `v-bind` 綁定 `class`
* [樣式綁定](11_Style.md) : 使用 `v-bind` 綁定 Style
* [條件渲染](12_Conditional.md) : 介紹 `v-if` 、 `v-else` 、 `v-else-if` 的使用方式
* [列表渲染](13_For.md) : `v-for` 介紹
* [響應系統](14_Reactivity.md) : 整個 Vue.js 響應系統介紹
* [使用 `set` 新增實體中的屬性](15_Set.md) : 使用 `set` 在 `mounted` 後新增實體屬性
* [事件處理](16_Event.md) : 事件處理的介紹
* [`v-on` 的修飾符 Part 1 - 事件修飾符](17_EventModifier.md) : 事件修飾符的介紹
* [`v-on` 的修飾符 Part 2 - 按鍵修飾符](18_KeyModifier.md) : 按鍵修飾符的介紹
* [表單綁定](19_FormInputBinding.md) : `form` 上的 `input` 、 `select` 的綁定方式

### 組件

* [組件基礎](20_ComponentBasic.md) : 組件概念介紹
* [組件間的資料傳輸](21_ComponentData.md) : 使用 props 屬性及 $emit 事件傳輸組件間的資料
* [組件註冊](22_ComponentRegistration.md) : 組件的全域及區域註冊
* [`props` 屬性](23_Props.md) : 使用 `props` 屬性由上到下組件的資料傳輸
* [屬性驗證](24_PropsValidation.md) : 屬性的各種驗證方式定義
* [屬性注意事項](25_PropsAttribute.md) : 沒有定義在 props 屬性上的 DOM 屬性介紹
* [客製事件](26_CustomEvent.md) : 客製組件自己的事件
* [插槽](27_Slots.md) : 在父組件中定義子組件內的內容
* [動態組件](28_KeepAlive.md) : 不會被銷毀的組件定義
* [非同步組件](29_AsyncComponent.md) : 組件的非同步定義方式

## 推薦網站

Vue.js 在網路上有很多的資源，下面是我自己用過覺得不錯的學習資源:

* [CodePen](https://codepen.io/) : 線上的網頁編輯器
* [Vue.js 官網](https://vuejs.org/) : Vue.js 官方文件
* [MDN Web Docs](https://developer.mozilla.org/) : 網頁相關知識文件
* [Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/) : Vue.js 原碼分析

## GitHub Repository

最後附上GitHub的[連結](https://github.com/peterhpchen/VuejsQuest)，希望有時間可以補齊系例文。
