## Library

專案資料夾路徑
styles/customLibrary

撰寫規則：

1. 專案資料夾中的 components 中未定義的元件，才在此處設定全域樣式
2. 各分類樣式依照命名的英文字母排序
   例如：

```javascript
/* Badge */
const badgeStyles = css`
    ...
`;
/* Button */
const buttonStyles = css`
    ...
`;
/* Card */
const cardStyles = css`
    ...
`;
```

Library 項目：

- [Ant Design Component](#Ant-Design-Component)

### Ant Design Component

1. 若元件有各種不一樣的 UI 呈現，(例如：Table 元件有不同的顏色欄位)，可自定義 className 作為 template，並撰寫完此 className 的樣式後，就可以使用
   例如 Table 元件為例：

```jsx
// styles/customLibrary/antd/indexStyle.js

const tableStyles = css`
.ant-table-wrapper {
    &.theme-light {
        ...
    }
    &.theme-secondary {
        ...
    }
}
`;
const style = css`
  ${tableStyles}
`;
export default style;
```

```jsx
// Table元件使用時，加上template的className

import { Table } from "antd";

<Table
    className="theme-secondary"
    ...
/>
```
