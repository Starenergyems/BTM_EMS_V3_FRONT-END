const pagesPathName = {
  // 告警系統
  alarm: {
    historic: {
      path: 'alarm/historic',
      pathName: '歷史告警',
      pathNameEN: 'Historical Alerts',
      routeName: 'historic',
    },
    real: {
      path: 'alarm/real',
      pathName: '即時告警',
      pathNameEN: 'Real-time Alerts',
      routeName: 'real',
    },
  },
  bill: {
    // 充電樁
    charger: {
      path: 'bill/charger',
      pathName: '充電樁',
      pathNameEN: 'EV Charging Cost Calculation',
      routeName: 'billCharger',
    },
    // 效益分析
    report: { path: 'bill/report', pathName: '效益分析', routeName: 'report' },
    // 太陽能
    solar: {
      path: 'bill/solar',
      pathName: '太陽能',
      pathNameEN: 'Solar Power Cost Calculation',
      routeName: 'billSolar',
    },
    // 儲能系統
    storage: {
      path: 'bill/storage',
      pathName: '儲能系統',
      pathNameEN: 'ESS Cost Calculation',
      routeName: 'billStorage',
    },
  },
  // 充電樁
  charger: {
    path: '/charger',
    pathName: '充電樁',
    pathNameEN: 'Charging Station System Overview',
    routeName: 'charger',
  },
  // 示範頁
  demo: { path: '/demo', pathName: '示範頁', routeName: 'demo' },
  // 首頁
  home: { path: '/', routeName: '' },
  // 登入頁
  login: { path: '/login', routeName: 'login' },
  // 個人資料
  profile: {
    personal: {
      path: '/personal',
      pathName: '個人資料',
      routeName: 'personal',
    },
  },
  // 輔助服務 - 即時備轉
  realTimeSpinningReserve: {
    path: '/realTimeSpinningReserve',
    routeName: 'realTimeSpinningReserve',
  },
  // 重設密碼頁
  resetPassword: {
    path: '/resetPassword',
    pathName: '重設密碼',
    routeName: 'resetPassword',
  },
  resetSuccess: {
    path: '/resetSuccess',
    pathName: '重設成功',
    routeName: 'resetSuccess',
  },
  sendEmail: {
    path: '/sendEmail',
    pathName: '發送email',
    routeName: 'sendEmail',
  },
  // 設定頁面
  setting: {
    // 需量反應
    demandRp: {
      path: 'setting/demandRp',
      pathName: '需量反應',
      routeName: 'demandRp',
    },
    // 運轉排程
    schedule: {
      path: 'setting/schedule',
      pathName: '運轉排程',
      routeName: 'schedule',
    },
    // 操作設定
    setting: { path: 'setting', pathName: '操作設定', routeName: 'setting' },
  },
  // 太陽能
  solar: {
    path: '/solar',
    pathName: '太陽能',
    pathNameEN: 'Solar Power System Overview',
    routeName: 'solar',
  },
  // 儲能系統
  storage: {
    path: '/storage',
    pathName: '儲能系統',
    pathNameEN: 'ESS Overview',
    routeName: 'storage',
  },
  // 權限管理設定
  systemSetting: {
    system: {
      path: 'system',
      pathName: '權限管理',
      pathNameEN: 'Permission Management',
      routeName: 'system',
    },
  },
  // 測試頁面
  test: { path: '/test', pathName: '測試頁', routeName: 'test' },
};

export { pagesPathName };
