import { useEffect, useMemo, useRef, useState } from "react";
import { useEchartAutoResize } from "@/hooks/useEchartAutoResize";
import { Card, Flex, Segmented, Table } from "antd";
import { customLegendNameMap } from "./indexConfig";
import { useHelpers } from "./indexHelper";
import ScopeStyle from "./indexStyle";
import { color } from "@/styles/variable/indexStyle";

function ServiceProduct () {
  const [mainState, setMainState] = useState({
    isServiceProductTableLoading: false,
    serviceProductData: [],
    serviceProductStatus: "realTimeSpinningReserve",
    serviceProductTableData: [],
  });
  const realTimeSpinningReservePowerRef = useRef(null);
  const realTimeSpinningReservePowerChartRef = useRef(null);
  useEchartAutoResize(
    realTimeSpinningReservePowerRef,
    realTimeSpinningReservePowerChartRef
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
    [getRealTimeSpinningReservePowerOption]
  );
  const customLegend = useMemo(() => {
    return Object.fromEntries(
      awardPowerOption.legend.data.map((key) => [key, true])
    );
  }, [awardPowerOption.legend.data]);

  //取得服務商品API資料
  useEffect(() => {
    getServiceProductData();
  }, [getServiceProductData,
    mainState.serviceProductStatus
  ]);

  //服務商品繪製
  useEffect(() => {
    if (realTimeSpinningReservePowerRef.current) {
      const newOption = {
        ...awardPowerOption,
        series: JSON.parse(JSON.stringify(awardPowerOption.series)),
      };
      newOption.series[0].data = [
        // 00:00 - 00:59 (從10逐漸上升到40)
        10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5,
        17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5,
        24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5,
        31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5,
        38, 38.5, 39, 39.5,

        // 01:00 - 01:59 (從40上升到52)
        40, 40.2, 40.4, 40.6, 40.8, 41, 41.2, 41.4, 41.6, 41.8, 42, 42.2, 42.4,
        42.6, 42.8, 43, 43.2, 43.4, 43.6, 43.8, 44, 44.2, 44.4, 44.6, 44.8, 45,
        45.2, 45.4, 45.6, 45.8, 46, 46.2, 46.4, 46.6, 46.8, 47, 47.2, 47.4,
        47.6, 47.8, 48, 48.2, 48.4, 48.6, 48.8, 49, 49.2, 49.4, 49.6, 49.8, 50,
        50.3, 50.6, 50.9, 51.2, 51.5, 51.8, 52.1, 52.4, 52.7,

        // 02:00 - 02:59 (從52.8下降到28)
        52.5, 52, 51.6, 51.2, 50.8, 50.4, 50, 49.6, 49.2, 48.8, 48.4, 48, 47.6,
        47.2, 46.8, 46.4, 46, 45.6, 45.2, 44.8, 44.4, 44, 43.6, 43.2, 42.8,
        42.4, 42, 41.6, 41.2, 40.8, 40.4, 40, 39.6, 39.2, 38.8, 38.4, 38, 37.6,
        37.2, 36.8, 36.4, 36, 35.5, 35, 34.5, 34, 33.5, 33, 32.5, 32, 31.5, 31,
        30.5, 30, 29.5, 29, 28.5, 28.2, 28.1, 28,

        // 03:00 - 03:59 (從28上升到50)
        28, 28.4, 28.8, 29.2, 29.6, 30, 30.4, 30.8, 31.2, 31.6, 32, 32.4, 32.8,
        33.2, 33.6, 34, 34.4, 34.8, 35.2, 35.6, 36, 36.4, 36.8, 37.2, 37.6, 38,
        38.4, 38.8, 39.2, 39.6, 40, 40.4, 40.8, 41.2, 41.6, 42, 42.4, 42.8,
        43.2, 43.6, 44, 44.4, 44.8, 45.2, 45.6, 46, 46.4, 46.8, 47.2, 47.6, 48,
        48.3, 48.6, 48.9, 49.2, 49.5, 49.8, 50.1, 50.4, 50.7,

        // 04:00 - 04:59 (維持在48-50之間波動)
        50, 49.5, 48.8, 49.2, 50.1, 48.6, 49.8, 50.3, 48.9, 49.4, 50.2, 48.7,
        49.6, 50.0, 48.5, 49.9, 50.4, 48.8, 49.3, 50.1, 48.6, 49.7, 50.2, 48.9,
        49.5, 50.0, 48.7, 49.8, 50.3, 48.6, 49.4, 50.1, 48.8, 49.6, 50.2, 48.7,
        49.9, 50.0, 48.5, 49.3, 50.1, 48.9, 49.7, 50.3, 48.6, 49.4, 50.0, 48.8,
        49.5, 50.2, 48.7, 49.8, 50.1, 48.9, 49.6, 50.0, 48.5, 49.4, 50.3, 48.8,

        // 05:00 - 05:59 (從48下降到40)
        48, 47.8, 47.6, 47.4, 47.2, 47, 46.8, 46.6, 46.4, 46.2, 46, 45.8, 45.6,
        45.4, 45.2, 45, 44.8, 44.6, 44.4, 44.2, 44, 43.8, 43.6, 43.4, 43.2, 43,
        42.8, 42.6, 42.4, 42.2, 42, 41.8, 41.6, 41.4, 41.2, 41, 40.8, 40.6,
        40.4, 40.2, 40, 39.9, 39.8, 39.7, 39.6, 39.5, 39.4, 39.3, 39.2, 39.1,
        39, 39.0, 39.0, 39.0, 39.0, 39.0, 39.5, 40.0, 40.3, 40.5,

        // 06:00 - 06:59 (從40上升到48)
        40, 40.2, 40.4, 40.6, 40.8, 41, 41.2, 41.4, 41.6, 41.8, 42, 42.2, 42.4,
        42.6, 42.8, 43, 43.2, 43.4, 43.6, 43.8, 44, 44.2, 44.4, 44.6, 44.8, 45,
        45.2, 45.4, 45.6, 45.8, 46, 46.2, 46.4, 46.6, 46.8, 47, 47.2, 47.4,
        47.6, 47.8, 48, 48.0, 48.0, 48.0, 48.0, 48.0, 48.0, 48.0, 48.0, 48.0,
        48, 48.0, 48.0, 48.0, 48.0, 48.0, 48.0, 48.0, 48.0, 48.0,

        // 07:00 - 07:59 (從48上升到52)
        48, 48.1, 48.2, 48.3, 48.4, 48.5, 48.6, 48.7, 48.8, 48.9, 49, 49.1,
        49.2, 49.3, 49.4, 49.5, 49.6, 49.7, 49.8, 49.9, 50, 50.1, 50.2, 50.3,
        50.4, 50.5, 50.6, 50.7, 50.8, 50.9, 51, 51.1, 51.2, 51.3, 51.4, 51.5,
        51.6, 51.7, 51.8, 51.9, 52, 52.0, 52.0, 52.0, 52.0, 52.0, 52.0, 52.0,
        52.0, 52.0, 52, 52.0, 52.0, 52.0, 52.0, 52.0, 52.0, 52.0, 52.0, 52.0,

        // 08:00 - 08:59 (維持在48-52之間波動)
        52, 51.5, 50.8, 49.5, 48.8, 49.2, 50.5, 51.8, 52.0, 50.3, 49.0, 48.5,
        49.8, 51.2, 52.0, 50.8, 49.3, 48.7, 50.0, 51.5, 52.0, 50.5, 49.2, 48.6,
        49.9, 51.3, 52.0, 50.7, 49.4, 48.8, 50.2, 51.6, 52.0, 50.4, 49.1, 48.5,
        49.7, 51.1, 52.0, 50.6, 49.3, 48.7, 50.1, 51.4, 52.0, 50.9, 49.5, 48.9,
        50.3, 51.7, 52.0, 50.8, 49.4, 48.8, 50.2, 51.5, 52.0, 50.6, 49.2, 48.6,

        // 09:00 - 09:59 (維持在46-48之間)
        48, 47.8, 47.5, 47.2, 47.0, 46.8, 46.5, 46.3, 46.0, 46.2, 46.5, 46.8,
        47.0, 47.3, 47.5, 47.8, 48.0, 47.7, 47.4, 47.1, 46.8, 46.6, 46.4, 46.2,
        46.0, 46.3, 46.6, 46.9, 47.2, 47.5, 47.8, 48.0, 47.8, 47.5, 47.2, 47.0,
        46.7, 46.5, 46.3, 46.1, 46.0, 46.2, 46.5, 46.8, 47.1, 47.4, 47.7, 48.0,
        47.8, 47.5, 47.2, 47.0, 46.8, 46.5, 46.3, 46.1, 46.0, 46.2, 46.5, 46.8,

        // 10:00 - 10:08 (維持在46-47之間)
        47, 47.2, 47.0, 46.8, 46.5, 46.7, 47.0, 47.2, 47.0,
      ];
      newOption.series[1].data = [
        // 00:00 - 00:59 (60個null)
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

        // 01:00 - 01:59 (從15上升到25)
        15.0, 15.2, 15.3, 15.5, 15.7, 15.8, 16.0, 16.2, 16.3, 16.5, 16.7, 16.8,
        17.0, 17.2, 17.3, 17.5, 17.7, 17.8, 18.0, 18.2, 18.3, 18.5, 18.7, 18.8,
        19.0, 19.2, 19.3, 19.5, 19.7, 19.8, 20.0, 20.2, 20.3, 20.5, 20.7, 20.8,
        21.0, 21.2, 21.3, 21.5, 21.7, 21.8, 22.0, 22.2, 22.3, 22.5, 22.7, 22.8,
        23.0, 23.2, 23.3, 23.5, 23.7, 23.8, 24.0, 24.2, 24.3, 24.5, 24.7, 24.8,

        // 02:00 - 02:59 (從25上升到49)
        25.0, 25.4, 25.8, 26.2, 26.6, 27.0, 27.4, 27.8, 28.2, 28.6, 29.0, 29.4,
        29.8, 30.2, 30.6, 31.0, 31.4, 31.8, 32.2, 32.6, 33.0, 33.4, 33.8, 34.2,
        34.6, 35.0, 35.4, 35.8, 36.2, 36.6, 37.0, 37.4, 37.8, 38.2, 38.6, 39.0,
        39.4, 39.8, 40.2, 40.6, 41.0, 41.4, 41.8, 42.2, 42.6, 43.0, 43.4, 43.8,
        44.2, 44.6, 45.0, 45.4, 45.8, 46.2, 46.6, 47.0, 47.4, 47.8, 48.2, 48.6,

        // 03:00 - 03:30 (維持在48-51之間)
        49.0, 48.5, 50.2, 49.8, 48.3, 50.5, 49.2, 48.7, 50.8, 49.5, 48.9, 50.3,
        49.7, 48.4, 50.1, 49.3, 48.8, 50.6, 49.4, 48.6, 50.4, 49.1, 48.5, 50.7,
        49.6, 48.2, 50.0, 49.9, 48.7, 50.2, 49.5,
        // 03:31 - 03:59 (維持在48-50之間)
        48.3, 49.8, 50.1, 48.9, 49.5, 50.3, 48.6, 49.2, 50.0, 48.8, 49.7, 50.2,
        48.4, 49.4, 50.1, 48.7, 49.6, 49.9, 48.5, 49.3, 50.0, 48.9, 49.8, 49.5,
        48.6, 49.1, 49.7, 48.8, 49.4,

        // 04:00 - 04:59 (從50逐漸下降到42)
        50.0, 49.8, 49.6, 49.4, 49.2, 49.0, 48.8, 48.6, 48.4, 48.2, 48.0, 47.8,
        47.6, 47.4, 47.2, 47.0, 46.8, 46.6, 46.4, 46.2, 46.0, 45.8, 45.6, 45.4,
        45.2, 45.0, 44.8, 44.6, 44.4, 44.2, 44.0, 43.8, 43.6, 43.4, 43.2, 43.0,
        42.8, 42.6, 42.4, 42.2, 42.0, 41.9, 41.8, 41.7, 41.6, 41.5, 41.4, 41.3,
        41.2, 41.1, 41.0, 40.9, 40.8, 40.7, 40.6, 40.5, 40.4, 40.3, 40.2, 40.1,

        // 05:00 - 05:30 (從40快速下降到20然後到null)
        40.0, 38.5, 37.0, 35.5, 34.0, 32.5, 31.0, 29.5, 28.0, 26.5, 25.0, 23.5,
        22.0, 20.5, 19.0, 17.5, 16.0, 14.5, 13.0, 11.5, 10.0, 8.5, 7.0, 5.5,
        4.0, 2.5, 1.0, 0, 0, 0, 0,
      ].concat(Array(278).fill(0));
      
      // newOption.series[0].data = Array(609).fill(0);
      // newOption.series[1].data = Array(609).fill(0);
      setRealTimeSpinningReservePowerChart(newOption);
    }
    // setRealTimeSpinningReservePowerChart(awardPowerOption);
  }, [awardPowerOption, setRealTimeSpinningReservePowerChart]);

  return (
    <ScopeStyle>
      <Flex
        align="center"
        className="section-header mg-t-30 pd-x-20 pd-y-10"
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
            options={[{ label: "即時備轉", value: "realTimeSpinningReserve" }]}
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
                  realTimeSpinningReservePowerChartRef.current
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
          x: "max-content",
        }}
      />
    </ScopeStyle>
  );
}

export default ServiceProduct;
