import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { useLocation } from 'react-router-dom';
import { color } from '@/styles/variable/indexStyle';
import { Layout, Menu } from 'antd';
import { getAccountsInfo } from '@/slices/api/main/accounts/indexHelper';
import logoSrc from '@/assets/img/logo.png';
import logoWithWordSrc from '@/assets/img/logoWithWord.png';
import ShutdownModal from './shutdownModal';
import { useHelpers } from './indexHelper';
import ScopeStyle from './indexStyle';

function PageIndex() {
  const apiDispatch = useDispatch();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accountsState = useSelector((state) => state.apiAccounts);
  const layoutState = useSelector((state) => state.layout);
  const menuState = useSelector((state) => state.menu);
  const tokenState = useSelector((state) => state.apiToken);
  const { instance, accounts: mcalAccounts } = useMsal();
  const [mainState, setMainState] = useState({
    isShowImportantInfoModalOpen: false,
    isShutdownModalOpen: false,
  });
  const {
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
  } = useHelpers({ dispatch, instance, mcalAccounts, navigate, setMainState });

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
      style={{ '--layout-background': layoutBackground }}
      $collapsed={menuState.siderIsCollapsed}
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
              ref={removeSiderInlineStyle}
              onCollapse={handleSiderOpen}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            >
              <div className="logo-container">
                {menuState.siderIsCollapsed ? (
                  <Link to={'/'}>
                    <img
                      className="img-logo"
                      src={logoSrc}
                      alt="logo"
                      onClick={handleClickLogo}
                    />
                  </Link>
                ) : (
                  <Link to={'/'}>
                    <img
                      className="img-logo-with-word"
                      src={logoWithWordSrc}
                      alt="logo with word"
                      onClick={handleClickLogo}
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
            <Outlet />
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
