import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import GlobalStyle from "@/styles/globalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <Toaster containerStyle={{ top: "40px" }} position="top-center" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
