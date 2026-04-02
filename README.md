# 表後系統

### npm 指令說明

- 啟動本地伺服器
  ```
  npm run dev
  ```
- 打包前端程式碼
  ```
  npm run build
  ```

### Node & NPM 目前版本

- node：v20.18.0
- npm：10.8.2

### 前端框架

- React18

### UI Libray :

- Ant Design 5.0

### 樣式處理 :

- Styled Components

### 狀態管理 :

- Redux Toolkit

### 處理 Ajax 工具

- Axios

### git 分支說明

- develop：測試環境(開發人員)
- staging：測試環境(user)
- master：正式環境

### git 前置作業

為了避免出現資料夾、檔案名稱大小寫不敏感引起的後續問題，請務必先設定 git 為大小寫敏感

```
git config core.ignorecase false
```

### git commit 規則

commit 開頭請依照以下類型分類：

- feat: 新增/修改功能 (feature)。
- fix: 修補 bug (bug fix)。
- docs: 文件 (documentation)。
- style: 格式 (不影響程式碼運行的變動 white-space, formatting, missing semi colons, etc)。
- refactor: 重構 (既不是新增功能，也不是修補 bug 的程式碼變動)。
- perf: 改善效能 (A code change that improves performance)。
- test: 增加測試 (when adding missing tests)。
- chore: 建構程序或輔助工具的變動 (maintain)。

單行 commit 例子：

```
feat: 登入頁新增按鈕功能
```

多行 commit 例子(第二行請保留空行)：

```
fix: 修正登入頁bug

修正項目：
1. 登入按鈕點擊失效
2. 登入按鈕api回傳錯誤處理
```

### 開發輔助工具

- Eslint + Prettier
  > Visual Studio Code 建議安裝擴充工具：
  >
  > 1. ESLint
  > 2. Prettier - Code formatter

### 命名規則

- 專案資料夾命名
  命名採小寫駝峰式(Lower-Camel-Case)
  例如：assets、components、pageView
- 檔案名稱命名
  命名採小寫駝峰式(Lower-Camel-Case)
  例如：index.js、indexConfig.jsx、header.jsx
  > 除了預設的 App.jsx
- **ts 檔案內的程式碼** 命名採小寫駝峰式(Lower-Camel-Case)
  例如：firstName、userPhone
- **html、css 選擇器(class、id 等等)** 命名採小寫"-"式(Kebab-Case)
  單字一律小寫，並以 "-" 符號做區隔
  例如：first-name、user-phone

### 專案目錄結構

```
├── src
│ ├── api // 所有與後端 api 串接的內容
│ │ ├── index.js // 全站的 api 呼叫 function
│ │ ├── setting.js // 全站的 api 初始化設定，以及通用的 requst、response 攔截處理
│ ├── assets // 其他雜項要引入的靜態檔案(圖檔、json 檔等等...)
│ ├── commponents // 任何頁面都可以使用的共用元件
│ │ ├── units // 最小單位的元件
│ │ └── widgets // 由多個 Unit 組成的元件
│ ├── hooks // 自定義的 hook(custom hook，命名請使用 use 開頭)
│ ├── pages // 各路由頁面的主元件(根據路由設定的"/"路徑來決定巢狀結構)
│ ├── slices // Redux Toolkit 狀態管理中的所有 slice
│ │ ├── api // api 相關
│ │ │ ├── main // 所有與後端 api 串接的內容
│ │ │ ├── index.js // 集合所有 main 中的 api
│ │ │ └── setting.js // axios 的相關設定(初始化、攔截器)
│ │ ├── layout // 與主畫面相關
│ │ ├── menu // 左側主選單相關
│ │ └── index.js //集合所有創建的 slice
│ ├── store
│ │ └── index.js // Redux Toolkit 狀態管理中的核心
│ ├── styles // 樣式處理
│ │ ├── customLibrary // 引入的套件，客製化樣式處理
│ │ ├── customStyle // 自定義的樣式，要供給全站使用
│ │ ├── function // 樣式處理可供全站使用的 function
│ │ ├── variable // 樣式處理可供全站使用的變數
│ │ └── globalStyle.js //全域樣式處理元件(僅負責引入樣式，不要在這邊撰寫樣式)
│ ├── utils // 全站可共用的 function
│ ├── App.jsx // 全站起始點主元件
│ ├── main.jsx // 全站起始點
│ └── router.jsx // 路由設定
├── .env.development // development 測試環境設定檔
├── .env.production // production 正式環境設定檔
```

### 元件.jsx 檔，內部靜態變數資料拆分說明

若元件內的所有靜態資料結構超出 50 行，請在同層資料夾路徑下創建 xxConfig.jsx 檔(與主元件檔名一樣 + Config)，來將靜態檔案填入後再匯出，並且將 .jsx 檔案與此 xxConfig.jsx 檔放在同一資料夾。

```
例如：
原始路徑檔案為
├── pages
│ ├── login
│ │ └── index.jsx
變成
├── pages
│ ├── login
│ │ ├── index.jsx
│ │ └── indexCofig.jsx
```

### 元件.jsx 檔，內部 method function 資料拆分說明

若創建的 method function 總和的資料結構超出 100 行，請在同層資料夾路徑下創建 xxHelper.jsx 檔(與主元件檔名一樣)，來將 function 填入後再匯出，並且將 .jsx 檔案與此 xxHelper.jsx 檔放在同一資料夾。

