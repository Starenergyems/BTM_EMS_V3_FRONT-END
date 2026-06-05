import { useEffect, useState, useTransition } from 'react';
import { format, subDays } from 'date-fns';
import { Chart } from '@/components/page/billOverview/chart';
import { PageBox } from '@/components/units';
import { Select } from '@/components/units';
import DatePicker from '@/components/units/datePicker';
import { InfoCard } from '@/components/units/infoCard';
import TransparentCard from '@/components/units/transparentCard';
import { Col, Flex, Row } from 'antd';

import { selectOptions, systemConfig } from './indexConfig';
import { useHelpers } from './indexHelper';
import ScopeStyle from '../../../pages/page/bill/indexStyle';

export const BillOverview = ({ name, title, titleEn }) => {

  console.log('name', name, systemConfig);


  
  const configName = systemConfig?.[name];

  const [isPending, startTransition] = useTransition();

  const [state, setState] = useState({});
  const [timeUnit, setTimeUnit] = useState({
    day: format(subDays(new Date(), 8), 'yyyy-MM-dd'), // subMonths() - 減月
    year: format(new Date(), 'yyyy'),
  });
  const [range, setRange] = useState('day');

  const { getDatas } = useHelpers({
    name,
    setState,
  });

  useEffect(() => {
    startTransition(async () => {
      await getDatas(timeUnit, range);
    });
  }, [timeUnit, range]);

  // 日期選擇器變更
  const onChange = (date, dateString) => {
    setTimeUnit((prev) => ({ ...prev, [range]: dateString }));
  };

  const handleSelectChange = (value) => {
    setRange(value);
  };

  return (
    <PageBox headerTitle={`${title}電費計算 ${titleEn}`}>
      <ScopeStyle>
        <Flex align="center" gap={12} wrap>
          <Select
            defaultValue="day"
            onChange={handleSelectChange}
            options={selectOptions}
            size="sm"
          />
          <DatePicker
            className="mg-t-20 mg-b-20"
            defaultValue={timeUnit[range]}
            onChange={onChange}
            picker={range}
            size="sm"
          />
        </Flex>
        <TransparentCard theme="dark">
          <Chart data={state?.chartData} isPending={isPending} name={name} />
        </TransparentCard>
        <Row className="mg-t-20" gutter={[24, 24]}>
          {configName &&
            configName.config.map((item, itemIndex) => (
              <Col
                key={`card_${itemIndex}`}
                lg={configName?.config.length > 3 ? 6 : 8}
                md={configName?.config.length > 3 && 12}
                xs={24}
              >
                <InfoCard
                  color={configName?.color}
                  icon={item.icon}
                  title={item.title}
                  value={state?.[item.name]}
                />
              </Col>
            ))}
        </Row>
      </ScopeStyle>
    </PageBox>
  );
};
