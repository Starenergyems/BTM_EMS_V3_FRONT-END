import styled from 'styled-components';
import { hexToRgba } from '@/styles/function';
import { color } from '@/styles/variable/indexStyle';

const style = styled.div`
  .total-item {
    padding: 12px;
    border-radius: 4px;
    background-color: ${hexToRgba(color.midDarkBlue, 0.8)};
  }
`;

export default style;
