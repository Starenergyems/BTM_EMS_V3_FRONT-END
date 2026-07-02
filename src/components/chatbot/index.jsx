import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

import ChatbotIcon from '@/assets/img/chatbot.png';
import Button from '@/components/units/button';
import { useBoolean } from '@/hooks/useBoolean';
import { pagesPathName } from '@/router';
import ChatComponent from './chatkit/index';
import {
  chatkitApiUrl,
 
} from './lib/config';

import ScopeStyle from './indexStyle';

function Chatbot() {
  const toggleChatbot = useBoolean(false);
  const location = useLocation();

  console.log('aaa', chatkitApiUrl);

  let pageName = '';

  Object.entries(pagesPathName).find(([key, value]) => {
    // 先檢查是否為物件且有 path
    if (value && typeof value === 'object' && value.path) {
      if (location.pathname === value.path) {
        pageName = key;
        return true;
      }
    }

    // 若有子物件，檢查子物件是否有符合的 path
    if (value && typeof value === 'object') {
      return Object.entries(value).some(([subKey, subValue]) => {
        if (subValue && `/${subValue.path}` === location.pathname) {
          pageName = subValue.routeName || subKey; // 優先使用 routeName，沒有則使用 subKey
          return true;
        }
        return false;
      });
    }

    return false;
  });

  return (
    <ScopeStyle>
      <Button
        className="chatbot-button"
        icon={<img alt="Chatbot" src={ChatbotIcon} />}
        onClick={toggleChatbot.onTrue}
        variant="icon"
      />
      {toggleChatbot.value && (
        <div className="chat-wrap">
          <Button
            className="chatbot-button-close"
            icon={<Icon fontSize="32" icon="fontisto:close" />}
            onClick={toggleChatbot.onFalse}
            variant="icon"
          />
          <ChatComponent pageName={pageName} />
        </div>
      )}
    </ScopeStyle>
  );
}

export default memo(Chatbot);
