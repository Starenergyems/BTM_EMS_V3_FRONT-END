import { useCallback } from 'react';
import { Icon } from '@iconify/react';
import { color } from '@/styles/variable/indexStyle';
import { alertOptions } from '@/components/page/alarmOverview/indexConfig';
import { flowDatas } from '@/pages/page/home/flow/indexConfig';

// useHelpers 為最外層 function，function 內區塊的撰寫順序由上而下為：
// 1. useCallback 需要相依的 function
// 2. api function
// 3. 一般 function
function useHelpers({ name }) {
  /* Memoized Common Functions */

  // 取得得標狀態的表格欄位
  function getColumnDatas() {
    return [
      {
        dataIndex: 'level',
        title: '燈號',
        align: 'center',
        sorter: true,
        render: (value) => {
          const renderColor = alertOptions[value]?.color || color.black;

          return (
            <Icon
              icon="si:alert-line"
              color={renderColor}
              fontSize={24}
              style={{ width: '24px', height: '24px' }}
            />
          );
        },
      },
      {
        dataIndex: 'type',
        title: '種類',
        align: 'center',
        // sorter: true,
        render: (value) =>
          flowDatas.find((flow) => flow.titleEn === value)?.title || '--',
      },
      {
        dataIndex: 'id',
        title: '編號',
        align: 'center',
        sorter: true,
        render: (value) => value || '--',
      },
      {
        dataIndex: 'value',
        title: '數值',
        align: 'center',
        render: (value) => value || '--',
      },
      {
        dataIndex: 'content',
        title: '告警原因',
        align: 'center',
        render: (value) => value || '--',
      },
      {
        dataIndex: 'occurence_time',
        title: '起始時間',
        align: 'center',
        render: (value) => value || '--',
      },
      name === 'historic'
        ? {
            dataIndex: 'recover_time',
            title: '復歸時間',
            align: 'center',
            render: (value) => value || '--',
          }
        : {},
    ];
  }

  return {
    getColumnDatas,
  };
}

export { useHelpers };
