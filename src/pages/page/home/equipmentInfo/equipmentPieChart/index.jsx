import { useEffect, useRef, useMemo } from 'react';
import { useEchartAutoResize } from '@/hooks/useEchartAutoResize';
import TransparentCard from '@/components/units/transparentCard';
import { hexToRgba } from '@/styles/function';
import { color } from '@/styles/variable/indexStyle';
import ScopeStyle from './indexStyle';
import { useHelpers } from './indexHelper';

function EquipmentPieChart({ type, data }) {
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
            value: data?.[name] || 0,
            itemStyle: {
              color: el.color,
              shadowColor: hexToRgba(color.black, 0.25),
              shadowBlur: 4,
              shadowInset: true, // 內陰影 (這是模擬凹陷的關鍵)
            },
          };
        });

      newOption.series[1].data = seriesData;

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

export default EquipmentPieChart;
