import { api } from '@/slices/api/setting';
import { endpoints } from '@/utils/endpoints';
import { config } from './indexConfig.jsx';
import { color } from '@/styles/variable/indexStyle';

export const useHelpers = ({ setCalEvents }) => {
  // 取得排程資料
  const getEventData = async () => {
    try {
      const response = await api.get(endpoints?.schedule?.calendarEvent);
      const data = response?.data?.data || [];
      setCalEvents(data);
    } catch (error) {
      console.error('API Error:', error);
      setCalEvents([]);
    }
  };

  // 日曆事件顏色
  const eventColors = (event) => {
    const colorConfig = config.find(
      (c) => c.strategy === event.extendedProps?.strategy,
    );
    if (colorConfig?.color) {
      return { style: { backgroundColor: colorConfig.color } };
    }
    return { style: { backgroundColor: color.buttonGray } };
  };

  return { eventColors, getEventData };
};
