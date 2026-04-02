import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { isToday } from '@/utils/date';
import { Flex, Row, Col } from 'antd';
import { useEchartAutoResize } from '@/hooks/useEchartAutoResize';
import {
  dataZoomChangeHandler,
  getNewDatasHandler,
  noDataHandler,
  fullTimeAxisHandler,
} from '@/utils/chart';
import HomeBox from '@/components/units/homeBox';
import DatePicker from '@/components/units/datePicker';
import LegendBage from '@/components/units/legendBage';
import TransparentCard from '@/components/units/transparentCard';
import ChartResetDownload from '@/components/units/chartResetDownload';

import ScopeStyle from './indexStyle';
import { useHelpers } from './indexHelper';
import { customLegendNameMap, trendNameMap } from './indexConfig';
import InfoBox from './infoBox/index';
import useReducerStore from '../store/useReducerStore';

function TrendChart({ isPending, trendDatas, chartDatas }) {
  const store = useReducerStore();
  const intervalStore = useSelector((state) => state.layout);

  const printRef = useRef(null);
  const printChartRef = useRef(null);
  const zoomRangeRef = useRef(100);
  const timerRef = useRef(null);

  const [state, setState] = useState({});
  const [isReset, setIsReset] = useState(false);
  const [newChartData, setNewChartData] = useState([]);
  const [newData, setNewData] = useState(null);

  useEchartAutoResize(printRef, printChartRef);

  // 快取完整 24 小時時間軸
  const fullTimeAxis = useMemo(
    () => fullTimeAxisHandler(intervalStore.interval),
    [intervalStore.interval],
  );

  // 合併所有資料
  const allChartData = useMemo(
    () => [...chartDatas, ...newChartData],
    [chartDatas, newChartData],
  );

  // 將資料映射到完整時間軸的輔助函數
  const mapDataToTimeAxis = useMemo(
    () => (data) => {
      const dataMap = data.reduce((acc, item) => {
        acc[item.time] = item;
        return acc;
      }, {});

      const seriesKeys = ['grid', 'load', 'solar', 'battery', 'charger'];

      return seriesKeys.map((key) =>
        fullTimeAxis.map((time) => dataMap[time]?.[key] ?? null),
      );
    },
    [fullTimeAxis],
  );

  const {
    customLegendOnClick,
    getChartOption,
    setChart,
    onChange,
    getNewDatas,
  } = useHelpers({
    refs: {
      printRef,
      printChartRef,
    },
  });

  const chartOption = useMemo(() => getChartOption(), [getChartOption]);

  // 控制 loading 狀態
  useEffect(() => {
    if (allChartData.length === 0) {
      noDataHandler(setChart, chartOption);
    }

    if (isPending) {
      printChartRef.current.showLoading();
    } else {
      printChartRef.current.hideLoading();
    }
  }, [isPending]);

  // 服務商品繪製
  useEffect(() => {
    if (printRef.current && allChartData.length > 0) {
      const seriesData = mapDataToTimeAxis(allChartData);
      const newOption = {
        ...chartOption,
        xAxis: {
          ...chartOption.xAxis,
          data: fullTimeAxis,
        },
        series: [
          ...chartOption.series.map((s, idx) => ({
            ...s,
            data: seriesData[idx],
          })),
          {
            ...chartOption.series[chartOption.series.length - 1],
            markLine: {
              ...chartOption.series[chartOption.series.length - 1].markLine,
              data: [
                { yAxis: 10, name: '防逆流' }, // 第一條線
                { yAxis: 45, name: '防超約' }, // 第二條線 (不等距)
                { yAxis: 55, name: '契約容量' }, // 第三條線
              ],
            },
          },
        ],
      };

      setChart(newOption);

      // 監聽 dataZoom 事件來更新 zoom 範圍並重繪圖表
      dataZoomChangeHandler(
        printChartRef,
        zoomRangeRef,
        allChartData,
        getChartOption,
        fullTimeAxis,
      );
    }
    if (isReset) {
      setIsReset(false);
    }
  }, [chartDatas, isReset]);

  // 即時資料更新
  useEffect(() => {
    const isNotToday = isToday(store.date);
    if (isNotToday) return;

    // 清除舊的計時器
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(async () => {
      const currentData = allChartData;
      const lastTime = currentData[currentData.length - 1]?.time;

      // 檢查停止條件，如果最後一筆資料的時間已經超過 23:00 就停止請求
      if (lastTime) {
        const hour = parseInt(lastTime.split(':')[0]);
        if (hour >= 23) {
          clearInterval(timerRef.current);
          return;
        }
      }

      // 執行請求
      try {
        const filteredData = await getNewDatasHandler(
          getNewDatas,
          chartDatas,
          newChartData,
          setNewData,
        );

        if (filteredData && filteredData.length > 0) {
          setNewChartData((prev) => {
            const updated = [...prev, ...filteredData];
            const allDataForChart = [...chartDatas, ...updated];

            // 更新圖表
            const seriesData = mapDataToTimeAxis(allDataForChart);
            printChartRef.current?.setOption({
              series: seriesData.map((data) => ({ data })),
            });

            return updated;
          });
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, intervalStore.interval * 1000); // 180秒

    return () => clearInterval(timerRef.current);
  }, [store.date, intervalStore.interval, chartDatas]);

  return (
    <ScopeStyle>
      <HomeBox title="當日用電趨勢圖">
        <Flex justify="space-between" align="center" wrap gap={10}>
          <DatePicker size="sm" bgColor="semitransparent" onChange={onChange} />
          <ChartResetDownload
            setIsReset={setIsReset}
            setState={setState}
            legendNameMap={customLegendNameMap}
            printChartRef={printChartRef}
            chartDatas={allChartData}
          />
        </Flex>
        <TransparentCard className="mg-t-10">
          <div ref={printRef} className="chart-wrapper"></div>
          <Flex className="custom-legend" gap={16} justify="center" wrap>
            {chartOption.legend.data.map((item, index) => {
              const idxItem = customLegendNameMap.find(
                (key) => key.name === item,
              );
              const isSelected = state?.customLegend?.[item] !== false;
              return (
                <LegendBage
                  key={`${item.name}${index}`}
                  item={idxItem}
                  size="md"
                  active={isSelected}
                  onClick={() => {
                    customLegendOnClick(item, printChartRef.current, setState);
                  }}
                />
              );
            })}
          </Flex>
        </TransparentCard>
        <Row gutter={[8, 8]} className="mg-t-8">
          {trendNameMap.map((item, index) => {
            const finalValue = newData ? newData : trendDatas;
            return (
              <Col xs={24} md={6} key={index}>
                <InfoBox
                  info={
                    item.name === 'season'
                      ? `${finalValue[item.name] ?? '--'}${
                          finalValue.isPeak ? '尖峰' : '離峰'
                        }`
                      : (finalValue[item.name] ?? '--')
                  }
                  subTitle={item.subTitle}
                />
              </Col>
            );
          })}
        </Row>
      </HomeBox>
    </ScopeStyle>
  );
}

export default TrendChart;
