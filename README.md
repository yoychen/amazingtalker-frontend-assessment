# amazingtalker-frontend-assessment

## 架構規劃

參考 MVVM 的設計概念，vue components 負責畫面的呈現與使用者交互的處理，並將資料取得與轉換等相關的領域邏輯抽離到 models 中

- components
    - 負責畫面的呈現與使用者交互的處理
- models
    - 資料的取得與處理等相關的領域邏輯
- utils
    - 各類型的 helper
- tests/unit
    - components
        - components 的測試
    - models
        - models 的測試

### 使用的外部套件

- vue-rx
    - 以 Observable 的概念來處理非同步邏輯
- lodash/fp
    - 使用 Functional Programming 的 pattern 來處理資料轉換
- Day.js
    - 處理時間相關計算
- vue-i18n
    - 用以支援 i18n

## 時間相關的處理

本專案使用 bundle 後 size 比 [Moment.js](https://momentjs.com/) 來得小的 [Day.js](https://day.js.org/)，且為了不讓核心的邏輯直接相依該套件，本專案有額外將需要的功能封裝成專案內部的 utils (詳見 src/utils/date.js)，以方便後續維護上可以抽換時間處理套件的實作 (如換成 Moment.js 或自己造輪子)

## 非同步存取資料機制的比較

觀察 AmazingTalker 網站上的行事曆元件，從行為上推測該元件是採用過去常見的表單上傳策略來實作，元件會在使用者點選 [下一週] 按鈕時，使用內部狀態來暫時關閉切換時間的功能，直到資料載入完成，該作法適合用於網路環境穩定的裝置，但在網路稍差的裝置，若想要切換到較後面的時間點則會需要使用者等些時間，待資料載入完成後才能繼續載入後面的時段；另外在測試時遇到若暫時將網路關閉，讓 request 失敗，該行事曆元件會因此沒有將狀態重設，而導致按鈕不再處理使用者後續點擊的行為。

因此本專案試著採用另一種策略來做到較流暢的載入體驗，在實作上，元件不會因為資料在載入中而暫時關閉切換時間的功能，並使用 vue-rx 提供的 RxJS 的整合，以 Observable 的概念來處理非同步的載入資料邏輯，避免之前發出的請求但在完成後已經不是當前需要的資料，還將過時的資料呈現於元件的畫面上，減少無意義的 rerender，並可以避免使用者看到畫面的閃爍。

### 測試用假資料

本專案使用的測試資料是複製於範例網頁中 API 的回應內容，只有模擬四週內的預約內容，但有額外設定 proxy 來讓開發模式下可以直接存取範例網頁中的 API，因此建議可以使用 `npm run serve` 指令來存取開發用網站，以存取正式的資料。

## 測試

本專案使用的測試策略如下：

- 一個 test case 只測試一個關注點，各個 test case 皆可以獨立執行
- 使用 AAA (Arrange, Act & Assert) 模式描述 test case
- 使用工廠方法建立待測項目，避免濫用全域狀態與 beforeEach
- 使用專屬的 data-testid 定位元素，避免直接相依 CSS selector，進而造成重構時若改動到 CSS 結構而影響測試穩定度
- 盡量使用 stub 來隔離外部相依，並盡量以測試待測對象的外部行為與狀態為主，以避免過度濫用 mock 而造成 overspecification

### 覆蓋率

除了 demo 用的切換語系元件與模擬 AJAX 的 utils 因為在測試時被 stub 所以沒有被測試到，其餘皆有做基本的設計規格驗證。

File                   |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-----------------------|----------|----------|----------|----------|-------------------|
All files              |    86.75 |    55.56 |    84.62 |    84.29 |                   |
 components            |    97.14 |      100 |    93.75 |    97.14 |                   |
  LocaleChanger.vue    |        0 |      100 |        0 |        0 |                12 |
  Schedule.vue         |      100 |      100 |      100 |      100 |                   |
  ScheduleContent.vue  |      100 |      100 |      100 |      100 |                   |
  ScheduleControl.vue  |      100 |      100 |      100 |      100 |                   |
  TimeList.vue         |      100 |      100 |      100 |      100 |                   |
 i18n                  |      100 |      100 |      100 |      100 |                   |
  en.js                |        0 |        0 |        0 |        0 |                   |
  index.js             |      100 |      100 |      100 |      100 |                   |
  zh.js                |        0 |        0 |        0 |        0 |                   |
 models                |      100 |      100 |      100 |      100 |                   |
  querySchedule.js     |      100 |      100 |      100 |      100 |                   |
 utils                 |    64.29 |        0 |    66.67 |       50 |                   |
  date.js              |      100 |      100 |      100 |      100 |                   |
  fakeAxios.js         |     9.09 |        0 |        0 |     9.09 |... 27,29,31,32,33 |
  withToastingError.js |      100 |      100 |      100 |      100 |                   |



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
