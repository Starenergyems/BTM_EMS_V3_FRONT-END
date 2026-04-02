const pagesPathName = {
  // 測試頁面
  test: { routeName: 'test', path: '/test', pathName: '測試頁' },
  // 設定頁面
  setting: {
    // 操作設定
    setting: { routeName: 'setting', path: '/setting', pathName: '操作設定' },
    // 運轉排程
    schedule: {
      routeName: 'schedule',
      path: 'setting/schedule',
      pathName: '運轉排程',
    },
    // VPP 需量反應
    demandRp: {
      routeName: 'demandRp',
      path: 'setting/demandRp',
      pathName: 'VPP 需量反應',
    },
  },
  bill: {
    // 儲能系統
    storage: {
      routeName: 'storage',
      path: 'bill/storage',
      pathName: '儲能系統',
      pathNameEN: 'ESS Cost Calculation',
    },
    // 太陽能
    solar: {
      routeName: 'solar',
      path: 'bill/solar',
      pathName: '太陽能',
      pathNameEN: 'Solar Power Cost Calculation',
    },
    // 充電樁
    charger: {
      routeName: 'charger',
      path: 'bill/charger',
      pathName: '充電樁',
      pathNameEN: 'EV Charging Cost Calculation',
    },
    // 效益分析
    report: { routeName: 'report', path: 'bill/report', pathName: '效益分析' },
  },
  // 儲能系統
  storage: {
    routeName: 'storage',
    path: '/storage',
    pathName: '儲能系統',
    pathNameEN: 'ESS Overview',
  },
  // 太陽能
  solar: {
    routeName: 'solar',
    path: '/solar',
    pathName: '太陽能',
    pathNameEN: 'Solar Power System Overview',
  },
  // 充電樁
  charger: {
    routeName: 'charger',
    path: '/charger',
    pathName: '充電樁',
    pathNameEN: 'Charging Station System Overview',
  },
  // 告警系統
  alarm: {
    real: {
      routeName: 'real',
      path: 'alarm/real',
      pathName: '即時告警',
      pathNameEN: 'Real-time Alerts',
    },
    historic: {
      routeName: 'historic',
      path: 'alarm/historic',
      pathName: '歷史告警',
      pathNameEN: 'Historical Alerts',
    },
  },
  // 輔助服務 - 即時備轉
  realTimeSpinningReserve: {
    routeName: 'realTimeSpinningReserve',
    path: '/realTimeSpinningReserve',
  },
  // 個人資料
  profile: {
    personal: {
      routeName: 'personal',
      path: '/personal',
      pathName: '個人資料',
    },
  },
  // 權限管理設定
  systemSetting: {
    system: {
      routeName: 'system',
      path: '/system',
      pathName: '權限管理',
      pathNameEN: 'Permission Management',
    },
  },
  // 示範頁
  demo: { routeName: 'demo', path: '/demo', pathName: '示範頁' },
  // 首頁
  home: { routeName: '', path: '/' },
  // 登入頁
  login: { routeName: 'login', path: '/login' },
  // 重設密碼頁
  resetPassword: {
    routeName: 'resetPassword',
    path: '/resetPassword',
    pathName: '重設密碼',
  },
  sendEmail: {
    routeName: 'sendEmail',
    path: '/sendEmail',
    pathName: '發送email',
  },
  resetSuccess: {
    routeName: 'resetSuccess',
    path: '/resetSuccess',
    pathName: '重設成功',
  },
};

export { pagesPathName };
