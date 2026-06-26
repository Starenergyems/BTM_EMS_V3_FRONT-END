import dayjs from 'dayjs';

export const useUtils = ({ formInstance }) => {
  // 月選 8 日型選項控制 disabled
  const isBetweenMayAndOctober = (
    current = formInstance.getFieldValue('range'),
  ) => {
    if (!current) return false;

    if (Array.isArray(current)) {
      const [rangeStart, rangeEnd] = current;
      if (!rangeStart || !rangeEnd) return false;

      const start = dayjs(rangeStart);
      const end = dayjs(rangeEnd);
      if (!start.isValid() || !end.isValid()) return false;

      const targetYear = start.year();
      const seasonStart = dayjs()
        .year(targetYear)
        .month(4)
        .date(1)
        .startOf('day');
      const seasonEnd = dayjs().year(targetYear).month(9).date(31).endOf('day');

      return start.isSame(seasonStart, 'day') && end.isSame(seasonEnd, 'day');
    }

    const targetDate = dayjs(current);
    if (!targetDate.isValid()) return false;

    return false;
  };

  // 保證行反應通知時間驗證
  const createGuaranResponseInformValidator = () => (_, value) => {
    if (!value) return Promise.resolve();

    const timeRange = formInstance.getFieldValue('guaran_response_time');
    if (!timeRange || !Array.isArray(timeRange) || timeRange.length !== 2) {
      return Promise.resolve();
    }

    const [startTime, endTime] = timeRange;
    const selectedTime = value.format('HH:mm');
    const rangeStart = startTime.format('HH:mm');
    const rangeEnd = endTime.format('HH:mm');

    if (selectedTime <= rangeStart || selectedTime >= rangeEnd) {
      return Promise.reject(
        new Error(`通知時間必須在 ${rangeStart} 到 ${rangeEnd} 之間`),
      );
    }

    return Promise.resolve();
  };

  const MIN_HOUR = 13;
  const MAX_HOUR = 22;

  const createDisabledTime = () => ({
    disabledHours: () =>
      Array.from({ length: 24 }, (_, hour) => hour).filter(
        (hour) => hour < MIN_HOUR || hour > MAX_HOUR,
      ),
    disabledMinutes: (selectedHour) => {
      if (selectedHour === MAX_HOUR) {
        return Array.from({ length: 60 }, (_, minute) => minute).filter(
          (minute) => minute > 0,
        );
      }
      return [];
    },
    disabledSeconds: () =>
      Array.from({ length: 60 }, (_, second) => second).filter(
        (second) => second > 0,
      ),
  });


  

  return {
    isBetweenMayAndOctober,
    createGuaranResponseInformValidator,
    createDisabledTime,
  };
};
