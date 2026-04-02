import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import zhTW from "antd/locale/zh_TW";
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
import { MsalProvider } from "@azure/msal-react";
import { store } from "@/store/index";
import App from "@/App.jsx";
import { msalInstance } from "@/pages/page/(auth)/indexConfig";

dayjs.locale("zh-cn");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <Provider store={store}>
        {/* 讓ant design使用css變數來設定樣式 */}
        <ConfigProvider
          theme={{ cssVar: true }}
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
        >
          <App />
        </ConfigProvider>
      </Provider>
    </MsalProvider>
  </StrictMode>
);
