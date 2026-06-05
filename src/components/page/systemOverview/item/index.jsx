import { Icon } from '@iconify/react';
import Typography from '@/components/units/typography';
import { statusData } from '@/pages/page/home/timeStatus/indexConfig';
import { Col, Row } from 'antd';
import { labelData } from './indexConfig';
import ScopeStyle from './indexStyle';
import { color } from '@/styles/variable/indexStyle';

export const Item = ({ data, icon }) => {
  const status = statusData.find((item) => item.status === data?.status);
  const statusColor = status.status > 0 ? status.color : color.lightBlue;
  return (
    <ScopeStyle>
      <div className="item-box">
        <div className="item-label">
          <Icon color={statusColor} fontSize="30" icon={icon} />
          <Typography size="lg">{data?.name}</Typography>
        </div>
        <Typography color={statusColor} size="lg">
          {status?.title_cn || '正常'}
        </Typography>
      </div>
      <div className="mg-t-20">
        {labelData?.map((label) => (
          <Row align="middle" className="item-value" key={label.name}>
            <Col offset={3} span={6}>
              <Typography size="lg">{label.title}</Typography>
            </Col>
            <Col offset={2} span={4}>
              <Typography color={statusColor} size="lg">
                {data?.[label.name] || '--s'}
              </Typography>
            </Col>
            <Col offset={4} span={4}>
              <Typography size="lg">{label.unit}</Typography>
            </Col>
          </Row>
        ))}
      </div>
    </ScopeStyle>
  );
};
