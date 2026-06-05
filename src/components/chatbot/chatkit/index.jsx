import { useMemo, useState } from 'react';
import { ChatKit, useChatKit } from '@openai/chatkit-react';

import { pagesPathName, router } from '@/router';

import {
  chatkitApiUrl,
  chatkitDomainKey,
  DOCS_PROMPTS,
  GREETING,
  PAGES_PROMPTS,
  STARTER_PROMPTS,
  TOOLS,
} from '../lib/config';
import ScopeStyle from './indexStyle';

const getPrefillEvent = (params) => {
  if (!params || typeof params !== 'object') return null;

  return params.prefillEvent || params.event || params.calendarEvent || params;
};

export default function ChatComponent ({ pageName }) {
  console.log('pageNamepageName', pageName);
  const [, setChatkitError] = useState('');
  const [selectedToolId, setSelectedToolId] = useState(null);

  const activePrompts = useMemo(() => {
    switch (selectedToolId) {
      case TOOLS.globe:
        return STARTER_PROMPTS;
      case TOOLS.search_docs:
        return DOCS_PROMPTS;
      default:
        return PAGES_PROMPTS?.[pageName] ?? STARTER_PROMPTS;
    }
  }, [pageName, selectedToolId]);

  const handleCalendarAction = async (action) => {
    console.log('Handling calendar action:', action);
    if (!action?.type) return;

    const prefillEvent = getPrefillEvent(action?.payload);

    switch (action.type) {
      case 'get_calendar.redirect':
        await router.navigate(`/${pagesPathName.setting.schedule.path}`);
        break;
      case 'set_calendar.redirect': {
        await router.navigate(`/${pagesPathName.setting.schedule.path}`, {
          state: { prefillEvent },
        });
        break;
      }

      case 'set_demandRp.redirect':
        await router.navigate(`/${pagesPathName.setting.demandRp.path}`, {
          state: { prefillEvent },
        });
        break;

      case 'set_setting.redirect':
        await router.navigate(`/${pagesPathName.setting.setting.path}`, {
          state: { prefillEvent },
        });
        break;

      default:
        console.warn('Unknown action type:', action.type);
    }
  };

  const { control } = useChatKit({
    api: {
      domainKey: chatkitDomainKey,
      fetch: (input, init) => {
        console.log('selectedToolId???', selectedToolId);
        const headers = new Headers(init?.headers);

        headers.set('X-Page', pageName ?? '');
        headers.set('X-Tool-Id', selectedToolId ?? '');

        return fetch(input, {
          ...init,
          headers,
        });
      },
      url: chatkitApiUrl,
    },
    composer: {
      placeholder: '請輸入訊息',
      // tools: [
      //   {
      //     icon: 'globe',
      //     id: TOOLS.globe,
      //     label: '全站模式',
      //     persistent: true,
      //     pinned: false,
      //     placeholderOverride: '搜索全站或編輯内容...',
      //     shortLabel: '全站模式',
      //   },
      //   {
      //     icon: 'book-open',
      //     id: TOOLS.search_docs,
      //     label: '查詢文件',
      //     persistent: true,
      //     pinned: false,
      //     placeholderOverride: '詢問官方資料、文件、規格或規則',
      //     shortLabel: '文件',
      //   },
      // ],
    },
    locale: 'en-US',
    onClientTool: async (toolCall) => {
      console.log('Tool called:', toolCall);
    },
    onError: ({ error }) => {
      setChatkitError(error?.message || 'ChatKit 發生錯誤');
    },
    onLog: (event) => {
      console.log('ChatKit log:', event);
    },
    onReady: () => {},
    onToolChange: ({ toolId }) => {
      console.log('Tool changed:', toolId);

      setSelectedToolId(toolId);

      console.log('Composer tool changed:', toolId);
    },
    startScreen: {
      greeting: GREETING,
      prompts: activePrompts,
    },
    widgets: {
      onAction: async (action, widgetItem) => {
        console.log('Widget action:', action, widgetItem);
        await handleCalendarAction(action);
      },
    },
  });

  return (
    <ScopeStyle>
      <ChatKit className="chat-bot" control={control} />
    </ScopeStyle>
  );
}
