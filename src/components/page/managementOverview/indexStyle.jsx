import styled from 'styled-components';
import { hexToRgba } from '@/styles/function';
import { color } from '@/styles/variable/indexStyle';

const style = styled.div`
  margin: 35px 0 0 0;
  .ant-tabs-nav {
    --ant-line-width-bold: 0;
  }
  .ant-tabs-tab {
    padding: 12px 24px;
    margin: 0 !important;
    &.ant-tabs-tab-active {
      background: ${color.themeBlack};
      border-radius: 16px 16px 0 0;
    }
  }
  .ant-tabs-content {
    min-height: calc(100vh - 190px);
  }
  @media (max-width: 800px) {
    .edit-column {
      position: relative;
      z-index: 999;
      background-color: ${hexToRgba(color.midDarkBlue, 1)};
      &:hover {
        background-color: ${hexToRgba(color.midDarkBlue, 1)} !important;
      }
    }
  }
`;

export default style;
