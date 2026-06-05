import { useEffect, useMemo, useRef } from 'react';
import TransparentCard from '@/components/units/transparentCard';
import { useEchartAutoResize } from '@/hooks/useEchartAutoResize';
import { useHelpers } from './indexHelper';
import ScopeStyle from './indexStyle';
import { hexToRgba } from '@/styles/function';
import { color } from '@/styles/variable/indexStyle';

function EquipmentPieChart({ data, type }) {
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

  useEffect(() => {
    if (printRef.current) {
      const newOption = {
        ...chartOption,
        series: JSON.parse(JSON.stringify(chartOption.series)),
      };

      // 供電比例繪製
      const seriesData = legendNameMap
        .filter((item) => {
          if (type === 'powerSupply') {
            return item.isSupply;
          } else {
            return !item.isSupply;
          }
        })
        .map((el) => {
          const name = el.percentage[0].name;
          return {
            itemStyle: {
              color: el.color,
              shadowBlur: 4,
              shadowColor: hexToRgba(color.black, 0.25),
              shadowInset: true, // 內陰影 (這是模擬凹陷的關鍵)
            },
            value: data?.[name] || 0,
          };
        });

      newOption.series[1].data = seriesData;

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

export default EquipmentPieChart;
