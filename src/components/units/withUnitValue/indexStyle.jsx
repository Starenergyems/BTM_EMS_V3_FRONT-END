import styled from "styled-components";

const style = styled.span`
  display: inline-flex;
  align-items: center;

  .value {
    width: ${(props) => {
      if (typeof props.$valueWidth === "number") {
        return `${props.$valueWidth}px`;
      }
      return props.$valueWidth;
    }};
    text-align: ${(props) => props.$valueTextAlign};
  }
  .unit {
    width: ${(props) => {
      if (typeof props.$unitWidth === "number") {
        return `${props.$unitWidth}px`;
      }
      return props.$unitWidth;
    }};
    margin-left: 8px;
    text-align: ${(props) => props.$unitTextAlign};
  }
`;

export default style;
