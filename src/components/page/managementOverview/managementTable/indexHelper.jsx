import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import Button from '@/components/units/button';
import { omRole } from '@/slices/api/main/accounts/index';
import { formatTimestamp } from '@/utils/format';
import { Flex, Tooltip } from 'antd';
import { statusValues } from './indexConfig';

// useHelpers 為最外層 function，function 內區塊的撰寫順序由上而下為：
// 1. useCallback 需要相依的 function
// 2. api function
// 3. 一般 function
function useHelpers({ name, setisEdit, setState, state, toggle }) {
  const accountsState = useSelector((state) => state.accounts);
  const isSuperUser = accountsState?.omRole === omRole.superUser.value;

  /* Memoized Common Functions */
  // 表格是否 loading
  const setTableLoading = useCallback(
    (isLoading, tableTypeState) => {
      if (setState) {
        setState((prevState) => ({
          ...prevState,
          [tableTypeState]: isLoading,
        }));
      }
    },
    [setState],
  );

  // 取得得標狀態的表格欄位
  function getColumnDatas() {
    return [
      {
        align: 'center',
        dataIndex: 'name',
        render: (value) => value || '--',
        title: '姓名',
      },
      {
        align: 'center',
        dataIndex: 'permission',
        render: (value) => value || '--',
        title: '權限等級',
      },
      {
        align: 'center',
        dataIndex: 'status',
        render: (value) => statusValues[value] || '--',
        title: '帳號狀態',
      },

      {
        align: 'center',
        dataIndex: 'note',
        render: (value) => value || '--',
        title: '附註',
      },
      {
        align: 'center',
        dataIndex: 'lasttime',
        render: (value) => formatTimestamp(value),
        title: '最後登入時間',
      },
      name === 'permissionManagement' && isSuperUser
        ? {
            align: 'center',
            className: 'edit-column',
            dataIndex: 'action',
            fixed: 'right',
            render: () => (
              <Flex align="center" gap={8} justify="center">
                <Tooltip title="編輯帳號">
                  <Button
                    onClick={() => {
                      toggle.onTrue();
                      setisEdit(true);
                    }}
                    variant="icon"
                  >
                    <Icon fontSize="20" icon="fa6-solid:pen" />
                  </Button>
                </Tooltip>
                <Tooltip title="刪除帳號">
                  <Button
                    onClick={() => {
                      toggle.onTrue();
                      setisEdit(true);
                    }}
                    variant="icon"
                  >
                    <Icon fontSize="24" icon="mdi:garbage" />
                  </Button>
                </Tooltip>
              </Flex>
            ),
            title: '',
          }
        : {},
    ];
  }

  // 選擇角色名稱
  const handleSelectChange = (permission) => {
    const data = [...state.data];

    const filteredData = data.filter((item) => {
      if (permission === '') {
        return true;
      }
      return item.permission === permission;
    });

    setState((prevState) => ({
      ...prevState,
      filteredDatas: filteredData,
    }));
  };

  return {
    getColumnDatas,
    handleSelectChange,
    setTableLoading,
  };
}

export { useHelpers };
