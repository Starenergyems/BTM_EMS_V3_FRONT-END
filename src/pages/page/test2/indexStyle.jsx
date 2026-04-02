import { color } from "@/styles/variable/indexStyle";
import styled from "styled-components";

const style = styled.div`
  .ant-table-wrapper {
    .ant-table {
      --ant-table-header-bg: ${color.themeBlack};
      --ant-table-header-color: ${color.white};
      --ant-table-border-color: #455663;

      .ant-table-row {
        background-color: #4a525f;

        [class*="ant-table-cell-fix"] {
          background-color: #4a525f;
        }
      }
    }
  }

  .section-header {
    background-color: ${color.themeBlack};
    border-radius: 20px;

    .cloud-status-container {
      .status {
        font-size: 0.9rem;
        color: ${color.lightBlue};
      }
    }
  }
  .revenue-sharing-bar-stack-chart {
    min-height: 300px;
  }
  .custom-legend {
    position: relative;

    .custom-legend-item {
      background-color: ${color.themeBlack};
      border-radius: 5px;
      cursor: pointer;
      color: ${color.white};

      &.cursor-default {
        cursor: default;
      }
    }
    .color-block {
      width: 24px;
      height: 5px;
      display: inline-block;
    }
  }
`;

export default style;
