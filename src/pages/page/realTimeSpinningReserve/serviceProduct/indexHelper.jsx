import { useCallback } from 'react';
import * as echarts from 'echarts';
import { hexToRgba } from '@/styles/function';
import { color } from '@/styles/variable/indexStyle';
import { customLegendNameMap } from './indexConfig';
import { Position } from 'reactflow';

// useHelpers 為最外層 function，function 內區塊的撰寫順序由上而下為：
// 1. useCallback 需要相依的 function
// 2. api function
// 3. 一般function

function useHelpers({ refs, setMainState }) {
  const {
    realTimeSpinningReservePowerRef,
    realTimeSpinningReservePowerChartRef,
  } = refs;

  /* Memoized Common Functions */
  // 假資料:讓資料更平滑隨機值不要落差太大
  function smoothRandom(prev, maxDelta = 5, min = 0, max = 60) {
    const delta = Math.floor(Math.random() * maxDelta * 2) - maxDelta;
    let next = prev + delta;
    next = Math.max(min, Math.min(max, next));
    return next;
  }

  // 假資料:暫時產出從 0:00~endTime 每分鐘一個資料的陣列值(陣列值為隨機負載消耗功率、)
  const generateMinuteIntervals = useCallback((endTime, getDataType) => {
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const totalMinutes = endHour * 60 + endMinute + 1;
    const result = new Array(totalMinutes);

    // 初始化第一個值（可自行調整）
    let prevLoad = 30; // 初始負載功率

    for (let i = 0; i < totalMinutes; i++) {
      const h = Math.floor(i / 60);
      const m = i % 60;

      // 平滑負載
      const loadPower = smoothRandom(prevLoad, 5, 30, 60);

      // 派電值必須
      const dispatchPower = Math.floor(Math.random() * 60);

      result[i] = {
        time: (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m),
        loadPower,
        dispatchPower,
      };
    }
    if (getDataType) {
      return result.map((item) => item[getDataType]);
    }
    return result;
  }, []);

  // 表格是否 loading
  const setTableLoading = useCallback(
    (isLoading, tableTypeState) => {
      if (setMainState) {
        setMainState((prevState) => ({
          ...prevState,
          [tableTypeState]: isLoading,
        }));
      }
    },
    [setMainState],
  );

  // 取得服務商品 API 資料
  const getServiceProductData = useCallback(() => {
    const fetchData = {
      realTimeSpinningReserve: generateMinuteIntervals('10:08'),
      spm: [...Array(24)].map((_item, index) => {
        if ([0, 1, 5, 6, 7, 8, 9, 11, 19, 20, 21, 22, 23].includes(index)) {
          return { hour: index, spm: null };
        }
        return { hour: index, spm: Math.floor(Math.random() * 101) };
      }),
    };
    setMainState((prevState) => {
      const obj = {};
      fetchData.spm.forEach((item) => {
        obj[`${item.hour}:00`] = item.spm;
      });
      obj['id'] = 'only-row';
      // 為了給 table 元件作為 rowKey 的識別，因為 UI 的設計不符合一般 table 的資料結構
      return {
        ...prevState,
        serviceProductTableData: [obj],
        serviceProductData: fetchData.realTimeSpinningReserve,
      };
    });
  }, [generateMinuteIntervals, setMainState]);

  // 取得得標狀態的表格欄位
  function getSpmTableColumns() {
    const hourList = [...Array(24)].map((_item, index) => {
      return {
        title: index,
        align: 'center',
        width: 45,
        // render: (value) => value[`${index}:00`] ?? "X",
        render: () => 'X',
        onCell: () => ({
          // style: {
          //   color: value[`${index}:00`] != null ? color.lightBlue : color.gray,
          // },
          style: {
            color: color.gray,
          },
        }),
      };
    });
    return [
      {
        title: '整點',
        align: 'center',
        fixed: 'left',
        width: 80,
        render: () => '執行率',
      },
      ...hourList,
    ];
  }

  // getData

  const res = (index) => {
    const data = generateMinuteIntervals('10:08');

    switch (index) {
      case 0:
        return data.map((item) => item.loadPower);
      case 1:
        return data.map((item) => item.dispatchPower);

      default:
        return [];
    }
  };
  res(0);

  // 服務商品圖設定檔
  const getRealTimeSpinningReservePowerOption = useCallback(() => {
    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: color.themeBlack,
        borderColor: 'transparent',
        textStyle: {
          color: color.white,
        },
        formatter(params) {
          const numberFormat = new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 3,
          });
          if (Array.isArray(params)) {
            let tooltipContent = `${params[0].axisValue}`;
            const template = (item, unitStr) => {
              if (item) {
                return `<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;min-width:130px;"><span>${
                  item.marker
                } ${
                  customLegendNameMap[item.seriesName] || item.seriesName
                }</span> <span class="value">${numberFormat.format(
                  item.data,
                )} ${unitStr}</span></div>`;
              }
            };
            params.forEach((item) => {
              tooltipContent += template(item, 'kW');
              if (!item.data && item.data !== 0) {
                tooltipContent = '';
              }
            });
            return tooltipContent;
          }
          return '';
        },
      },
      grid: {
        top: 50,
        left: 10,
        right: 38,
        bottom: 70,
        containLabel: true,
      },
      legend: {
        data: ['cbl', 'loadCurve', 'contribution'],
        selected: Object.keys(customLegendNameMap).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {}),
        icon: 'roundRect',
        itemWidth: 35,
        itemHeight: 10,
        itemGap: 30,
        borderRadius: 5,
        padding: 10,
        bottom: 10,
        show: false,
        formatter: (name) => {
          return customLegendNameMap[name] || name;
        },
      },
      xAxis: {
        type: 'category',
        splitLine: { show: false },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: color.white,
          fontSize: 14,
          interval: function (index, value) {
            // 根據容器寬度動態計算顯示間隔
            const containerWidth =
              realTimeSpinningReservePowerRef.current?.offsetWidth || 1000;
            const totalLabels = 24; // 24 小時
            const labelWidth = 50; // 每個標籤大約佔用的寬度
            const maxLabels = Math.floor(containerWidth / labelWidth);
            const interval = Math.ceil(totalLabels / maxLabels);

            // 只顯示整點且符合間隔
            return value.endsWith(':00') && index % (interval * 60) === 0;
          },
          formatter: function (value) {
            return value.endsWith(':00') ? value : '';
          },
          padding: [10, 0, 0, 0],
        },
        data: generateMinuteIntervals('23:59', 'time'),
      },
      yAxis: {
        min: 0,
        max: 1200,
        inerval: 200,
        name: '容量 (kW)',
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
          lineStyle: {
            color: color.darkGray,
            type: 'dashed',
          },
        },
      },
      series: [
        // 1. cbl - 白色線條在最上方
        {
          name: 'cbl',
          type: 'line',
          smooth: true,
          symbol: 'none',
          symbolSize: 5,
          sampling: 'average',
          itemStyle: {
            color: color.white,
          },
          lineStyle: {
            color: color.white,
            width: 2,
          },
          markLine: {
            symbol: 'none',
            data: [
              {
                name: '調度指令下達',
                xAxis: '06:50',
                ...markDashedStyle,
              },
              {
                name: '服務開始',
                xAxis: '07:00',
                ...markSolidStyle,
              },

              {
                name: '服務結束',
                xAxis: '12:00',
                ...markSolidStyle,
              },
              {
                name: '下次待命開始',
                xAxis: '14:00',
                ...markDashedStyle,
                label: {
                  ...markDashedStyle.label,
                  // offset: [0, 50],
                },
              },
            ],
          },
          data: [],
        },
        // 2. realTimeSpinningReserve - 底部系列，帶面積填充
        {
          name: 'loadCurve',
          type: 'line',
          smooth: true,
          stack: 'total', // 使用 stack
          symbol: 'none',
          symbolSize: 5,
          sampling: 'average',
          itemStyle: {
            color: '#0770FF',
          },
          lineStyle: {
            width: 2,
            color: '#0770FF',
          },
          markLine: {
            symbol: 'none',
            data: [
              {
                name: '調度指令下達',
                xAxis: '06:50',
                ...markDashedStyle,
              },
              {
                name: '服務開始',
                xAxis: '07:00',
                ...markSolidStyle,
              },

              {
                name: '服務結束',
                xAxis: '12:00',
                ...markSolidStyle,
              },
              {
                name: '下次待命開始',
                xAxis: '14:00',
                ...markDashedStyle,
                label: {
                  ...markDashedStyle.label,
                  // offset: [0, 50],
                },
              },
            ],
          },
          data: [],
        },
        // 3. 差值系列 (cbl - loadCurve) - 填充兩者之間的區域
        {
          name: 'contribution',
          type: 'line',
          smooth: true,
          stack: 'total', // 堆疊在 loadCurve 上
          symbol: 'none',
          symbolSize: 5,
          sampling: 'average',
          itemStyle: {
            color: 'rgba(213,72,120,0.8)',
          },
          lineStyle: {
            width: 0, // 隱藏這條線
            color: 'transparent',
          },
          markLine: {
            symbol: 'none',
            data: [
              {
                name: '調度指令下達',
                xAxis: '06:50',
                ...markDashedStyle,
              },
              {
                name: '服務開始',
                xAxis: '07:00',
                ...markSolidStyle,
              },

              {
                name: '服務結束',
                xAxis: '12:00',
                ...markSolidStyle,
              },
              {
                name: '下次待命開始',
                xAxis: '14:00',
                ...markDashedStyle,
                label: {
                  ...markDashedStyle.label,
                  // offset: [0, 50],
                },
              },
            ],
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(213,72,120,0.8)',
              },
              {
                offset: 1,
                color: 'rgba(213,72,120,0.3)',
              },
            ]),
          },
          data: [], // 需要計算 cbl - realTimeSpinningReserve 的差值
        },
      ],
    };
  }, [res, generateMinuteIntervals, realTimeSpinningReservePowerRef]);

  // 服務商品繪製
  const setRealTimeSpinningReservePowerChart = useCallback(
    (option) => {
      if (realTimeSpinningReservePowerRef.current) {
        if (!realTimeSpinningReservePowerChartRef.current) {
          realTimeSpinningReservePowerChartRef.current = echarts.init(
            realTimeSpinningReservePowerRef.current,
            null,
            {
              renderer: 'canvas',
              useDirtyRect: false,
            },
          );
        }
        realTimeSpinningReservePowerChartRef.current.setOption(option);
      }
    },
    [realTimeSpinningReservePowerChartRef, realTimeSpinningReservePowerRef],
  );

  // 服務商品客製化 legend 觸發事件
  function customLegendOnClick(name, chart) {
    const option = chart.getOption();
    const isSelected = !option.legend[0].selected[name];
    chart.dispatchAction({
      type: 'legendToggleSelect',
      name,
    });
    setMainState((prevState) => {
      return {
        ...prevState,
        customLegend: {
          ...prevState.customLegend,
          [name]: isSelected,
        },
      };
    });
  }

  return {
    customLegendOnClick,
    getServiceProductData,
    getSpmTableColumns,
    getRealTimeSpinningReservePowerOption,
    setRealTimeSpinningReservePowerChart,
    setTableLoading,
  };
}

const markSolidStyle = {
  lineStyle: {
    color: color.white,
    width: 2,
    type: 'solid',
  },
  label: {
    show: true,
    color: color.white,
    fontSize: 18,
    formatter: '{b}',
    offset: [0, 0],
  },
};

const markDashedStyle = {
  lineStyle: {
    color: color.red,
    width: 2,
    type: 'dashed',
  },
  label: {
    show: true,
    position: 'start',
    color: color.red,
    fontSize: 18,
    formatter: '{b}',
    offset: [0, 35],
  },
};

export { useHelpers };
