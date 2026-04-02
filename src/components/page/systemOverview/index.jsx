import { useState, useEffect, useTransition } from 'react';
import { Row, Col } from 'antd';
import { PageBox } from '@/components/units';
import HomeBox from '@/components/units/homeBox';
import ScopeStyle from './indexStyle';
import { statusData } from '@/pages/page/home/timeStatus/indexConfig';
import DatePicker from '@/components/units/datePicker';
import Typography from '@/components/units/typography';
import { Chart } from '@/components/page/systemOverview/chart';
import { Item } from '@/components/page/systemOverview/item';
import { systemConfig } from './indexConfig';
import { useHelpers } from './indexHelper';

const newStatusData = statusData.slice(0, 4);

export const SystemOverview = ({ title, titleEn, name }) => {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState({});
  const [infoState, setInfoState] = useState({});
  const [date, setDate] = useState(null);

  const { getDatas, getInfoDatas } = useHelpers({
    name, // api url
    setState,
    setInfoState,
  });

  useEffect(() => {
    startTransition(async () => {
      await getDatas(date);
    });
  }, [date]);

  useEffect(() => {
    getInfoDatas();

    const interval = setInterval(() => {
      getInfoDatas();
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  const onChange = (date, dateString) => {
    setDate(dateString);
  };

  return (
    <PageBox headerTitle={`${title}總系統資訊 ${titleEn}`}>
      <ScopeStyle>
        <HomeBox title={`${title}供電趨勢圖`}>
          <DatePicker
            className="mg-t-20 mg-b-20"
            size="sm"
            onChange={onChange}
          />
          <Chart name={name} data={state} isPending={isPending} />
        </HomeBox>
        <HomeBox title={'各設備資訊總覽'} className="mg-t-40">
          <Row gutter={[16, 16]} className="mg-t-30">
            {newStatusData?.map((status) => (
              <Col key={status.title} xs={24} md={12} lg={6}>
                <div className="system-label">
                  <Typography size="lg">{status.title_cn} INV</Typography>
                  <div className="status-value">
                    <Typography size="xl" color={status.color}>
                      {infoState?.overview?.[status.name] || 0}
                    </Typography>
                    <Typography size="xl">/</Typography>
                    <Typography size="xl">
                      {infoState?.totalModuleNum || 0}
                    </Typography>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <Row gutter={[16, 16]} className="mg-t-30">
            {infoState?.value?.map((info, idx) => (
              <Col key={`${info.name}_${idx}`} xs={24} md={12} lg={6}>
                <Item icon={systemConfig?.[name]?.icon} data={info} />
              </Col>
            ))}
          </Row>
        </HomeBox>
      </ScopeStyle>
    </PageBox>
  );
};
