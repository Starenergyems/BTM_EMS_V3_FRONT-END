import { Icon } from '@iconify/react';
import { alertOptions } from '@/components/page/alarmOverview/indexConfig';
import { flowDatas } from '@/pages/page/home/flow/indexConfig';
import { color } from '@/styles/variable/indexStyle';

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
        align: 'center',
        dataIndex: 'level',
        render: (value) => {
          const renderColor = alertOptions[value]?.color || color.black;

          return (
            <Icon
              color={renderColor}
              fontSize={24}
              icon="si:alert-line"
              style={{ height: '24px', width: '24px' }}
            />
          );
        },
        sorter: true,
        title: '燈號',
      },
      {
        align: 'center',
        dataIndex: 'type',
        // sorter: true,
        render: (value) =>
          flowDatas.find((flow) => flow.titleEn === value)?.title || '--',
        title: '種類',
      },
      {
        align: 'center',
        dataIndex: 'id',
        render: (value) => value || '--',
        sorter: true,
        title: '編號',
      },
      {
        align: 'center',
        dataIndex: 'value',
        render: (value) => value || '--',
        title: '數值',
      },
      {
        align: 'center',
        dataIndex: 'content',
        render: (value) => value || '--',
        title: '告警原因',
      },
      {
        align: 'center',
        dataIndex: 'occurence_time',
        render: (value) => value || '--',
        title: '起始時間',
      },
      name === 'historic'
        ? {
            align: 'center',
            dataIndex: 'recover_time',
            render: (value) => value || '--',
            title: '復歸時間',
          }
        : {},
    ];
  }

  return {
    getColumnDatas,
  };
}

export { useHelpers };
