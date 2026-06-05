import { api } from '@/slices/api/setting';
import { endpoints } from '@/utils/endpoints';

// useHelpers 為最外層 function，function 內區塊的撰寫順序由上而下為：
// 1. useCallback 需要相依的 function
// 2. api function
// 3. 一般function

function useHelpers({ name, setInfoState, setState }) {
  const getDatas = async (date) => {
    try {
      const data = await api.get(endpoints?.[name]?.lineChart, {
        params: { date },
      });

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

  const getInfoDatas = async () => {
    try {
      const data = await api.get(endpoints?.[name]?.invertor);
      setInfoState((prevState) => {
        return {
          ...prevState,
          ...data.data,
        };
      });
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  return {
    getDatas,
    getInfoDatas,
  };
}

export { useHelpers };
