import styled from 'styled-components';
import { hexToRgba } from '@/styles/function';
import { color } from '@/styles/variable/indexStyle';

const style = styled.div`
  .calendar-wrap {
    max-width: 1680px;
    width: 90vw;
    margin: 40px auto 20px !important;
    padding: 0 32px;
  }
  .ant-card {
    background-color: ${color.lightGray};
  }

  .rbc-month-view,
  .rbc-off-range-bg,
  .rbc-time-view,
  .rbc-agenda-view {
    background-color: ${color.white};
    color: ${color.themeBlack};
  }

  .rbc-toolbar {
    margin-bottom: 20px;
  }

  .rbc-off-range-bg {
    position: relative;
    color: ${color.buttonGray};
    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      z-index: 5;
      background-color: ${hexToRgba(color.white, 0.5)};
    }
  }

  .rbc-toolbar {
    margin-bottom: 20px;

    .rbc-btn-group {
      background-color: ${color.buttonGray};
      border-radius: 6px;
      button {
        color: ${color.white} !important;
        &:focus,
        &:hover {
          background-color: ${color.buttonGray};
        }
      }
    }

    // 所有按鈕的共用樣式
    .rbc-btn-group {
      button {
        border: 0;

        &:hover {
          background-color: transparent;
        }
        &.rbc-active {
          background-color: ${color.blue};
          border-radius: 8px !important;
          &:hover,
          &:focus {
            background-color: ${color.blue};
          }
        }
      }
    }
  }
  .rbc-event {
    border-radius: 0;
    font-size: clamp(12px, 0.8vw, 14px);
    text-align: center;
  }

  .rbc-toolbar-label {
    color: ${color.themeBlack};
    font-size: clamp(20px, 2.5vw, 32px);
  }

  .rbc-agenda-content {
    color: #fff;
  }
  @media screen and (max-width: 990px) {
    .ant-card-body {
      padding: 38px 20px 60px 20px;
    }
    .rbc-toolbar {
      flex-direction: column;
    }
  }

  @media screen and (max-width: 576px) {
    .calendar-wrap {
      width: 100%;
      padding: 0 12px;
    }
  }
`;

export default style;
