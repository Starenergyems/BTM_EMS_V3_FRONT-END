import { absoluteCenter } from "@/styles/variable/indexStyle";
import styled from "styled-components";

const style = styled.div`
  .container {
    text-align: center;
    ${absoluteCenter};

    .ant-btn {
      min-width: 98px;
    }
  }
`;

export default style;
