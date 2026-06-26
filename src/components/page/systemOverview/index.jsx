import { useEffect, useState, useTransition } from 'react';
import { Chart } from '@/components/page/systemOverview/chart';
import { Item } from '@/components/page/systemOverview/item';
import { PageBox } from '@/components/units';
import DatePicker from '@/components/units/datePicker';
import HomeBox from '@/components/units/homeBox';
import Typography from '@/components/units/typography';
import { statusData } from '@/pages/page/home/timeStatus/indexConfig';
import { Col, Row } from 'antd';
import { systemConfig } from './indexConfig';
import { useHelpers } from './indexHelper';
import ScopeStyle from './indexStyle';

const newStatusData = statusData.slice(0, 4);

export const SystemOverview = ({ name, title, titleEn }) => {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState({});
  const [infoState, setInfoState] = useState({});
  const [date, setDate] = useState(null);

  const { getDatas, getInfoDatas } = useHelpers({
    name, // api url
    setInfoState,
    setState,
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
            onChange={onChange}
            size="sm"
          />
          <Chart data={state} isPending={isPending} name={name} />
        </HomeBox>
        <HomeBox className="mg-t-40" title={'各設備資訊總覽'}>
          <Row className="mg-t-30" gutter={[16, 16]}>
            {newStatusData?.map((status) => (
              <Col key={status.title} lg={6} md={12} xs={24}>
                <div className="system-label">
                  <Typography size="lg">{status.title_cn} INV</Typography>
                  <div className="status-value">
                    <Typography color={status.color} size="xl">
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
          {console.log('infoState', infoState)}
          <Row className="mg-t-30" gutter={[16, 16]}>
            {infoState?.value?.map((info, idx) => (
              // <div>
              //
              //   123</div>
              <Col key={`${info.name}_${idx}`} lg={6} md={12} xs={24}>
                {/* {console.log('info', info, systemConfig?.[name]?.icon)} */}
                {/* 123 */}
                <Item data={info} icon={systemConfig?.[name]?.icon} />
              </Col>
            ))}
          </Row>
        </HomeBox>
      </ScopeStyle>
    </PageBox>
  );
};
