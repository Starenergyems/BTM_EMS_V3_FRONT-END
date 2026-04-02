/**
 * 轉換為符合ColorType的顏色
 * @param propType 顏色類別
 * @param referenceTypes 顏色所有種類
 * @param alpha 透明度
 * @returns 轉換成符合ColorType顏色的字串
 */
function colorHandle(propType, referenceTypes, alpha) {
  let result = "";
  for (const typeItem in referenceTypes) {
    if (propType === typeItem) {
      result = referenceTypes[typeItem];
      break;
    }
  }
  //若本身為rgba傳入，則不用進行轉碼
  if (result.includes("rgba")) {
    const colorStartIndex = result.indexOf("(");
    const colorEndIndex = result.indexOf(")");
    const colorRgbaArr = result
      .substring(colorStartIndex + 1, colorEndIndex)
      .trim()
      .split(",")
      .map(Number);
    return `rgba(${colorRgbaArr[0]},${colorRgbaArr[1]},${colorRgbaArr[2]},${
      alpha || colorRgbaArr[3]
    })`;
  } else {
    if (alpha && alpha >= 1) {
      alpha = 1;
    }
    let c, d;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(result)) {
      d = result.substring(1).split("");
      if (d.length === 3) {
        d = [d[0], d[0], d[1], d[1], d[2], d[2]];
      }
      c = parseInt(d.join(""), 16);
      return (
        "rgba(" +
        [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
        "," +
        alpha +
        ")"
      );
    }
  }
}

/**
 * 色碼16進制轉換為rgba
 * @param hex 色碼16進制
 * @param aplha 透明度
 * @returns 轉換成rgba字串
 */
function hexToRgba(hex, aplha = 1) {
  let c, d;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    d = hex.substring(1).split("");
    if (d.length === 3) {
      d = [d[0], d[0], d[1], d[1], d[2], d[2]];
    }
    c = parseInt(d.join(""), 16);
    return (
      "rgba(" +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
      "," +
      aplha +
      ")"
    );
  }
}

/**
 * 色碼rgba轉換為16進制
 * @param rgba rgba格式的字串
 * @returns 轉換成16進制字串
 */
function rgbaToHex(rgba) {
  // 提取 rgba 值
  const result = rgba.match(/\d+(\.\d+)?/g); // 匹配所有数字，包括小数
  if (result) {
    const r = parseInt(result[0]).toString(16).padStart(2, "0");
    const g = parseInt(result[1]).toString(16).padStart(2, "0");
    const b = parseInt(result[2]).toString(16).padStart(2, "0");
    // 處理 alpha 值（如果存在），轉換為 0-255 的範圍
    const a = result[3]
      ? Math.round(parseFloat(result[3]) * 255)
          .toString(16)
          .padStart(2, "0")
      : "";
    // 如果 alpha 是 1，則不添加 alpha 部分
    return a === "ff" ? `#${r}${g}${b}` : `#${r}${g}${b}${a}`; // 返回 hex 值
  }
  return rgba; // 如果不是標準 rgba 格式，直接返回
}

export { colorHandle, hexToRgba, rgbaToHex };
