import { Row, Col } from 'antd';
import { Icon } from '@iconify/react';
import { color } from '@/styles/variable/indexStyle';
import Typography from '@/components/units/typography';
import { statusData } from '@/pages/page/home/timeStatus/indexConfig';
import { labelData } from './indexConfig';
import ScopeStyle from './indexStyle';

export const Item = ({ icon, data }) => {
  const status = statusData.find((item) => item.status === data?.status);
  const statusColor = status.status > 0 ? status.color : color.lightBlue;
  return (
    <ScopeStyle>
      <div className="item-box">
        <div className="item-label">
          <Icon icon={icon} fontSize="30" color={statusColor} />
          <Typography size="lg">{data?.name}</Typography>
        </div>
        <Typography size="lg" color={statusColor}>
          {status?.title_cn || '正常'}
        </Typography>
      </div>
      <div className="mg-t-20">
        {labelData?.map((label) => (
          <Row key={label.name} className="item-value" align="middle">
            <Col span={6} offset={3}>
              <Typography size="lg">{label.title}</Typography>
            </Col>
            <Col span={4} offset={2}>
              <Typography size="lg" color={statusColor}>
                {data?.[label.name] || '--s'}
              </Typography>
            </Col>
            <Col span={4} offset={4}>
              <Typography size="lg">{label.unit}</Typography>
            </Col>
          </Row>
        ))}
      </div>
    </ScopeStyle>
  );
};
