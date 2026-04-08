import styled from 'styled-components';
import { color } from '@/styles/variable/indexStyle';

const style = styled.div`
  [class*='css-var'] {
    --ant-border-radius: ${(props) => (props.$frame ? '50px' : '8px')};
    border-color: ${(props) =>
      props.$isInvalid ? color.alertRed : color.semiDarkGray};
    border: ${(props) => (props.$frame ? '0px solid' : '1px solid')};

    &.ant-input-affix-wrapper {
      border-radius: var(--ant-border-radius);
      width: 100%;
    }
    &.ant-picker {
      --ant-color-border: ${color.semiDarkGray};
    }
  }
`;

export default style;
