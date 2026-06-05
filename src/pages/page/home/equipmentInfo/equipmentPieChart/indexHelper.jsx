import { useCallback } from 'react';
import { equipmentInfoDatas } from '@/pages/page/home/equipmentInfo/indexConfig';
import { chartOptions, customLegendOnClick, handleChart } from '@/utils/chart';
import { hexToRgba } from '@/styles/function';
// import * as echarts from 'echarts';
import { color } from '@/styles/variable/indexStyle';

// useHelpers 為最外層 function，function 內區塊的撰寫順序由上而下為：
// 1. useCallback 需要相依的 function
// 2. api function
// 3. 一般function

const legendNameMap = equipmentInfoDatas.filter((item) => item.name !== '');

function useHelpers({ refs, setMainState }) {
  const { printChartRef, printRef } = refs;

  const defaultChartOptions = chartOptions(legendNameMap);

  // 取得服務商品 API 資料
  const getServiceProductData = useCallback(() => {
    const fetchData = {
      realTimeSpinningReserve: [],
    };
    setMainState((prevState) => {
      return {
        ...prevState,
        serviceProductData: fetchData.realTimeSpinningReserve,
      };
    });
  }, [setMainState]);

  // 服務商品圖設定檔
  const getChartOption = useCallback(() => {
    return {
      ...defaultChartOptions,
      grid: {
        ...defaultChartOptions.grid,
        borderWidth: 0,
      },
      legend: {
        show: false,
      },
      series: [
        // --- 最內層的深色圓心 ---
        {
          data: [
            {
              itemStyle: { color: hexToRgba(color.themeBlack, 0.25) },
              value: 1,
            },
          ],
          label: { show: false },
          radius: ['32%', '35%'],
          silent: true,
          type: 'pie',
        },
        // --- 數據環狀圖 (黃色、橘色、淡粉色區塊) ---
        {
          clockwise: true, // 逆時針排列（從右到左）
          emphasis: {
            scale: false,
            scaleSize: 5,
          },
          label: { show: false },
          radius: ['35%', '75%'], // 調整半徑達成圖中比例
          type: 'pie',
        },
        // --- 最外層的裝飾凹槽 (使用 graphic 或另一個 pie) ---
        {
          data: [
            {
              itemStyle: {
                color: hexToRgba(color.themeBlack, 0.25),
                shadowBlur: 4,
                shadowColor: hexToRgba(color.black, 0.25),
                shadowInset: true, // 內陰影 (這是模擬凹陷的關鍵)
              },
              value: 1,
            },
          ],
          label: { show: false },
          radius: ['75%', '85%'],
          silent: true,
          type: 'pie',
        },
      ],
      title: {
        left: 'center',
        text: '',
        textStyle: {
          fontSize: 20,
          fontWeight: 'normal',
        },
        top: 'center',
      },
      type: 'pie',
    };
  }, [printRef]);

  // 服務商品繪製
  const setChart = useCallback(
    (option) => {
      handleChart(printRef, printChartRef, option);
    },
    [printRef, printChartRef],
  );

  return {
    customLegendOnClick,
    getChartOption,
    getServiceProductData,
    legendNameMap,
    setChart,
  };
}

export { useHelpers };
