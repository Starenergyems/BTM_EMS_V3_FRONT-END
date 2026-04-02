/**
 * 延遲指定的秒數
 * @param duration 要延遲的秒數(單位毫秒)
 * @returns {Promise<void>}
 */
function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
/**
 * 將圖片、檔案的URL位址轉為File
 * @param url 圖片、檔案的URL
 * @param fileName 命名檔案名稱
 * @returns {Promise<File>}
 */
async function urlToFile(url, fileName) {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], fileName, { type: blob.type });
}
/**
 * 將blob的檔案下載下來(例如後端的zip檔案轉為blob格式並下載)
 * @param blobData 圖片、檔案的URL
 * @param fileName 命名檔案名稱
 */
function blobDownload(blobData, fileName) {
  const url = URL.createObjectURL(blobData);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url); // 釋放記憶體
}

export { blobDownload, delay, urlToFile };
