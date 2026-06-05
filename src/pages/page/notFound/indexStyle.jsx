import styled from "styled-components";
import { absoluteCenter } from "@/styles/variable/indexStyle";

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
