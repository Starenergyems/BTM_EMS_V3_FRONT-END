import { api } from '@/slices/api/setting';
import { endpoints } from '@/utils/endpoints';

// useHelpers 為最外層 function，function 內區塊的撰寫順序由上而下為：
// 1. useCallback 需要相依的 function
// 2. api function
// 3. 一般function

function useHelpers({ name, setState }) {
  const getDatas = async (timeUnit, range) => {
    try {
      let data;
      if (range === 'day') {
        data = await api.get(endpoints?.[name]?.billChart, {
          params: { date: timeUnit.day },
        });
      } else {
        data = await api.get(endpoints?.[name]?.billMonthChart, {
          params: { year: timeUnit.year },
        });
      }

      setState((prevState) => {
        return {
          ...prevState,
          ...data.data.data,
        };
      });
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  return {
    getDatas,
  };
}

export { useHelpers };
