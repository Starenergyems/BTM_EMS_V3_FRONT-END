import { color } from "@/styles/variable/indexStyle";
import { Modal } from "antd";
import styled from "styled-components";

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
