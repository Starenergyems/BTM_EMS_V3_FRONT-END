import { hexToRgba } from '@/styles/function';
import { color } from '@/styles/variable/indexStyle';
import styled, { css } from 'styled-components';

const style = styled.div`
  min-height: 100px;

  .category-box-header {
    background-image: ${`linear-gradient(180deg,${color.buttonGray},${color.white})`};
    color: ${color.themeBlack};
    font-size: 18px;
    position: relative;
    text-align: ${(props) => props.$headerTextAlign};
    z-index: 1;

    ${(props) => {
      switch (props.$themecategory) {
        case 'circle': {
          return css`
            border-radius: 18px;
          `;
        }
        default:
          return css`
            border-radius: 15px 15px 0 0;
          `;
      }
    }}
  }
  .category-box-body {
    box-shadow: ${(props) =>
      props.$isShowBorder &&
      `
    inset -5px 0px 5px ${hexToRgba(color.white, 0.5)},
      inset 5px 0px 5px ${hexToRgba(color.white, 0.5)},
      inset 0px -5px 5px ${hexToRgba(color.white, 0.5)}; 
    `};

    border-radius: 0 0 15px 15px;
    color: ${color.white};
    position: relative;
    z-index: 0;
    ${(props) => {
      if (props.$themecategory === 'circle') {
        return css`
          top: -20px;
          padding-top: 40px;
        `;
      }
    }}
  }
`;

export default style;
