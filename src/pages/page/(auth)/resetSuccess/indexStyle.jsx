import { Flex } from "antd";
import styled from "styled-components";
import { color } from "@/styles/variable/indexStyle";

const style = styled(Flex)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  height: 100vh;

  .login-box {
    width: 35vw;
    min-width: 245px;
    max-width: 450px;
    position: relative;
    transform: translateY(
      calc(((100vh - 593.33px) / 359.67) * -1 * 55)
    ); //953px時為-55，593.33px時為0，計算這之間

    .logo {
      max-width: 350px;

      + .ant-typography {
        p {
          color: #b7b3a8;
        }
      }
    }
    .ant-form-item-label {
      > label {
        --ant-form-label-color: ${color.white};
      }
    }
    .btn-msal-login {
      --ant-button-default-border-color: ${color.white};
      --ant-button-default-bg: ${color.white};
      --ant-button-default-color: ${color.darkGray};
      --ant-button-default-hover-bg: ${color.white};
      --ant-button-default-hover-border-color: ${color.white};
      --ant-button-default-hover-color: ${color.darkGray};
      --ant-button-default-active-border-color: ${color.white};
      --ant-button-default-active-bg: ${color.white};
      --ant-button-default-active-color: ${color.darkGray};

      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      padding-top: 8px;
      padding-bottom: 8px;
      height: auto;
      text-shadow: 0 4px 3px #d1d1d1;

      &:hover {
        box-shadow: 0 0 20px ${color.white};
      }
      b {
        font-size: 1.1rem;
      }
      .microsoft-logo {
        display: inline-flex;
        flex-wrap: wrap;
        width: 25px;
        height: 25px;
        gap: 1px;

        > span {
          width: calc(50% - 1px);
          height: calc(50% - 1px);
          display: inline-block;

          &.red {
            background-color: #f1511b;
          }
          &.green {
            background-color: #80cc28;
          }
          &.blue {
            background-color: #00adef;
            box-shadow: 0 4px 3px #d1d1d1;
          }
          &.yellow {
            background-color: #fbbc09;
            box-shadow: 0 4px 3px #d1d1d1;
          }
        }
      }
    }
    .btn-login {
      display: inline-block;
      --ant-button-default-border-color: ${color.blueGray};
      --ant-button-default-bg: ${color.blueGray};
      --ant-button-default-color: ${color.white};
      --ant-button-default-hover-bg: #036f9f;
      --ant-button-default-hover-border-color: #036f9f;
      --ant-button-default-hover-color: ${color.white};
      min-width: 98px;
    }
    .forgot-password {
      color: ${color.white};
      cursor: pointer;
    }
    .ant-form-item-explain-error {
      margin-left: 0;
    }
  }
  .login-video {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    padding: 0;
    z-index: -1;
    border: 0;
  }

  .subtitle {
    margin: 0;
    font-size: 20px;
    font-weight: 500;
  }

  .check {
    margin: 15px 0;
  }
`;

export default style;
