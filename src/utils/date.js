import { format } from 'date-fns';

// 回傳一個月的日期或是年份

export const getMonthDates = (type = 'day', date) => {
  let startDate = new Date(date);

  // Array to hold the date labels
  let dateLabels = [];

  if (type === 'day') {
    // Generate the labels for Day 1 to Day 30
    for (let j = 0; j < 30; j++) {
      // Calculate the date for each day
      let currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + j);

      // Format the date as 'MM/DD' (or your preferred format)
      let formattedDate =
        currentDate.getMonth() + 1 + '/' + currentDate.getDate();

      // Add the formatted date to the labels array
      dateLabels.push(formattedDate);
    }
  } else {
    dateLabels = [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ];
  }
  return dateLabels;
};

// 判斷日期是否為當天
export const isToday = (day) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  return day !== today;
};
