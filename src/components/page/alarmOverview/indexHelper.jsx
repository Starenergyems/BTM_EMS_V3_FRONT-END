import { api } from '@/slices/api/setting';
import { endpoints } from '@/utils/endpoints';

// useHelpers 為最外層 function，function 內區塊的撰寫順序由上而下為：
// 1. useCallback 需要相依的 function
// 2. api function
// 3. 一般function

function useHelpers({ name, state, setState }) {
  const getDatas = async () => {
    try {
      const data = await api.get(endpoints?.alarm?.[name]);

      setState((prevState) => {
        return {
          ...prevState,
          data: data.data,
          filterDatas: data.data,
        };
      });
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const sortedData = [...state.filterDatas];

    if (sorter.order) {
      sortedData.sort((a, b) => {
        if (sorter.order === 'ascend') {
          return a[sorter.field] > b[sorter.field] ? 1 : -1;
        }
        return a[sorter.field] < b[sorter.field] ? 1 : -1;
      });
    }

    setState((prevState) => ({
      ...prevState,
      filterDatas: sortedData,
    }));
  };

  const handleSelectChange = (type) => {
    const data = [...state.data];

    const filteredData = data.filter((item) => {
      if (type === '') {
        return true;
      }
      return item.type === type;
    });

    setState((prevState) => ({
      ...prevState,
      filterDatas: filteredData,
    }));
  };

  return {
    getDatas,
    handleTableChange,
    handleSelectChange,
  };
}

export { useHelpers };
