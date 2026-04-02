import styled from "styled-components";

const style = styled.div`
  .section-header {
    position: relative;
    span {
      white-space: nowrap;
    }
    .real-time-spinning-reserve-segmented {
      position: absolute;
      // width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

export default style;
