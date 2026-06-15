export const chatkitApiUrl =
  import.meta.env.VITE_CHATKIT_API_URL ?? 'http://localhost:8002/chatkit';

 
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
  billCharger: [
    {
      icon: 'lightbulb',
      label: '摘要',
      prompt: '請產生目前頁面摘要，重點列出用電費用、以及優化建議。',
    },
    {
      icon: 'plus',
      label: '總累積排碳量是透過什麼公式從用電量換算出來的？',
      prompt: '總累積排碳量是透過什麼公式從用電量換算出來的？',
    },
  ],
  billSolar: [
    {
      icon: 'lightbulb',
      label: '摘要',
      prompt: '請產生目前頁面摘要，重點列出用電費用、以及優化建議。',
    },
    {
      icon: 'info',
      label: '今天的天氣或日照計數據是否有異常紀錄？',
      prompt: '今天的天氣或日照計數據是否有異常紀錄？',
    },
    {
      icon: 'info',
      label: '如何計算累積效益？',
      prompt: '如何計算累積效益？',
    },
  ],

  home: [
    {
      icon: 'lightbulb',
      label: '摘要',
      prompt:
        '請產生目前頁面摘要，重點列出系統運行狀況、異常告警、用電費用、以及優化建議。',
    },
    {
      icon: 'square-text',
      label: '今日系統總結',
      prompt: '請幫我摘要今日截至目前的系統運行狀況，是否有任何異常？',
    },
    {
      icon: 'bolt',
      label: '節能與營運效益',
      prompt:
        '目前的時間電價下，我們的儲能與用電策略是最優解嗎？請給出摘要與建議。',
    },
    {
      icon: 'check',
      label: '設備與負載健康度',
      prompt: '從目前的設備配置與用電趨勢來看，是否有超約風險或設備閒置？',
    },
  ],
  report: [
    {
      icon: 'lightbulb',
      label: '摘要',
      prompt: '請產生目前頁面摘要，重點列出用電費用、以及優化建議。',
    },
    {
      icon: 'plus',
      label: '「光儲效益」與「光效益」怎麼計算出來？',
      prompt:
        '「光儲效益」與「光效益」具體是怎麼計算出來的？背後的數學公式是什麼？',
    },
    {
      icon: 'circle-question',
      label: '依據什麼模型決定儲能系統的放電量？',
      prompt: '系統是依據什麼預測模型來決定儲能系統的放電量？',
    },
  ],
  schedule: [
    {
      icon: 'lightbulb',
      label: '摘要',
      prompt:
        '請產生目前頁面摘要，重點列出今日的排程、即將到來的排程、以及優化建議。',
    },
    {
      icon: 'write',
      label: '如何新增一筆「時間電價套利」的排程？',
      prompt: '如何新增一筆「時間電價套利」的排程？',
    },
  ],
};
