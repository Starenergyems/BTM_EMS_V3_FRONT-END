import { useState, useEffect, useTransition } from 'react';
import Flow from './flow/index';
import TrendChart from './trendChart/index';
import ScopeStyle from './indexStyle';
import EquipmentConfiguration from './equipmentConfiguration/index';
import TimeStatus from './timeStatus/index';
import EquipmentInfo from './equipmentInfo/index';
import CurrentTime from '@/components/units/currentTime';
import { useHelpers } from './indexHelper';
import { Col, Row } from 'antd';
import useReducerStore from './store/useReducerStore';

function Home() {
  const store = useReducerStore();

  const [isPending, startTransition] = useTransition();
  const [isEquipmentPending, startEquipmentTransition] = useTransition();

  const [flowDatas, setFlowDatas] = useState({});
  const [equipmentDatas, setEquipmentDatas] = useState({});
  const [chartDatas, setChartDatas] = useState({
    trendDatas: {},
    chartDatas: [],
    equipmentChartDatas: {},
  });

  const { getEquipmentDatas, getTrendDatas, getFlowDatas } = useHelpers({
    setFlowDatas,
    setEquipmentDatas,
    setChartDatas,
  });

  useEffect(() => {
    startEquipmentTransition(async () => {
      await getEquipmentDatas();
    });
  }, []);

  useEffect(() => {
    startTransition(async () => {
      await getTrendDatas(store.date);
    });
  }, [store.date]);

  useEffect(() => {
    getFlowDatas(); // 首次執行

    const timer = setInterval(() => {
      getFlowDatas(); // 每 30 秒只呼叫這個
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ScopeStyle>
      <div className="current-time">
        <CurrentTime />
      </div>
      <Row>
        <Col xs={24} xl={12} className="block block1">
          <Flow data={flowDatas} detailDatas={equipmentDatas} />
        </Col>
        <Col xs={24} xl={12} className="block block2">
          <TrendChart
            isPending={isPending}
            trendDatas={chartDatas?.trendDatas}
            chartDatas={chartDatas?.trendDatas?.chartData ?? []}
          />
        </Col>
      </Row>
      <Row className="mg-t-40">
        <Col xs={24} xl={12} className="block block3">
          <Col xs={0} xl={24}>
            <TimeStatus data={flowDatas?.timestamp} />
          </Col>
          <div className="mg-t-36">
            <EquipmentConfiguration data={equipmentDatas} />
          </div>
        </Col>
        <Col xs={24} xl={12} className="block block4">
          <EquipmentInfo
            data={chartDatas?.equipmentChartDatas}
            isPending={isEquipmentPending}
          />
        </Col>
      </Row>
    </ScopeStyle>
  );
}

export default Home;
