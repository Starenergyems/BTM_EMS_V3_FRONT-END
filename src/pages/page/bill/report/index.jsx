import { useEffect, useState, useTransition } from 'react';
import { format } from 'date-fns';
import { color } from '@/styles/variable/indexStyle';
import { pagesPathName } from '@/router';
import { Flex, Row, Col } from 'antd';
import { PageBox } from '@/components/units';
import { Select } from '@/components/units';
import DatePicker from '@/components/units/datePicker';
import Typography from '@/components/units/typography';
import TransparentCard from '@/components/units/transparentCard';
import { Chart } from './chart/index';
import { ReportTable } from './table/index';
import ScopeStyle from '../indexStyle';
import Style from './indexStyle';
import { useHelpers } from './indexHelper';
import { selectOptions, totalConfig } from './indexConfig';
import { config } from './chart/indexConfig';
import { ExcelButton } from '@/components/units/button/download/excelButton';

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

  const { getDatas, exportToExcelChartHandler } = useHelpers({
    setState,
    range,
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
            className="mg-t-20 mg-b-20"
            align="center"
            justify="space-between"
            md={{ wrap: 'row' }}
            wrap
            gap={12}
          >
            <Flex align="center" wrap gap={12}>
              <Select
                size="sm"
                defaultValue="day"
                options={selectOptions}
                onChange={handleSelectChange}
              />
              <DatePicker
                size="sm"
                picker={range}
                defaultValue={timeUnit[range]}
                onChange={onChange}
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
              <Col lg={{ span: 8 }} span={24} key={item.name}>
                <Flex
                  className="total-item"
                  justify="space-between"
                  align="center"
                  direction="column"
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
            isPending={isPending}
            date={state.data?.date}
            type={range}
          />
        </Style>
      </ScopeStyle>
    </PageBox>
  );
}

export default Report;
