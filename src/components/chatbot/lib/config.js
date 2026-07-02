export const chatkitApiUrl =
  import.meta.env.VITE_CHATKIT_API_URL ?? 'http://localhost:8002/chatkit';

export const chatkitDomainKey =
  import.meta.env.VITE_CHATKIT_DOMAIN_KEY ?? 'domain_pk_local_dev';

// export const THEME_STORAGE_KEY = "chatkit-boilerplate-theme";

export const GREETING = `Hey there! 💭 \n How can we help?`;

export const TOOLS = {
  globe: 'globe',
  search_docs: 'search_docs',
};

export const STARTER_PROMPTS = [
  {
    icon: 'lightbulb',
    label: '你想先了解什麼？',
    prompt: '你想先了解什麼？',
  },
  {
    icon: 'calendar',
    label: '查看今天的排程',
    prompt: '幫我查看今天的排程',
  },
  {
    icon: 'circle-question',
    label: '查看即時告警',
    prompt: '目前有沒有即時告警？請列出等級最高的 3 筆。',
  },
  {
    icon: 'analytics',
    label: '本月電費/充電/儲能報表',
    prompt: '幫我查本月電費/充電/儲能報表，並說明和上月差異。',
  },
];

export const DOCS_PROMPTS = [
  {
    icon: 'circle-question',
    label: '基本電費和流動電費如何扣減？',
    prompt: '基本電費和流動電費如何扣減？',
  },
  {
    icon: 'circle-question',
    label: '參加需量反應能省多少電費？',
    prompt: '參加需量反應能省多少電費？',
  },
  {
    icon: 'circle-question',
    label: '申請需量反應的條件和流程是什麼？',
    prompt: '申請需量反應的條件和流程是什麼？',
  },
  {
    icon: 'circle-question',
    label: 'E-dReg 報價與 SOC 檢核？',
    prompt: 'E-dReg 報價與 SOC 檢核？',
  },
];

export const PAGES_PROMPTS = {
  // billCharger: [
  //   {
  //     icon: 'lightbulb',
  //     label: '摘要',

  //     prompt: '請產生目前頁面摘要，重點列出用電費用、以及優化建議。',
  //   },
  //   {
  //     icon: 'plus',
  //     label: '總累積排碳量是透過什麼公式從用電量換算出來的？',
  //     prompt: '總累積排碳量是透過什麼公式從用電量換算出來的？',
  //   },
  // ],
  // billSolar: [
  //   {
  //     icon: 'lightbulb',
  //     label: '摘要',
  //     prompt: '請產生目前頁面摘要，重點列出用電費用、以及優化建議。',
  //   },
  //   {
  //     icon: 'info',
  //     label: '今天的天氣或日照計數據是否有異常紀錄？',
  //     prompt: '今天的天氣或日照計數據是否有異常紀錄？',
  //   },
  //   {
  //     icon: 'info',
  //     label: '如何計算累積效益？',
  //     prompt: '如何計算累積效益？',
  //   },
  // ],

  home: [
    {
      actions: {
        actionId: 'home.summary',
        requestSource: 'page_action',
      },
      renders: {
        icon: 'lightbulb',
        label: '本頁摘要',
        prompt:
          '請摘要目前首頁的能源運行狀況，包含即時用電與發電、儲能狀態、包含各能源節點的設備狀態摘要、今日節費與減碳成果；若有值得注意的異常或風險，請另外列出。',
      },
    },
    {
      actions: {
        actionId: 'home.realtime_energy',
        requestSource: 'page_action',
      },
      renders: {
        icon: 'square-text',
        label: '即時能源狀態',
        prompt:
          '請說明目前市電、負載、太陽能、儲能與充電樁的即時功率，以及儲能 SOC。請判斷目前能源流向是否有明顯異常。',
      },
    },
    {
      actions: {
        actionId: 'home.contract_risk',
        requestSource: 'page_action',
      },
      renders: {
        icon: 'info',
        label: '今日超約風險',
        prompt:
          '請比較本站目前即時市電功率、今日有效的市電與負載趨勢、最高取樣功率及契約容量，評估目前用電風險與近期趨勢是否接近或超過契約容量。請優先依可用的即時與趨勢資料完成風險評估，並綜合儲能設備狀態、即時功率、SOC，以及最低、保留與最高 SOC 設定，評估目前是否具備支援能力。',
      },
    },
    {
      actions: {
        actionId: 'home.daily_benefit',
        requestSource: 'page_action',
      },
      renders: {
        icon: 'check',
        label: '今日節費與減碳',
        prompt:
          '請整理今日截至目前的節省電費、減碳量、負載用電、太陽能發電及儲能充放電成果，並說明各項數據代表的營運效益。',
      },
    },
  ],

  // report: [
  //   {
  //     icon: 'lightbulb',
  //     label: '摘要',
  //     prompt: '請產生目前頁面摘要，重點列出用電費用、以及優化建議。',
  //   },
  //   {
  //     icon: 'plus',
  //     label: '「光儲效益」與「光效益」怎麼計算出來？',
  //     prompt:
  //       '「光儲效益」與「光效益」具體是怎麼計算出來的？背後的數學公式是什麼？',
  //   },
  //   {
  //     icon: 'circle-question',
  //     label: '依據什麼模型決定儲能系統的放電量？',
  //     prompt: '系統是依據什麼預測模型來決定儲能系統的放電量？',
  //   },
  // ],

  // schedule: [
  //   {
  //     icon: 'lightbulb',
  //     label: '摘要',
  //     prompt:
  //       '請產生目前頁面摘要，重點列出今日的排程、即將到來的排程、以及優化建議。',
  //   },
  //   {
  //     icon: 'write',
  //     label: '如何新增一筆「時間電價套利」的排程？',
  //     prompt: '如何新增一筆「時間電價套利」的排程？',
  //   },
  // ],
  // solar: [
  //   {
  //     icon: 'lightbulb',
  //     label: '摘要',
  //     prompt:
  //       '請根據當前畫面的圖表走勢、累積數據與各設備資訊總覽，生成一份今日系統的運作現況摘要，並列出需要注意的關鍵指標。',
  //   },
  //   {
  //     icon: 'chart',
  //     label: '診斷數據異常與潛在風險',
  //     prompt:
  //       '請幫我交叉檢查畫面上的數據（如功率突波、INV 狀態數量、效益正負值等），找出是否有邏輯不符、設備異常或 API 斷線未連上的潛在風險？',
  //   },
  //   {
  //     icon: 'analytics',
  //     label: '分析今日累積效益與運算邏輯',
  //     prompt:
  //       '請針對當前的累積效益、發電量/充放電量進行商務邏輯分析，評估目前的演算模型（如電價計費、減碳係數、盈虧狀態）是否合理？',
  //   },
  // ],
  // storage: [
  //   {
  //     icon: 'lightbulb',
  //     label: '摘要',
  //     prompt:
  //       '請根據當前畫面的圖表走勢、累積數據與下方的設備狀態總覽，生成一份今日系統的運作現況與關鍵數據摘要。',
  //   },
  //   {
  //     icon: 'cube',
  //     label: '診斷數據異常與潛在風險',
  //     prompt:
  //       '請針對當前頁面的累積效益（金額、減碳量或充放電/發電量）進行商務邏輯評估，分析目前的演算模型（如電價差、減碳係數、盈虧狀態）是否合理？',
  //   },
  //   {
  //     icon: 'settings-slider',
  //     label: '生成此儲能系統的今日運作摘要與異常報告。',
  //     prompt: '生成此儲能系統的今日運作摘要與異常報告。',
  //   },
  // ],
};
