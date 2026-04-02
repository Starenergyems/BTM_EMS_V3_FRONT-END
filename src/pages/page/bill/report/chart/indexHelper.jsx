import { useCallback } from 'react';
import { color } from '@/styles/variable/indexStyle';
import {
  chartOptions,
  customLegendOnClick,
  handleChart,
  rotateHandeler,
} from '@/utils/chart';
import { config, yAxisLabels } from './indexConfig';

// useHelpers 為最外層 function，function 內區塊的撰寫順序由上而下為：
// 1. useCallback 需要相依的 function
// 2. api function
// 3. 一般function

const legendObject = config.legendNameMap;

const legendNameMap = [].concat(...legendObject);

function useHelpers({ refs, name }) {
  const { printRef, printChartRef } = refs;

  const defaultChartOptions = chartOptions(legendNameMap);

  // 服務商品圖設定檔
  const getChartOption = useCallback(() => {
    const rotateAngle = rotateHandeler();

    return {
      ...defaultChartOptions,
      grid: {
        ...defaultChartOptions.grid,
        top: 80,
        left: 100,
        right: 100,
        borderWidth: 0,
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          show: true,
          lineStyle: {
            color: color.white,
          },
        },
        axisLabel: {
          color: color.white,
          fontSize: 14,
          padding: [10, 0, 0, 0],
          showMinLabel: true, // 確保顯示第一個標籤（00:00）
          showMaxLabel: true, // 確保顯示最後一個標籤（24:00）
          rotate: rotateAngle,
        },

        axisTick: {
          show: false,
        },
      },
      yAxis: yAxisLabels?.map((label) => ({
        type: 'value',
        name: label?.title,
        nameLocation: 'top',
        position: label?.position,
        scale: false,
        axisLabel: {
          color: label?.color || color.white,
          fontSize: 12,
          padding: [0, 5, 0, 5],
        },
        nameTextStyle: {
          color: label?.color || color.white,
          padding: label?.position === 'right' ? [0, 0, 190, 110] : [0, 110, 190, 0],
          fontSize: 18,
        },
        axisTick: {
          show: true,
          alignWithLabel: true,
          lineStyle: {
            color: color.white,
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: color.white,
          },
        },
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
    legendNameMap,
    customLegendOnClick,
    getChartOption,
    setChart,
  };
}

export { useHelpers };
