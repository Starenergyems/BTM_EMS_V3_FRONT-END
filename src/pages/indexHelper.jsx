import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { pagesPathName } from '@/router';
import { clearToken } from '@/slices/api/main/token';
import {
  setSelectedKeys,
  setSeoncdarySelectedKeys,
  setSiderCollapsed,
} from '@/slices/menu';

// 取得路徑與設定左側選單項目

const getesPathName = (item) => {
  return Object.keys(item).map((key) => {
    return {
      key: item[key].path,
      label: <Link to={item[key].path}>{item[key].pathName}</Link>,
    };
  });
};

function useHelpers({
  dispatch,
  instance,
  mcalAccounts,
  navigate,
  setMainState,
  siderIsCollapsed,
}) {
  // Menu 上方區塊
  function getMenuMainItems(omRole) {
    const items = [
      {
        children: getesPathName(pagesPathName.setting),
        icon: <Icon icon="lucide:settings-2" />,
        key: 'group-setting',
        label: '設定頁面',
      },
      {
        children: getesPathName(pagesPathName.bill),
        icon: <Icon icon="tabler:cash-register" />,
        key: 'group-bill',
        label: '電費計算',
      },
      {
        icon: <Icon icon="la:car-battery" />,
        key: 'storage',
        label: <Link to={pagesPathName.storage.path}>儲能系統</Link>,
      },
      {
        icon: <Icon icon="ion:sunny" />,
        key: 'solar',
        // label: "太陽能",
        label: <Link to={pagesPathName.solar.path}>太陽能</Link>,
      },
      {
        icon: <Icon icon="streamline-ultimate:charger-1-bold" />,
        key: 'charger',
        label: <Link to={pagesPathName.charger.path}>充電樁</Link>,
      },
      {
        children: getesPathName(pagesPathName.alarm),
        icon: <Icon icon="icon-park-outline:alarm" />,
        key: 'group-alarm',
        label: '告警系統',
      },
      {
        icon: <Icon icon="lucide-lab:houses" />,
        key: 'realTimeSpinningReserve',
        label: (
          <Link to={pagesPathName.realTimeSpinningReserve.path}>輔助服務</Link>
        ),
      },
      // {
      //   key: "demo",
      //   icon: <Icon icon="tabler:cash-register" />,
      //   label: "示範頁面",
      //   children: [
      //     {
      //       key: pagesPathName.demo.path,
      //       label: "示範客製化className使用",
      //     },
      //   ],
      // },
    ];
    const permissionsItems = [];
    for (const pageName of Object.keys(pagesPathName)) {
      const pageItem = pagesPathName[pageName];
      if (
        Array.isArray(pageItem.permissions) &&
        pageItem.permissions.length > 0
      ) {
        permissionsItems.push(pageItem);
      }
    }
    return filterMenuItem(items, permissionsItems, [], omRole);
  }
  // Menu 下方區塊
  function getMenuOtherItems(omRole) {
    const items = [
      {
        children: getesPathName(pagesPathName.profile),
        icon: <Icon icon="bi:person-circle" />,
        key: 'group-person',
        label: '使用者資訊',
      },
      {
        children: getesPathName(pagesPathName.systemSetting),
        icon: <Icon icon="mdi:gear" />,
        key: 'group-system',
        label: '系統管理',
      },
      // {
      //   key: "logout",
      //   icon: <Icon icon="icon-park-outline:logout" width={40} />,
      //   label: "登出",
      // },
    ];
    const permissionsItems = [];
    for (const pageName of Object.keys(pagesPathName)) {
      const pageItem = pagesPathName[pageName];
      if (
        Array.isArray(pageItem.permissions) &&
        pageItem.permissions.length > 0
      ) {
        permissionsItems.push(pageItem);
      }
    }
    return filterMenuItem(items, permissionsItems, [], omRole);
  }

  // Menu 巢狀設計
  function filterMenuItem(items, permissionsItems, levelItems, omRole) {
    const arr = [];
    for (const [index, item] of items.entries()) {
      arr.push(item);
      for (const permissionsItem of permissionsItems) {
        if (item.key === permissionsItem.path) {
          if (!permissionsItem.permissions.includes(omRole)) {
            arr.pop();
            // 同階層的項目為 0
            if (arr.length < 1) {
              levelItems.splice(index, 1);
            }
          }
        }
        if (item.children) {
          item.children = filterMenuItem(
            item.children,
            permissionsItems,
            arr,
            omRole,
          );
        }
      }
    }
    return arr;
  }
  //左側選單滑鼠移入事件
  function handleOnMouseEnter() {
    if (siderIsCollapsed) {
      dispatch(setSiderCollapsed(false));
    }
  }
  //左側選單滑鼠移出事件
  function handleOnMouseLeave() {
    if (!siderIsCollapsed) {
      dispatch(setSiderCollapsed(true));
    }
  }
  //左側主選單收合/打開事件
  function handleSiderOpen() {
    dispatch(setSiderCollapsed((siderIsCollapsed) => !siderIsCollapsed));
  }
  //左側主選單選擇事件
  function menuOnSelect({ key }) {
    dispatch(setSelectedKeys(key));
    dispatch(setSeoncdarySelectedKeys([]));
    // navigate(key);
  }
  //左側主選單功能選擇事件(重要數據、使用者資訊、系統設定、登出、緊急停機)
  function menuFeatureOnSelect({ key }) {
    dispatch(setSelectedKeys([]));
    dispatch(setSeoncdarySelectedKeys(key));
    switch (key) {
      case 'importantInfo':
      case 'shutdown': {
        // 交由 menuFeatureOnClick 處理
        break;
      }
      case 'logout': {
        dispatch(clearToken());
        dispatch({ type: 'reset' });
        dispatch(setSelectedKeys([]));
        dispatch(setSeoncdarySelectedKeys([]));
        if (mcalAccounts.length > 0) {
          instance.logoutPopup();
        }
        navigate(pagesPathName.login.path);
        break;
      }
      default: {
        navigate(key);
      }
    }
  }
  // 左側主選單功能 click 事件(重要數據、使用者資訊、系統設定、登出、緊急停機)
  function menuFeatureOnClick({ key }) {
    switch (key) {
      case 'importantInfo': {
        setModalOpen('isShowImportantInfoModalOpen', true);
        break;
      }
      case 'shutdown': {
        setModalOpen('isShutdownModalOpen', true);
        break;
      }
    }
  }
  // LOGO 點擊事件
  function handleClickLogo() {
    dispatch(setSelectedKeys([]));
    dispatch(setSeoncdarySelectedKeys([]));
    navigate(pagesPathName.home.path);
  }
  // layout.sider 移除內聯樣式 (scrollbar)
  function removeSiderInlineStyle(element) {
    if (element) {
      element.style.removeProperty('scrollbar-gutter');
      element.style.removeProperty('scrollbar-width');
    }
  }
  // modal 是否顯示
  function setModalOpen(type, isOpen) {
    setMainState((prevState) => ({
      ...prevState,
      [type]: isOpen,
    }));
  }

  return {
    getMenuMainItems,
    getMenuOtherItems,
    handleClickLogo,
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleSiderOpen,
    menuFeatureOnClick,
    menuFeatureOnSelect,
    menuOnSelect,
    removeSiderInlineStyle,
    setModalOpen,
  };
}

export { useHelpers };
