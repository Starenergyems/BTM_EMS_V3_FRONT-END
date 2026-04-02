import styled from 'styled-components';
import { color } from '@/styles/variable/indexStyle';
import { hexToRgba } from '@/styles/function';

const style = styled.div`
  .legend-item {
    display: flex;
    justify-content: center;

    width: ${(props) => {
      switch (props.$size) {
        case 'md':
          return 'clamp(100px, 7vw, 114px)';

        default:
          return '114px';
      }
    }};
    height: 28px;
    border-radius: 8px;
    cursor: pointer;
    padding: 0px 8px;
    box-shadow: 0px 2px 10px ${hexToRgba(color.black, 0.25)};
    background-color: ${hexToRgba(color.themeDarkGray, 0.8)};

    &.active {
      background: ${color.legendGray};
      color: ${(props) => {
        return props.$colors || color.white;
      }};
      box-shadow: inset 0 2px 10px 2px ${hexToRgba(color.black, 0.5)};
    }
  }
  .legend-stick {
    width: 20px;
    height: 6px;
  }
`;

export default style;
