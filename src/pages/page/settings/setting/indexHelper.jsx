import { api } from '@/slices/api/setting';
import { endpoints } from '@/utils/endpoints';

// useHelpers 為最外層 function，function 內區塊的撰寫順序由上而下為：
// 1. useCallback 需要相依的 function
// 2. api function
// 3. 一般function

function useHelpers({ formInstance, setState }) {
  const getDatas = async (prefillValues = {}) => {
    try {
      const [limitResponse, switchResponse] = await Promise.all([
        api.get(endpoints.setting.limit),
        api.get(endpoints.setting.switch),
      ]);

      // 確認 API 回傳的資料結構
      const finalData = {
        ...limitResponse.data.data,
        ...switchResponse.data.data,
      };
      const mergedData = {
        ...finalData,
        ...prefillValues,
      };
      setState((prevState) => {
        return {
          ...prevState,
          ...mergedData,
        };
      });
      formInstance.setFieldsValue(mergedData);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  return {
    getDatas,
  };
}

export { useHelpers };
