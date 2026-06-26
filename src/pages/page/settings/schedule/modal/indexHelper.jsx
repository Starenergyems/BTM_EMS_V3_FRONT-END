import toast from 'react-hot-toast';
import { api } from '@/slices/api/setting';
import { endpoints } from '@/utils/endpoints';

export const useHelpers = ({
  eventIndex,
  getEventData,
  toggle,
  toggleDelete,
}) => {
  console.log('刪除事件ID:', eventIndex); // 確認要刪除的事件ID
  // 確認刪除事件
  const handleDelete = async () => {
    try {
      const response = await api.delete(
        endpoints.schedule.deleteCalendarEvent(eventIndex?.id),
      );
      if (response.status === 200) {
        toast.success('已成功刪除排程');

        toggle.onFalse();
        toggleDelete.onFalse();
        getEventData(); // 刪除後重新取得日曆資料
      }
    } catch (error) {
      console.error('API Error:', error);
      toast.error('刪除排程失敗');
    }
  };

  return { handleDelete };
};
