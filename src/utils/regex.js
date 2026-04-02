const regexRule = {
  number: /\D+/g,
  numberEnglishWordsASCII: /^([-.$/+%!"&'()*,:;<=>?@[\]^_`{|}~\w]+)$/, // 只能輸入英文、數字和ASCII特殊符號
  numberWithDecimal: /[^0-9.]|(?<=\d*\.\d*)\.+|^0+(?=\d)/g, // 允許數字與小數點
};
/**
 * 欄位不允許輸入
 * @param value 輸入的值
 * @returns 過濾完後的字串值
 */
function fieldForbiddenKeyin() {
  return "";
}

/**
 * 欄位只允許數字
 * @param {number | string} value 輸入的值
 * @param {object} 選項參數
 * @param {boolean} options.isMinusAllowed - 是否允許輸入負數
 * @returns 過濾完後的字串值
 */
function fieldRestrictToNumber(
  value,
  { isMinusAllowed } = { isMinusAllowed: false }
) {
  let newValue = value;
  if (isMinusAllowed) {
    if (newValue.startsWith("-")) {
      newValue = "-" + newValue.slice(1).replace(regexRule.number, ""); // 保證負號只在開頭
    } else {
      newValue = newValue.replace(regexRule.number, "");
    }
  } else {
    newValue = newValue.replace(regexRule.number, "");
  }
  if (newValue !== "0") {
    if (newValue === "00") {
      newValue = "0";
    } else {
      newValue = newValue.replace(/^0+/, "");
    }
  }
  return newValue || "";
}

/**
 * 欄位只允許小數點的數字
 * @param {number | string} value 輸入的值
 * @param {object} 選項參數
 * @param {boolean} options.isMinusAllowed - 是否允許輸入負數
 * @returns
 */
function fieldRestrictToDecimal(
  value,
  { isMinusAllowed } = { isMinusAllowed: false }
) {
  let newValue = value;
  if (isMinusAllowed) {
    if (newValue.startsWith("-")) {
      newValue =
        "-" + newValue.slice(1).replace(regexRule.numberWithDecimal, "");
    } else {
      newValue = newValue.replace(regexRule.numberWithDecimal, "");
    }
  } else {
    newValue = newValue.replace(regexRule.numberWithDecimal, "");
  }
  if (newValue === "0.") {
    newValue = "0.";
  }
  // 移除前導零，保留 "0." 不會被清除
  if (newValue !== "0" && !newValue.startsWith("0.")) {
    newValue = newValue.replace(/^0+/, "");
  }
  return newValue || "";
}

export { fieldForbiddenKeyin, fieldRestrictToNumber, fieldRestrictToDecimal };
