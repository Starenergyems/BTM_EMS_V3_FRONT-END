import toast from 'react-hot-toast';
import { api } from '@/slices/api/setting';
import { endpoints } from '@/utils/endpoints';
import { config } from './indexConfig.jsx';

import { color } from '@/styles/variable/indexStyle';

export const useHelpers = ({
  calevents,
  eventIndex,
  setCalEvents,
  setEventIndex,
  toggle,
}) => {
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

  // 刪除日曆的點擊事件拿索引值
  const delEvent = (event) => {
    toggle.onTrue();
    setEventIndex(calevents.findIndex((elem) => elem.id === event.id));
  };

  // 確認刪除事件
  const handleDelete = async () => {
    const newList = [...calevents];
    newList.splice(eventIndex, 1);

    try {
      const response = await api.post(endpoints.schedule.calendarEvent, {
        events: newList,
      });
      if (response.status === 200) {
        toast.success('已成功刪除排程');
        getEventData(); // 刪除後重新取得日曆資料
        toggle.onFalse();
      }
    } catch (error) {
      console.error('API Error:', error);
      toast.error('刪除排程失敗');
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

  return { delEvent, eventColors, getEventData, handleDelete };
};
