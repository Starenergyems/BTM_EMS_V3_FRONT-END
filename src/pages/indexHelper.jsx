import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { pagesPathName } from "@/router";
import {
  setSelectedKeys,
  setSeoncdarySelectedKeys,
  setSiderCollapsed,
} from "@/slices/menu";
import { clearToken } from "@/slices/api/main/token";

// 取得路徑與設定左側選單項目

const getesPathName = (item) => {
  return Object.keys(item).map((key) => {
    return {
      key: item[key].path,
      label: <Link to={item[key].path}>{item[key].pathName}</Link>,
    };
  });
};

function useHelpers ({
  dispatch,
  instance,
  navigate,
  mcalAccounts,
  setMainState,
}) {

  // Menu 上方區塊
  function getMenuMainItems (omRole) {
    const items = [
      {
        key: 'setting',
        icon: <Icon icon="lucide:settings-2" />,
        label: '設定頁面',
        children: getesPathName(pagesPathName.setting),
      },
      {
        key: 'bill',
        icon: <Icon icon="tabler:cash-register" />,
        label: '電費計算',
        children: getesPathName(pagesPathName.bill),
      },
      {
        key: 'storage',
        icon: <Icon icon="la:car-battery" />,
        label: <Link to={pagesPathName.storage.path}>儲能系統</Link>,
      },
      {
        key: 'solar',
        icon: <Icon icon="ion:sunny" />,
        // label: "太陽能",
        label: <Link to={pagesPathName.solar.path}>太陽能</Link>,
      },
      {
        key: 'charger',
        icon: <Icon icon="streamline-ultimate:charger-1-bold" />,
        label: <Link to={pagesPathName.charger.path}>充電樁</Link>,
      },
      {
        key: 'alarm',
        icon: <Icon icon="icon-park-outline:alarm" />,
        label: '告警系統',
        children: getesPathName(pagesPathName.alarm),
      },
      {
        key: 'realTimeSpinningReserve',
        icon: <Icon icon="lucide-lab:houses" />,
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
  function getMenuOtherItems (omRole) {
    const items = [
      {
        key: "PersonIcon",
        icon: <Icon icon="bi:person-circle" />,
        label: "使用者資訊",
        children: getesPathName(pagesPathName.profile),
      },
      {
        key: "system",
        icon: <Icon icon="mdi:gear" />,
        label: "系統管理",
        children: getesPathName(pagesPathName.systemSetting),
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
  function filterMenuItem (items, permissionsItems, levelItems, omRole) {
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
            omRole
          );
        }
      }
    }
    return arr;
  }
  //左側選單滑鼠移入事件
  function handleOnMouseEnter () {
    dispatch(setSiderCollapsed(false));
  }
  //左側選單滑鼠移出事件
  function handleOnMouseLeave () {
    dispatch(setSiderCollapsed(true));
  }
  //左側主選單收合/打開事件
  function handleSiderOpen (isCollapsed) {
    dispatch(setSiderCollapsed(isCollapsed));
  }
  //左側主選單選擇事件
  function menuOnSelect ({ key }) {
    dispatch(setSelectedKeys(key));
    dispatch(setSeoncdarySelectedKeys([]));
    // navigate(key);
  }
  //左側主選單功能選擇事件(重要數據、使用者資訊、系統設定、登出、緊急停機)
  function menuFeatureOnSelect ({ key }) {
    dispatch(setSelectedKeys([]));
    dispatch(setSeoncdarySelectedKeys(key));
    switch (key) {
      case "logout": {
        dispatch(clearToken());
        dispatch({ type: "reset" });
        dispatch(setSelectedKeys([]));
        dispatch(setSeoncdarySelectedKeys([]));
        if (mcalAccounts.length > 0) {
          instance.logoutPopup();
        }
        navigate(pagesPathName.login.path);
        break;
      }
      case "importantInfo":
      case "shutdown": {
        // 交由 menuFeatureOnClick 處理
        break;
      }
      default: {
        navigate(key);
      }
    }
  }
  // 左側主選單功能 click 事件(重要數據、使用者資訊、系統設定、登出、緊急停機)
  function menuFeatureOnClick ({ key }) {
    switch (key) {
      case "shutdown": {
        setModalOpen("isShutdownModalOpen", true);
        break;
      }
      case "importantInfo": {
        setModalOpen("isShowImportantInfoModalOpen", true);
        break;
      }
    }
  }
  // LOGO 點擊事件
  function handleClickLogo () {
    dispatch(setSelectedKeys([]));
    dispatch(setSeoncdarySelectedKeys([]));
    navigate(pagesPathName.home.path);
  }
  // layout.sider 移除內聯樣式 (scrollbar)
  function removeSiderInlineStyle (element) {
    if (element) {
      element.style.removeProperty("scrollbar-gutter");
      element.style.removeProperty("scrollbar-width");
    }
  }
  // modal 是否顯示
  function setModalOpen (type, isOpen) {
    setMainState((prevState) => ({
      ...prevState,
      [type]: isOpen,
    }));
  }

  return {
    getMenuMainItems,
    getMenuOtherItems,
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleSiderOpen,
    handleClickLogo,
    menuOnSelect,
    menuFeatureOnClick,
    menuFeatureOnSelect,
    removeSiderInlineStyle,
    setModalOpen,
  };
}

export { useHelpers };


