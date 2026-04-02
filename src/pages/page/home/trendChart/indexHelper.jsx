import { useCallback } from 'react';
import { format } from 'date-fns';
import { api } from '@/slices/api/setting';
import { endpoints } from '@/utils/endpoints';
import { color } from '@/styles/variable/indexStyle';
import {
  chartOptions,
  customLegendOnClick,
  handleChart,
  dataZoomLabelFormatterHandler,
  rotateHandeler,
} from '@/utils/chart';
import { customLegendNameMap } from './indexConfig';

import { dispatch } from '../store/useReducerStore';

// useHelpers 為最外層 function，function 內區塊的撰寫順序由上而下為：
// 1. useCallback 需要相依的 function
// 2. api function
// 3. 一般function

function useHelpers({ refs }) {
  const { printRef, printChartRef } = refs;

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
        grid: {
          ...defaultChartOptions.grid,
          bottom: 65,
          left: 20,
          right: 68,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false, // 避免填充效果
          axisLine: {
            show: true,
            onZero: false,
            lineStyle: {
              color: color.white,
            },
          },
          axisTick: {
            show: true,
            alignWithLabel: true,
          },
          axisLabel: {
            ...dataZoomLabelFormatterHandler(printRef, currentZoomRange),
            color: color.white,
            rotate: rotateAngle,
            fontSize: 14,
            padding: [10, 0, 0, 0],
            showMinLabel: true, // 確保顯示第一個標籤（00:00）
            showMaxLabel: true, // 確保顯示最後一個標籤（24:00）
          },
          data: [],
        },
        yAxis: [
          {
            // // min: -20,
            // // max: 60,
            inerval: 10,
            name: '',
            nameLocation: 'end',
            nameTextStyle: {
              color: color.white,
              fontWeight: 'lighter',
              fontSize: 14,
              verticalAlign: 'top',
              padding: [-25, 0, 10, 0],
            },
            type: 'value',
            axisLabel: {
              color: color.white,
              fontSize: 14,
              padding: [0, 5, 0, 0],
            },
            splitLine: {
              show: false,
            },
          },
          {
            type: 'value',
            position: 'right',
            axisLabel: {
              color: color.white,
              fontSize: 14,
            },
            splitLine: {
              show: true, // 確保右側軸的線有顯示
              lineStyle: {
                color: color.white,
                type: 'dashed',
              },
            },
          },
        ],
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100,
            rangeMode: ['percent', 'percent'],
            filterMode: 'none',
          },
          {
            start: 0,
            end: 100,
            rangeMode: ['percent', 'percent'],
            filterMode: 'none',
          },
        ],
        series: [
          ...customLegendNameMap.map((item) => ({
            name: item.name,
            type: 'line',
            smooth: true,
            symbol: 'none',
            symbolSize: 5,
            stack: null,
            areaStyle: item.showArea ? { opacity: 0.3 } : null,
            itemStyle: {
              color: item.bgColor,
            },
            lineStyle: {
              color: item.bgColor,
              width: 1,
            },
            data: [],
          })),
          {
            type: 'line',
            name: 'staticLines', // 不放在 legend 裡面
            markLine: {
              silent: true, // 不觸發滑鼠事件
              symbol: 'none', // 不顯示箭頭
              lineStyle: {
                type: 'dashed',
                color: color.white,
              },
              label: {
                position: 'end', // 標籤放在右側
                formatter: '{b}', // 顯示下面 data 裡的 name
                color: color.white,
                fontSize: 14,
              },
              // data: [
              //   { yAxis: 10, name: '防逆流' }, // 第一條線
              //   { yAxis: 45, name: '防超約' }, // 第二條線 (不等距)
              //   { yAxis: 55, name: '契約容量' }, // 第三條線
              // ],
            },
            data: [], // 不給數據
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
    dispatch({ type: 'date', payload: dateString });
  };

  return {
    customLegendOnClick,
    getChartOption,
    setChart,
    onChange,
    getNewDatas,
  };
}

export { useHelpers };
