import { useSelector } from 'react-redux';
import { api } from '@/slices/api/setting';
import { endpoints } from '@/utils/endpoints';

// useHelpers 為最外層 function，function 內區塊的撰寫順序由上而下為：
// 1. useCallback 需要相依的 function
// 2. api function
// 3. 一般function

function useHelpers({ setChartDatas, setEquipmentDatas, setFlowDatas }) {
  const intervalStore = useSelector((state) => state.layout);

  const getEquipmentDatas = async () => {
    try {
      const data = await api.get(endpoints.homepage.equipment);
      setEquipmentDatas(data.data.data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const getFlowDatas = async () => {
    try {
      const data = await api.get(endpoints.homepage.flowBlock);
      setFlowDatas(data.data.data);
      return data.data;
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const getTrendDatas = async (date,) => {
    try {
      const [trendRes, equipmentRes] = await Promise.all([
        api.get(endpoints.homepage.trendChart, {
          params: { date, interval: intervalStore.interval },
        }),

        api.get(endpoints.homepage.equipmentChart, {
          params: { date },
        }),
      ]);

      setChartDatas((prevState) => {
        return {
          ...prevState,
          equipmentChartDatas: equipmentRes.data.data,
          trendDatas: trendRes.data.data,
        };
      });
    } catch (error) {
      console.error('getTrendDatas error:', error);
      // 發生錯誤時保持現有資料或設為空
      setChartDatas({
        chartDatas: [],
        equipmentChartDatas: {},
        trendDatas: {},
      });
    }
  };

  return {
    getEquipmentDatas,
    getFlowDatas,
    getTrendDatas,
  };
}

export { useHelpers };
