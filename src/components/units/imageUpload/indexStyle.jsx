import styled, { css } from "styled-components";
import { color } from "@/styles/variable/indexStyle";

const style = styled.div`
  &.type-read {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .ant-image-img {
      height: auto !important;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 5px;
    }
  }
  .ant-image {
    background-color: ${color.inputGray};
    border-radius: 8px;
    padding: 4px;
  }
  .ant-image-mask {
    border-radius: 8px;
  }
  .ant-upload-list {
    --ant-padding-xs: 4px;

    .ant-upload-list-item-container {
      width: ${(props) => {
        if (typeof props.$imageWidth === "number") {
          return `${props.$imageWidth}px`;
        }
        return props.$imageWidth ?? " 36px";
      }} !important;
      height: ${(props) => {
        if (typeof props.$imageHeight === "number") {
          return `${props.$imageHeight}px`;
        }
        return props.$imageHeight ?? " 36px";
      }} !important;

      .ant-upload-list-item {
        background-color: ${color.inputGray};

        .ant-upload-list-item-actions {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          > a {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        button {
          &.ant-btn {
            position: absolute;
            top: -8px;
            right: -8px;
            ${(props) => {
              if (props.$type === "edit") {
                return css`
                  &:hover {
                    --ant-button-text-hover-bg: transparent;
                    --ant-color-bg-text-active: transparent;
                  }
                  &::before {
                    content: "x";
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 16px;
                    height: 16px;
                    background-color: #ffffff;
                    position: absolute;
                    top: 2px;
                    right: 4px;
                    border-radius: 50%;
                    color: #444;
                    box-shadow: 0px 1px 5px ${color.darkGray};
                  }
                `;
              }
            }}
          }
        }
      }
    }
    .ant-upload {
      &.ant-upload-select {
        --ant-control-height-lg: 15px;
        border-style: hidden !important;
      }
      .btn-upload {
        display: inline-flex;
        width: 36px;
        height: 36px;
        justify-content: center;
        align-items: center;
        background-color: ${(props) =>
          props.$fileListLength > 0 ? color.darkGray : color.inputGray};
        border-radius: 8px;

        &:hover {
          background-color: ${color.buttonGray};
        }
      }
    }
  }
`;

export default style;
