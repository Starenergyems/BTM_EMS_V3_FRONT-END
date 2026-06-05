import { css } from 'styled-components';
import { hexToRgba } from '../function';

const color = {
  alertRed: '#ff0000',
  black: '#000000',
  blue: '#167BD9',
  blueGray: '#5daacd',
  brightGreen: '#22F4E2',
  buttonGray: '#aeaeae',
  darkBlue: '#002f70',
  darkBlueGray: '#667A8A',
  darkerBlue: '#2B3043',
  darkerBlueGray: '#4e556f',
  darkerGray: '#313131',
  darkGray: '#808080',
  darkLegendGray: '#7F7F7F ',
  darkRed: '#D90E0E',
  gray: '#dee1e1',
  green: '#57C66B',
  hoverBlue: '#036F9F',
  inputGray: '#d6d6d6',
  legendGray: '#5E5E5E',
  lightBlue: '#78d6ec',
  lightBlueGray: '#414B5B',
  lighterGreen: '#21EF46',
  lightGray: '#eaeaea',
  lightGreen: '#6cf873',
  lightLegendGray: '#E5E5E5',
  midDarkBlue: '#2B3443',
  purple: '#ccabff',
  red: '#ff5959',
  semiDarkGray: '#A3A3A3',
  themeBlack: '#111525',
  // themeBlue: "#658393",
  themeBlue: '#607885',
  themeDarkGray: '#2B3043',
  warningYellow: '#FAAD14',
  white: '#ffffff',
  yellow: '#FFE2AE',
};

const absoluteCenter = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const lightStatus = css`
  display: inline-block;
  border-radius: 50%;
  border: 1px solid ${color.white};
  width: 14px;
  height: 14px;
`;
const sectionStitle = css`
  .section-title {
    border-bottom: 1px solid ${color.white};
    margin-left: 34px;
    margin-top: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${color.white};

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: ${color.white};
      font-weight: normal;
      margin: 0;
      background-color: ${hexToRgba(color.blueGray, 0.6)};
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 0 20px;
      min-width: 181px;
      position: relative;
      min-height: 34px;
      line-height: 1;

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
        border-width: 0 34px 2.15rem 0;
        border-color: transparent ${hexToRgba(color.blueGray, 0.6)} transparent
          transparent;
        position: absolute;
        left: -34px;
      }
      &::after {
        border-width: 0 34px 2.15rem 0;
        border-color: transparent transparent ${hexToRgba(color.blueGray, 0.6)}
          transparent;
        position: absolute;
        right: -34px;
      }
    }
  }
`;

export { absoluteCenter, color, lightStatus, sectionStitle };
