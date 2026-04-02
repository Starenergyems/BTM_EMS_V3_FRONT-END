import { Radio } from "antd";
import styled, { css } from "styled-components";
import { color } from "@/styles/variable/indexStyle";

const commonStyle = css`
  .ant-radio-inner {
    --ant-color-border: ${(props) =>
      props.$isInvalid ? color.alertRed : color.darkGray};
    --ant-radio-radio-bg-color: ${color.white};
    --ant-color-primary: ${color.darkGray};
    --ant-radio-radio-color: ${color.darkGray};
    --ant-radio-dot-size: 10;
  }
  + .ant-form-item-explain-error {
    color: ${color.alertRed};
  }
`;
const RadioStyle = styled(Radio)`
  ${commonStyle}
`;
const RadioGroupStyle = styled(Radio.Group)`
  ${commonStyle}
`;

export { RadioStyle, RadioGroupStyle };
