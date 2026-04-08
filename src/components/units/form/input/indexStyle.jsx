import styled, { css } from 'styled-components';
import { color } from '@/styles/variable/indexStyle';

const commonStyle = css`
  width: 100%;
  padding-top: 6px;
  padding-bottom: 6px;
  font-family: var(--font-family);
  // width: 120px;
  border-color: ${(props) => props.$isInvalid && color.alertRed};
  box-shadow: inset 0 3px 5px #c1c1c1;

  &:focus {
    box-shadow: none;
  }
  &::placeholder {
    color: ${color.buttonGray};
    font-weight: 300;
  }
`;
const style = styled.div`
  [class*='css-var'] {
    --ant-border-radius: 25px;

    &.ant-input {
      --ant-color-text: ${color.black};
      --ant-color-border: ${color.gray};
      --ant-color-bg-container-disabled: ${color.inputGray};
      --ant-color-text-disabled: ${color.darkGray};
      --ant-input-hover-border-color: ${color.darkGray};
      --ant-input-active-border-color: ${color.darkGray};
      --ant-input-input-font-size: 16px;
      --ant-input-input-font-size-sm: 16px;
      --ant-input-input-font-size-lg: 18px;
      --ant-line-height: 1;
      --ant-input-padding-inline: 16px;

      ${commonStyle};
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
  .input-container {
    position: relative;
    display: inline;
  }
  .input-unit,
  .input-pwd {
    display: flex;
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-45%);
    padding: 0px;
  }
`;

export default style;
