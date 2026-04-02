import HomeBox from '@/components/units/homeBox';
import { Icon } from '@iconify/react';
import { color } from '@/styles/variable/indexStyle';
import { Flex, Row, Col } from 'antd';
import Typography from '@/components/units/typography';
import { equipmentDatas } from './indexConfig';
import ScopeStyle from './indexStyle';

function EquipmentConfiguration({ data }) {
  return (
    <ScopeStyle>
      <HomeBox title="設備配置">
        <Row className="equipment-configuration-box" gutter={[20, 20]}>
          {equipmentDatas.map((equipment, index) => (
            <Col key={`${equipment.name}_${index}`} xs={24} md={equipment.col}>
              <div className="equipment-header">
                <Flex align="center" gap={8}>
                  <Icon icon={equipment.icon} fontSize={equipment.iconSize} />
                  <Typography size="lg">{equipment.title}</Typography>
                </Flex>
              </div>

              <Row
                className="equipment-content-box"
                wrap={false}
                gutter={[0, 12]}
              >
                {equipment?.children &&
                  equipment.children.map((child, childIndex) => (
                    <Col
                      key={`${child.name}_${childIndex}`}
                      className="equipment-content"
                    >
                      <Typography size="xl" color={color.lightBlue}>
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
