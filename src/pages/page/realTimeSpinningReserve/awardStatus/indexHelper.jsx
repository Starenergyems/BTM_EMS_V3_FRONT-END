import { useCallback } from 'react';
import * as echarts from 'echarts';
import { api } from '@/slices/api/setting';
import { toDateTimeStr } from '@/utils/format';
import { customLegendNameMap } from './indexConfig';
import { color } from '@/styles/variable/indexStyle';

// useHelpers 為最外層 function，function 內區塊的撰寫順序由上而下為：
// 1. useCallback 需要相依的 function
// 2. api function
// 3. 一般 function

function useHelpers({ refs, setMainState }) {
  const { awardPowerChartRef, awardPowerRef } = refs;

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
        align: 'center',
        onCell: () => ({
          style: { color: color.lightBlue },
        }),
        render: (value) => value[`${index}:00`],
        title: index,
        width: 45,
      };
    });
    return [
      {
        align: 'center',
        fixed: 'left',
        render: () => (
          <>
            得標量
            <br />
            (kWh)
          </>
        ),
        title: '整點',
        width: 80,
      },
      ...hourList,
    ];
  }

  // 當月分帳 bar 堆疊圖設定檔
  const getAwardPowerOption = useCallback(() => {
    return {
      grid: {
        bottom: 60,
        containLabel: true,
        left: 20,
        right: 38,
        top: 50,
      },
      legend: {
        borderRadius: 5,
        bottom: 10,
        data: ['realTimeSpinningReserve'],
        formatter: (name) => {
          return customLegendNameMap[name] || name;
        },
        icon: 'roundRect',
        itemGap: 30,
        itemHeight: 10,
        itemWidth: 35,
        padding: 10,
        selected: Object.keys(customLegendNameMap).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {}),
        show: false,
      },
      series: [
        {
          barWidth: '50%',
          data: [],
          itemStyle: {
            color: color.lightBlue,
          },
          lineStyle: {
            width: 3,
          },
          name: 'realTimeSpinningReserve',
          stack: 'total',
          symbolSize: 7,
          type: 'bar',
        },
      ],
      tooltip: {
        backgroundColor: color.themeBlack,
        borderColor: 'transparent',
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
        textStyle: {
          color: color.white,
        },
        trigger: 'axis',
      },
      xAxis: {
        axisLabel: {
          color: color.white,
          fontSize: 14,
        },
        axisTick: {
          show: false,
        },
        data: [...Array(24)].map(
          (_item, index) => `${index < 10 ? `0${index}` : index}:00`,
        ),
        splitLine: { show: false },
        type: 'category',
      },
      yAxis: {
        axisLabel: {
          color: color.white,
          fontSize: 14,
        },
        // min: 0,
        // max: 3000,
        // inerval: 500,
        name: '得標功率 (kW)',
        nameLocation: 'end',
        nameTextStyle: {
          color: color.white,
          fontSize: 14,
          fontWeight: 'lighter',
          padding: [-25, -40, 10, 0],
          verticalAlign: 'top',
        },
        splitLine: {
          lineStyle: {
            color: color.darkGray,
            type: 'dashed',
          },
        },
        type: 'value',
      },
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
      name,
      type: 'legendToggleSelect',
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
    getAwardPowerOption,
    getAwardSatusTableColumns,
    setAwardPowerChart,
    setTableLoading,
  };
}

export { useHelpers };
