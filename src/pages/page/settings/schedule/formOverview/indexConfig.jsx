export const ExtraFormFields = {
  spinning: [
    {
      formItemAttr: {
        label: '功率',
        name: 'offer_kw',
        inputPattern: 'number',
        unit: 'kW',
        rules: [{ required: true, message: '請輸入功率' }],
      },
      variants: 'input',
      componentProps: {
        inputAttr: {
          placeholder: '請輸入功率',
        },
      },
    },
  ],
  user_battery_schedule: [
    {
      formItemAttr: {
        label: '操作',
        name: 'operation',
        themecategory: 'circle-light',
        rules: [{ required: true, message: '請輸入操作' }],
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
      },
      variants: 'select',
      componentProps: {
        inputAttr: {
          placeholder: '請選擇操作',
        },
      },
    },
    {
      formItemAttr: {
        label: '功率',
        name: 'value',
        inputPattern: 'number',
        unit: 'kW',
        rules: [{ required: true, message: '請輸入功率' }],
      },
      variants: 'input',
      componentProps: {
        inputAttr: {
          placeholder: '請輸入功率',
        },
      },
    },
    {
      formItemAttr: {
        label: 'SOC',
        name: 'stop_soc',
        inputPattern: 'number',
        unit: '%',
        rules: [
          { required: true, message: '請輸入SOC數值' },
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
      },
      variants: 'input',
      componentProps: {
        inputAttr: {
          placeholder: '請輸入SOC數值',
        },
      },
    },
  ],
  demand_response: [
    {
      formItemAttr: {
        label: '市場',
        name: 'demand_response_market',
        themecategory: 'circle-light',
        rules: [{ required: true, message: '請輸入操作' }],
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
      },
      variants: 'select',
      componentProps: {
        inputAttr: {
          placeholder: '請選擇操作',
        },
      },
    },
    {
      formItemAttr: {
        label: '功率',
        name: 'offer_kw',
        inputPattern: 'number',
        unit: 'kW',
        rules: [{ required: true, message: '請輸入功率' }],
      },
      variants: 'input',
      componentProps: {
        inputAttr: {
          placeholder: '請輸入功率',
        },
      },
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
  demand_monthly_pick: labels,
  demand_guaranteed: labels,
  guaran_response: labels,
};
