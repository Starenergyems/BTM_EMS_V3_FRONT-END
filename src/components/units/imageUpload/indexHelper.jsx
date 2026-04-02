//圖片轉base64
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
//上傳檔案onChange事件
function handleChange({ fileList: newFileList }, setFileList, uploadAttr) {
  setFileList(newFileList);
  if (typeof uploadAttr?.onChange === "function") {
    uploadAttr.onChange(newFileList);
  }
}
//處理圖片預覽
async function handlePreview(
  currentFile,
  fileList,
  setPreviewImages,
  setPreviewCurrentIndex,
  setPreviewOpen
) {
  const currentPreviewIndex = fileList.findIndex(
    (item) => item.uid === currentFile.uid
  );
  let previews = [];
  for (const [index, item] of fileList.entries()) {
    const obj = {
      id: item.uid,
      src: item.url || (await getBase64(item.originFileObj)),
    };
    previews[index] = obj;
  }
  setPreviewImages(previews);
  setPreviewCurrentIndex(currentPreviewIndex);
  setPreviewOpen(true);
}
//檢測是否為useRef創建的物件
function isReactRef(ref) {
  return (
    ref instanceof Object &&
    Object.prototype.hasOwnProperty.call(ref, "current")
  );
}

export { getBase64, handleChange, handlePreview, isReactRef };
