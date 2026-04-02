import { useCallback } from 'react';
import { api } from '@/slices/api/setting';
import { format } from 'date-fns';
import { endpoints } from '@/utils/endpoints';

import { color } from '@/styles/variable/indexStyle';
import {
  chartOptions,
  customLegendOnClick,
  handleChart,
  dataZoomLabelFormatterHandler,
  rotateHandeler,
} from '@/utils/chart';
import { systemConfig } from '@/components/page/systemOverview/indexConfig';

// useHelpers 為最外層 function，function 內區塊的撰寫順序由上而下為：
// 1. useCallback 需要相依的 function
// 2. api function
// 3. 一般function

const legendObject = Object.values(systemConfig).map(
  (config) => config.legendNameMap,
);

const legendNameMap = [].concat(...legendObject);

function useHelpers({ refs, name }) {
  const { printRef, printChartRef } = refs;

  const defaultChartOptions = chartOptions(legendNameMap);

  // 取得資料
  const getNewDatas = async () => {
    const rightNow = format(new Date(), 'HH:mm:ss');
    try {
      const data = await api.get(
        `${endpoints?.[name]?.currentLineChart}?time=${rightNow}`,
      );
      return data.data;
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  // 服務商品圖設定檔
  const getChartOption = useCallback(
    (currentZoomRange = 100) => {
      const rotateAngle = rotateHandeler();
      return {
        ...defaultChartOptions,
        grid: {
          ...defaultChartOptions.grid,
          top: 20,
          left: 40,
          right: 30,
          bottom: 70,
          borderWidth: 0,
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100,
          },
          {
            start: 0,
            end: 100,
          },
        ],
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
            ...dataZoomLabelFormatterHandler(printRef, currentZoomRange),
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
        yAxis: {
          type: 'value',
          name: '功率(kW)',
          nameLocation: 'middle',
          axisLabel: {
            color: color.lightBlue,
            fontSize: 12,
            padding: [0, 5, 0, 0],
          },
          nameTextStyle: {
            color: color.lightBlue,
            padding: [10, 10, 25, 10],
            fontSize: 18,
          },
          axisTick: {
            show: true,
            alignWithLabel: true,
            lineStyle: {
              color: color.white,
            },
          },
        },
      };
    },

    [printRef],
  );

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
    getNewDatas,
  };
}

export { useHelpers };
