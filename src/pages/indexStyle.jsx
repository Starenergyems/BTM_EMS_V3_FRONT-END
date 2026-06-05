import styled from 'styled-components';
import { color } from '@/styles/variable/indexStyle';

const style = styled.div`
  .logo-container {
    text-align: center;
    cursor: pointer;

    .img-logo {
      height: 48px;
    }
    .img-logo-with-word {
      height: 63px;
    }
  }

  .ant-layout {
    overflow-x: hidden;
    .ant-layout-sider-children {
      .other-container {
        margin-top: auto;
        margin-bottom: 1vw;

        .ant-menu-title-content {
          border-bottom: 0;
        }
        .ant-menu-item,
        .ant-menu-submenu {
          &::after {
            display: none;
          }
        }
      }
    }
  }

  .ant-layout.layout-cotent {
    background: var(--layout-background) !important;
    margin-inline-start: 80px;
    min-height: 100vh;
    &.no-side-bar {
      margin-inline-start: 0;
    }
  }
  .main-menu {
    overflow: auto;
    height: 100vh;
    position: fixed;
    inset-inline-start: 0;
    top: 0;
    bottom: 0;
    scrollbar-width: 'thin';
    scrollbar-gutter: 'stable';
    z-index: 999;
  }
  .ant-layout-sider-children {
    .ant-menu {
      

      .ant-menu-item {
        .icon-important-info {
          transform: scale(1.15);
        }
        .icon-shutdown {
          + .ant-menu-title-content {
            color: ${color.red};
          }
        }
      }
    }
  }
  .ant-layout-sider {
    &.ant-layout-sider-collapsed {
      .ant-menu-item {
        //因此icon與其他icon大小不相同，因此客製調整
        .icon-important-info {
          transform: scale(1.15);
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 5px;
            height: 5px;
            background: ${color.red};
            position: absolute;
          }
        }
      }
    }
  }

  [class*='css-var'] {
    .ant-badge {
      --ant-badge-dot-size: 10px;

      display: flex;
      justify-content: center;
    }
  }
`;

export default style;
