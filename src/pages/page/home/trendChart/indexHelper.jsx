import { useCallback } from 'react';
import { format } from 'date-fns';
import { api } from '@/slices/api/setting';
import {
  chartOptions,
  customLegendOnClick,
  dataZoomLabelFormatterHandler,
  handleChart,
  rotateHandeler,
} from '@/utils/chart';
import { endpoints } from '@/utils/endpoints';
import { dispatch } from '../store/useReducerStore';
import { customLegendNameMap } from './indexConfig';

import { color } from '@/styles/variable/indexStyle';

// useHelpers 為最外層 function，function 內區塊的撰寫順序由上而下為：
// 1. useCallback 需要相依的 function
// 2. api function
// 3. 一般function

function useHelpers({ refs }) {
  const { printChartRef, printRef } = refs;

  const defaultChartOptions = chartOptions(customLegendNameMap);

  const getNewDatas = async () => {
    const rightNow = format(new Date(), 'HH:mm:ss');
    try {
      const data = await api.get(
        `${endpoints.homepage.currentTrendChart}?time=${rightNow}`,
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
            filterMode: 'none',
            rangeMode: ['percent', 'percent'],
            start: 0,
            type: 'inside',
          },
          {
            end: 100,
            filterMode: 'none',
            rangeMode: ['percent', 'percent'],
            start: 0,
          },
        ],
        grid: {
          ...defaultChartOptions.grid,
          bottom: 65,
          left: 20,
          right: 68,
        },
        series: [
          ...customLegendNameMap.map((item) => ({
            areaStyle: item.showArea ? { opacity: 0.3 } : null,
            data: [],
            itemStyle: {
              color: item.bgColor,
            },
            lineStyle: {
              color: item.bgColor,
              width: 1,
            },
            name: item.name,
            smooth: true,
            stack: null,
            symbol: 'none',
            symbolSize: 5,
            type: 'line',
          })),
          {
            data: [], // 不給數據
            markLine: {
              label: {
                color: color.white,
                fontSize: 14,
                formatter: '{b}', // 顯示下面 data 裡的 name
                position: 'end', // 標籤放在右側
              },
              lineStyle: {
                color: color.white,
                type: 'dashed',
              },
              silent: true, // 不觸發滑鼠事件
              symbol: 'none', // 不顯示箭頭
              // data: [
              //   { yAxis: 10, name: '防逆流' }, // 第一條線
              //   { yAxis: 45, name: '防超約' }, // 第二條線 (不等距)
              //   { yAxis: 55, name: '契約容量' }, // 第三條線
              // ],
            },
            name: 'staticLines', // 不放在 legend 裡面
            type: 'line',
          },
        ],
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
            onZero: false,
            show: true,
          },
          axisTick: {
            alignWithLabel: true,
            show: true,
          },
          boundaryGap: false, // 避免填充效果
          data: [],
          type: 'category',
        },
        yAxis: [
          {
            axisLabel: {
              color: color.white,
              fontSize: 14,
              padding: [0, 5, 0, 0],
            },
            // // min: -20,
            // // max: 60,
            inerval: 10,
            name: '',
            nameLocation: 'end',
            nameTextStyle: {
              color: color.white,
              fontSize: 14,
              fontWeight: 'lighter',
              padding: [-25, 0, 10, 0],
              verticalAlign: 'top',
            },
            splitLine: {
              show: false,
            },
            type: 'value',
          },
          {
            axisLabel: {
              color: color.white,
              fontSize: 14,
            },
            position: 'right',
            splitLine: {
              lineStyle: {
                color: color.white,
                type: 'dashed',
              },
              show: true, // 確保右側軸的線有顯示
            },
            type: 'value',
          },
        ],
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

  // 日期選擇器變更
  const onChange = (date, dateString) => {
    dispatch({ payload: dateString, type: 'date' });
  };

  return {
    customLegendOnClick,
    getChartOption,
    getNewDatas,
    onChange,
    setChart,
  };
}

export { useHelpers };