```
例如：
原始路徑檔案為
├── pages
│ ├── login
│ │ └── index.jsx
變成
├── pages
│ ├── login
│ │ ├── index.jsx
│ │ └── indexHelper.jsx
```

### 元件樣式檔命名

主元件 + Style 的命名方式

```
例如：
原始路徑檔案為
├── pages
│ ├── login
│ │ └── index.jsx
變成
├── pages
│ ├── login
│ │ └── index.jsx
│ │ └── indexStyle.jsx
```

### 元件.jsx 檔，元件內再拆分元件說明

第一層先創建資料夾，資料夾下再創建 index.jsx(主元件)，若主元件要再拆分子元件，則同層創建子元件(例如：aComponent.jsx、bComponent.jsx)，而若子元件還要再拆分子元件，則再往下創建資料夾，(例如：aComponent 要再拆分子元件)，資料夾名稱取為該元件名稱，並且創建 index.jsx，以此類推的巢狀結構。

```
例如：
原始路徑檔案為
├── views
│ ├── login
│ │ ├── index.jsx (login 主元件)
│ │ └── aComponent.jsx (login 主元件拆分的子元件)
變成
├── views
│ ├── login
│ │ ├── index.jsx (login 主元件)
│ │ ├── aComponent
│ │ │ ├── index.jsx (login 主元件拆分的子元件,同 aComponent.jsx(此時為子元件中的主元件))
│ │ │ └── aComponentChild.jsx (login 子元件下的子元件(孫元件))
```

※ 而拆分的子元件中，若要共用其中同一個子元件，則可以將要共用的子元件，提升至每個要使用他的子元件的上層資料夾

```
例如：
原始路徑檔案為
├── views
│ ├── login
│ │ ├── index.jsx (login 主元件)
│ │ └── aComponent.jsx
│ │ └── bComponent.jsx
│ │ └── commonComponent.jsx (a、b 元件均會使用的子元件)
變成
├── views
│ ├── login
│ │ ├── index.jsx (login 主元件)
│ │ ├── aComponent
│ │ │ └── index.jsx
│ │ ├── bComponent
│ │ │ └── index.jsx
│ │ └── commonComponent.jsx (a、b 元件均會使用的子元件)
```

### 元件.jsx 檔，使用 context 傳遞狀態拆分說明

若元件中的狀態，要傳遞給更深層的元件，請在同層資料夾路徑下創建 xxContext.jsx 檔(與主元件檔名一樣 + Context)，來將型別資料填入後再匯出，並且將 .jsx 檔案與此 xxContext.jsx 檔放在同一資料夾。

```
例如：
原始路徑檔案為
├── pages
│ ├── login
│ │ └── index.jsx
變成
├── pages
│ ├── login
│ │ ├── index.jsx
│ │ └── indexContext.jsx
```

### 路由頁面元件及資料夾拆分說明

路由資料夾 pages 下先創建首頁的 index.jsx 檔，接著路由以創建資料夾 page 來識別為其子路由，page 資料夾下再創建資料夾命名為子路由的名稱 (子路由名稱需對應網址列以"/"區分的路徑名稱)

```
例如：
原始路由結構為
├── pages
│ ├── index.jsx
要新增子路由 A 的話(網址列路徑為/routeA)，變成
├── pages
│ ├── index.jsx
│ ├── page
│ │ ├── routeA
│ │ │ └── index.jsx
```

> 非以 page 資料夾命名的，則應視為一般的元件拆分子元件的規則 -> [元件.jsx 檔，元件內再拆分元件說明](#元件tsx-檔，元件內再拆分元件說明)

### 單元測試、元件測試

- 副檔名使用 .test.jsx
- 檔案的位置建立在要測試的主元件(或要測試的 function 檔案)同層，先創建資料夾(資料夾名稱取名**tests**)，接著在此**tests**建立與主元件同名稱的.spec 檔，若有拆分多個子元件，則同 [元件.jsx 檔，元件內再拆分元件說明](#元件tsx-檔，元件內再拆分元件說明)
  > ※ 在要創建**tests**資料夾時，只要它的上層資料夾以上出現過一次，之後的子、孫層就不需要再建立**tests**資料夾，只要單純建立一般資料夾即可

```
1. 例如：
   ├── views
   │ ├── login
   │ │ ├── index.jsx (login 主元件)
   │ │ ├── aComponent.jsx (login 主元件拆分的子元件)
   │ │ ├── **\_\_tests\_&zwnj;\_**
   │ │ │ ├── **index.test.jsx**
   │ │ │ └── **aComponent.test.jsx**
2. 例如：
   ├── views
   │ ├── login
   │ │ ├── Index.vue (login 主元件)
   │ │ ├── acomponent
   │ │ │ ├── Index.vue (login 子元件下的主元件)
   │ │ │ └── AcomponentChild.vue (login 子元件下的子元件(孫元件))
   │ │ ├── **\_\_tests\_&zwnj;\_**
   │ │ │ ├── **Index.test.jsx**
   │ │ │ ├── **acomponent**
   │ │ │ │ ├── **index.test.jsx**
   │ │ │ │ └── **aComponentChild.test.jsx**
3. 例如：
   ├── utilities
   │ ├── validation
   │ │ ├── index.js (要測試的 function 檔案)
   │ │ ├── **\_\_tests\_&zwnj;\_**
   │ │ │ └── **index.test.jsx**
```

### Component 元件說明

[元件說明](./COMPONENT.md)

### Ant Design 全域元件樣式說明

[元件說明](./LIBRARYSTYLE.md)
