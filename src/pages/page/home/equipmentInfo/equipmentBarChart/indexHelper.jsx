import { useCallback } from 'react';
// import * as echarts from 'echarts';
import { color } from '@/styles/variable/indexStyle';
import { chartOptions, customLegendOnClick, handleChart } from '@/utils/chart';
import { equipmentInfoDatas } from '@/pages/page/home/equipmentInfo/indexConfig';

// useHelpers 為最外層 function，function 內區塊的撰寫順序由上而下為：
// 1. useCallback 需要相依的 function
// 2. api function
// 3. 一般function

const legendNameMap = equipmentInfoDatas.filter((item) => item.name !== '');

function useHelpers({ refs }) {
  const { printRef, printChartRef } = refs;

  const defaultChartOptions = chartOptions(legendNameMap);

  // 服務商品圖設定檔
  const getChartOption = useCallback(() => {
    // 計算螢幕寬度，顯示旋轉角度
    const screenWidth =
      typeof window !== 'undefined' ? window.innerWidth : 1920;
    const labelRotate = screenWidth < 1600 ? 45 : 0;
    return {
      ...defaultChartOptions,
      grid: {
        ...defaultChartOptions.grid,
        right: 35,
        bottom: 10,
        borderWidth: 0,
      },
      legend: {
        show: false,
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          rotate: labelRotate,
          color: color.white,
          fontSize: 14,
        },
        axisTick: {
          show: true,
          alignWithLabel: true,

          lineStyle: {
            color: color.white,
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#808080',
          },
        },
      },
      yAxis: {
        type: 'category',
        inverse: true,
        axisLabel: {
          color: color.white,
          fontSize: 12,
          padding: [0, 5, 0, 0],
        },
        axisTick: {
          show: false,
        },
      },
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
    legendNameMap,
    customLegendOnClick,
    getChartOption,
    setChart,
  };
}

export { useHelpers };
