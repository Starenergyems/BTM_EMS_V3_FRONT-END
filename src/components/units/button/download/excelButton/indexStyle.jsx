import styled from 'styled-components';
import { color } from '@/styles/variable/indexStyle';

const style = styled.div`
  width: 144px;
  height: 36px;

  button {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    background: #185c37;
    color: ${color.white};
    font-size: 20px;
    font-weight: 500;
    border: none;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      background: #57c66b;
    }
    &:disabled {
      cursor: not-allowed;
    }
  }

  svg {
    position: absolute;
    left: -18px;
    bottom: -2px;
  }
`;

export default style;
