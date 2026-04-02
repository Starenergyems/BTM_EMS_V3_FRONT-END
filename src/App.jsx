import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { router } from "@/router";
import GlobalStyle from "@/styles/globalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <Toaster position="top-center" containerStyle={{ top: "40px" }} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
