import { useState } from 'react';
import HomeBox from '@/components/units/homeBox';
import { Flex, Row, Col, Tabs } from 'antd';
import ScopeStyle from './indexStyle';
import Typography from '@/components/units/typography';
import EquipmentBarChart from './equipmentBarChart/index';
import EquipmentPieChart from './equipmentPieChart/index';
import { Icon } from '@iconify/react/dist/iconify.js';
import { equipmentInfoDatas } from './indexConfig';

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
          type={electricityType}
          data={data}
          isPending={isPending}
        />
    )
  }

  const PieChart = () => {
    return <EquipmentPieChart type={powerType} data={data} />;
  }

  const items = [
    {
      key: 'bill',
      label: '累積電費',
      children: BarChart(),
    },
    {
      key: 'percentage',
      label: '用電佔比 / 用電度數',
      children: BarChart(),
    },
  ];
  const items2 = [
    {
      key: 'powerSupply',
      label: '供電',
      children: PieChart(),
    },
    {
      key: 'power',
      label: '用電',
      children: PieChart(),
    },
  ];
  return (
    <ScopeStyle>
      <HomeBox title="設備資訊">
        <Row align="center" gutter={[8, 24]}>
          <Col xs={24} lg={16}>
            <Tabs
              defaultActiveKey="bill"
              type="card"
              items={items}
              onChange={handleElectricityTypeChange}
            />
          </Col>
          <Col xs={24} lg={8}>
            <Tabs
              defaultActiveKey="powerSupply"
              type="card"
              items={items2}
              onChange={handlePowerTypeChange}
            />
          </Col>
        </Row>
        <Row className="mg-t-5" gutter={[8, 8]}>
          {equipmentInfoDatas?.map((equipment, index) => (
            <Col
              key={`${equipment.name}_${index}`}
              xs={24}
              md={12}
              xxl={8}
              className="equipmentInfo-item"
            >
              <Row>
                <Col xs={10}>
                  <Flex align="center" gap={8}>
                    {equipment.title && (
                      <Icon
                        icon="material-symbols-light:circle"
                        fontSize={16}
                        color={equipment.color}
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
                    <Typography size="sm" color={equipment.color}>
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
