import { useEffect, useMemo, useRef, useState } from 'react';
import { useEchartAutoResize } from '@/hooks/useEchartAutoResize';
import { Card, Flex, Segmented, Table } from 'antd';
import { customLegendNameMap } from './indexConfig';
import { useHelpers } from './indexHelper';
import ScopeStyle from './indexStyle';
import { color } from '@/styles/variable/indexStyle';

function ServiceProduct() {
  const [mainState, setMainState] = useState({
    isServiceProductTableLoading: false,
    serviceProductData: [],
    serviceProductStatus: 'realTimeSpinningReserve',
    serviceProductTableData: [],
  });
  const realTimeSpinningReservePowerRef = useRef(null);
  const realTimeSpinningReservePowerChartRef = useRef(null);
  useEchartAutoResize(
    realTimeSpinningReservePowerRef,
    realTimeSpinningReservePowerChartRef,
  );
  const {
    customLegendOnClick,
    getRealTimeSpinningReservePowerOption,
    getServiceProductData,
    getSpmTableColumns,
    setRealTimeSpinningReservePowerChart,
  } = useHelpers({
    // mainState,
    refs: {
      realTimeSpinningReservePowerChartRef,
      realTimeSpinningReservePowerRef,
    },
    setMainState,
  });
  const awardPowerOption = useMemo(
    () => getRealTimeSpinningReservePowerOption(),
    [getRealTimeSpinningReservePowerOption],
  );
  const customLegend = useMemo(() => {
    return Object.fromEntries(
      awardPowerOption.legend.data.map((key) => [key, true]),
    );
  }, [awardPowerOption.legend.data]);

  //取得服務商品API資料
  useEffect(() => {
    getServiceProductData();
  }, [getServiceProductData, mainState.serviceProductStatus]);

  //服務商品繪製
  useEffect(() => {
    if (realTimeSpinningReservePowerRef.current) {
      const newOption = {
        ...awardPowerOption,
        series: JSON.parse(JSON.stringify(awardPowerOption.series)),
      };

      // cbl 數據 - 固定在 50
      const cblData = Array(1380).fill(1000);

      // loadCurveData 數據 - 先維持在 0，之後再上升到 500，維持一段時間後再下降回 0
      const loadCurveData = Array(410)
        .fill(1000)
        .concat(Array(1).fill(950))
        .concat(Array(1).fill(900))
        .concat(Array(1).fill(850))
        .concat(Array(1).fill(800))
        .concat(Array(1).fill(750))
        .concat(Array(1).fill(700))
        .concat(Array(1).fill(650))
        .concat(Array(1).fill(600))
        .concat(Array(1).fill(550))
        .concat(Array(1).fill(500))
        .concat(Array(300).fill(500))
        .concat(
          Array(120)
            .fill(0)
            .map((_, index) => {
              return 500 + (index + 1) * 4.1667;
            }),
        )
        .concat(Array(540).fill(1000));

      // 設定開始計算的時間點（例如：05:08 = 5*60 + 8 = 308 分鐘）
      const startMinute = 7 * 60; // 07:08
      const endMinute = 12 * 60; // 12:00

      // 計算差值數據 (cbl - loadCurveData)，從指定時間點開始
      const contributionData = cblData.map((cbl, index) => {
        if (index < startMinute || index > endMinute) {
          return 0; // 指定時間之前為 0
        }
        return cbl - loadCurveData[index];
      });

      // 設定各系列數據
      newOption.series[0].data = cblData;
      newOption.series[1].data = loadCurveData;
      newOption.series[2].data = contributionData;

      setRealTimeSpinningReservePowerChart(newOption);
    }
    // setRealTimeSpinningReservePowerChart(awardPowerOption);
  }, [awardPowerOption, setRealTimeSpinningReservePowerChart]);

  return (
    <ScopeStyle>
      <Flex
        align="center"
        className="section-header mg-t-50 pd-x-20 pd-y-10"
        justify="space-between"
      >
        <span>服務商品</span>
        <div className="real-time-spinning-reserve-segmented">
          <Segmented
            defaultValue={mainState.serviceProductStatus}
            onChange={(value) => {
              setMainState((prevState) => ({
                ...prevState,
                serviceProductStatus: value,
              }));
            }}
            options={[{ label: '即時備轉', value: 'realTimeSpinningReserve' }]}
          />
        </div>

        {/* <Flex align="center" className="cloud-status-container">
          <span>服務狀態：</span>
          <span className="status">服務中</span>
        </Flex> */}
      </Flex>
      <Card className="mg-t-16">
        <div
          className="revenue-sharing-bar-stack-chart"
          ref={realTimeSpinningReservePowerRef}
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
                customLegendOnClick(
                  item,
                  realTimeSpinningReservePowerChartRef.current,
                )
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
      <Table
        className="theme-secondary mg-t-36"
        columns={getSpmTableColumns()}
        dataSource={mainState.serviceProductTableData}
        loading={mainState.isServiceProductTableLoading}
        pagination={false}
        rowClassName="custom-no-hover"
        rowKey="id"
        scroll={{
          x: 'max-content',
        }}
      />
    </ScopeStyle>
  );
}

export default ServiceProduct;
