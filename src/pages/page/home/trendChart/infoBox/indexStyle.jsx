import styled from "styled-components";
import { hexToRgba } from "@/styles/function";
import { color } from "@/styles/variable/indexStyle";

const style = styled.div`
  width: 100%;
  height: 100%;
  padding: 14px;
  background: ${hexToRgba(color.white, 0.2)};
  border-radius: 6px;
`;

export default style;
