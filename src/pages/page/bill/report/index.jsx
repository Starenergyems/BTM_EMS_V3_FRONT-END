import { useEffect, useState, useTransition } from 'react';
import { format } from 'date-fns';
import { PageBox } from '@/components/units';
import { Select } from '@/components/units';
import { ExcelButton } from '@/components/units/button/download/excelButton';
import DatePicker from '@/components/units/datePicker';
import TransparentCard from '@/components/units/transparentCard';
import Typography from '@/components/units/typography';
import { pagesPathName } from '@/router';
import { Col, Flex, Row } from 'antd';
import { Chart } from './chart/index';
import { config } from './chart/indexConfig';
import { selectOptions, totalConfig } from './indexConfig';
import { useHelpers } from './indexHelper';
import { ReportTable } from './table/index';
import ScopeStyle from '../indexStyle';
import Style from './indexStyle';
import { color } from '@/styles/variable/indexStyle';

function Report() {
  const routeName = pagesPathName.bill.report.pathName;

  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState({});
  const [timeUnit, setTimeUnit] = useState({
    day: format(new Date(), 'yyyy-MM-dd'),
    month: format(new Date(), 'yyyy-MM'),
    year: format(new Date(), 'yyyy'),
  });
  const [range, setRange] = useState('day');

  const { exportToExcelChartHandler, getDatas } = useHelpers({
    range,
    setState,
  });

  useEffect(() => {
    startTransition(async () => {
      await getDatas(timeUnit);
    });
  }, [range, JSON.stringify(timeUnit)]); // 當 range 或 timeUnit 變化時重新獲取資料

  // 日期選擇器變更
  const onChange = (date, dateString) => {
    setTimeUnit((prev) => ({ ...prev, [range]: dateString }));
  };

  const handleSelectChange = (value) => {
    setRange(value);
  };
  return (
    <PageBox headerTitle={`${routeName} Benefit Analysis`}>
      <ScopeStyle>
        <Style>
          <Flex
            align="center"
            className="mg-t-20 mg-b-20"
            gap={12}
            justify="space-between"
            md={{ wrap: 'row' }}
            wrap
          >
            <Flex align="center" gap={12} wrap>
              <Select
                defaultValue="day"
                onChange={handleSelectChange}
                options={selectOptions}
                size="sm"
              />
              <DatePicker
                defaultValue={timeUnit[range]}
                onChange={onChange}
                picker={range}
                size="sm"
              />
            </Flex>

            <ExcelButton
              disabled={state.data?.chartData?.length === 0}
              onClick={() =>
                exportToExcelChartHandler(
                  config?.legendNameMap,
                  state.data?.chartData,
                  state.data?.date,
                )
              }
            />
          </Flex>
          <TransparentCard theme="dark">
            <Chart data={state.data?.chartData} isPending={isPending} />
          </TransparentCard>
          <Row className="mg-y-20" gutter={[30, 30]}>
            {totalConfig.map((item) => (
              <Col key={item.name} lg={{ span: 8 }} span={24}>
                <Flex
                  align="center"
                  className="total-item"
                  direction="column"
                  justify="space-between"
                >
                  <Typography>{item.title}</Typography>
                  <Typography color={color.lightBlue} weight="600">
                    {state.data?.[item.name]}
                  </Typography>
                </Flex>
              </Col>
            ))}
          </Row>

          <ReportTable
            data={state.data?.chartData}
            date={state.data?.date}
            isPending={isPending}
            type={range}
          />
        </Style>
      </ScopeStyle>
    </PageBox>
  );
}

export default Report;
