import { useState, useEffect, useRef, useMemo } from 'react';
import { useEchartAutoResize } from '@/hooks/useEchartAutoResize';
import { Flex } from 'antd';
import LegendBage from '@/components/units/legendBage';
import { noDataHandler } from '@/utils/chart';
import { config } from './indexConfig';
import ScopeStyle from './indexStyle';
import { useHelpers } from './indexHelper';

export const Chart = ({ name, data = [], isPending }) => {
  const printRef = useRef(null);
  const printChartRef = useRef(null);

  const [state, setState] = useState({});
  const [isReset, setIsReset] = useState(false);

  useEchartAutoResize(printRef, printChartRef);

  const legendNameMap = config?.legendNameMap;

  const { customLegendOnClick, getChartOption, setChart } = useHelpers({
    name,
    refs: {
      printRef,
      printChartRef,
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
        xAxis: {
          ...option.xAxis,
          data: data.map((item) => item.time),
        },

        series: JSON.parse(JSON.stringify(option.series)),
      };
      newOption.series = legendNameMap.map((legend) => {
        let color = legend.bgColor;
        // 累積效益使用右側 yAxis
        const yAxisIndex = legend.accumulation ? 1 : 0;

        return {
          name: legend.name,
          type: 'line',
          symbol: 'none', // 不顯示折線圖的點
          stack: '',
          yAxisIndex,
          data: data.map((item) => item?.[legend.name]),
          lineStyle: {
            width: 3,
          },
          itemStyle: {
            color,
          },
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
      <div ref={printRef} className="chart-wrapper"></div>
      <Flex className="mg-y-15" justify="center" wrap gap={20}>
        {legendNameMap?.map((legend) => {
          const isSelected = state?.customLegend?.[legend.name] !== false;
          return (
            <LegendBage
              key={legend.name}
              item={legend}
              size="lg"
              active={isSelected}
              onClick={() => {
                customLegendOnClick(
                  legend.name,
                  printChartRef.current,
                  setState,
                );
              }}
            />
          );
        })}
      </Flex>
    </ScopeStyle>
  );
};
