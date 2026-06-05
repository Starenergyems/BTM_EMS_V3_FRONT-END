import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ChartResetDownload from '@/components/units/chartResetDownload';
import DatePicker from '@/components/units/datePicker';
import HomeBox from '@/components/units/homeBox';
import LegendBage from '@/components/units/legendBage';
import TransparentCard from '@/components/units/transparentCard';
import { useEchartAutoResize } from '@/hooks/useEchartAutoResize';
import {
  dataZoomChangeHandler,
  fullTimeAxisHandler,
  getNewDatasHandler,
  noDataHandler,
} from '@/utils/chart';
import { isToday } from '@/utils/date';
import { Col, Flex, Row } from 'antd';

import useReducerStore from '../store/useReducerStore';
import { customLegendNameMap, trendNameMap } from './indexConfig';
import { useHelpers } from './indexHelper';
import InfoBox from './infoBox/index';
import ScopeStyle from './indexStyle';

function TrendChart({ chartDatas, isPending, trendDatas }) {
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
    getNewDatas,
    onChange,
    setChart,
  } = useHelpers({
    refs: {
      printChartRef,
      printRef,
    },
  });

  const chartOption = useMemo(() => getChartOption(), [getChartOption]);

  // 控制 loading 狀態
  useEffect(() => {
    if (allChartData.length === 0) {
      noDataHandler(setChart, chartOption);
    }

    if (isPending) {
      printChartRef.current?.showLoading();
    } else {
      printChartRef.current?.hideLoading();
    }
  }, [isPending]);

  // 服務商品繪製
  useEffect(() => {
    if (printRef.current && allChartData.length > 0) {
      const seriesData = mapDataToTimeAxis(allChartData);
      const newOption = {
        ...chartOption,
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
                { name: '防逆流', yAxis: 10 }, // 第一條線
                { name: '防超約', yAxis: 45 }, // 第二條線 (不等距)
                { name: '契約容量', yAxis: 55 }, // 第三條線
              ],
            },
          },
        ],
        xAxis: {
          ...chartOption.xAxis,
          data: fullTimeAxis,
        },
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
        <Flex align="center" gap={10} justify="space-between" wrap>
          <DatePicker bgColor="semitransparent" onChange={onChange} size="sm" />
          <ChartResetDownload
            chartDatas={allChartData}
            legendNameMap={customLegendNameMap}
            printChartRef={printChartRef}
            setIsReset={setIsReset}
            setState={setState}
          />
        </Flex>
        <TransparentCard className="mg-t-10">
          <div className="chart-wrapper" ref={printRef}></div>
          <Flex className="custom-legend" gap={16} justify="center" wrap>
            {chartOption.legend.data.map((item, index) => {
              const idxItem = customLegendNameMap.find(
                (key) => key.name === item,
              );
              const isSelected = state?.customLegend?.[item] !== false;
              return (
                <LegendBage
                  active={isSelected}
                  item={idxItem}
                  key={`${item.name}${index}`}
                  onClick={() => {
                    customLegendOnClick(item, printChartRef.current, setState);
                  }}
                  size="md"
                />
              );
            })}
          </Flex>
        </TransparentCard>
        <Row className="mg-t-8" gutter={[8, 8]}>
          {trendNameMap.map((item, index) => {
            const finalValue = newData ? newData : trendDatas;
            return (
              <Col key={index} md={6} xs={24}>
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
