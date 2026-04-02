import * as styled from 'styled-components';
import { color } from '@/styles/variable/indexStyle';
import { hexToRgba } from '@/styles/function';

//select下拉選單樣式
//發現createGlobalStyle不使用styled.createGlobalStyle的方式，prettier會沒效果
const GlobalStyle = styled.createGlobalStyle`
  [class*='css-var'] {
    &.ant-select-dropdown {
      --ant-color-text: ${color.themeBlack};
    }
  }
`;
//select主樣式
const ScopeStyle = styled.styled.div`
width: ${(props) => {
  switch (props.$size) {
    case 'full':
      return '100%';
    case 'lg':
      return '320px';
    case 'md':
      return '256px';
    case 'sm':
      return '218px';
    default:
      return '256px';
  }
}};
  [class*="css-var"] {
    --ant-color-text: ${color.inputGray};
    --ant-color-text-quaternary: ${color.themeBlack};
    --ant-color-text-disabled: ${color.darkGray};
    --ant-color-bg-container-disabled: ${color.inputGray};
    --ant-color-text-placeholder: ${color.inputGray};
    --ant-input-input-font-size: 16px;
    --ant-padding-xxs: 8px;
    --ant-padding-xs: 12px;
    --ant-padding-sm: 16px;
    --ant-padding: 20px;
    --ant-padding-md: 24px;
    --ant-padding-lg: 32px;
    --ant-padding-xl: 48px;

    &.ant-select {
      width:100%;
      --ant-select-active-border-color: ${color.white};
      --ant-select-hover-border-color: ${color.white};

      .ant-select-selector {
        --ant-border-radius: 8px;
        background: transparent;
      }
      .ant-select-arrow{
        background: #fff;
        height: 100%;
        width: 40px;
        display: flex;
        justify-content: center;
        right: 0;
        top: 0;
        margin: 0;
        overflow: hidden;
        border-radius: 0 8px 8px 0;
      }
    }
  }
  .ant-select-show-search {
    &.ant-select-focused {
      color: ${color.white};
    }
    .ant-select-arrow {
      

      > [role="img"] {
        border: 10px solid ${color.white};
        border-radius: 0 8px 8px 0;

        > svg {
          fill: var(--ant-color-text);
          background-color: ${color.white};
        }
      }
    }
    .ant-select-selector {
    --ant-color-text: ${color.white};

    &:has(.ant-select-selection-search) {
      background-color: ${color.themeBlack};

      .ant-select-selection-placeholder {
        color: ${color.inputGray};
      }
    }
    input {
      &.ant-select-selection-search-input {
        color: ${color.white};
      }
      &::placeholder {
        color: ${color.buttonGray};
        font-weight: 300;
      }
    }
  }
  }
  .ant-select-clear {
    transform: scale(1.3) translateX(3px);
  }
  .ant-form-item-explain-error {
    margin-left: 8px;
    color: ${color.alertRed};
  }
  .ant-select-selection-placeholder {
    font-family: var(--font-family);
    font-size: var(--ant-input-input-font-size);
  }
  /* theme */
  ${(props) => {
    if (props?.$themecategory === 'circle-light') {
      return styled.css`
        .ant-select {
          position: relative;

          .ant-select-selector {
            border-radius: 25px;
            box-shadow: inset 0 3px 5px #c1c1c1;
          }
          .ant-select-arrow {
            &::before {
              content: '';
              position: absolute;
              right: 3px;
              top: 50%;
              transform: translateY(-50%);
              width: 0px;
              height: 0px;
              border-style: solid;
              border-width: 6px 6px 0px;
              border-color: ${color.buttonGray} transparent transparent;
              display: block;
            }
            svg {
              display: none;
            }
          }
        }
      `;
    }
  }}
  @media (max-width: 576px) {
    width: 100%;
  }
`;

export { GlobalStyle, ScopeStyle };
