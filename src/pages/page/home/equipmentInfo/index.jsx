import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import HomeBox from '@/components/units/homeBox';
import Typography from '@/components/units/typography';
import { Col, Flex, Row, Tabs } from 'antd';
import EquipmentBarChart from './equipmentBarChart/index';
import EquipmentPieChart from './equipmentPieChart/index';
import { equipmentInfoDatas } from './indexConfig';
import ScopeStyle from './indexStyle';

function EquipmentInfo({ data, isPending }) {
  const [electricityType, setElectricityType] = useState('bill'); // 累積電費 or 用電佔比
  const [powerType, setPowerType] = useState('powerSupply'); // 供電 or 用電

  const handleElectricityTypeChange = (key) => {
    setElectricityType(key);
  };

  const handlePowerTypeChange = (key) => {
    setPowerType(key);
  };

  const BarChart = () => {
    return (
      <EquipmentBarChart
          data={data}
          isPending={isPending}
          type={electricityType}
        />
    )
  }

  const PieChart = () => {
    return <EquipmentPieChart data={data} type={powerType} />;
  }

  const items = [
    {
      children: BarChart(),
      key: 'bill',
      label: '累積電費',
    },
    {
      children: BarChart(),
      key: 'percentage',
      label: '用電佔比 / 用電度數',
    },
  ];
  const items2 = [
    {
      children: PieChart(),
      key: 'powerSupply',
      label: '供電',
    },
    {
      children: PieChart(),
      key: 'power',
      label: '用電',
    },
  ];
  return (
    <ScopeStyle>
      <HomeBox title="設備資訊">
        <Row align="center" gutter={[8, 24]}>
          <Col lg={16} xs={24}>
            <Tabs
              defaultActiveKey="bill"
              items={items}
              onChange={handleElectricityTypeChange}
              type="card"
            />
          </Col>
          <Col lg={8} xs={24}>
            <Tabs
              defaultActiveKey="powerSupply"
              items={items2}
              onChange={handlePowerTypeChange}
              type="card"
            />
          </Col>
        </Row>
        <Row className="mg-t-5" gutter={[8, 8]}>
          {equipmentInfoDatas?.map((equipment, index) => (
            <Col
              className="equipmentInfo-item"
              key={`${equipment.name}_${index}`}
              md={12}
              xs={24}
              xxl={8}
            >
              <Row>
                <Col xs={10}>
                  <Flex align="center" gap={8}>
                    {equipment.title && (
                      <Icon
                        color={equipment.color}
                        fontSize={16}
                        icon="material-symbols-light:circle"
                      />
                    )}
                    <Typography size="sm">{equipment.title}</Typography>
                  </Flex>
                </Col>

                {equipment?.[electricityType]?.map((type, idx) => (
                  <Col
                    key={`${type.name}_${idx}`}
                    xs={
                      equipment?.[electricityType]?.length > 1 && idx === 0
                        ? 6
                        : idx === 1
                          ? 8
                          : 12
                    }
                  >
                    <Typography color={equipment.color} size="sm">
                      {data?.[type.name] || '--'}
                      <span className="pd-l-4">
                        {data?.[type.name] && data?.[type.name] !== ''
                          ? type.unit
                          : ''}
                      </span>
                    </Typography>
                  </Col>
                ))}
              </Row>
            </Col>
          ))}
        </Row>
      </HomeBox>
    </ScopeStyle>
  );
}

export default EquipmentInfo;
