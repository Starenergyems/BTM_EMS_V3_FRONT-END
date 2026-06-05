import { useCallback } from 'react';
import {
  chartOptions,
  customLegendOnClick,
  handleChart,
  rotateHandeler,
} from '@/utils/chart';
import { config, yAxisLabels } from './indexConfig';
import { color } from '@/styles/variable/indexStyle';

// useHelpers 為最外層 function，function 內區塊的撰寫順序由上而下為：
// 1. useCallback 需要相依的 function
// 2. api function
// 3. 一般function

const legendObject = config.legendNameMap;

const legendNameMap = [].concat(...legendObject);

function useHelpers({ name, refs }) {
  const { printChartRef, printRef } = refs;

  const defaultChartOptions = chartOptions(legendNameMap);

  // 服務商品圖設定檔
  const getChartOption = useCallback(() => {
    const rotateAngle = rotateHandeler();

    return {
      ...defaultChartOptions,
      grid: {
        ...defaultChartOptions.grid,
        borderWidth: 0,
        left: 100,
        right: 100,
        top: 80,
      },

      xAxis: {
        axisLabel: {
          color: color.white,
          fontSize: 14,
          padding: [10, 0, 0, 0],
          rotate: rotateAngle,
          showMaxLabel: true, // 確保顯示最後一個標籤（24:00）
          showMinLabel: true, // 確保顯示第一個標籤（00:00）
        },
        axisLine: {
          lineStyle: {
            color: color.white,
          },
          show: true,
        },
        axisTick: {
          show: false,
        },
        boundaryGap: false,

        type: 'category',
      },
      yAxis: yAxisLabels?.map((label) => ({
        axisLabel: {
          color: label?.color || color.white,
          fontSize: 12,
          padding: [0, 5, 0, 5],
        },
        axisLine: {
          lineStyle: {
            color: color.white,
          },
          show: true,
        },
        axisTick: {
          alignWithLabel: true,
          lineStyle: {
            color: color.white,
          },
          show: true,
        },
        name: label?.title,
        nameLocation: 'top',
        nameTextStyle: {
          color: label?.color || color.white,
          fontSize: 18,
          padding: label?.position === 'right' ? [0, 0, 190, 110] : [0, 110, 190, 0],
        },
        position: label?.position,
        scale: false,
        type: 'value',
      })),
    };
  }, [printRef, name]);

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
    legendNameMap,
    setChart,
  };
}

export { useHelpers };
