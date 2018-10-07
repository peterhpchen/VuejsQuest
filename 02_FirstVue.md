# 初探 Vue.js

## 基本原理

Vue.js 是處理 View Layer 的 Library ，使用 Vue.js 時，我們會操作 View Model (也就是 Vue.js 的實體)使其依照業務邏輯做改變，配合在 HTML 中 Vue.js 提供的模板語法來改變配置，重新渲染後使畫面產生變化。

下圖是一個簡單的架構圖:

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="791px" version="1.1" content="&lt;mxfile userAgent=&quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:62.0) Gecko/20100101 Firefox/62.0&quot; version=&quot;9.2.1&quot; editor=&quot;www.draw.io&quot; type=&quot;github&quot;&gt;&lt;diagram id=&quot;25071b21-7ea4-4c03-22c9-f2133408cd28&quot; name=&quot;Page-1&quot;&gt;7Zpdc9soFIZ/jS+7g0Af9mXs1N3t7M7sNJ1ueoklLDORhReh2O6vLxgkSwKnbizb6bi5iTgCBO9z4MBJBmiy3HzgeLX4hyUkG0CQbAbofgCh58NQ/lKWrbZEAdKGlNPEVNobHug3YozAWEuakKJVUTCWCbpqG2OW5yQWLRvmnK3b1eYsa391hVNiGR5inNnW/2giFto6hNHe/ieh6aL6sheO9JsZjp9SzsrcfG8A0Xz3o18vcdWXmWixwAlbN0zo/QBNOGNCPy03E5IpbSvZdLvpgbf1uDnJxTENoG7wjLOSVCMOM9l0nNBn+Ziqxy+UrCuz7KrxxkxCbCvhZO+SkSyM1wsqyMMKx+rNWrqJtC3EMpMlTz7iYqXBzemGyMGM5ywXxhGgqjCnWTZhGeO7jqWKJIxjaS8EZ0+k8SaJRjMA6sE8Ey7I5qAcXi2ydF7ClkTwraxSNRj+Eeg2xnFhaECt924AfWNbNFygNmLjemnd+V5++WAIuGmg42kAs+iuSyUJyDDxXVSGcIbCsB8qcASvCMU/BsqboCG3GXhgjYSzMOiJRhBed5F4ngNIV+I8uVNhQJbiDBcFjdvKdoWUU+fbR1kCVeFrVdhQ8WhaqefKrj9JEiuOdGSUw2Ilj0lruxWYp0Q01rwtdkPKwKFkZeMkw4I+twfhUtd84V9G5fD2Kwu0QAZRh48eu2nUDCOdfqJOP7DTj56w1c8OdT3p4+i7ItYvQh/Z9P2r0keohQ2B4HX4EYpe7ugAf0kJbxvVVqpCcaqHuKJoXx7iNT3Ea3gIaHiI92oP8d/Y/hCAH4A91kNCz39DHuIK6b+Ihzj2EHhND0Gw7SH+8JUhpBuLrI4u6iGB5SGfyXIllSLS+rDN1fGp6zLSJl52EpzRNFceJQkTbh3UcparU2GCi4U67tVdNA5yAETT6bSfgxxqL8k6aDdPcWBke04vh7jQEvhLqbT9Ky8EzqW396DuObXrRDyXeJ5r2fUiXmSJNy4LmpNC+j34m6Vys/p5+Q6pZcnag3whQJ07hFPA6FwCDi0BJxmNn6RpXArB8iPk46Sg3/BsV0Ft7WbfkbWD8SC4V8KVghVaYKd7KgVpjLM780Iwdf8r5HWQ5ulnVbh/5x8Dajod9pT/qBNwL9zsPOSggvqgMrKp4F2Nu493j7eKxB91l4oTincmKNWybED5RETJ893RoSgzcbNgom4epD6yNMG48iC9gLHTIJMFzlMVRNspwtvE40U/hgPBueC4shQ6OaimPFB/uahmHf5fMp0nRGEIwGTSNOkUImxkFnX73lOLVsoQ7H5+gtk5zglo1D5m1YmmBsRzhaMXsvGvYejdKsM6XFUM0QUZ2ve4UxiiW2UYIOsQckmK9n3nFIr+b4r1ratKw12Con3pOoVicKsUuzHRd1wHzsbQvqKdwjC6VYYe7K7ES1JE9p3uFIrhrVLsnmwC72wMZXH/T0E6ob3/zyv0/js=&lt;/diagram&gt;&lt;/mxfile&gt;" onclick="(function(svg){var src=window.event.target||window.event.srcElement;while (src!=null&amp;&amp;src.nodeName.toLowerCase()!='a'){src=src.parentNode;}if(src==null){if(svg.wnd!=null&amp;&amp;!svg.wnd.closed){svg.wnd.focus();}else{var r=function(evt){if(evt.data=='ready'&amp;&amp;evt.source==svg.wnd){svg.wnd.postMessage(decodeURIComponent(svg.getAttribute('content')),'*');window.removeEventListener('message',r);}};window.addEventListener('message',r);svg.wnd=window.open('https://www.draw.io/?client=1&amp;lightbox=1&amp;edit=_blank');}}})(this);" viewBox="0 0 791 331" style="cursor:pointer;max-width:100%;max-height:331px;"><defs/><g transform="translate(0.5,0.5)"><ellipse cx="121" cy="150" rx="120" ry="120" fill="#ffe6cc" stroke="#d79b00" pointer-events="none"/><g transform="translate(97.5,136.5)"><switch><foreignObject style="overflow:visible;" pointer-events="all" width="45" height="23" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; font-size: 21px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; vertical-align: top; width: 46px; white-space: nowrap; overflow-wrap: normal; text-align: center;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;"><div>View</div></div></div></foreignObject><text x="23" y="22" fill="#000000" text-anchor="middle" font-size="21px" font-family="Helvetica">[Not supported by viewer]</text></switch></g><ellipse cx="394" cy="150" rx="120" ry="120" fill="#d5e8d4" stroke="#82b366" pointer-events="none"/><g transform="translate(339.5,136.5)"><switch><foreignObject style="overflow:visible;" pointer-events="all" width="108" height="23" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; font-size: 21px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; vertical-align: top; width: 109px; white-space: nowrap; overflow-wrap: normal; text-align: center;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;"><div>View Model</div></div></div></foreignObject><text x="54" y="22" fill="#000000" text-anchor="middle" font-size="21px" font-family="Helvetica">&lt;div&gt;View Model&lt;/div&gt;</text></switch></g><ellipse cx="671" cy="150" rx="120" ry="120" fill="#fff2cc" stroke="#d6b656" pointer-events="none"/><g transform="translate(641.5,136.5)"><switch><foreignObject style="overflow:visible;" pointer-events="all" width="57" height="23" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; font-size: 21px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; vertical-align: top; width: 58px; white-space: nowrap; overflow-wrap: normal; text-align: center;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;"><div>Model</div></div></div></foreignObject><text x="29" y="22" fill="#000000" text-anchor="middle" font-size="21px" font-family="Helvetica">[Not supported by viewer]</text></switch></g><path d="M 205 65 L 302.63 65" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="none"/><path d="M 307.88 65 L 300.88 68.5 L 302.63 65 L 300.88 61.5 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="none"/><path d="M 479 65 L 579.63 65" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="none"/><path d="M 584.88 65 L 577.88 68.5 L 579.63 65 L 577.88 61.5 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="none"/><path d="M 586 235 L 485.37 235" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="none"/><path d="M 480.12 235 L 487.12 231.5 L 485.37 235 L 487.12 238.5 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="none"/><path d="M 309 235 L 211.37 235" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="none"/><path d="M 206.12 235 L 213.12 231.5 L 211.37 235 L 213.12 238.5 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="none"/><g transform="translate(42.5,294.5)"><switch><foreignObject style="overflow:visible;" pointer-events="all" width="155" height="23" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; font-size: 21px; font-family: Helvetica; color: rgb(0, 127, 255); line-height: 1.2; vertical-align: top; white-space: nowrap; text-align: center;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;">Template Syntex</div></div></foreignObject><text x="78" y="22" fill="#007FFF" text-anchor="middle" font-size="21px" font-family="Helvetica">Template Syntex</text></switch></g><g transform="translate(332.5,294.5)"><switch><foreignObject style="overflow:visible;" pointer-events="all" width="122" height="23" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; font-size: 21px; font-family: Helvetica; color: rgb(0, 127, 255); line-height: 1.2; vertical-align: top; white-space: nowrap; text-align: center;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;">Vue Instance</div></div></foreignObject><text x="61" y="22" fill="#007FFF" text-anchor="middle" font-size="21px" font-family="Helvetica">Vue Instance</text></switch></g><g transform="translate(599.5,294.5)"><switch><foreignObject style="overflow:visible;" pointer-events="all" width="141" height="23" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; font-size: 21px; font-family: Helvetica; color: rgb(0, 127, 255); line-height: 1.2; vertical-align: top; white-space: nowrap; text-align: center;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;">Business Logic</div></div></foreignObject><text x="71" y="22" fill="#007FFF" text-anchor="middle" font-size="21px" font-family="Helvetica">Business Logic</text></switch></g><g transform="translate(200.5,30.5)"><switch><foreignObject style="overflow:visible;" pointer-events="all" width="112" height="23" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; font-size: 21px; font-family: Helvetica; color: rgb(0, 255, 128); line-height: 1.2; vertical-align: top; white-space: nowrap; text-align: center;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;">Click Button</div></div></foreignObject><text x="56" y="22" fill="#00FF80" text-anchor="middle" font-size="21px" font-family="Helvetica">Click Button</text></switch></g><g transform="translate(482.5,30.5)"><switch><foreignObject style="overflow:visible;" pointer-events="all" width="95" height="23" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; font-size: 21px; font-family: Helvetica; color: rgb(0, 255, 128); line-height: 1.2; vertical-align: top; white-space: nowrap; text-align: center;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;">Call AJAX</div></div></foreignObject><text x="48" y="22" fill="#00FF80" text-anchor="middle" font-size="21px" font-family="Helvetica">Call AJAX</text></switch></g><g transform="translate(470.5,250.5)"><switch><foreignObject style="overflow:visible;" pointer-events="all" width="120" height="23" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; font-size: 21px; font-family: Helvetica; color: rgb(0, 255, 128); line-height: 1.2; vertical-align: top; white-space: nowrap; text-align: center;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;">Return result</div></div></foreignObject><text x="60" y="22" fill="#00FF80" text-anchor="middle" font-size="21px" font-family="Helvetica">Return result</text></switch></g><g transform="translate(162.5,250.5)"><switch><foreignObject style="overflow:visible;" pointer-events="all" width="188" height="23" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; font-size: 21px; font-family: Helvetica; color: rgb(0, 255, 128); line-height: 1.2; vertical-align: top; white-space: nowrap; text-align: center;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;">Change View Model</div></div></foreignObject><text x="94" y="22" fill="#00FF80" text-anchor="middle" font-size="21px" font-family="Helvetica">Change View Model</text></switch></g><ellipse cx="394" cy="55" rx="15" ry="15" fill="#ffffff" stroke="#000000" pointer-events="none"/><g transform="translate(387.5,41.5)"><switch><foreignObject style="overflow:visible;" pointer-events="all" width="12" height="23" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; font-size: 21px; font-family: Helvetica; color: rgb(0, 255, 128); line-height: 1.2; vertical-align: top; width: 13px; white-space: nowrap; overflow-wrap: normal; text-align: center;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;"><font color="#6600CC">2</font></div></div></foreignObject><text x="6" y="22" fill="#00FF80" text-anchor="middle" font-size="21px" font-family="Helvetica">[Not supported by viewer]</text></switch></g><ellipse cx="257" cy="15" rx="15" ry="15" fill="#ffffff" stroke="#000000" pointer-events="none"/><g transform="translate(250.5,1.5)"><switch><foreignObject style="overflow:visible;" pointer-events="all" width="12" height="23" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; font-size: 21px; font-family: Helvetica; color: rgb(0, 255, 128); line-height: 1.2; vertical-align: top; width: 13px; white-space: nowrap; overflow-wrap: normal; text-align: center;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;"><font color="#6600CC">1</font></div></div></foreignObject><text x="6" y="22" fill="#00FF80" text-anchor="middle" font-size="21px" font-family="Helvetica">[Not supported by viewer]</text></switch></g><ellipse cx="531" cy="15" rx="15" ry="15" fill="#ffffff" stroke="#000000" pointer-events="none"/><g transform="translate(524.5,1.5)"><switch><foreignObject style="overflow:visible;" pointer-events="all" width="12" height="23" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; font-size: 21px; font-family: Helvetica; color: rgb(0, 255, 128); line-height: 1.2; vertical-align: top; width: 13px; white-space: nowrap; overflow-wrap: normal; text-align: center;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;"><font color="#6600CC">3</font></div></div></foreignObject><text x="6" y="22" fill="#00FF80" text-anchor="middle" font-size="21px" font-family="Helvetica">[Not supported by viewer]</text></switch></g><ellipse cx="531" cy="290" rx="15" ry="15" fill="#ffffff" stroke="#000000" pointer-events="none"/><g transform="translate(524.5,276.5)"><switch><foreignObject style="overflow:visible;" pointer-events="all" width="12" height="23" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; font-size: 21px; font-family: Helvetica; color: rgb(0, 255, 128); line-height: 1.2; vertical-align: top; width: 13px; white-space: nowrap; overflow-wrap: normal; text-align: center;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;"><font color="#6600CC">4</font></div></div></foreignObject><text x="6" y="22" fill="#00FF80" text-anchor="middle" font-size="21px" font-family="Helvetica">[Not supported by viewer]</text></switch></g><ellipse cx="394" cy="245" rx="15" ry="15" fill="#ffffff" stroke="#000000" pointer-events="none"/><g transform="translate(387.5,231.5)"><switch><foreignObject style="overflow:visible;" pointer-events="all" width="12" height="23" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; font-size: 21px; font-family: Helvetica; color: rgb(0, 255, 128); line-height: 1.2; vertical-align: top; width: 13px; white-space: nowrap; overflow-wrap: normal; text-align: center;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;"><font color="#6600CC">5</font></div></div></foreignObject><text x="6" y="22" fill="#00FF80" text-anchor="middle" font-size="21px" font-family="Helvetica">[Not supported by viewer]</text></switch></g><ellipse cx="121" cy="245" rx="15" ry="15" fill="#ffffff" stroke="#000000" pointer-events="none"/><g transform="translate(114.5,231.5)"><switch><foreignObject style="overflow:visible;" pointer-events="all" width="12" height="23" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; font-size: 21px; font-family: Helvetica; color: rgb(0, 255, 128); line-height: 1.2; vertical-align: top; width: 13px; white-space: nowrap; overflow-wrap: normal; text-align: center;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;"><font color="#6600CC">7</font></div></div></foreignObject><text x="6" y="22" fill="#00FF80" text-anchor="middle" font-size="21px" font-family="Helvetica">[Not supported by viewer]</text></switch></g><ellipse cx="257" cy="295" rx="15" ry="15" fill="#ffffff" stroke="#000000" pointer-events="none"/><g transform="translate(250.5,281.5)"><switch><foreignObject style="overflow:visible;" pointer-events="all" width="12" height="23" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; font-size: 21px; font-family: Helvetica; color: rgb(0, 255, 128); line-height: 1.2; vertical-align: top; width: 13px; white-space: nowrap; overflow-wrap: normal; text-align: center;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;"><font color="#6600CC">6</font></div></div></foreignObject><text x="6" y="22" fill="#00FF80" text-anchor="middle" font-size="21px" font-family="Helvetica">[Not supported by viewer]</text></switch></g></g></svg>

