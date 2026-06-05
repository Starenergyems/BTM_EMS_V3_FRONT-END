import { Icon } from '@iconify/react';
import HomeBox from '@/components/units/homeBox';
import Typography from '@/components/units/typography';
import { Col, Flex, Row } from 'antd';
import { equipmentDatas } from './indexConfig';
import ScopeStyle from './indexStyle';
import { color } from '@/styles/variable/indexStyle';

function EquipmentConfiguration({ data }) {
  return (
    <ScopeStyle>
      <HomeBox title="設備配置">
        <Row className="equipment-configuration-box" gutter={[20, 20]}>
          {equipmentDatas.map((equipment, index) => (
            <Col key={`${equipment.name}_${index}`} md={equipment.col} xs={24}>
              <div className="equipment-header">
                <Flex align="center" gap={8}>
                  <Icon fontSize={equipment.iconSize} icon={equipment.icon} />
                  <Typography size="lg">{equipment.title}</Typography>
                </Flex>
              </div>

              <Row
                className="equipment-content-box"
                gutter={[0, 12]}
                wrap={false}
              >
                {equipment?.children &&
                  equipment.children.map((child, childIndex) => (
                    <Col
                      className="equipment-content"
                      key={`${child.name}_${childIndex}`}
                    >
                      <Typography color={color.lightBlue} size="xl">
                        {data?.[child.name] ?? '--'} {child.unit}
                      </Typography>
                      <Typography size="xl">{child.title}</Typography>
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

export default EquipmentConfiguration;
