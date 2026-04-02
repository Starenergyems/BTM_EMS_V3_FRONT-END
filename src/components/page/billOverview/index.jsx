import { useState, useEffect, useTransition } from 'react';
import { format, subDays } from 'date-fns';
import { Row, Col, Flex } from 'antd';
import { PageBox } from '@/components/units';
import { Select } from '@/components/units';
import ScopeStyle from '../../../pages/page/bill/indexStyle';
import DatePicker from '@/components/units/datePicker';
import TransparentCard from '@/components/units/transparentCard';
import { Chart } from '@/components/page/billOverview/chart';
import { InfoCard } from '@/components/units/infoCard';
import { systemConfig, selectOptions } from './indexConfig';
import { useHelpers } from './indexHelper';

export const BillOverview = ({ title, titleEn, name }) => {
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
        <Flex align="center" wrap gap={12}>
          <Select
            size="sm"
            defaultValue="day"
            options={selectOptions}
            onChange={handleSelectChange}
          />
          <DatePicker
            className="mg-t-20 mg-b-20"
            size="sm"
            picker={range}
            defaultValue={timeUnit[range]}
            onChange={onChange}
          />
        </Flex>
        <TransparentCard theme="dark">
          <Chart name={name} data={state?.chartData} isPending={isPending} />
        </TransparentCard>
        <Row gutter={[24, 24]} className="mg-t-20">
          {configName &&
            configName.config.map((item, itemIndex) => (
              <Col
                key={`card_${itemIndex}`}
                xs={24}
                md={configName?.config.length > 3 && 12}
                lg={configName?.config.length > 3 ? 6 : 8}
              >
                <InfoCard
                  title={item.title}
                  value={state?.[item.name]}
                  icon={item.icon}
                  color={configName?.color}
                />
              </Col>
            ))}
        </Row>
      </ScopeStyle>
    </PageBox>
  );
};
