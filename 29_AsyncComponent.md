# 非同步組件

在大型專案中，我們會需要在入大量的組件，這時候就可以使用非同步組件在需要時在載入需要的組件。

## 定義非同步組件

原本的 `Vue.component` 第二個參數是放組件物件的，可是如果是非同步組件的話就會是下面三種不同的傳入參數:

* **工廠函數**
* **`Promise`**
* **物件**

下面會做詳細的介紹。

## 工廠函數

工廠函數有兩個參數: `reolsve` 函數跟 `reject` 函數。

在工廠函數中使用非同步的方式取回組件，如果成功則叫用 `resolve` 並帶入組件，告訴工廠函數已經取得組件，而 `reject` 則是組件取得失敗時叫用，傳入失敗的理由。

下面一個使用工廠函數的非同步組件範例:

```js
Vue.component('async-component-factory-function', (resolve, reject) => {
  setTimeout(() => {
    resolve({
      template: '<div>Async Component</div>'
    });
  }, 1000);
});
```

這個例子使用 `setTimeout` 模擬非同步的情形，在 `1` 秒後叫用 `resolve` 函數，並傳回組件物件。

如此一來過了 `1` 秒之後頁面就會取得組件而進行渲染了。

接著來看失敗時候的情形:

```js
Vue.component('async-component-base', (resolve, reject) => {
  setTimeout(() => {
    reject('Error!!!');
  }, 1000);
});
```

`reject` 函數跟 `resolve` 的參數不同，它是傳入錯誤訊息。

過了一秒後可以在 `Console` 看到下面的訊息:

![reject](image\29_AsyncComponent\reject.PNG)

它會輸出是在哪裡拋出 `reject` 以及錯誤訊息。

## `Promise`

`Vue.component` 的第二個參數也可以是 `Promise` 物件。

如下例所示:

```js
Vue.component('async-component-promise', () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      template: '<div>Async Component</div>'
    });
    // reject('Error!!!');
  }, 1000);
}));
```

其實 `Promise` 的第一個參數就是工廠函數，所以使用方式跟工廠函數相同。

## 物件

最後要介紹的是功能最強大的物件定義方式，它可以在物件中定義三個組件及兩個數值:

* `component` : 非同步組件。
* `loading` : 在非同步組件載入前渲染於頁面的組件。
* `error` : 載入錯誤時的組件。
* `delay` : 在 `delay` 多久後顯示等待組件。
* `timeout` : 超過 `timeout` 時間後渲染錯誤組件。

```js
const LoadingComponent = {
  template: '<div>Loading...</div>'
};
const ErrorComponent = {
  template: '<div>Error!!!</div>'
};
Vue.component('async-component', () => ({
  component: new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
          template: '<div>Async Component</div>'
        });
        // reject('Error!!!');
    }, 1000);
  }),
  loading: LoadingComponent,
  error: ErrorComponent,
  delay: 200,
  timeout: 3000
}));
```

這個例子設定如下:

* 在 `1` 秒載入組件。
* `0.2` 秒後顯示等待組件 `LoadingComponent` 。
* 如果超過 `3` 秒，顯示錯誤組件 `ErrorComponent` 。

## DEMO

* [GitHub](demo\29_AsyncComponent\index.html)
* [CodePen](https://codepen.io/peterhpchen/pen/GwNWdB)

## 結語

本文介紹了非同步組件的三種使用方式: 工廠函數、 `Promise` 及物件，物件的方式可以在尚未載入組件前先秀出等待組件，也可以在錯誤時秀出錯誤組件來引導使用者。

## 參考資料

* [Vue.js Guide: Async Components](https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components)
* [Vue.js API: Vue.component( id, [definition] )](https://vuejs.org/v2/api/#Vue-component)