import { createBrowserRouter } from "react-router-dom";

import PageIndex from "@/pages/index";
import Login from "@/pages/page/(auth)/login/index";
import ResetPassword from "@/pages/page/(auth)/resetPassword/index";
import SendEmail from "@/pages/page/(auth)/sendEmail";
import { pagesPathName } from "@/router/pagesPathName";

import ResetSuccess from "./pages/page/(auth)/resetSuccess";
import NotFound from "./pages/page/notFound";
import ProtectedRoute from "./pages/protectedRoute";

// 動態載入頁面
function getLazyComponent(importUrl) {
  return {
    Component: importUrl.default,
  };
}

const routes = [
  {
    children: [
      {
        async lazy() {
          return getLazyComponent(await import('@/pages/page/test/index'));
        },
        // 測試頁
        path: pagesPathName.test.path,
      },
      {
        async lazy() {
          return getLazyComponent(await import('@/pages/page/demo/index'));
        },
        // 示範頁
        path: pagesPathName.demo.path,
      },
      {
        async lazy() {
          return getLazyComponent(await import('@/pages/page/home/index'));
        },
        // 首頁
        path: '',
      },
      {
        async lazy() {
          return getLazyComponent(
            await import('@/pages/page/settings/setting/index'),
          );
        },
        // 系統設定
        path: pagesPathName.setting.setting.path,
      },
      {
        async lazy() {
          return getLazyComponent(
            await import('@/pages/page/settings/schedule/index'),
          );
        },
        // 排程設定
        path: pagesPathName.setting.schedule.path,
      },
      {
        async lazy() {
          return getLazyComponent(
            await import('@/pages/page/settings/demandRp/index'),
          );
        },
        // 需量反應
        path: pagesPathName.setting.demandRp.path,
      },
      {
        async lazy() {
          return getLazyComponent(
            await import('@/pages/page/bill/storage/index'),
          );
        },
        // 儲能系統
        path: pagesPathName.bill.storage.path,
      },
      {
        async lazy() {
          return getLazyComponent(
            await import('@/pages/page/bill/solar/index'),
          );
        },
        // 太陽能
        path: pagesPathName.bill.solar.path,
      },
      {
        async lazy() {
          return getLazyComponent(
            await import('@/pages/page/bill/charger/index'),
          );
        },
        // 充電樁
        path: pagesPathName.bill.charger.path,
      },
      {
        async lazy() {
          return getLazyComponent(
            await import('@/pages/page/bill/report/index'),
          );
        },
        // 效益分析
        path: pagesPathName.bill.report.path,
      },
      {
        async lazy() {
          return getLazyComponent(await import('@/pages/page/storage/index'));
        },
        // 儲能系統
        path: pagesPathName.storage.path,
      },
      {
        async lazy() {
          return getLazyComponent(await import('@/pages/page/solar/index'));
        },
        // 太陽能
        path: pagesPathName.solar.path,
      },
      {
        async lazy() {
          return getLazyComponent(await import('@/pages/page/charger/index'));
        },
        // 充電樁
        path: pagesPathName.charger.path,
      },
      {
        async lazy() {
          return getLazyComponent(
            await import('@/pages/page/alarm/real/index'),
          );
        },
        // 即時告警
        path: pagesPathName.alarm.real.path,
      },
      {
        async lazy() {
          return getLazyComponent(
            await import('@/pages/page/alarm/historic/index'),
          );
        },
        // 歷史告警
        path: pagesPathName.alarm.historic.path,
      },

      {
        async lazy() {
          return getLazyComponent(
            await import('@/pages/page/realTimeSpinningReserve/index'),
          );
        },
        // 即時備轉頁
        path: pagesPathName.realTimeSpinningReserve.routeName,
      },
      {
        async lazy() {
          return getLazyComponent(await import('@/pages/page/personal/index'));
        },
        // 個人資料
        path: pagesPathName.profile.personal.path,
      },
      {
        async lazy() {
          return getLazyComponent(await import('@/pages/page/system/index'));
        },
        // 權限管理設定
        path: pagesPathName.systemSetting.system.path,
      },
    ],
    element: <ProtectedRoute element={PageIndex} />,
    path: pagesPathName.home.routeName,
  },
  {
    element: <Login />,
    //登入頁
    path: pagesPathName.login.routeName,
  },
  {
    element: <ResetPassword />,
    //重設密碼頁
    path: pagesPathName.resetPassword.routeName,
  },
  {
    element: <SendEmail />,
    //忘記密碼:寄送註冊信箱頁
    path: pagesPathName.sendEmail.routeName,
  },
  {
    element: <ResetSuccess />,
    //密碼變更成功頁
    path: pagesPathName.resetSuccess.routeName,
  },
  {
    element: <NotFound />,
    path: '*',
  },
];

const router = createBrowserRouter(routes);
export { pagesPathName, router };
