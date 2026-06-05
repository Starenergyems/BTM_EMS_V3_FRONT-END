import styled from 'styled-components';
import { hexToRgba } from '@/styles/function';
import { color } from '@/styles/variable/indexStyle';

const style = styled.div`
  height: 100%;
  .ant-card {
    height: 100%;
    --ant-color-bg-container: ${(props) =>
      props.$theme === 'dark'
        ? `${hexToRgba(color.white, 0.1)}`
        : 'transparent'};
    --ant-color-border-secondary: transparent;
    --ant-border-radius-lg: 16px;
    --ant-color-text: #ffffff;
    --ant-card-body-padding: 0px;
    box-shadow: ${(props) =>
      props.$theme === 'dark'
        ? `0px 0px 10px 2px ${hexToRgba(color.black, 0.25)} inset`
        : `0px 0px 10px 2px ${hexToRgba(color.white, 0.25)} inset`};
  }
  .ant-card-body {
    height: 100%;
  }
`;

export default style;
