import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { systemConfig } from '@/components/page/systemOverview/indexConfig';
import ChartResetDownload from '@/components/units/chartResetDownload';
import { InfoCard } from '@/components/units/infoCard';
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
import { useHelpers } from './indexHelper';
import ScopeStyle from './indexStyle';

export const Chart = ({ data, isPending, name }) => {
  const store = useReducerStore();
  const intervalStore = useSelector((state) => state.layout);
  const timerRef = useRef(null);

  const printRef = useRef(null);
  const printChartRef = useRef(null);
  const zoomRangeRef = useRef(100);

  const [state, setState] = useState(null);

  const [isReset, setIsReset] = useState(false);
  const [newChartData, setNewChartData] = useState([]);
  const [newData, setNewData] = useState(null);

  useEchartAutoResize(printRef, printChartRef);

  // 快取完整 24 小時時間軸
  const fullTimeAxis = useMemo(
    () => fullTimeAxisHandler(intervalStore.interval),
    [intervalStore.interval],
  );

  // 將資料映射到完整時間軸的輔助函數
  const mapDataToTimeAxis = useMemo(
    () => (data) => {
      const dataMap = data.reduce((acc, item) => {
        acc[item.time] = item;
        return acc;
      }, {});

      return fullTimeAxis.map((time) => dataMap[time]?.value ?? null);
    },
    [fullTimeAxis],
  );

  const { customLegendOnClick, getChartOption, getNewDatas, setChart } =
    useHelpers({
      name,
      refs: {
        printChartRef,
        printRef,
      },
    });

  const option = useMemo(() => getChartOption(), [getChartOption]);

  const allChartData = useMemo(
    () => [...(data?.chartData || []), ...newChartData],
    [data?.chartData, newChartData],
  );

  // 控制 loading 狀態
  useEffect(() => {
    const values = mapDataToTimeAxis(allChartData);
    const hasData = values.some((value) => value !== null);
    if (allChartData.length === 0 || !hasData) {
      noDataHandler(setChart, option);
    }

    if (!printChartRef.current) return;

    if (isPending) {
      printChartRef.current.showLoading();
    } else {
      printChartRef.current.hideLoading();
    }
  }, [isPending]);

  //服務商品繪製
  useEffect(() => {
    if (printRef.current && allChartData?.length > 0) {
      const seriesData = mapDataToTimeAxis(allChartData);

      const newOption = {
        ...option,
        series: JSON.parse(JSON.stringify(option.series)),
        xAxis: {
          ...option.xAxis,
          // data: data.chartData.map((item) => item.time),
          data: fullTimeAxis,
        },
      };

      newOption.series = [
        {
          data: seriesData,
          lineStyle: {
            color: systemConfig?.[name]?.legendNameMap?.[0]?.bgColor,
            width: 3,
          },
          name: systemConfig?.[name]?.legendNameMap?.[0]?.name,
          smooth: true, // 平滑曲線
          symbol: 'none', // 不顯示折線圖的點
          type: 'line',
        },
      ];

      setChart(newOption);
      // 監聽 dataZoom 事件來更新 zoom 範圍並重繪圖表
      dataZoomChangeHandler(
        printChartRef,
        zoomRangeRef,
        data.chartData,
        getChartOption,
        fullTimeAxis,
      );

      if (isReset) {
        setIsReset(false);
      }
    }
  }, [data?.chartData, isReset]);

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
          data?.chartData,
          newChartData,
          setNewData,
        );

        if (filteredData && filteredData.length > 0) {
          setNewChartData((prev) => {
            const updated = [...prev, ...filteredData];
            const allDataForChart = [...(data?.chartData || []), ...updated];

            // 更新圖表
            const seriesData = mapDataToTimeAxis(allDataForChart);

            printChartRef.current?.setOption({
              series: { data: seriesData },
            });

            return updated;
          });
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, intervalStore.interval * 1000); // 180秒

    return () => clearInterval(timerRef.current);
  }, [store.date, intervalStore.interval, data?.chartData]);

  const isSelected =
    state?.customLegend?.[systemConfig?.[name]?.legendNameMap?.[0]?.name] !==
    false;

  return (
    <ScopeStyle>
      <TransparentCard theme="dark">
        <Flex className="mg-t-15 mg-r-30" justify="end">
          <ChartResetDownload
            chartDatas={allChartData}
            legendNameMap={systemConfig?.[name]?.legendNameMap}
            printChartRef={printChartRef}
            setIsReset={setIsReset}
            setState={setState}
          />
        </Flex>

        <div className="chart-wrapper" ref={printRef}></div>
        <Flex className="mg-y-15" justify="center">
          <LegendBage
            active={isSelected}
            item={systemConfig?.[name]?.legendNameMap?.[0]}
            onClick={() => {
              customLegendOnClick(
                systemConfig?.[name]?.legendNameMap?.[0]?.name,
                printChartRef.current,
                setState,
              );
            }}
            size="md"
          />
        </Flex>
      </TransparentCard>
      <Row className="mg-t-20" gutter={[24, 24]}>
        {systemConfig?.[name] &&
          systemConfig[name].config.map((item, itemIndex) => (
            <Col key={`card_${itemIndex}`} lg={8} xs={24}>
              <InfoCard
                color={systemConfig?.[name]?.color}
                icon={null}
                title={item.title}
                value={data?.[item.name]}
              />
            </Col>
          ))}
      </Row>
    </ScopeStyle>
  );
};
