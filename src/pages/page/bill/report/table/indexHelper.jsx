// useHelpers 為最外層 function，function 內區塊的撰寫順序由上而下為：
// 1. useCallback 需要相依的 function
// 2. api function
// 3. 一般 function
function useHelpers({ date, type }) {
  /* Memoized Common Functions */

  // 取得得標狀態的表格欄位
  function getColumnDatas() {
    return [
      {
        dataIndex: 'time',
        title: '起始時間',
        align: 'center',
        render: (value) =>
          (
            <span>
              {type === 'day'
                ? `${date} ${value}`
                : type === 'month'
                  ? `${value}`
                  : `${value} 月`}
            </span>
          ) || '--',
      },
      type === 'day'
        ? {
            dataIndex: 'price_list',
            title: (
              <div>
                時間電價
                <br /> (NT$)
              </div>
            ),
            align: 'center',
            render: (value) => value || '--',
          }
        : {},
      {
        dataIndex: 'solar_benefit_hourly_sums',
        title: (
          <div>
            光效益
            <br /> (NT$)
          </div>
        ),
        align: 'center',
        render: (value) => value || '--',
      },
      {
        dataIndex: 'acc_solar_battery_benefit_hourly_sums',
        title: (
          <div>
            光儲效益
            <br /> (NT$)
          </div>
        ),
        align: 'center',
        render: (value) => value || '--',
      },
    ];
  }

  return {
    getColumnDatas,
  };
}

export { useHelpers };