* View : 透過 HTML 及模板語法渲染出來的畫面。
* View Model : 使用 Vue.js 所建立起來的實體。
* Model : 後端程式中的商業邏輯。

圖中的綠色文字代表範例情境:

1. 使用者按下按鈕。
1. 透過 HTML 中模板語法的綁定觸發 Vue 實體中註冊的事件。
1. 事件中叫用 AJAX 向伺服器請求資料。
1. 伺服器取得資料後傳回給 Vue 實體。
1. Vue 實體修改綁定的 View Model 。
1. View Model 改變後觸發模板重新渲染。
1. 使用者看到改變後的畫面。

上述的情境是在高層次的面上做說明，實際上 Vue.js 的運作原理還要比這個深奧許多，後面有機會再來分享，現在這階段，用這樣的架構去說明就可以有比較具體的概念了。

>如果以語言來分的話， View 就是 HTML ， View Model 是 JS ，而 Model 就是像 Node 、 Java 這類的後端語言。

## 第一支 Vue.js

這一節會以上面的例子來開發一個 Vue.js 應用。

首先會建立一個 Vue 實體，再來編寫模板語法將 HTML 上欲做變化的元素登錄在 Vue 實體中，接著綁定 Click 事件至後端取得資料，最後修改 Vue 實體中的資料藉以讓畫面產生變化，這樣就可以完成一個簡單的 Vue.js 應用了。

