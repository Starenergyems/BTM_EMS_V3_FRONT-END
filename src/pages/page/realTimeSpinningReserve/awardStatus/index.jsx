import { useEffect, useMemo, useRef, useState } from 'react';
import { Card, Flex } from 'antd';
import { toDateTimeStr } from '@/utils/format';
import { color } from '@/styles/variable/indexStyle';
import { noDataHandler } from '@/utils/chart';
import { useHelpers } from './indexHelper';
import ScopeStyle from './indexStyle';
import { customLegendNameMap } from './indexConfig';
import { useEchartAutoResize } from '@/hooks/useEchartAutoResize';

function AwardStatus() {
  const [mainState, setMainState] = useState({
    awardData: {
      data: [],
    },
    awardStatus: 'today',
    awardTableData: [],
    isAwardTableLoading: false,
  });

  const awardPowerRef = useRef(null);
  const awardPowerChartRef = useRef(null);

  useEchartAutoResize(awardPowerRef, awardPowerChartRef);

  const {
    customLegendOnClick,
    getAwardData,
    // getAwardSatusTableColumns,
    getAwardPowerOption,
    setAwardPowerChart,
  } = useHelpers({
    refs: { awardPowerRef, awardPowerChartRef },
    setMainState,
  });

  const awardPowerOption = useMemo(
    () => getAwardPowerOption(),
    [getAwardPowerOption],
  );

  const customLegend = useMemo(() => {
    return Object.fromEntries(
      awardPowerOption.legend.data.map((key) => [key, true]),
    );
  }, [awardPowerOption.legend.data]);

  // 取得今日、明日得標資料
  useEffect(() => {
    awardPowerChartRef.current?.showLoading();
    getAwardData();
  }, [getAwardData, mainState.awardStatus]);

  // 當月分帳 bar 堆疊圖繪製
  useEffect(() => {
    if (awardPowerRef.current) {
      // if (noDataTimerRef.current) {
      //   clearTimeout(noDataTimerRef.current);
      //   noDataTimerRef.current = null;
      // }

      const newOption = {
        ...awardPowerOption,
        series: JSON.parse(JSON.stringify(awardPowerOption.series)),
      };
      newOption.series[0].data = mainState.awardData.data.map(
        (item) => item.value,
      );

      const hasData = mainState.awardData.data.length > 0;
      const isShowNoData =
        hasData &&
        mainState.awardData.data.every((series) => series.value === 0);

      if (isShowNoData) {
        noDataHandler(setAwardPowerChart, newOption);
      } else {
        setAwardPowerChart(newOption);
      }

      awardPowerChartRef.current?.hideLoading();
    }
  }, [
    mainState.awardData,
    mainState.awardStatus,
    awardPowerOption,
    setAwardPowerChart,
  ]);

  return (
    <ScopeStyle>
      <Flex
        align="center"
        className="section-header pd-x-20 pd-y-10"
        // justify="space-between"
      >
        <span>得標狀態</span>
        <div className="real-time-spinning-reserve-segmented">
          {/* <Segmented
            defaultValue={mainState.awardStatus}
            options={[
              { label: "今日", value: "today" },
              // { label: "明日", value: "tomorrow" },
            ]}
            onChange={(value) => {
              setMainState((prevState) => ({
                ...prevState,
                awardStatus: value,
              }));
            }}
          /> */}
          {/* {toDateTimeStr(new Date().setDate(new Date().getDate() + 1), "YYYY/MM/DD")} */}
          {toDateTimeStr(new Date(), 'YYYY/MM/DD')}
        </div>

        {/* <Flex align="center" className="cloud-status-container">
          <span>雲端連線：</span>
          <span className="status">連線中</span>
        </Flex> */}
      </Flex>
      <Card className="mg-t-16">
        <div
          ref={awardPowerRef}
          className="revenue-sharing-bar-stack-chart"
        ></div>
      </Card>
      <Flex className="custom-legend mg-t-50-minus" gap={16} justify="center">
        {awardPowerOption.legend.data.map((item, index) => {
          return (
            <Flex
              align="center"
              className="custom-legend-item pd-x-10 pd-y-4"
              key={index}
              onClick={() =>
                customLegendOnClick(item, awardPowerChartRef.current)
              }
            >
              <span
                className="color-block mg-r-5"
                style={{
                  backgroundColor: customLegend[item]
                    ? awardPowerOption?.series?.[index]?.itemStyle?.color
                    : color.white,
                }}
              ></span>
              <span
                style={{
                  opacity: customLegend[item] ? 1 : 0.3,
                }}
              >
                {customLegendNameMap[item]}
              </span>
            </Flex>
          );
        })}
      </Flex>
      {/* <Table
        className="theme-secondary mg-t-36"
        columns={getAwardSatusTableColumns()}
        dataSource={mainState.awardTableData}
        loading={mainState.isAwardTableLoading}
        pagination={false}
        rowClassName="custom-no-hover"
        rowKey="id"
        scroll={{
          x: "max-content",
        }}
      /> */}
    </ScopeStyle>
  );
}

export default AwardStatus;
