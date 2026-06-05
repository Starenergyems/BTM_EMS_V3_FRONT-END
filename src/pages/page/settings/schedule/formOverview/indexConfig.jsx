export const ExtraFormFields = {
  demand_response: [
    {
      componentProps: {
        inputAttr: {
          placeholder: '請選擇操作',
        },
      },
      formItemAttr: {
        label: '市場',
        name: 'demand_response_market',
        options: [
          {
            label: 'sReg',
            value: 'sReg',
          },
          {
            label: '補充備轉',
            value: 'supplemental',
          },
        ],
        rules: [{ message: '請輸入操作', required: true }],
        themecategory: 'circle-light',
      },
      variants: 'select',
    },
    {
      componentProps: {
        inputAttr: {
          placeholder: '請輸入功率',
        },
      },
      formItemAttr: {
        inputPattern: 'number',
        label: '功率',
        name: 'offer_kw',
        rules: [{ message: '請輸入功率', required: true }],
        unit: 'kW',
      },
      variants: 'input',
    },
  ],
  spinning: [
    {
      componentProps: {
        inputAttr: {
          placeholder: '請輸入功率',
        },
      },
      formItemAttr: {
        inputPattern: 'number',
        label: '功率',
        name: 'offer_kw',
        rules: [{ message: '請輸入功率', required: true }],
        unit: 'kW',
      },
      variants: 'input',
    },
  ],
  user_battery_schedule: [
    {
      componentProps: {
        inputAttr: {
          placeholder: '請選擇操作',
        },
      },
      formItemAttr: {
        label: '操作',
        name: 'operation',
        options: [
          {
            label: '充電',
            value: 'charge',
          },
          {
            label: '放電',
            value: 'discharge',
          },
        ],
        rules: [{ message: '請輸入操作', required: true }],
        themecategory: 'circle-light',
      },
      variants: 'select',
    },
    {
      componentProps: {
        inputAttr: {
          placeholder: '請輸入功率',
        },
      },
      formItemAttr: {
        inputPattern: 'number',
        label: '功率',
        name: 'value',
        rules: [{ message: '請輸入功率', required: true }],
        unit: 'kW',
      },
      variants: 'input',
    },
    {
      componentProps: {
        inputAttr: {
          placeholder: '請輸入SOC數值',
        },
      },
      formItemAttr: {
        inputPattern: 'number',
        label: 'SOC',
        name: 'stop_soc',
        rules: [
          { message: '請輸入SOC數值', required: true },
          {
            validator: (_, value) => {
              if (!value) return Promise.resolve();
              const isValuable = value > 0 && value <= 100;
              if (!isValuable) {
                return Promise.reject(
                  new Error('SOC 數值必須在 1 到 100 之間'),
                );
              }
              return Promise.resolve();
            },
          },
        ],
        unit: '%',
      },
      variants: 'input',
    },
  ],
};

const labels = [
  {
    formItemAttr: {
      label: '報價功率',
      name: 'offer_kw',
    },
  },
  {
    formItemAttr: {
      label: '報價功率',
      name: 'reserve_kw',
    },
  },
];
export const ExtraLabels = {
  demand_guaranteed: labels,
  demand_monthly_pick: labels,
  guaran_response: labels,
};
