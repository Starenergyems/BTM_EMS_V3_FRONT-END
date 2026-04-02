import styled from "styled-components";
import { color } from "@/styles/variable/indexStyle";

const style = styled.div`
  display: inline-block;

  .container {
    text-align: center;
    width: 113px;
    display: inline-block;
  }
  .circle {
    width: 113px;
    height: 113px;
    border: solid 5px
      ${(props) =>
        props.$textColor === color.lightBlue
          ? "#f3f3f3"
          : props.$textColor || "#f3f3f3"};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .text {
    font-size: 28px;
    color: ${(props) => props.$textColor || color.lightBlue};
  }
  .title {
    font-size: 16px;
    margin-top: 20px;
    display: block;
    color: ${color.white};
  }
`;

export default style;
