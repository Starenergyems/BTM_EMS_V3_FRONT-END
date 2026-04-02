import styled, { css } from 'styled-components';
import { color } from '@/styles/variable/indexStyle';

const commonStyle = css`
  width: 100%;
  padding-top: 6px;
  padding-bottom: 6px;
  font-family: var(--font-family);

  background-color: ${(props) => {
    switch (props.$bgColor) {
      case 'semitransparent':
        return 'rgba(255, 255, 255, 0.2)';

      default:
        return color.white;
    }
  }};
  border-color: ${(props) => props.$isInvalid && color.alertRed};
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);

  &:focus {
    box-shadow: none;
  }
  &::placeholder {
    color: ${color.buttonGray};
    font-weight: 300;
  }
`;
const style = styled.div`
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
  [class*='css-var'] {
    // --ant-border-radius: 25px;
    --ant-border-radius: 8px;
    border-color: ${(props) =>
    props.$isInvalid ? color.alertRed : color.semiDarkGray};

    &.ant-picker {
      --ant-color-text: ${color.inputGray};
      --ant-color-border: ${color.semiDarkGray};
      --ant-color-bg-container-disabled: ${color.inputGray};
      --ant-color-text-disabled: ${color.darkGray};
      --ant-input-input-font-size: 16px;
      --ant-input-input-font-size-sm: 16px;
      --ant-input-input-font-size-lg: 18px;
      --ant-line-height: 1;
      --ant-input-padding-inline: 16px;
      --ant-color-text-placeholder: ${color.buttonGray};
      ${commonStyle};
    }
    .ant-picker-suffix {
      color: ${color.buttonGray};
    }
    &.ant-input-affix-wrapper {
      ${commonStyle};
      border-radius: var(--ant-border-radius);
      width: 100%;
    }
  }
  .ant-form-item-explain-error {
    margin-left: 10px;
    color: ${color.alertRed};
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

export default style;
