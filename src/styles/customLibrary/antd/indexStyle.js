import { css } from 'styled-components';
import { color } from '@/styles/variable/indexStyle';
import { hexToRgba } from '@/styles/function';

/* Badge */
const badgeStyles = css`
  [class*='css-var'] {
    --ant-color-border-bg: transparent;
  }
`;
/* Button */
const buttonStyles = css`
  /* 自定義class
    className:
    1. theme-primary
    2. theme-gray
    3. theme-dark-blue-gray
  */
  [class*='css-var'] {
    .ant-btn,
    &.ant-btn {
      --ant-button-default-border-color: ${color.blueGray};
      --ant-button-default-bg: ${color.blueGray};
      --ant-button-default-color: ${color.white};
      --ant-button-default-active-bg: ${color.lightBlue};
      --ant-button-default-active-border-color: ${color.lightBlue};
      --ant-button-default-active-color: ${color.white};
      --ant-button-default-hover-color: ${color.white};
      --ant-button-default-hover-bg: ${color.lightBlue};
      --ant-button-default-hover-border-color: ${color.lightBlue};
      --ant-button-border-color-disabled: ${color.gray};
      --ant-button-default-border-color-disabled: ${color.gray};
      --ant-color-text-disabled: ${color.buttonGray};
      --ant-color-bg-container-disabled: ${color.gray};
      --ant-color-error-hover: var(--ant-color-error-active);
      --ant-border-radius: 25px;
      --ant-control-height: 36px;

      &[disabled] {
        opacity: 0.6;
      }
      &.ant-btn-variant-outlined {
        background-color: transparent;
      }
      /* theme */
      &.theme-primary {
        --ant-button-default-hover-border-color: ${color.lightBlue};
        --ant-button-default-hover-bg: ${color.lightBlue};
        --ant-button-default-color: ${color.white};
        --ant-button-default-bg: ${color.blueGray};
        --ant-button-default-border-color: ${color.blueGray};
        --ant-button-default-active-color: ${color.white};
        --ant-button-default-active-bg: ${color.lightBlue};
        --ant-button-default-active-border-color: ${color.lightBlue};
      }
      &.theme-gray {
        --ant-button-default-hover-border-color: ${color.darkGray};
        --ant-button-default-hover-bg: ${color.darkGray};
        --ant-button-default-bg: ${color.buttonGray};
        --ant-button-default-border-color: ${color.buttonGray};
        --ant-button-default-active-color: ${color.white};
        --ant-button-default-active-bg: ${color.darkGray};
        --ant-button-default-active-border-color: ${color.darkGray};
      }
      &.theme-dark-blue-gray {
        --ant-button-default-hover-border-color: ${color.darkGray};
        --ant-button-default-hover-bg: ${color.darkGray};
        --ant-button-default-bg: ${color.darkBlueGray};
        --ant-button-default-border-color: ${color.darkBlueGray};
        --ant-button-default-active-color: ${color.white};
        --ant-button-default-active-bg: ${color.darkGray};
        --ant-button-default-active-border-color: ${color.darkGray};
      }
    }
  }
`;
/* Card */
const cardStyles = css`
  [class*='css-var'] {
    .ant-card {
      --ant-color-bg-container: ${color.themeDarkGray};
      --ant-color-border-secondary: transparent;
      --ant-border-radius-xs: 4px;
      --ant-border-radius-sm: 8px;
      --ant-border-radius-lg: 12px;
      --ant-color-text: ${color.white};
    }
  }
`;
/* Common */
const commonStyles = css`
  [class*='css-var'] {
    --ant-color-error: ${color.red};
    --ant-font-family: var(--font-family);
    --ant-font-size: var(--font-size);
    --ant-color-link-hover: ${color.lightBlue};

    &.ant-layout {
      --ant-layout-body-bg: transparent;
    }
    a {
      --ant-color-link: ${color.blue};
    }
  }
`;

