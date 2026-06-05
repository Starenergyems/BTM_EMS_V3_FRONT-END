import styled from 'styled-components';
import { hexToRgba } from '@/styles/function';
import { color } from '@/styles/variable/indexStyle';

const style = styled.div`
  padding: 14px;
  border-radius: 16px;
  background-color: ${color.themeBlack};
  .item-box {
    display: flex;
    justify-content: space-between;
    padding: 0 12px;
  }
  .item-label {
    display: flex;
    align-items: center;
    gap: 18px;
  }

  .item-value {
    padding: 14px;
    border-radius: 4px;
    background-color: ${hexToRgba(color.midDarkBlue, 0.8)};
    margin-bottom: 15px;
  }
`;

export default style;
