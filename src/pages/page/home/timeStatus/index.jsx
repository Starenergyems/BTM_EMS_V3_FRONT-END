import { Flex } from 'antd';
import { formatTimestamp } from '@/utils/format';
import { format } from 'date-fns';
import Typography from '@/components/units/typography';
import { statusData } from './indexConfig';
import ScopeStyle from './indexStyle';

function TimeStatus({ data }) {
  const formattedDate = data
    ? formatTimestamp(data)
    : format(new Date(), 'yyyy-MM-dd HH:mm:ss');

  return (
    <ScopeStyle>
      <Flex
        justify="space-between"
        align="end"
        wrap
        gap={8}
        style={{ height: '32px' }}
      >
        <Typography className="updatge-time" size="sm">
          最後更新時間：{formattedDate}
        </Typography>
        <Flex className="status-wrap" gap={8} wrap>
          {statusData.map((item, index) => (
            <Flex key={index} align="center" gap={8}>
              {item.icon}
              <Typography size="sm">{item.title}</Typography>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </ScopeStyle>
  );
}

export default TimeStatus;
