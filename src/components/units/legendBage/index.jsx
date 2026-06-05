import { Flex } from 'antd';
import ScopeStyle from './indexStyle';
import { color } from '@/styles/variable/indexStyle';

function LegendBage({ active = false, item, onClick, size, variant }) {
  return (
    <ScopeStyle $colors={item?.bgColor} $size={size} $variant={variant}>
      <Flex
        align="center"
        className={`legend-item ${active ? ' active' : ''}`}
        gap={8}
        key={item.name}
        onClick={onClick}
      >
        <span
          className="legend-stick"
          style={{
            backgroundColor: item?.isGradient ? color.gray : item?.bgColor,
          }}
        ></span>
        <span
          style={{
            opacity: item?.title ? 1 : 0.3,
            whiteSpace: 'nowrap',
          }}
        >
          {item?.title}
        </span>
      </Flex>
    </ScopeStyle>
  );
}

export default LegendBage;
