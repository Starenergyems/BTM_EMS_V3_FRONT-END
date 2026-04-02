import dayjs from 'dayjs';
import { fromUnixTime } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

/**
 * iso8601日期格式轉為字串
 * @param value 輸入的日期
 * @param formatString 時間格式
 * @returns 轉成format的日期字串值
 */
function toDateTimeStr(value, formatString = 'YYYY-MM-DD HH:mm') {
  return dayjs(value).format(formatString);
}
/**
 * 日期時間轉為UTC格式
 * @param value 輸入的日期
 * @param formatString 時間格式
 * @returns 轉成UTC字串值
 */
function toUtcDateTime(value, formatString = 'YYYY-MM-DD HH:mm') {
  const formatValue = dayjs(value).format(formatString);
  const utcTime = new Date(formatValue).toISOString();
  return utcTime.split('.')[0] + 'Z'; //移除iso8601毫秒的部分
}
/**
 * 數字每三位數加逗號
 * @param value 輸入的數字
 * @returns  數字每三位數加逗號的字串值
 */
function withCommas(value) {
  return new Intl.NumberFormat().format(value);
}

const formatTimestamp = (data) => {
  if (data) {
    // 自動判斷: 毫秒 (大於 10000000000) 或秒
    const seconds = data > 10000000000 ? Math.floor(data / 1000) : data;
    return formatInTimeZone(
      fromUnixTime(seconds),
      'Asia/Taipei',
      'yyyy-MM-dd HH:mm:ss',
    );
  } else {
    return '--';
  }
};

export { toDateTimeStr, toUtcDateTime, withCommas, formatTimestamp };