/* DatePicker */
const datePickerStyles = css`
  [class*='css-var'] {
    --ant-color-primary: ${color.lightBlue};
    --ant-color-link: ${color.lightBlue};
    --ant-color-text-placeholder: ${hexToRgba('#000', 0.35)};

    .ant-picker {
      box-shadow: inset 0 3px 5px #c1c1c1;
      padding-left: 16px;
      padding-right: 16px;
      height: 32px;
    }
    .ant-picker-input {
      > input {
        &::placeholder {
          font-size: 16px;
        }
      }
    }
  }
  /* theme */
  .ant-picker {
    &.theme-circle {
      --ant-border-radius: 25px;
    }
  }
`;
/* DatePicker.RangePicker */
const datePickerRangePickerStyles = css`
  [class*='css-var'] {
    .ant-picker-range {
      box-shadow: inset 0 3px 5px #c1c1c1;
      width: 100%;
    }
  }
  /* theme */
  .ant-picker-range {
    &.theme-circle {
      --ant-border-radius: 25px;
    }
  }
`;
/* Empty */
const emptyStyles = css`
  [class*='css-var'] {
    .ant-empty {
      --ant-color-text-description: ${color.inputGray};
    }
  }
`;
/* Form */
const formStyles = css`
  .ant-form {
    .ant-form-item-control-input {
      &:has(input) {
        + div {
          .ant-form-item-explain-error {
            margin-left: 10px;
          }
        }
      }
    }
  }
  .ant-form-item-explain-error {
    font-size: 14px;
  }
`;
/* Layout */
const layoutStyles = css`
  .ant-layout-sider {
    padding-top: 20px;
    box-shadow: 0px 4px 10px 5px rgba(255, 255, 255, 0.25);
    && {
      --ant-layout-sider-bg: ${color.themeDarkGray};
    }
    &.ant-layout-sider-collapsed {
      .ant-menu-item {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .ant-menu-title-content {
        visibility: hidden;
        position: absolute;
      }
      .ant-menu-submenu {
        &::after {
          visibility: hidden;
        }
      }
    }
  }
  .ant-layout-sider-children {
    overflow-x: hidden;
    // padding-right: 6px;
    &::before {
      // content: "";
      display: block;
      height: 100%;
      width: 6px;
      background-image: linear-gradient(90deg, #5d5f66a1, ${color.themeBlack});
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .ant-layout-sider-trigger {
    --ant-layout-trigger-bg: #181a25;
  }
`;
/* Menu */
const menuStyles = css`
  [class*='css-var'] {
    .ant-menu {
      --ant-menu-dark-popup-bg: ${color.themeDarkGray};
      --ant-menu-dark-item-bg: ${color.themeDarkGray};
      --ant-menu-dark-item-hover-color: ${color.lightBlue};
      --ant-menu-collapsed-icon-size: 40px;
      --ant-menu-icon-size: 40px;
      --ant-menu-dark-item-hover-bg: ${color.darkerBlueGray};

      &.ant-menu-sub {
        --ant-menu-dark-item-selected-color: ${color.inputGray};

        margin-left: 2px;
        box-shadow: 0px 3px 10px #161616;
      }
    }
  }
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;

    .ant-menu {
      .ant-menu-item,
      .ant-menu-submenu {
        position: relative;

        margin-bottom: 30px;
        overflow: visible;

        &::after {
          content: '';
          position: absolute;
          left: 80px;
          bottom: -15px;
          display: block;
          width: 100px;
          border-bottom: 1px solid ${color.white};
        }
        &:last-child {
          &::after {
            display: none;
          }
        }
        svg {
          color: ${color.inputGray};
        }
        .ant-menu-title-content {
          font-size: 20px;
          color: ${color.white};
          margin-left: 20px;
        }
      }

      .ant-menu-submenu {
        --ant-menu-item-border-radius: 0;

        &.ant-menu-submenu-vertical {
          // --ant-menu-icon-margin-inline-end: 20px;
        }
        .ant-menu-submenu-title {
          display: flex;
          align-items: center;
        }
        .ant-menu-title-content {
          flex: none;
          display: inline-block;
          width: 75px;
        }
        .ant-menu-submenu-arrow {
          display: none;
        }
      }
      .ant-menu-item {
        --ant-menu-dark-item-selected-bg: transparent;
        --ant-menu-item-border-radius: 0;
        --ant-menu-dark-item-selected-color: ${color.inputGray};
        --ant-menu-item-margin-block: 10px;

        display: flex;
        align-items: center;

        &:last-of-type {
          .ant-menu-title-content {
            border-bottom: 0;
          }
        }
        .ant-menu-title-content {
          // --ant-menu-icon-margin-inline-end: 20px;

          flex: none;
          display: inline-block;
          width: 75px;
        }
      }
    }
  }
  .ant-menu-submenu {
    // --ant-menu-dark-item-selected-color: ${color.inputGray};
    --ant-menu-dark-item-selected-color: ${color.white};

    .ant-menu-item {
      --ant-menu-dark-item-selected-bg: transparent;
      --ant-menu-dark-item-hover-bg: ${color.darkerBlueGray};

      &:hover {
        background-color: var(--ant-menu-dark-item-hover-bg);
      }
    }
  }
  .ant-menu-submenu-popup {
    .ant-menu-item {
      width: 100% !important;
      margin: 0 !important;
      color: ${color.white} !important;
      font-size: 20px;
      &:hover {
        border-radius: 8px;
        color: ${color.lightBlue} !important;
      }
    }
  }
`;
/* Modal */
const modalStyles = css`
  .ant-modal-content {
    --ant-modal-content-bg: ${color.lightGray};
    --ant-modal-title-color: ${color.themeBlack};

    .ant-modal-header {
      background-color: ${color.inputGray};
      margin-left: -24px;
      margin-right: -24px;
      margin-top: -20px;
      margin-bottom: 20px;
      padding-top: 20px;

      .ant-modal-title {
        transform: translateY(-10px);
      }
    }
    .ant-modal-footer {
      .ant-btn {
        --ant-color-primary-hover: ${color.lightBlue};
        --ant-color-primary: ${color.blueGray};
        --ant-color-primary-active: ${color.lightBlue};

        min-width: 85px;
        margin: 0 15px;

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
        }
      }
    }
  }
`;
/* Pagination */
const paginationStyles = css`
  [class*='css-var'] {
    .ant-pagination {
      --ant-pagination-item-bg: transparent;
      --ant-pagination-item-active-bg: transparent;
      --ant-color-text: ${color.white};
      --ant-color-text-disabled: ${color.white};
      --ant-color-primary: ${color.lightBlue};
      --ant-color-link-active: ${color.lightBlue};

      .ant-select-selector {
        --ant-select-selector-bg: transparent;
        --ant-color-text: ${color.white};

        ~ .ant-select-arrow {
          --ant-color-text-quaternary: ${color.white};
        }
      }
    }
  }
`;
/* Segmented */
const segmentedStyles = css`
  [class*='css-var'] {
    .ant-segmented {
      --ant-border-radius: 30px;
      --ant-segmented-bg: ${color.lightBlue};
      --ant-segmented-item-selected-bg: ${color.lightBlue};
      --ant-segmented-thumb-border-radius: 30px;

      .ant-segmented-thumb {
        border-radius: 30px;
      }
      .ant-segmented-item {
        --ant-border-radius-sm: 30px;
      }
    }
  }
`;
/* Spin */
const spinStyles = css`
  [class*='css-var'] {
    .ant-spin {
      .ant-spin-dot-holder {
        --ant-color-primary: ${color.lightBlue};
      }
    }
  }
`;
/* Table */
const tableStyles = css`
  /* 自定義class
    className:
    1. theme-light
    2. theme-secondary
    3. theme-gradient-light
    4. theme-gradient-gray 可編輯狀態新增"editable-mode" ex: className="theme-gradient-gray editable-mode"
    5. custom-striped-table(可加入even來強制切換偶數行變色※當table有設定scroll參數時，會導致插入了看不見的tr在第一個，偶數行結果會顛倒，目前已設計成有設定scroll的table自動吃"視覺"上的偶數行變色，未設定scroll的table需手動添加even的className)

    rowClassName:
    1. custom-striped
    2. custom-no-hover
    3. custom-cursor-pointer
  */
  [class*='css-var'] {
    &.custom-striped-table {
      &:not(.even) {
        .ant-table {
          .ant-table-row {
            &:not(.ant-table-measure-row) {
              &:nth-of-type(odd) {
                background-color: ${color.darkerBlueGray};

                [class*='ant-table-cell-fix'] {
                  background-color: ${color.darkerBlueGray};
                }
              }
            }
          }
        }
      }
      &.even {
        .ant-table {
          .ant-table-row {
            &:not(.ant-table-measure-row) {
              &:nth-of-type(even) {
                background-color: ${color.darkerBlueGray};

                [class*='ant-table-cell-fix'] {
                  background-color: ${color.darkerBlueGray};
                }
              }
            }
          }
        }
      }
    }
    .ant-table {
      --ant-color-bg-container: transparent;
      --ant-table-cell-padding-block: 5px;
      --ant-table-cell-padding-inline: 8px;
      --ant-table-header-bg: #779fbc;
      --ant-table-header-color: ${color.white};
      --ant-table-header-split-color: transparent;
      --ant-table-border-color: transparent;
      --ant-color-text: ${color.white};
      --ant-table-row-hover-bg: #4e556f;
      --ant-line-width: 0px;
      --ant-color-split: ${color.themeBlack};
      --ant-table-fixed-header-sort-active-bg: #779fbc;
      --ant-table-header-sort-active-bg: #779fbc;
      --ant-table-header-sort-hover-bg: #779fbc;
      --ant-table-body-sort-bg: transparent;
      --ant-font-weight-strong: normal;
      --ant-table-cell-font-size: 16px;
      scrollbar-color: inherit;

      table {
        border-collapse: separate;
        border-spacing: 0 6px;
        margin-top: -6px;
      }

      .ant-table-title {
        color: ${color.white};

        + .ant-table-container {
          table {
            > thead {
              > tr:first-child {
                th:first-child {
                  border-radius: 16px 0 0 0;
                }
              }
              > tr:last-child {
                th:last-child {
                  border-radius: 0 16px 0 0;
                }
                th:only-child {
                  border-radius: 16px 16px 0 0;
                }
              }
            }
          }
        }
      }
      .ant-table-thead {
        height: 50px;

        > tr:first-child {
          th:first-child {
            border-radius: 16px 0 0 0;
          }
        }
        > tr:last-child {
          th:last-child {
            border-radius: 0 16px 0 0;
          }
          th:only-child {
            border-radius: 16px 16px 0 0;
          }
        }

        .ant-table-cell-scrollbar {
          box-shadow: none;
        }
        .ant-table-column-sorter-up,
        .ant-table-column-sorter-down {
          &.active {
            svg {
              fill: ${color.white};
            }
          }
        }
      }
      .ant-table-tbody {
        .ant-table-row {
          background-color: ${hexToRgba(color.midDarkBlue, 0.8)};
          height: 60px;

          .ant-table-cell {
            &:first-of-type {
              border-radius: 4px 0 0 4px;
            }
            &:last-of-type {
              border-radius: 0 4px 4px 0;
            }
          }

          &:last-of-type {
            .ant-table-cell {
              border-color: transparent;
            }
          }
          &.custom-no-hover {
            --ant-table-row-hover-bg: transparent;
          }
          &.custom-cursor-pointer {
            cursor: pointer;
          }
          &:hover {
            &:not(.custom-no-hover) {
              [class*='ant-table-cell-fix'] {
                background-color: ${color.darkerBlueGray} !important;
              }
            }
          }
          [class*='ant-table-cell-fix'] {
            // background-color: ${color.themeDarkGray};
            // background-color: ${hexToRgba(color.midDarkBlue, 0.8)};
          }
        }
      }
      &:has(.ant-table-footer) {
        .ant-table-tbody,
        .ant-table-body {
          border-radius: 0;

          .ant-table-row {
            .ant-table-cell {
              &:first-of-type {
                border-bottom-left-radius: 0;
              }
              &:last-of-type {
                border-bottom-right-radius: 0;
              }
            }
          }
        }
        .ant-table-footer {
          min-height: 30px;
          background-image: ${`linear-gradient(to top,${color.buttonGray},${color.white})`};
        }
      }
      .ant-table-selection-column {
        padding-left: 16px;
      }
      + .ant-pagination {
        --ant-border-radius: 2px;
        --ant-pagination-item-active-bg: ${color.darkerBlueGray};
        --ant-pagination-item-size: 25px;

        margin-bottom: 0;
      }
      tbody {
        .iconify {
          &:hover {
            color: #779fbc !important;
          }
        }
      }
    }
    .ant-table-content {
      overflow: var(--nodata-overflow) !important;
      border-radius: 16px 16px 0 0;
    }
    .ant-table-empty {
      .ant-table-tbody {
        background-color: transparent;

        tr {
          &:last-of-type {
            .ant-table-cell {
              background-color: #252e3d;
              height: 500px;

              &:first-of-type {
                border-bottom-left-radius: var(
                  --ant-table-header-border-radius
                );
              }
              &:last-of-type {
                border-bottom-right-radius: var(
                  --ant-table-header-border-radius
                );
              }
            }
          }
        }
      }
    }
    .ant-table-selection {
      .ant-dropdown-trigger {
        &::before {
          content: '';
          width: 0px;
          height: 0px;
          display: block;
          border-style: solid;
          border-width: 0 5px 6px 5px;
          border-color: transparent transparent #252e3d transparent;
          transform: translate(3px, 7px) rotate(180deg);
        }
      }
      .anticon {
        display: none;
      }
    }
  }
  .ant-table-wrapper {
    /* theme */
    &.theme-light {
      &.custom-striped-table {
        &:not(.even) {
          .ant-table {
            .ant-table-row {
              &:nth-of-type(odd) {
                background-color: ${color.inputGray};

                [class*='ant-table-cell-fix'] {
                  background-color: ${color.inputGray};
                }
              }
            }
          }
        }
        &.even {
          .ant-table {
            .ant-table-row {
              &:nth-of-type(even) {
                background-color: ${color.inputGray};

                [class*='ant-table-cell-fix'] {
                  background-color: ${color.inputGray};
                }
              }
            }
          }
        }
      }
      .ant-table {
        --ant-table-header-bg: ${color.darkGray};
        --ant-table-header-color: ${color.white};
        --ant-color-text: #444444;
        --ant-table-row-hover-bg: #c4f1fc;

        .ant-table-title {
          color: ${color.white};
        }
        .ant-table-row {
          background-color: ${color.white};

          &:hover {
            &:not(.custom-no-hover) {
              [class*='ant-table-cell-fix'] {
                background-color: #c4f1fc !important;
              }
            }
          }
          &.custom-no-hover {
            &:hover {
              [class*='ant-table-cell-fix'] {
                background-color: ${color.white};
              }
            }
          }
          [class*='ant-table-cell-fix'] {
            background-color: ${color.white};
          }
        }
      }
      .ant-empty-description {
        --ant-color-text-description: ${color.white};
      }
    }
    &.theme-gradient-light {
      &.custom-striped-table {
        &:not(.even) {
          .ant-table {
            .ant-table-row {
              &:nth-of-type(odd) {
                background-color: ${color.themeBlack};

                [class*='ant-table-cell-fix'] {
                  background-color: ${color.themeBlack};
                }
              }
            }
          }
        }
        &.even {
          .ant-table {
            .ant-table-row {
              &:nth-of-type(even) {
                background-color: ${color.inputGray};

                [class*='ant-table-cell-fix'] {
                  background-color: ${color.inputGray};
                }
              }
            }
          }
        }
      }
      .ant-table {
        --ant-table-header-bg: ${`linear-gradient(${color.buttonGray},${color.white})`};
        --ant-table-header-color: ${color.themeBlack};
        --ant-color-text: ${color.white};
        --ant-table-row-hover-bg: #c4f1fc;
        --ant-table-border-color: ${color.buttonGray};
        --ant-line-width: 1px;

        .ant-table-title {
          color: ${color.white};
        }
        .ant-table-tbody {
          .ant-table-row {
            background-color: #2b3043;

            &:hover {
              &:not(.custom-no-hover) {
                color: ${color.themeBlack};
                [class*='ant-table-cell-fix'] {
                  background-color: #c4f1fc !important;
                }
              }
            }
            &.custom-no-hover {
              &:hover {
                [class*='ant-table-cell-fix'] {
                  background-color: ${color.white};
                }
              }
            }
            /* &:last-of-type {
              .ant-table-cell {
                border-color: var(--ant-border-color);

                &:first-of-type {
                  border-bottom-left-radius: var(
                    --ant-table-header-border-radius
                  );
                }
                &:last-of-type {
                  border-bottom-right-radius: var(
                    --ant-table-header-border-radius
                  );
                }
              }
            } */
            [class*='ant-table-cell-fix'] {
              background-color: ${color.white};
            }
          }
        }
        &:has(.ant-table-footer) {
          .ant-table-tbody,
          .ant-table-body {
            border-radius: 0;

            .ant-table-row {
              .ant-table-cell {
                &:first-of-type {
                  border-bottom-left-radius: 0;
                }
                &:last-of-type {
                  border-bottom-right-radius: 0;
                }
              }
            }
          }
          .ant-table-footer {
            min-height: 30px;
            background-image: ${`linear-gradient(to top,${color.buttonGray},${color.white})`};
          }
        }
      }
      .ant-empty-description {
        --ant-color-text-description: ${color.white};
      }
    }
    &.theme-secondary {
      &.custom-striped-table {
        &:not(.even) {
          .ant-table {
            .ant-table-row {
              &:nth-of-type(odd) {
                background-color: #455163;

                [class*='ant-table-cell-fix'] {
                  background-color: #455163;
                }
              }
            }
          }
        }
        &.even {
          .ant-table {
            .ant-table-row {
              &:nth-of-type(even) {
                background-color: #455163;

                [class*='ant-table-cell-fix'] {
                  background-color: #455163;
                }
              }
            }
          }
        }
      }
      .ant-table {
        --ant-table-header-bg: ${`linear-gradient(180deg,${color.buttonGray},${color.white})`};
        --ant-table-header-color: ${color.themeBlack};
        --ant-color-text: ${color.white};
        --ant-table-row-hover-bg: #455163;

        .ant-table-title {
          color: ${color.white};
        }
        .ant-table-row {
          background-color: ${hexToRgba('#2B3443', 0.8)};

          &.ant-table-row-selected {
            --ant-table-row-selected-bg: transparent;
            --ant-table-row-selected-hover-bg: transparent;

            &:hover {
              color: ${color.white};

              [class*='ant-table-cell-fix'] {
                background-color: var(--ant-table-row-selected-hover-bg);
                color: ${color.white};
              }
            }
            [class*='ant-table-cell-fix'] {
              background-color: var(--ant-table-row-selected-bg);
            }
          }
          &:hover {
            &:not(.custom-no-hover) {
              [class*='ant-table-cell-fix'] {
                background-color: #455163 !important;
              }
            }
          }
          &.custom-no-hover {
            &:hover {
              &.ant-table-row-selected {
                [class*='ant-table-cell-fix'] {
                  background-color: var(--ant-table-row-selected-hover-bg);
                  color: ${color.white};
                }
              }
            }
          }
          [class*='ant-table-cell-fix'] {
            background-color: #252e3d;
          }
        }
      }
      .ant-empty-description {
        --ant-color-text-description: ${color.white};
      }
    }
    &.theme-gradient-gray {
      .ant-table {
        --ant-table-header-bg: linear-gradient(to bottom, #aeaeae, #ffffff);
        --ant-table-footer-bg: linear-gradient(to bottom, #aeaeae, #ffffff);
        --ant-table-border-color: #aeaeae;
        --ant-line-width: 1px;
        .ant-table-tbody {
          .ant-table-row:last-of-type .ant-table-cell {
            border-color: #aeaeae;
          }
          .ant-table-row {
            height: 40px;
          }
          .ant-table-row .ant-table-cell-fix-left {
            background: linear-gradient(to bottom, #aeaeae, #ffffff);
            color: #111525;
          }
        }
        .ant-table-cell {
          text-align: center;
        }
        .ant-table-footer {
          min-height: 30px;
        }
        .ant-table-tbody > tr:last-child > td {
          border-right: 1px solid #434343; /* Match your table border color */
        }

        --ant-table-header-color: #111525;

        /* Odd rows */
        .ant-table-tbody > tr:nth-child(odd) > td {
          background: #111525;
        }

        /* Even rows */
        .ant-table-tbody > tr:nth-child(even) > td {
          background: #2b3043;
        }
      }

      &.editable-mode {
        input {
          text-align: center;
        }
        .ant-table-tbody > tr:nth-child(odd) > td {
          background: #d6d6d6;
          input {
            background-color: #d6d6d6;
          }
        }

        .ant-table-tbody > tr:nth-child(even) > td {
          background: #aeaeae;
          input {
            background-color: #aeaeae;
          }
        }
        .ant-table {
          --ant-table-border-color: #ffffff;
        }

        td {
          &.ant-table-cell {
            padding: 0;
          }
        }
      }
    }
    .ant-table-body {
      scrollbar-color: auto !important;
      border-radius: 0 0 var(--ant-table-header-border-radius)
        var(--ant-table-header-border-radius);

      .ant-table-row.ant-table-row-selected {
        .ant-table-cell {
          color: ${color.themeDarkGray};
          --ant-table-row-selected-bg: #252e3d;
        }
      }
    }
  }
`;

