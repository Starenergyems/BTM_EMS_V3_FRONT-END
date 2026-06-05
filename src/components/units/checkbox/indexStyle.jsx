import styled, { css } from "styled-components";
import { Checkbox } from "antd";
import { color } from "@/styles/variable/indexStyle";

const commonStyle = css`
  --ant-color-primary: #1890ff;

  &.ant-checkbox-wrapper,
  .ant-checkbox-wrapper {
    &:hover {
      .ant-checkbox-inner {
        --ant-color-border: ${color.darkGray};
        border-color: ${color.darkGray};
      }
    }
    .ant-checkbox-inner {
      --ant-color-border: ${(props) =>
        props.$isInvalid ? color.alertRed : color.darkGray};
    }
  }
`;
const CheckboxStyle = styled(Checkbox)`
  ${commonStyle}
`;
const CheckboxGroupStyle = styled(Checkbox.Group)`
  ${commonStyle}
`;

export { CheckboxGroupStyle, CheckboxStyle };
