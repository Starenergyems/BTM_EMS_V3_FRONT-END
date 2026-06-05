import { format } from 'date-fns';
import Typography from '@/components/units/typography';
import { formatTimestamp } from '@/utils/format';
import { Flex } from 'antd';
import { statusData } from './indexConfig';
import ScopeStyle from './indexStyle';

function TimeStatus({ data }) {
  const formattedDate = data
    ? formatTimestamp(data)
    : format(new Date(), 'yyyy-MM-dd HH:mm:ss');

  return (
    <ScopeStyle>
      <Flex
        align="end"
        gap={8}
        justify="space-between"
        style={{ height: '32px' }}
        wrap
      >
        <Typography className="updatge-time" size="sm">
          最後更新時間：{formattedDate}
        </Typography>
        <Flex className="status-wrap" gap={8} wrap>
          {statusData.map((item, index) => (
            <Flex align="center" gap={8} key={index}>
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
