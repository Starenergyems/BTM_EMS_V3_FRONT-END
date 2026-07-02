import styled from 'styled-components';
import { Modal } from 'antd';
import { absoluteCenter, color } from '@/styles/variable/indexStyle';

const style = styled(Modal)`
  [class*='css-var'] {
    --ant-control-height: 36px;
    --ant-color-text: ${color.darkGray};
  }
  .ant-modal-content {
    --ant-modal-content-padding: 20px 0;
    --ant-modal-content-bg: ${color.lightGray};
    --ant-modal-title-color: ${color.themeBlack};
    border-radius: 20px;
    overflow: hidden;
    position: relative;

    .ant-modal-header {
      background-color: ${color.inputGray};
      margin-top: -20px;
      height: 60px;
      padding-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 0;
      margin-right: 0;

      .ant-modal-title {
        transform: translateY(-10px);
      }
    }
    .ant-modal-body {
      // min-height: 200px;
      overflow: auto;

      .form-box {
        max-height: 400px;
        padding-left: 16px;
        padding-right: 16px;
        padding-bottom: 8px;

        .ant-form {
          display: flex;
          justify-content: center;
          align-items: center;
          .ant-form-item {
            --ant-form-item-margin-bottom: 16px;
          }
          .ant-form-item-label {
            --ant-form-label-color: ${color.darkGray};

            .ant-form-item-required {
              display: block;

              &::before {
                display: none;
              }
            }
          }
        }
        .ant-form-item-control-input-content {
          .ant-input,
          .ant-select {
            width: 100%;
          }
        }
      }
    }

    .btn-cancel {
      button {
        border: 1px solid ${color.blueGray} !important;
      }
    }

    .ant-modal-footer {
      .ant-btn {
        --ant-color-primary-hover: #036f9f;
        --ant-color-primary: ${color.blueGray};
        --ant-color-primary-active: #036f9f;

        min-width: 98px;
        cursor: pointer;

        &.btn-cancel {
          --ant-color-primary: ${color.buttonGray};
          --ant-color-primary-hover: ${color.darkGray};
          --ant-color-primary-active: ${color.darkGray};
          --ant-button-default-hover-border-color: ${color.darkGray};
          --ant-button-default-hover-bg: ${color.darkGray};
          --ant-button-default-border-color: ${color.buttonGray};
          --ant-button-default-bg: ${color.buttonGray};
          --ant-button-default-border-color: ${color.buttonGray};
          --ant-button-default-active-color: ${color.white};
          --ant-button-default-active-bg: ${color.darkGray};
          --ant-button-default-active-border-color: ${color.buttonGray};

          &.ant-btn-outlined {
            border-color: inherit;

            &:hover {
              background-color: ${color.hoverBlue};
              color: ${color.white};
            }
          }
        }
        &.btn-none {
          display: none;
        }
      }
    }
  }
  .ant-spin {
    ${absoluteCenter}
  }
  .group-title-box {
    padding-left: 0 !important;
    padding-right: 0 !important;

    h3 {
      font-size: var(--ant-modal-title-font-size);
      font-weight: var(--ant-font-weight-strong);
      line-height: var(--ant-modal-title-line-height);
      background-color: ${color.inputGray};
      text-align: center;
    }
  }
  .custom-d-none {
    display: none;
  }
  .inner-wrap {
    max-width: 645px;
    min-width: 300px;
    width: 55vw;
  }
  /* 外部引用元件要寫的樣式 */
  ${(props) => props.$customStyle}

  .btn-close {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 2;
    .ant-btn {
      width: 32px !important;
      height: 32px;
      min-width: 32px;
      padding: 0;
      border: none;
      box-shadow: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: ${color.inputGray} !important;
      }

      svg {
        display: block;
      }
    }
  }
`;

export default style;
