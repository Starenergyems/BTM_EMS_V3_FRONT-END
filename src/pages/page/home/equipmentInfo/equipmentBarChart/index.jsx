import { useEffect, useRef, useMemo } from 'react';
import { noDataHandler } from '@/utils/chart';
import { useEchartAutoResize } from '@/hooks/useEchartAutoResize';
import TransparentCard from '@/components/units/transparentCard';
import ScopeStyle from './indexStyle';
import { useHelpers } from './indexHelper';

function EquipmentBarChart({ type, data, isPending }) {
  const printRef = useRef(null);
  const printChartRef = useRef(null);

  const { getChartOption, setChart, legendNameMap } = useHelpers({
    refs: {
      printRef,
      printChartRef,
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
            unit: 'NT$',
            value: data?.[name] ?? '',
            itemStyle: {
              color: item.color,
            },
          };
        });
        newOption.yAxis.data = legendNameMap.map((item) => item.title);
        newOption.series = [
          { type: 'bar', barWidth: '18px', data: seriesData },
        ];
      } else {
        const seriesData = legendNameMap.map((item) => {
          const value = item?.[type]?.[1]?.name || '';
          const unit = item?.[type]?.[1]?.unit || '';
          return {
            name: item.name,
            type: 'bar',
            stack: 'total',
            barWidth: '18px',
            itemStyle: {
              color: item.color,
            },
            data: [
              { value: '' },
              {
                value: item.isSupply ? data?.[value] : '',
                unit: unit,
              },
              {
                value: !item.isSupply ? data?.[value] : '',
                unit: unit,
              },
              { value: '' },
            ],
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
        <div ref={printRef} className="chart-wrapper"></div>
      </TransparentCard>
    </ScopeStyle>
  );
}

export default EquipmentBarChart;
