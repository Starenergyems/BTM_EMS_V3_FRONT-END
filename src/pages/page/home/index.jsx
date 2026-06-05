import { useEffect, useState, useTransition } from 'react';
import CurrentTime from '@/components/units/currentTime';
import { Col, Row } from 'antd';
import EquipmentConfiguration from './equipmentConfiguration/index';
import EquipmentInfo from './equipmentInfo/index';
import Flow from './flow/index';
import { useHelpers } from './indexHelper';
import useReducerStore from './store/useReducerStore';
import TimeStatus from './timeStatus/index';
import TrendChart from './trendChart/index';
import ScopeStyle from './indexStyle';

function Home() {
  const store = useReducerStore();

  const [isPending, startTransition] = useTransition();
  const [isEquipmentPending, startEquipmentTransition] = useTransition();

  const [flowDatas, setFlowDatas] = useState({});
  const [equipmentDatas, setEquipmentDatas] = useState({});
  const [chartDatas, setChartDatas] = useState({
    chartDatas: [],
    equipmentChartDatas: {},
    trendDatas: {},
  });

  const { getEquipmentDatas, getFlowDatas, getTrendDatas } = useHelpers({
    setChartDatas,
    setEquipmentDatas,
    setFlowDatas,
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

  return (
    <ScopeStyle>
      <div className="current-time">
        <CurrentTime />
      </div>

      <Row>
        <Col className="block block1" xl={12} xs={24}>
          <Flow
            data={flowDatas}
            detailDatas={equipmentDatas}
            getFlowDatas={getFlowDatas}
          />
        </Col>
        <Col className="block block2" xl={12} xs={24}>
          <TrendChart
            chartDatas={chartDatas?.trendDatas?.chartData ?? []}
            isPending={isPending}
            trendDatas={chartDatas?.trendDatas}
          />
        </Col>
      </Row>
      <Row className="mg-t-40">
        <Col className="block block3" xl={12} xs={24}>
          <Col xl={24} xs={0}>
            <TimeStatus data={flowDatas?.timestamp} />
          </Col>
          <div className="mg-t-36">
            <EquipmentConfiguration data={equipmentDatas} />
          </div>
        </Col>
        <Col className="block block4" xl={12} xs={24}>
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
