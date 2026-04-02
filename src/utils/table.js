/**
 * 取得表格每頁該顯示幾筆(根據視窗高度動態計算)
 * @returns 每頁顯示幾筆row的數字
 */
function getTablePageSize() {
  const rowHeight = 40;
  const offset = 280;
  const rows = Math.floor((window.innerHeight - offset) / rowHeight);
  return rows > 0 ? rows : 0;
}

export { getTablePageSize };
