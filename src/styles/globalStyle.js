import * as styled from "styled-components";
import customLibraryStyle from "@/styles/customLibrary/indexStyle";
import customStyle from "@/styles/customStyle/indexStyle";

const GlobalStyle = styled.createGlobalStyle`
  ${customLibraryStyle}
  ${customStyle}
`;

export default GlobalStyle;
