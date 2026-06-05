import styled from "styled-components";
import { hexToRgba } from "@/styles/function";
import { color } from "@/styles/variable/indexStyle";

const style = styled.div`
  .ant-tabs-nav-wrap {
    height: 58px;
    border-radius: 0px;
  }
  .ant-tabs-nav-list {
    width: 100%;
  }
  .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-left: 1px;
    border-radius: 0px;
    color: ${color.buttonGray};
    &:first-child {
      margin-left: 0;
    }
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 3px;
      border-radius: 50px;
      background-color: ${color.buttonGray};
    }
  }
  .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab-active {
    background: linear-gradient(
      90deg,
      rgba(68, 122, 134, 0.1) 0%,
      rgba(120, 214, 236, 0.2) 49.04%,
      rgba(68, 122, 134, 0.1) 100%
    );
    &::after {
      background-color: ${color.white};
    }
  }
  .ant-tabs-content {
    margin-top: 12px;
    background: transparent;
    padding: 0;
  }

  .equipmentInfo-item {
    display: flex;
    > div {
      flex: 1;
      padding: 18px 0 18px 14px;
      border-radius: 4px;
      background: ${color.darkerBlue};
    }
  }

  @media (max-width: 1200px) {
    margin-top: 80px;
  }
`;

export default style;
