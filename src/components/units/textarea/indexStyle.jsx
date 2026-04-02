import styled from "styled-components";
import { color } from "@/styles/variable/indexStyle";

const style = styled.div`
  [class*="css-var"] {
    &.ant-input {
      --ant-border-radius: 15px;
      --ant-color-text: ${color.darkGray};
      --ant-color-border: ${color.gray};
      --ant-color-bg-container-disabled: ${color.inputGray};
      --ant-color-text-disabled: ${color.darkGray};
      --ant-input-input-font-size: 16px;
      --ant-input-input-font-size-sm: 16px;
      --ant-input-input-font-size-lg: 18px;
      --ant-line-height: 1;
      --ant-input-padding-inline: 16px;

      padding-top: 8px;
      padding-bottom: 8px;
      font-family: var(--font-family);
      width: 300px;
      border-color: ${(props) => props.$isInvalid && color.alertRed};
      resize: ${(props) => (props.$noResizeSetting ? "none" : "both")};
      box-shadow: inset 0 3px 5px #c1c1c1;

      &:focus {
        box-shadow: none;
      }
      &::placeholder {
        font-weight: 300;
        font-family: var(--font-family);
        font-size: 0.9rem;
        color: #cacaca;
      }
      &[disabled] {
        resize: none;
      }
    }
  }
  .ant-form-item-explain-error {
    margin-left: 10px;
    color: ${color.alertRed};
  }
`;

export default style;
