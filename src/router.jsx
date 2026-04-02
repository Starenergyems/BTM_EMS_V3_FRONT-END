import { createBrowserRouter } from "react-router-dom";
import PageIndex from "@/pages/index";
import Login from "@/pages/page/(auth)/login/index";
import ResetPassword from "@/pages/page/(auth)/resetPassword/index";
import ProtectedRoute from "./pages/protectedRoute";
import NotFound from "./pages/page/notFound";
import SendEmail from "@/pages/page/(auth)/sendEmail";
import ResetSuccess from "./pages/page/(auth)/resetSuccess";
import { pagesPathName } from "@/router/pagesPathName";

// 動態載入頁面
function getLazyComponent(importUrl) {
  return {
    Component: importUrl.default,
  };
}

const routes = [
  {
    path: pagesPathName.home.routeName,
    element: <ProtectedRoute element={PageIndex} />,
    children: [
      {
        // 測試頁
        path: pagesPathName.test.path,
        async lazy() {
          return getLazyComponent(await import('@/pages/page/test/index'));
        },
      },
      {
        // 示範頁
        path: pagesPathName.demo.path,
        async lazy() {
          return getLazyComponent(await import('@/pages/page/demo/index'));
        },
      },
      {
        // 首頁
        path: '',
        async lazy() {
          return getLazyComponent(await import('@/pages/page/home/index'));
        },
      },
      {
        // 系統設定
        path: pagesPathName.setting.setting.path,
        async lazy() {
          return getLazyComponent(
            await import('@/pages/page/settings/setting/index'),
          );
        },
      },
      {
        // 排程設定
        path: pagesPathName.setting.schedule.path,
        async lazy() {
          return getLazyComponent(
            await import('@/pages/page/settings/schedule/index'),
          );
        },
      },
      {
        // VPP 需量反應
        path: pagesPathName.setting.demandRp.path,
        async lazy() {
          return getLazyComponent(
            await import('@/pages/page/settings/demandRp/index'),
          );
        },
      },
      {
        // 儲能系統
        path: pagesPathName.bill.storage.path,
        async lazy() {
          return getLazyComponent(
            await import('@/pages/page/bill/storage/index'),
          );
        },
      },
      {
        // 太陽能
        path: pagesPathName.bill.solar.path,
        async lazy() {
          return getLazyComponent(
            await import('@/pages/page/bill/solar/index'),
          );
        },
      },
      {
        // 充電樁
        path: pagesPathName.bill.charger.path,
        async lazy() {
          return getLazyComponent(
            await import('@/pages/page/bill/charger/index'),
          );
        },
      },
      {
        // 效益分析
        path: pagesPathName.bill.report.path,
        async lazy() {
          return getLazyComponent(
            await import('@/pages/page/bill/report/index'),
          );
        },
      },
      {
        // 儲能系統
        path: pagesPathName.storage.path,
        async lazy() {
          return getLazyComponent(await import('@/pages/page/storage/index'));
        },
      },
      {
        // 太陽能
        path: pagesPathName.solar.path,
        async lazy() {
          return getLazyComponent(await import('@/pages/page/solar/index'));
        },
      },
      {
        // 充電樁
        path: pagesPathName.charger.path,
        async lazy() {
          return getLazyComponent(await import('@/pages/page/charger/index'));
        },
      },
      {
        // 即時告警
        path: pagesPathName.alarm.real.path,
        async lazy() {
          return getLazyComponent(
            await import('@/pages/page/alarm/real/index'),
          );
        },
      },
      {
        // 歷史告警
        path: pagesPathName.alarm.historic.path,
        async lazy() {
          return getLazyComponent(
            await import('@/pages/page/alarm/historic/index'),
          );
        },
      },

      {
        // 即時備轉頁
        path: pagesPathName.realTimeSpinningReserve.routeName,
        async lazy() {
          return getLazyComponent(
            await import('@/pages/page/realTimeSpinningReserve/index'),
          );
        },
      },
      {
        // 個人資料
        path: pagesPathName.profile.personal.path,
        async lazy() {
          return getLazyComponent(await import('@/pages/page/personal/index'));
        },
      },
      {
        // 權限管理設定
        path: pagesPathName.systemSetting.system.path,
        async lazy() {
          return getLazyComponent(await import('@/pages/page/system/index'));
        },
      },
    ],
  },
  {
    //登入頁
    path: pagesPathName.login.routeName,
    element: <Login />,
  },
  {
    //重設密碼頁
    path: pagesPathName.resetPassword.routeName,
    element: <ResetPassword />,
  },
  {
    //忘記密碼:寄送註冊信箱頁
    path: pagesPathName.sendEmail.routeName,
    element: <SendEmail />,
  },
  {
    //密碼變更成功頁
    path: pagesPathName.resetSuccess.routeName,
    element: <ResetSuccess />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);
export { pagesPathName, router };
