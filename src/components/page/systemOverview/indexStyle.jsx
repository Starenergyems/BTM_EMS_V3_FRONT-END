import styled from 'styled-components';
import { color } from '@/styles/variable/indexStyle';
import { hexToRgba } from '@/styles/function';

const style = styled.div`
  padding: 0 56px;
  margin: 50px 0;

  .system-label {
    display: flex;
    justify-content: space-evenly;
    padding: 14px;
    background-color: ${hexToRgba(color.midDarkBlue, 0.8)};
    border-radius: 4px;
  }
  .status-value {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  @media (max-width: 1200px) {
    padding: 0 24px;
  }
`;

export default style;
