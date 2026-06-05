// 圖表的基本設定

import * as echarts from 'echarts';
import ExcelJS from 'exceljs';
import { color } from '@/styles/variable/indexStyle';

// 生成指定時間間隔的時間軸
const generateMinuteIntervals = (endTime, sec = 180) => {
  const [endHour, endMinute, endSecond] = endTime.split(':').map(Number);
  const totalSeconds = endHour * 60 * 60 + endMinute * 60 + endSecond + 1;
  const interval = sec; // 每 180 秒一個數據點
  const result = [];

  for (let i = 0; i < totalSeconds; i += interval) {
    const h = Math.floor(i / 3600);
    const m = Math.floor((i % 3600) / 60);
    const s = i % 60;

    result.push({
      time:
        (h < 10 ? '0' + h : h) +
        ':' +
        (m < 10 ? '0' + m : m) +
        ':' +
        (s < 10 ? '0' + s : s),
    });
  }
  return result.map((item) => item.time);
};

// 服務商品圖表基本設定
const chartOptions = (legendNameMap = []) => {
  return {
    grid: {
      borderColor: color.white,
      borderWidth: 1,
      bottom: 20,
      containLabel: true,
      left: 10,
      right: 10,
      show: true,
      top: 10,
    },
    legend: {
      borderRadius: 5,
      bottom: 10,
      data: legendNameMap.map((key) => key.name),
      formatter: (name) => {
        const item = legendNameMap.find((legend) => legend.name === name);
        return item ? item.title : name;
      },
      icon: 'roundRect',
      itemGap: 30,
      itemHeight: 10,
      itemWidth: 35,
      padding: 10,
      selected: legendNameMap
        .map((key) => key.name)
        .reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {}),
      show: false,
    },
    series: {},
    // 在這裡添加圖表的基本配置
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
              const legendItem = legendNameMap.find(
                (legend) => legend.name === item.seriesName,
              );

              const displayName = legendItem
                ? legendItem.title
                : item.axisValueLabel;

              const value =
                typeof item.data === 'object'
                  ? (item.data.value ?? 0)
                  : (item.data ?? 0);

              return `<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;min-width:130px;"><span>${
                item.marker
              } ${displayName}</span> <span class="value">${numberFormat.format(
                value,
              )} ${unitStr}</span></div>`;
            }
          };
          params.forEach((item) => {
            const legendUnit =
              legendNameMap.find((legend) => legend.name === item.seriesName)
                ?.unit || 'kW';

            if (item.data && item.value !== '') {
              const unit =
                (typeof item.data === 'object'
                  ? item.data.unit
                  : legendUnit
                    ? legendUnit
                    : null) ?? 'kW';
              tooltipContent += template(item, unit);
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
  };
};

// 服務商品繪製函式
const handleChart = (ref, chartRef, option) => {
  if (ref.current) {
    if (!chartRef.current) {
      chartRef.current = echarts.init(ref.current, null, {
        renderer: 'canvas',
        useDirtyRect: false,
      });
    }
    chartRef.current.setOption(option, true); // 添加 notMerge: true 完全替換配置

    // 圓餅圖的高亮樣式與互動
    // 添加 hover 事件監聽
    if (chartRef.current && option?.type === 'pie') {
      let currentHighlightIndex = null;

      chartRef.current.off('mouseover');
      chartRef.current.on('mouseover', (params) => {
        // 只處理數據環狀圖（series index = 1）
        if (params.seriesIndex === 1) {
          // 取消之前的高亮
          if (currentHighlightIndex !== null) {
            chartRef.current.dispatchAction({
              dataIndex: currentHighlightIndex,
              seriesIndex: 1,
              type: 'downplay',
            });
          }

          // 高亮當前項目
          chartRef.current.dispatchAction({
            dataIndex: params.dataIndex,
            seriesIndex: 1,
            type: 'highlight',
          });

          currentHighlightIndex = params.dataIndex;

          chartRef.current.setOption({
            title: {
              text: `${Math.round(params.value)}%`,
              textStyle: {
                color: '#f7e1b5',
              },
            },
          });
        }
      });
    }
  }
};

// 服務商品客製化 legend 觸發事件
function customLegendOnClick(name, chart, setState) {
  chart.dispatchAction({
    name,
    type: 'legendToggleSelect',
  });

  setState((prevState) => {
    // 基於當前 React state 來切換，而不是圖表的 legend.selected
    const currentState = prevState.customLegend?.[name] !== false;
    const newState = !currentState;

    return {
      ...prevState,
      customLegend: {
        ...prevState.customLegend,
        [name]: newState,
      },
    };
  });
}

// 下載圖表圖片處理函式
const downloadChartImageHandler = (chartRef) => {
  if (chartRef.current) {
    const chartInstance = chartRef.current;
    const dataURL = chartInstance.getDataURL({
      backgroundColor: color.themeBlue,
      pixelRatio: 3, // 像素比例
      type: 'png', // 'png' 或 'jpeg'
    });

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'trend-chart.png';
    link.click();
  }
};

// 重置圖表操作
const resetChartHandler = (chartRef, option) => {
  chartRef.current.setOption(option, true); // 核心清空操作
};

// 判斷 dataZoom 範圍變化並更新圖表
const dataZoomChangeHandler = (
  chartRef,
  zoomRangeRef,
  data,
  getUpdatedOption,
  fullTimeData, // 完整 24 小時時間軸
) => {
  // 監聽 dataZoom 事件來更新 zoom 範圍並重繪圖表
  if (chartRef.current) {
    chartRef.current.off('dataZoom');
    chartRef.current.on('dataZoom', () => {
      const option = chartRef.current.getOption();

      const dataZoom = option.dataZoom[0];
      const newZoomRange = dataZoom.end - dataZoom.start;

      // 只在 zoom 範圍變化顯著時才更新
      if (Math.abs(newZoomRange - zoomRangeRef.current) > 1) {
        zoomRangeRef.current = newZoomRange;

        // 重新生成選項並更新圖表
        const updatedOption = getUpdatedOption(newZoomRange);
        chartRef.current.setOption(
          {
            xAxis: {
              ...updatedOption.xAxis,
              data: fullTimeData || data.map((item) => item.time), // 優先使用完整時間軸
            },
          },

          { replaceMerge: ['xAxis'] },
        );
      }
    });
  }
};

// dataZoom 範圍 label formatter
const dataZoomLabelFormatterHandler = (printRef, currentZoomRange) => {
  return {
    formatter:
      currentZoomRange === 100
        ? function (value) {
            // 完整視圖時只格式化整點
            return value.endsWith('00:00') ? value : '';
          }
        : undefined, // 縮放時使用預設格式化
    interval:
      currentZoomRange === 100
        ? function (index, value) {
            // 完整視圖時，根據容器寬度動態計算顯示間隔，只顯示整點
            const containerWidth = printRef.current?.offsetWidth || 1000;
            const totalLabels = 24; // 24 小時
            const labelWidth = 50; // 每個標籤大約佔用的寬度
            const maxLabels = Math.floor(containerWidth / labelWidth);
            const interval = Math.ceil(totalLabels / maxLabels);

            // 只顯示整點且符合間隔
            if (value.endsWith('00:00')) {
              const hour = parseInt(value.split(':')[0]);
              return hour % interval === 0;
            }
            return false;
          }
        : 'auto', // 縮放時讓套件自動決定
  };
};

// 匯出 Excel 檔案
const exportToExcelHandler = async (legendNameMap, datas) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Data');

  worksheet.columns = [
    { header: '時間', key: 'date', width: 15 },
    // eslint-disable-next-line no-unsafe-optional-chaining
    ...legendNameMap?.map((legend) => ({
      header: legend.title,
      key: legend.name,
      width: 20,
    })),
  ];

  // 設定標題樣式

  worksheet.getRow(1).font = {
    bold: true,
    color: { argb: 'FFFFFFFF' },
    size: 12,
  };
  worksheet.getRow(1).fill = {
    fgColor: { argb: color.themeBlue.replace('#', '') },
    pattern: 'solid',
    type: 'pattern',
  };
  worksheet.getRow(1).alignment = { horizontal: 'center', vertical: 'middle' };
  worksheet.getRow(1).height = 25; // 設定標題行高

  // 添加資料
  datas.forEach((data) => {
    const rowData = {
      date: data?.date || data?.time || '--',
    };
    legendNameMap.forEach((legend) => {
      rowData[legend.name] = `${data?.[legend.name] || data?.value || '--'} ${
        legend.unit || 'kW'
      }`;
    });

    const row = worksheet.addRow(rowData);
    // 設定每行資料置中
    row.alignment = { horizontal: 'center', vertical: 'middle' };
    row.height = 20; // 設定資料行高
  });

  // 下載檔案
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'report.xlsx';
  link.click();
};

