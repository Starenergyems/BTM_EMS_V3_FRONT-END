import { useCallback } from 'react';
import { format } from 'date-fns';
import { systemConfig } from '@/components/page/systemOverview/indexConfig';
import { api } from '@/slices/api/setting';
import {
  chartOptions,
  customLegendOnClick,
  dataZoomLabelFormatterHandler,
  handleChart,
  rotateHandeler,
} from '@/utils/chart';
import { endpoints } from '@/utils/endpoints';
import { color } from '@/styles/variable/indexStyle';

// useHelpers 為最外層 function，function 內區塊的撰寫順序由上而下為：
// 1. useCallback 需要相依的 function
// 2. api function
// 3. 一般function

const legendObject = Object.values(systemConfig).map(
  (config) => config.legendNameMap,
);

const legendNameMap = [].concat(...legendObject);

function useHelpers({ name, refs }) {
  const { printChartRef, printRef } = refs;

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
        dataZoom: [
          {
            end: 100,
            start: 0,
            type: 'inside',
          },
          {
            end: 100,
            start: 0,
          },
        ],
        grid: {
          ...defaultChartOptions.grid,
          borderWidth: 0,
          bottom: 70,
          left: 40,
          right: 30,
          top: 20,
        },
        xAxis: {
          axisLabel: {
            ...dataZoomLabelFormatterHandler(printRef, currentZoomRange),
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
        yAxis: {
          axisLabel: {
            color: color.lightBlue,
            fontSize: 12,
            padding: [0, 5, 0, 0],
          },
          axisTick: {
            alignWithLabel: true,
            lineStyle: {
              color: color.white,
            },
            show: true,
          },
          name: '功率(kW)',
          nameLocation: 'middle',
          nameTextStyle: {
            color: color.lightBlue,
            fontSize: 18,
            padding: [10, 10, 25, 10],
          },
          type: 'value',
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
    customLegendOnClick,
    getChartOption,
    getNewDatas,
    legendNameMap,
    setChart,
  };
}

export { useHelpers };
