import { useEffect, useMemo, useRef, useState } from 'react';
import * as echarts from 'echarts';
import {
  systemConfig,
  yAxisLabels,
} from '@/components/page/billOverview/indexConfig';
import ChartResetDownload from '@/components/units/chartResetDownload';
import LegendBage from '@/components/units/legendBage';
import { useEchartAutoResize } from '@/hooks/useEchartAutoResize';
import { noDataHandler } from '@/utils/chart';
import { Flex } from 'antd';

import { useHelpers } from './indexHelper';
import ScopeStyle from './indexStyle';

export const Chart = ({ data = [], isPending, name }) => {
  const printRef = useRef(null);
  const printChartRef = useRef(null);

  const [state, setState] = useState({});
  const [isReset, setIsReset] = useState(false);

  useEchartAutoResize(printRef, printChartRef);

  const legendNameMap = systemConfig?.[name]?.legendNameMap;

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
      let maxAxisArbitrage = 0;
      let minAxisArbitrage = 0;

      legendNameMap?.forEach((legend) => {
        const values = data
          .map((item) => item?.[legend.name] ?? 0)
          .filter((v) => v !== null);

        if (legend.name.includes('arbitrage')) {
          const max = Math.max(...values, 0);
          maxAxisArbitrage = Math.max(maxAxisArbitrage, max);
        } else {
          const min = Math.min(...values, 0);
          minAxisArbitrage = Math.min(minAxisArbitrage, min);
        }
      });

      const newOption = {
        ...option,
        series: JSON.parse(JSON.stringify(option.series)),

        xAxis: {
          ...option.xAxis,
          data: data.map((item) => item.time),
        },
        yAxis: yAxisLabels.map((yAxisLabel, index) => {
          let maxAxisArbitrage = 0;
          let minAxisArbitrage = 0;
          let maxAxisSupply = 0;
          let minAxisSupply = 0;

          legendNameMap.forEach((legend) => {
            const values = data
              .map((item) => item?.[legend.name] ?? 0)
              .filter((v) => v !== null);

            if (legend.name.includes('arbitrage')) {
              const max = Math.max(...values, 0);
              maxAxisArbitrage = Math.max(maxAxisArbitrage, max);
              const min = Math.min(...values, 0);
              minAxisArbitrage = Math.min(minAxisArbitrage, min);
            } else {
              const maxSupply = Math.max(...values, 0);
              maxAxisSupply = Math.max(maxAxisSupply, maxSupply);
              const minSupply = Math.min(...values, 0);
              minAxisSupply = Math.min(minAxisSupply, minSupply);
            }
          });
          return {
            ...option.yAxis?.[index],
            max: Math.max(maxAxisSupply, maxAxisArbitrage),
            min: Math.min(minAxisSupply, minAxisArbitrage),
          };
        }),
      };
      newOption.series = legendNameMap.map((legend) => {
        let color = legend.bgColor;
        // 如果是漸層配置，創建 LinearGradient 對象
        if (legend.isGradient) {
          const { colorStops, x, x2, y, y2 } = legend.bgColor;
          color = new echarts.graphic.LinearGradient(x, y, x2, y2, colorStops);
        }

        // 根據 legend name 判斷使用哪個 y 軸
        // kwh 相關使用左軸(0), arbitrage 相關使用右軸(1)
        const yAxisIndex = legend.name.includes('arbitrage') ? 1 : 0;

        return {
          barWidth: '8px',
          data: data.map((item) => item?.[legend.name]),
          itemStyle: {
            color,
          },
          name: legend.name,
          stack: '',
          type: 'bar',
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
      <Flex className="mg-t-15 mg-r-30" justify="end">
        <ChartResetDownload
          chartDatas={data}
          legendNameMap={legendNameMap}
          printChartRef={printChartRef}
          setIsReset={setIsReset}
          setState={setState}
        />
      </Flex>

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
