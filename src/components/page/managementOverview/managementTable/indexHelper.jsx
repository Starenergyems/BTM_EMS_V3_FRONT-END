import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { formatTimestamp } from '@/utils/format';
import { omRole } from '@/slices/api/main/accounts/index';
import Button from '@/components/units/button';
import { statusValues } from './indexConfig';
import style from '../indexStyle';

// useHelpers 為最外層 function，function 內區塊的撰寫順序由上而下為：
// 1. useCallback 需要相依的 function
// 2. api function
// 3. 一般 function
function useHelpers({ state, setState, name, toggle }) {
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
      name === 'permissionManagement'
        ? {
            dataIndex: 'id',
            title: '工號',
            align: 'center',
            fixed: 'right',
            render: (value) => value || '--',
          }
        : {},
      {
        dataIndex: 'name',
        title: '姓名',
        align: 'center',
        render: (value) => value || '--',
      },
      {
        dataIndex: 'company',
        title: '公司名稱',
        align: 'center',
        render: (value) => value || '--',
      },
      {
        dataIndex: 'permission',
        title: '權限等級',
        align: 'center',
        render: (value) => value || '--',
      },
      {
        dataIndex: 'status',
        title: '帳號狀態',
        align: 'center',
        render: (value) => statusValues[value] || '--',
      },

      {
        dataIndex: 'note',
        title: '附註',
        align: 'center',
        render: (value) => value || '--',
      },
      {
        dataIndex: 'lasttime',
        title: '最後登入時間',
        align: 'center',
        render: (value) => formatTimestamp(value),
      },
      name === 'permissionManagement' && isSuperUser
        ? {
            dataIndex: 'action',
            title: '操作',
            align: 'center',
            fixed: 'right',
            className: 'edit-column',
            render: () => (
              <Button variant="icon" onClick={() => toggle.onTrue()}>
                <Icon icon="fa6-solid:pen" fontSize="24" />
              </Button>
            ),
          }
        : {},
    ];
  }

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
    setTableLoading,
    handleSelectChange,
  };
}

export { useHelpers };
