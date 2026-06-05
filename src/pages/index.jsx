import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import logoSrc from '@/assets/img/logo.png';
import logoWithWordSrc from '@/assets/img/logoWithWord.png';
import Chatbot from '@/components/chatbot';
import { getAccountsInfo } from '@/slices/api/main/accounts/indexHelper';
import { Layout, Menu } from 'antd';
import { useHelpers } from './indexHelper';
import ShutdownModal from './shutdownModal';
import ScopeStyle from './indexStyle';
import { color } from '@/styles/variable/indexStyle';

function PageIndex() {
  const apiDispatch = useDispatch();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accountsState = useSelector((state) => state.apiAccounts);
  const menuState = useSelector((state) => state.menu);

  const tokenState = useSelector((state) => state.apiToken);
  const { accounts: mcalAccounts, instance } = useMsal();
  const [mainState, setMainState] = useState({
    isShowImportantInfoModalOpen: false,
    isShutdownModalOpen: false,
  });
  const {
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
  } = useHelpers({
    dispatch,
    instance,
    mcalAccounts,
    navigate,
    setMainState,
    siderIsCollapsed: menuState.siderIsCollapsed,
  });

  const location = useLocation();

  // 暫時在 realTimeSpinningReserve 隱藏側邊選單
  const noSideBar = location?.pathname !== '/realTimeSpinningReserve';

  // 判斷頁面背景顏色
  const systemPathname = location?.pathname === '/system';

  const layoutBackground = systemPathname
    ? `linear-gradient(90deg, #435162 0%, #8D969B 100%)`
    : `linear-gradient(180deg, ${color.themeBlue} 0%, ${color.themeBlack} 100%)`;

  useEffect(() => {
    if (tokenState?.access) {
      apiDispatch(getAccountsInfo()).unwrap();
    }
  }, [tokenState?.access, apiDispatch]);

  return (
    <ScopeStyle
      $collapsed={menuState.siderIsCollapsed}
      style={{ '--layout-background': layoutBackground }}
    >
      {/* <Link to={pagesPathName.home.path}>
      </Link> */}
      {/* {tokenState.access ? ( */}
      <>
        {/* {accountsState.omRole !== null && ( */}
        <Layout hasSider>
          {noSideBar && ( // 暫時在 realTimeSpinningReserve 隱藏側邊選單
            <Layout.Sider
              className="main-menu"
              collapsed={menuState.siderIsCollapsed}
              onCollapse={handleSiderOpen}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
              ref={removeSiderInlineStyle}
            >
              <div className="logo-container">
                {menuState.siderIsCollapsed ? (
                  <Link to={'/'}>
                    <img
                      alt="logo"
                      className="img-logo"
                      onClick={handleClickLogo}
                      src={logoSrc}
                    />
                  </Link>
                ) : (
                  <Link to={'/'}>
                    <img
                      alt="logo with word"
                      className="img-logo-with-word"
                      onClick={handleClickLogo}
                      src={logoWithWordSrc}
                    />
                  </Link>
                )}
              </div>
              <Menu
                className="mg-t-30"
                items={getMenuMainItems(accountsState?.omRole)}
                mode="vertical"
                onSelect={menuOnSelect}
                selectedKeys={menuState.selectedKeys}
                theme="dark"
              />
              <Menu
                className="other-container"
                items={getMenuOtherItems(accountsState?.omRole)}
                mode="vertical"
                onClick={menuFeatureOnClick}
                onSelect={menuFeatureOnSelect}
                selectedKeys={menuState.seoncdarySelectedKeys}
                theme="dark"
              />
            </Layout.Sider>
          )}
          <Layout className={`layout-cotent ${noSideBar ? '' : 'no-side-bar'}`}>
            <div className="container">
              <Outlet />
            </div>
            <Chatbot />
          </Layout>
        </Layout>
        <ShutdownModal
          isModalOpen={mainState.isShutdownModalOpen}
          setModalOpen={(isOpen) => setModalOpen('isShutdownModalOpen', isOpen)}
        />
        {/* )} */}
      </>
      {/* ) : (  <Login />
       )} */}
    </ScopeStyle>
  );
}
export default PageIndex;
