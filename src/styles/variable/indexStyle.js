import { css } from 'styled-components';
import { hexToRgba } from '../function';

const color = {
  white: '#ffffff',
  black: '#000000',
  // themeBlue: "#658393",
  themeBlue: '#607885',
  themeBlack: '#111525',
  themeDarkGray: '#2B3043',
  darkerGray: '#313131',
  darkGray: '#808080',
  semiDarkGray: '#A3A3A3',
  buttonGray: '#aeaeae',
  inputGray: '#d6d6d6',
  lightLegendGray: '#E5E5E5',
  legendGray: '#5E5E5E',
  darkLegendGray: '#7F7F7F ',
  gray: '#dee1e1',
  lightGray: '#eaeaea',
  red: '#ff5959',
  alertRed: '#ff0000',
  darkRed: '#D90E0E',
  darkBlue: '#002f70',
  darkerBlue: '#2B3043',
  blue: '#167BD9',
  midDarkBlue: '#2B3443',
  lightBlue: '#78d6ec',
  blueGray: '#5daacd',
  darkBlueGray: '#667A8A',
  darkerBlueGray: '#4e556f',
  lightBlueGray: '#414B5B',
  hoverBlue: '#036F9F',
  green: '#57C66B',
  lightGreen: '#6cf873',
  lighterGreen: '#21EF46',
  brightGreen: '#22F4E2',
  purple: '#ccabff',
  yellow: '#FFE2AE',
  warningYellow: '#FAAD14',
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