/* Tabs */
const tabsStyles = css`
  /* 自定義class
    className:
    1. custom-tabs-title

  */
  .ant-tabs-nav {
    --ant-tabs-item-selected-color: ${color.lightBlue};
    --ant-tabs-item-hover-color: ${color.white};
    --ant-tabs-ink-bar-color: ${color.lightBlue};
    --ant-line-width-bold: 3px;
    --ant-tabs-item-active-color: ${color.white};
    --ant-tabs-item-color: ${color.white};
    --ant-tabs-horizontal-item-padding: 8px 8px;
    --ant-tabs-horizontal-item-gutter: 16px;
    --ant-tabs-horizontal-margin: 0 0 0 0;
    --ant-color-border-secondary: transparent;
    --ant-color-bg-container: ${color.themeBlack};
    --ant-tabs-item-selected-color: ${color.white};
    --ant-tabs-title-font-size: var(--font-size);
    --ant-tabs-title-font-size-lg: 18px;

    .ant-tabs-ink-bar {
      border-radius: 20px;
    }
  }
  .ant-tabs {
    --ant-color-text: ${color.white};
  }
  .ant-tabs-content {
    background-color: ${color.themeBlack};
    padding: 20px 30px;
  }
  .custom-tabs-title {
    color: var(--ant-tabs-item-color);
    font-size: var(--ant-tabs-title-font-size-lg);
    padding: 0 20px;
    margin: 0 20px 0 10px;
    font-weight: bold;
  }
  @media (max-width: 768px) {
    .ant-tabs .ant-tabs-tab-btn {
      font-size: clamp(14px, 2.5vw, 16px);
    }
  }
`;

/* Upload */
const uploadStyles = css`
  .ant-upload {
    display: inline-flex;
    width: 36px;
    height: 36px;
    justify-content: center;
    align-items: center;
    background-color: ${color.inputGray};
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background-color: ${color.buttonGray};
    }
  }
`;

const style = css`
  ${badgeStyles}
  ${buttonStyles}
  ${cardStyles}
  ${commonStyles}
  ${datePickerStyles}
  ${datePickerRangePickerStyles}
  ${emptyStyles}
  ${formStyles}
  ${layoutStyles}
  ${menuStyles}
  ${modalStyles}
  ${paginationStyles}
  ${segmentedStyles}
  ${spinStyles}
  ${tableStyles}
  ${tabsStyles}
  ${uploadStyles}
`;

export default style;
