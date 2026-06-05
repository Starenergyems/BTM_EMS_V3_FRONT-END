import styled from "styled-components";
import { Modal } from "antd";
import { color } from "@/styles/variable/indexStyle";

const style = styled(Modal)`
  p {
    max-width: 70%;
    text-align: center;
    color: ${color.darkGray};

    .remind {
      color: ${color.red};
    }
  }
`;

export default style;
