import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { MsalProvider } from "@azure/msal-react";
import dayjs from "dayjs";
import App from "@/App.jsx";
// import { msalInstance } from "@/pages/page/(auth)/indexConfig";
import { store } from "@/store/index";
import { ConfigProvider } from "antd";
import zhTW from "antd/locale/zh_TW";
import "dayjs/locale/zh-tw";

dayjs.locale("zh-cn");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <MsalProvider instance={msalInstance}> */}
      <Provider store={store}>
        {/* 讓ant design使用css變數來設定樣式 */}
        <ConfigProvider
          locale={{
            ...zhTW,
            DatePicker: {
              ...zhTW.DatePicker,
              lang: {
                ...zhTW.DatePicker.lang,
                now: "現在",
              },
            },
          }}
          theme={{ cssVar: true }}
        >
          <App />
        </ConfigProvider>
      </Provider>
    {/* </MsalProvider> */}
  </StrictMode>
);
