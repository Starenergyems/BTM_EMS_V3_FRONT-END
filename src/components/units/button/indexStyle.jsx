import styled from 'styled-components';
import { color } from '@/styles/variable/indexStyle';

const getVariantStyle = (variant) => {
  switch (variant) {
    case 'icon':
      return `
        width: auto;
        padding: 6px 8px;
        background: transparent !important;
        border: none;
        box-shadow: none;
        &:hover {
          background: transparent;
        }
      `;
    case 'default':
      return `
        color: ${color.white};
        background: ${color.buttonGray} !important;
        border: 0 !important;
      `;
    default:
      return '';
  }
};

const style = styled.div`
  .ant-btn {
    width: ${(props) => {
      switch (props.$size) {
        case 'xl':
          return '150px';
        case 'lg':
          return '120px';
        case 'md':
          return '98px';
        case 'sm':
          return '60px';
        default:
          return '100%';
      }
    }};
    --ant-color-primary: ${color.blueGray};
    --ant-color-primary-hover: ${color.hoverBlue};
    --ant-color-fill-secondary: ${color.buttonGray};
    transition: all 0.3s;
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
      background-color: ${color.buttonGray} !important;
      color: ${color.white} !important;
    }
    &.ant-btn-color-default {
      color: ${color.white};
      // background: ${color.buttonGray} !important;
      // border: 0 !important;

      &:hover {
        background: ${color.darkGray};
      }
    }
    &.ant-btn-color-dangerous {
      color: ${color.white} !important;
      background: ${color.red};


      &:hover {
        background: ${color.alertRed} !important;
      }
    }
    ${(props) => getVariantStyle(props.$variant)}

`;

export default style;
