import { useEffect, useMemo, useRef, useState } from 'react';
import LegendBage from '@/components/units/legendBage';
import { useEchartAutoResize } from '@/hooks/useEchartAutoResize';
import { noDataHandler } from '@/utils/chart';
import { Flex } from 'antd';
import { config } from './indexConfig';
import { useHelpers } from './indexHelper';
import ScopeStyle from './indexStyle';

export const Chart = ({ data = [], isPending, name }) => {
  const printRef = useRef(null);
  const printChartRef = useRef(null);

  const [state, setState] = useState({});
  const [isReset, setIsReset] = useState(false);

  useEchartAutoResize(printRef, printChartRef);

  const legendNameMap = config?.legendNameMap;

  const { customLegendOnClick, getChartOption, setChart } = useHelpers({
    name,
    refs: {
      printChartRef,
      printRef,
    },
  });
  const option = useMemo(() => getChartOption(), [getChartOption]);

  // 控制 loading 狀態
  useEffect(() => {
    if (data.length === 0) {
      noDataHandler(setChart, option);
    }

    if (isPending) {
      printChartRef.current.showLoading();
    } else {
      printChartRef.current.hideLoading();
    }
  }, [isPending]);

  //服務商品繪製
  useEffect(() => {
    if (printRef.current && data.length > 0) {
      const newOption = {
        ...option,
        series: JSON.parse(JSON.stringify(option.series)),

        xAxis: {
          ...option.xAxis,
          data: data.map((item) => item.time),
        },
      };
      newOption.series = legendNameMap.map((legend) => {
        let color = legend.bgColor;
        // 累積效益使用右側 yAxis
        const yAxisIndex = legend.accumulation ? 1 : 0;

        return {
          data: data.map((item) => item?.[legend.name]),
          itemStyle: {
            color,
          },
          lineStyle: {
            width: 3,
          },
          name: legend.name,
          stack: '',
          symbol: 'none', // 不顯示折線圖的點
          type: 'line',
          yAxisIndex,
        };
      });

      setChart(newOption);
    }
    if (isReset) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsReset(false);
    }
  }, [option, data, setChart, name, isReset]);

  return (
    <ScopeStyle>
      <div className="chart-wrapper" ref={printRef}></div>
      <Flex className="mg-y-15" gap={20} justify="center" wrap>
        {legendNameMap?.map((legend) => {
          const isSelected = state?.customLegend?.[legend.name] !== false;
          return (
            <LegendBage
              active={isSelected}
              item={legend}
              key={legend.name}
              onClick={() => {
                customLegendOnClick(
                  legend.name,
                  printChartRef.current,
                  setState,
                );
              }}
              size="lg"
            />
          );
        })}
      </Flex>
    </ScopeStyle>
  );
};
