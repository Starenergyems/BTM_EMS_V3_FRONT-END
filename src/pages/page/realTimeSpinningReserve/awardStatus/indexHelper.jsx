import { useCallback } from 'react';
import * as echarts from 'echarts';
import { toDateTimeStr } from '@/utils/format';
import { color } from '@/styles/variable/indexStyle';
import { customLegendNameMap } from './indexConfig';
import { api } from '@/slices/api/setting';

// useHelpers 為最外層 function，function 內區塊的撰寫順序由上而下為：
// 1. useCallback 需要相依的 function
// 2. api function
// 3. 一般 function

function useHelpers({ refs, setMainState }) {
  const { awardPowerRef, awardPowerChartRef } = refs;

  /* Memoized Common Functions */
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

  const getAwardData = useCallback(async () => {
    // const fetchData = {
    //   today: [...Array(24)].map((item, index) => {
    //     if (index >= 7 && index <= 12) {
    //       return { hour: index, awardCapacity: 500, awardPower: 500 };
    //     }
    //     return { hour: index, awardCapacity: 0, awardPower: 0 };
    //   }),
    // };
    const today = toDateTimeStr(new Date(), 'YYYY-MM-DD');
    const fetchData = await api.get(`vpp-dr/award-status-demo?date=${today}`);

    if (fetchData?.status === 200) {
      setMainState((prevState) => {
        return {
          ...prevState,
          awardData: {
            ...prevState.awardData,
            data: fetchData.data.data.chartData,
          },
          awardTableData: [fetchData.data.data.chartData],
        };
      });
    }
  }, [setMainState]);

  // 取得得標狀態的表格欄位
  function getAwardSatusTableColumns() {
    const hourList = [...Array(24)].map((_item, index) => {
      return {
        title: index,
        align: 'center',
        width: 45,
        render: (value) => value[`${index}:00`],
        onCell: () => ({
          style: { color: color.lightBlue },
        }),
      };
    });
    return [
      {
        title: '整點',
        align: 'center',
        fixed: 'left',
        width: 80,
        render: () => (
          <>
            得標量
            <br />
            (kWh)
          </>
        ),
      },
      ...hourList,
    ];
  }

  // 當月分帳 bar 堆疊圖設定檔
  const getAwardPowerOption = useCallback(() => {
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
              if (!item.data) {
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
        left: 20,
        right: 38,
        bottom: 60,
        containLabel: true,
      },
      legend: {
        data: ['realTimeSpinningReserve'],
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
        },
        data: [...Array(24)].map(
          (_item, index) => `${index < 10 ? `0${index}` : index}:00`,
        ),
      },
      yAxis: {
        // min: 0,
        // max: 3000,
        // inerval: 500,
        name: '得標功率 (kW)',
        nameLocation: 'end',
        nameTextStyle: {
          color: color.white,
          fontWeight: 'lighter',
          fontSize: 14,
          verticalAlign: 'top',
          padding: [-25, -40, 10, 0],
        },
        type: 'value',
        axisLabel: {
          color: color.white,
          fontSize: 14,
        },
        splitLine: {
          lineStyle: {
            color: color.darkGray,
            type: 'dashed',
          },
        },
      },
      series: [
        {
          type: 'bar',
          stack: 'total',
          name: 'realTimeSpinningReserve',
          data: [],
          itemStyle: {
            color: color.lightBlue,
          },
          lineStyle: {
            width: 3,
          },
          symbolSize: 7,
          barWidth: '50%',
        },
      ],
    };
  }, []);

  // 當月分帳 bar 堆疊圖設定檔繪製
  const setAwardPowerChart = useCallback(
    (option) => {
      if (awardPowerRef.current) {
        if (!awardPowerChartRef.current) {
          awardPowerChartRef.current = echarts.init(
            awardPowerRef.current,
            null,
            {
              renderer: 'canvas',
              useDirtyRect: false,
            },
          );
        }
        awardPowerChartRef.current.setOption(option);
      }
    },
    [awardPowerChartRef, awardPowerRef],
  );

  // 當月分帳 bar 堆疊圖客製化 legend 觸發事件
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
    getAwardData,
    getAwardSatusTableColumns,
    getAwardPowerOption,
    setAwardPowerChart,
    setTableLoading,
  };
}

export { useHelpers };
