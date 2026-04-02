import styled from "styled-components";
import { color } from "@/styles/variable/indexStyle";
import { hexToRgba } from "@/styles/function";

const style = styled.div`
  .equipment-header {
    padding: 8px 0;
    border-radius: 4px;
    background-color: ${hexToRgba(color.lightBlueGray, 0.8)};
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.25);
    padding-left: 2vw;
  }
  .equipment-content-box {
    border-radius: 4px;
    background-color: ${hexToRgba(color.white, 0.2)};
    margin-top: 3px;
    padding: 12px;
  }
  .equipment-content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4px;
  }
`;

export default style;
