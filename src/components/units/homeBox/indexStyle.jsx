import styled from 'styled-components';
import { hexToRgba } from '@/styles/function';
import { color } from '@/styles/variable/indexStyle';

const style = styled.div`
  .home-box {
    max-width: 100%;
    height: 32px;
    border-bottom: 1px solid ${color.white};
    h2 {
      margin: 0;
    }
    .title {
      position: relative;
      bottom: 3px;
      display: inline-block;
      padding: 0 18px;
      text-align: center;
      background-color: ${hexToRgba(color.blueGray, 0.5)};
      &::before,
      &::after {
        content: '';
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
        z-index: 1;
        top: 0;
      }
      &::before {
        border-width: 0 20px 34px 0;
        border-color: transparent transparent ${hexToRgba(color.blueGray, 0.5)}
          transparent;
        position: absolute;
        left: -20px;
        transform: rotate(180deg);
      }
      &::after {
        border-width: 0 20px 34px 0;
        border-color: transparent transparent ${hexToRgba(color.blueGray, 0.5)}
          transparent;
        position: absolute;
        right: -20px;
      }
    }
  }
`;

export default style;