// x 軸旋轉角度處理函式
const rotateHandeler = () => {
  const currentWidth = window?.innerWidth || 1000;

  return currentWidth < 1600 ? 45 : 0;
};

// 回傳呼叫與整理後續新增上去的圖表資料
const getNewDatasHandler = async (url, chartDatas, newData, setNewData) => {
  const updatedData = await url();

  const outherData = { ...updatedData };

  // eslint-disable-next-line no-unused-vars
  const { chartData, ...finalData } = outherData.data;

  setNewData(finalData);

  if (
    !updatedData?.data?.chartData ||
    updatedData?.data?.chartData.length === 0
  ) {
    // 沒有新資料，回傳空陣列
    return [];
  }

  // 取得新資料 updatedData.data.chartData
  // 取得所有現有的 time（原始資料 + 已新增的資料）
  const existingTimes = new Set([
    ...chartDatas.map((item) => item.time),
    ...newData.map((item) => item.time),
  ]);

  // 過濾掉重複的 time
  const filteredNewData = updatedData.data.chartData.filter(
    (item) => !existingTimes.has(item.time),
  );

  // 過濾重複時間後的新資料', filteredNewData

  if (filteredNewData.length === 0) {
    // 沒有新的不重複資料，回傳空陣列
    return [];
  }

  return filteredNewData;
};

// 處理沒有資料時的圖表顯示
const noDataHandler = (setChartChart, chartOption) => {
  setChartChart({
    ...chartOption,
    dataZoom: {
      show: false,
    },
    title: {
      left: 'center',
      text: '暫無數據顯示',
      textStyle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'normal',
      },
      top: 'center',
    },
    tooltip: {
      show: false,
    },
    xAxis: {
      show: false,
    },
    yAxis: {
      show: false,
    },
  });
};

// 快取完整 24 小時時間軸
const fullTimeAxisHandler = (interval) => {
  return generateMinuteIntervals('24:00:00', interval);
};

export {
  chartOptions,
  customLegendOnClick,
  dataZoomChangeHandler,
  dataZoomLabelFormatterHandler,
  downloadChartImageHandler,
  exportToExcelHandler,
  fullTimeAxisHandler,
  generateMinuteIntervals,
  getNewDatasHandler,
  handleChart,
  noDataHandler,
  resetChartHandler,
  rotateHandeler,
};
