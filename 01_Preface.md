# 前言

這幾年的前端早已不再是 JQuery 獨大的世界，取而代之的是群雄割據的局面，而在眾多框架中脫穎而出的是 Vue.js 、 React 以及 Angular 。

本系列要介紹的 Vue.js 不像是 React 及 Angular 背後有大公司撐腰， Vue.js 只是個人專案，但是靠著眾多開源貢獻使其成為了前三大的前端框架。

下面是我認為 Vue.js 的優勢:

* **容易導入**: Vue 核心庫只專注在處理視圖層( view layer )的設計使其可以很輕鬆地套用在舊有的系統上。
* **完整的擴展工具**: 如果你的需求是要從無到有開發的話，可以使用 Vue CLI 創建整合 Vue Core 、 Vue Router 、 Vuex 的完整前端解決方案，不用任何的設置就可以開始開發，這也是為什麼 Vue.js 自稱為是漸進式的 JavaScript 框架。
* **易學**: 使開發者學習門檻降低，可以快速上手。
* **大量的中文資源**: 由於作者 Evan You (尤雨溪)是中國人，因此 Vue.js 有良好的中文文件，也因為中國企業大量採用，使得 Vue.js 的技術文章絕大部分都可以找到中文資源。
* **完整的文件**: 撇開中文資源這個優勢，Vue.js 的文件完整度非常的高，幾乎在開發上需要使用到的語法、功能都有詳細的介紹，也都帶有範例供開發者做演練，一路從官方文件看下來，大概就可以上戰場了。

**好上手**及**高擴展**的特性使得不論是老手、菜鳥都可以愉悅的使用 Vue.js 來做開發工作，人生已有很多事情要煩心的了，在開發時使用 Vue.js 來為自己減少一份煩惱，何樂而不為呢?

## 目標

本系列文會將重心放在 Vue 核心庫，它是專門處理視圖層( view layer )的 library ，雖然不像是 Angular 那樣具備了整個前端開所需的所有技術，但這樣的特性可以使我們很容易將其導入目前開發中的系統。

> 要開發一個全新的系統時也可以藉由 Vue.js 家族中的其他成員: vue-router 、 vuex...等的幫助來建構出一個完整的前端開發框架，這也是在官方的介紹中都稱 Vue.js 是一個漸進式框架的原因。

## 前置技能

要讀懂本系列文最好有下面的知識:

* HTML
* JavaScript(ES6)
* CSS

就是網頁前端的基本知識，擁有上述的知識可以更容易吸收本系列所要傳達的概念。

## 概述

本文大致上會沿著官方文件的順序來進行:

### 基本(15到20篇)

介紹 Vue.js 的基本觀念及語法，包括 Vue 實體、模板語法...等，這部分會先建立起對 Vue.js 的基本認知，完成此階段可以利用 Vue.js 的模板語法建構出各式的畫面，然後利用 Vue 實體中各種不同功能的物件重新渲染改變畫面。

### 元件(5篇)

介紹元件的開發方式， Vue.js 可以將部分的畫面元素當作元件以達到重複使用的需求，使用元件開發可以減少大量重複的程式碼，也可以讓每個元件更專注在自己的目標上，藉由引入各種功能單一的元件來完成整個頁面的開發，完成這部分我們可以使用元件減少重複代碼，增加代碼再利用率。

### 進階(5篇)

介紹 Vue.js 的各式進階功能:

* **Mixins**: 將不同的 Vue 實體共用的代碼抽出，減少重複。
* **客製 Directive**: Vue.js 是一個類 MVVM 的框架，她不建議開發者直接修改 DOM ，但有時候直接操作 DOM 還是不可避免的，這時就可以藉由客製的 Directive 來滿足需求。
* **渲染函式的使用**: 直接撰寫 JavaScript 的渲染函式來渲染視圖層，相較於一般使用模板語法的方式，渲染函式雖然可讀性低，但可以做到更加的靈活操作。
* **Plugins**: 想要將功能提供給整個 Vue 實體時可以用 Plugin 來達成。
* **Filters**: Model 的資料跟 View Model 的資料會有些出入，可能是型態或是顯示方式的不同，需要經過一層轉換，使用 Filters 可以優雅的達到目的。

### 原碼解析(10篇)

從渲染函式的原碼講解 Vue.js 內部如何實作，後面如果有時間會再補充模板語法的原理。

## 附註

* 文章中如果有錯誤，還請各位大大指出，讓小弟可以做修改及學習。
* 文中的引用來源都會附上，如有遺漏，請各位大大提醒小弟。
* 本系列會同步至 [GitHub](https://github.com/peterhpchen/VuejsQuest) 上。