### 引入 Vue.js 庫

引入 Vue 的方式有很多種，在一般的專案中通常都是使用 Webpack 來引入，但本系列文為了 Demo 方便，使用 `<script>` 元素來引入。

```html
<!DOCTYPE html>
<html>
<head>
    ...
    <script src="https://unpkg.com/vue"></script>
</head>
<body>
    ...
</body>
</html>
```

這樣就引入了 Vue.js 庫了，是不是很簡單阿。

### 建立 Vue 實體

接下來要建立 Vue 實體，就是上圖中間圓圈的部分， Vue 實體是整個 Vue.js 應用必備的物件，要建立 Vue 實體很簡單，如下程式碼:

```html
<!DOCTYPE html>
<html>
<head>
    ...
    <script src="https://unpkg.com/vue"></script>
</head>
<body>
    ...
    <script>
        var vm = new Vue({
            ...
        });
        ...
    </script>
</body>
</html>
```

`<script>` 中的 `new Vue({...})` 會建立 Vue 的實體，而 vm 變數取得的就是 Vue 實例化的物件。

> 通常 Vue 實例化物件會以 vm 當作其變數名稱，這也呼應了上面介紹: Vue 實例化物件在架構上代表著 View Model 層。

Vue 的第一個參數是 [Options](https://vuejs.org/v2/api/index.html#Options-Data)，它用來登錄 Vue 實體所需的對象。

以這個例子來說有三個部分需要設定:

* 註冊一個 Vue 實例的掛載目標。
* 需要一個輸出取得結果的資料。
* 一個向後端取得資料的 Click 事件。

所以 Options 物件會像下面這樣:

```js
var vm = new Vue({
    el: '#app',
    data: {
        message: "This is local data.",
    },
    methods: {
        getRemoteMessage() {
            Promise.resolve("Get remote data.")
                .then((res) => {
                    this.message = res;
                });
        },
    },
});
```

* el : 將這個 Vue 實體掛載到這裡設置的元素上。
* data : 登錄資料，當這些資料改變時，畫面會依照變化做改變。
* methods : 登錄方法，這些方法可以藉由 DOM 事件執行，也可以在 Vue 實例中被叫用。

上面的程式碼做了下面三件事:

* 將頁面上 ID 為 app 的元素當作這個 Vue 實例的掛載目標。
* 初始一個 message 的畫面響應資料。
* 定義一個 getRemoteMessage 方法，該方法會以非同步的方式取得資料，然後將取得的資料設置於 message 上。

> 這裡直接使用 Promise.resolve 當作範例，實際上這裡可以用 AJAX 取得資料。

這樣就把 Vue 實例建立起來了。

### 編寫模板

最後要使用 Vue 提供的模板語法來綁定 Vue 實例中的物件，我們需要下面這些部分:

* 一個 ID 為 app 的 `<div>` ，這個元素包含了其他在 Vue 實例中使用的 DOM 元素。
* 一個顯示訊息的 `<p>` 。
* 一顆取回非同步資料的 `<button>` 。

配置會像下面這樣:

```html
<!DOCTYPE html>
<html>
<head>
    ...
    <script src="https://unpkg.com/vue"></script>
</head>
<body>
    <div id="app">
        <p>{{message}}</p>
        <button v-on:click="getRemoteMessage">Click</button>
    </div>
    ...
</body>
</html>
```

這裡有兩個 Vue 的模板語法:

* {{message}} : 綁定 Vue 實例中的 message 資料。
* v-on:click : 綁定 Vue 實例中的 getRemoteMessage 方法至 Click 事件中。

如此一來我們就完成了所有的配置，當你按下按鈕後就會看到 This is local data. 變為 Get remote data. 了。

## 再進一步

上面完成了我們第一個 Vue 的應用程式，但如果現在的情境是 **舊系統裡面要使用 Vue.js 來擴充功能** 呢? 例如說取得資料的按鈕並不存在於 Vue 實體中，那要怎麼辦呢?

我們假設以下是我們目前的頁面配置:

```html
<div id="app">
    <p>{{message}}</p>
    ...
</div>
<button ...>Outside Button</button>
```

因為按鈕在 Vue 實例(div#app)的範圍外，所以並不能使用 v-on:click 綁定事件。

其實剛剛有說到 vm 變數就是 Vue 實例的物件，因此修改 vm 中的 message 也可以達到同樣的效果:

```html
<div id="app">
    <p>{{message}}</p>
    ...
</div>
<button onclick="clickButton()">Outside Button</button>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            message: "This is local data.",
        },
        ...
    });

    function clickButton() {
        Promise.resolve("Get remote data by outside button.")
            .then((res) => {
                vm.message = res;
            });
    }
</script>
```

這樣就算系統中其他部分不是使用 Vue.js ，也可以很輕鬆的整合。

## 完整程式碼

以下是完整的程式碼，包含了 Vue 實例內及實例外的按鈕範例。

```html
<!DOCTYPE html>
<html>
<head>
    <title>Hello Vue.js</title>
    <script src="https://unpkg.com/vue"></script>
</head>
<body>
    <!-- 7. Output View after rerender -->
    <div id="app">
        <p>{{message}}</p>  <!-- 6. Rerender View -->
        <button v-on:click="getRemoteMessage">Inside Button</button>   <!-- 1. Click Button -->
    </div>
    <button onclick="clickButton()">Outside Button</button>   <!-- 1. Click Button -->
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                message: "This is local data.",
            },
            methods: {
                getRemoteMessage() {    // 2. trigger event in Vue instance
                    Promise.resolve("Get remote data by inside button.") // 3. Get data asynchronously
                        .then((res) => {    // 4. Return result
                            this.message = res; // 5. Change View Model
                        });
                },
            },
        });

        function clickButton() {    // 2. trigger event in Vue instance
            Promise.resolve("Get remote data by outside button.") // 3. Get data asynchronously
                .then((res) => {    // 4. Return result
                    vm.message = res; // 5. Change View Model
                });
        }
    </script>
</body>
</html>
```

> 註解可以搭配文章一開始圖片上的數字做比較具體的理解。

## Demo

<p data-height="265" data-theme-id="0" data-slug-hash="vVXwOZ" data-default-tab="js,result" data-user="peterhpchen" data-pen-title="First Vue" class="codepen">See the Pen <a href="https://codepen.io/peterhpchen/pen/vVXwOZ/">First Vue</a> by Peter Chen (<a href="https://codepen.io/peterhpchen">@peterhpchen</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 小結

Vue.js 只要單純的設置就能改變頁面的配置，在範例中我們並沒有修改 DOM 元素，而是專注在對 View Model 做改變，這樣使頁面可以更容易的被抽換。

例如我們今天想要修改顯示 message 為不同的元素，如果是 JQuery 的寫法，除了 HTML 的配置要做修改外，還必須要修改 JavaScript 的程式碼，可是在 Vue.js 中我們只要把 `<p>` 改為想要的元素就好，只要 View Model 依然是 message ，我們就不需要修改任何的 JavaScript 碼。

而對於舊系統的相容也可以用 vm 變數做到對 Vue 實例的修改，在整合原有專案上有很大的優勢。

## 參考資料

* [Vue.js Guide : Installation](https://vuejs.org/v2/guide/installation.html)
* [Vue.js Guide : Introduction](https://vuejs.org/v2/guide/index.html)
* [Vue.js Guide : The Vue Instance](https://vuejs.org/v2/guide/instance.html)
* [Vue.js API](https://vuejs.org/v2/api/)