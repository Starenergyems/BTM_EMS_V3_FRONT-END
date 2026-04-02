import styled from 'styled-components';
import { color } from '@/styles/variable/indexStyle';
import { hexToRgba } from '@/styles/function';

const style = styled.div`
  .header {
    display: inline-block;
    background-color: #d9d9d9;
    height: 36px;
    position: relative;
    margin-top: 70px;
    &::before {
      content: '';
      display: block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 36px 36px 0 0;
      border-color: #d9d9d9 transparent transparent transparent;
      position: absolute;
      right: -36px;
      top: 0;
      z-index: 1;
    }
  }
  .header-title {
    position: relative;
    display: flex;
    align-items: center;
    height: 50px;
    color: ${color.white};
    background-color: ${hexToRgba(color.blueGray, 0.5)};
    margin-left: clamp(20px, 10vw, 175px);
    min-width: 150px;
    margin-right: 33px;
    margin-top: -7px;
    padding: 0 12px;
    margin-bottom: 0px;
    font-size: clamp(20px, 1.2vw, 24px);
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
      border-width: 0 40px 50px 0;
      border-color: transparent transparent ${hexToRgba(color.blueGray, 0.5)}
        transparent;
      position: absolute;
      left: -40px;
      transform: rotate(180deg);
    }
    &::after {
      border-width: 0 40px 50px 0;
      border-color: transparent transparent ${hexToRgba(color.blueGray, 0.5)}
        transparent;
      position: absolute;
      right: -40px;
    }
  }
`;

export default style;
