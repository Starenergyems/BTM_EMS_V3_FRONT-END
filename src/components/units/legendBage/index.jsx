import ScopeStyle from './indexStyle';
import { color } from '@/styles/variable/indexStyle';
import { Flex } from 'antd';

function LegendBage({ item, onClick, variant, size, active = false }) {
  return (
    <ScopeStyle $variant={variant} $size={size} $colors={item?.bgColor}>
      <Flex
        align="center"
        className={`legend-item ${active ? ' active' : ''}`}
        key={item.name}
        onClick={onClick}
        gap={8}
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
