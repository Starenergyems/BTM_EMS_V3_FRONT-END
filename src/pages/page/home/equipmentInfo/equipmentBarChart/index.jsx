import { useEffect, useMemo, useRef } from 'react';
import TransparentCard from '@/components/units/transparentCard';
import { useEchartAutoResize } from '@/hooks/useEchartAutoResize';
import { noDataHandler } from '@/utils/chart';
import { useHelpers } from './indexHelper';
import ScopeStyle from './indexStyle';

function EquipmentBarChart({ data, isPending, type }) {
  const printRef = useRef(null);
  const printChartRef = useRef(null);

  const { getChartOption, legendNameMap, setChart } = useHelpers({
    refs: {
      printChartRef,
      printRef,
    },
  });

  useEchartAutoResize(printRef, printChartRef);

  const chartOption = useMemo(
    () => getChartOption(type),
    [getChartOption, type],
  );

  // 控制 loading 狀態
  useEffect(() => {
    if (!data || Object.keys(data).length === 0) {
      noDataHandler(setChart, chartOption);
    }

    if (!printChartRef.current) return;

    if (isPending) {
      printChartRef.current.showLoading();
    } else {
      printChartRef.current.hideLoading();
    }
  }, [isPending, data]);

  useEffect(() => {
    // 如果沒有資料，不更新圖表（保持 noDataHandler 的顯示）
    if (!data || Object.keys(data).length === 0) {
      return;
    }

    if (printRef.current) {
      const newOption = {
        ...chartOption,
        series: JSON.parse(JSON.stringify(chartOption.series)),
      };

      if (type === 'bill') {
        const seriesData = legendNameMap.map((item) => {
          const name = item?.[type]?.[0]?.name;
          return {
            itemStyle: {
              color: item.color,
            },
            unit: 'NT$',
            value: data?.[name] ?? '',
          };
        });
        newOption.yAxis.data = legendNameMap.map((item) => item.title);
        newOption.series = [
          { barWidth: '18px', data: seriesData, type: 'bar' },
        ];
      } else {
        const seriesData = legendNameMap.map((item) => {
          const value = item?.[type]?.[1]?.name || '';
          const unit = item?.[type]?.[1]?.unit || '';
          return {
            barWidth: '18px',
            data: [
              { value: '' },
              {
                unit: unit,
                value: item.isSupply ? data?.[value] : '',
              },
              {
                unit: unit,
                value: !item.isSupply ? data?.[value] : '',
              },
              { value: '' },
            ],
            itemStyle: {
              color: item.color,
            },
            name: item.name,
            stack: 'total',
            type: 'bar',
          };
        });

        newOption.yAxis.data = ['', '供電', '用電', ''];
        newOption.series = seriesData;
      }

      setChart(newOption);
    }
  }, [chartOption, legendNameMap, data]);

  return (
    <ScopeStyle>
      <TransparentCard>
        <div className="chart-wrapper" ref={printRef}></div>
      </TransparentCard>
    </ScopeStyle>
  );
}

export default EquipmentBarChart;
