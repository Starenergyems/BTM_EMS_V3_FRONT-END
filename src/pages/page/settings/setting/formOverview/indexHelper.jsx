import { api } from '@/slices/api/setting';
import { endpoints } from '@/utils/endpoints';
import { errorMsgHandler, successMsgHandler } from '@/utils/helpers';

export const formConfig = (formInstance) => {
  const getFieldValue = (name) => formInstance.getFieldValue(name);

  const positiveValueValidator = (value) => {
    if (value && value < 0) {
      return Promise.reject(new Error('設定數值須為正數'));
    }

    return Promise.resolve();
  };

  const overValueValidator = async (value) => {
    await positiveValueValidator(value);
    if (value && value > 100) {
      return Promise.reject(new Error('數值不可大於 100'));
    }

    return Promise.resolve();
  };

  // 驗證 contract（契約容量）字段
  const contractValidator = async (value) => {
    await positiveValueValidator(value);

    const over = Number(getFieldValue('over'));
    const reverse = Number(getFieldValue('reverse'));

    // contract 必須大於 over 和 reverse
    if (value && (value < over || value < reverse)) {
      return Promise.reject(new Error('契約容量必須大於超約數值和逆流數值'));
    }
    return Promise.resolve();
  };

  // 驗證 over（超約數值）字段
  const overValidator = async (value) => {
    await positiveValueValidator(value);

    const contract = Number(getFieldValue('contract'));
    const reverse = Number(getFieldValue('reverse'));

    // over 必須小於 contract 且大於 reverse
    if (value) {
      if (contract && value > contract) {
        return Promise.reject(new Error('超約數值必須小於契約容量'));
      }
      if (reverse && value < reverse) {
        return Promise.reject(new Error('超約數值必須大於逆流數值'));
      }
    }
    return Promise.resolve();
  };

  // 驗證 reverse（逆流數值）字段
  const reverseValidator = async (value) => {
    await positiveValueValidator(value);

    const contract = Number(getFieldValue('contract'));
    const over = Number(getFieldValue('over'));

    // reverse 必須小於 over 和 contract
    if (value) {
      if (over && value > over) {
        return Promise.reject(new Error('逆流數值必須小於超約數值'));
      }
      if (contract && value > contract) {
        return Promise.reject(new Error('逆流數值必須小於契約容量'));
      }
    }
    return Promise.resolve();
  };

  return {
    base: [
      {
        isFrame: false,
        children: [
          {
            formItemAttr: {
              label: '運轉狀態',
              name: 'control_activate',
            },
            variants: 'switch',
          },
          {
            formItemAttr: {
              label: '契約容量設定',
              name: 'contract',
              unit: 'kW',
              inputPattern: 'number',
              rules: [
                () => ({
                  validator(_, value) {
                    return contractValidator(value);
                  },
                }),
              ],
            },

            variants: 'input',
          },
        ],
      },
      {
        isFrame: true,
        children: [
          {
            formItemAttr: {
              label: '防超約',
              name: 'aoc_switch',
            },
            variants: 'switch',
          },
          {
            formItemAttr: {
              label: '超約數值設定',
              name: 'over',
              unit: 'kW',
              inputPattern: 'number',
              rules: [
                () => ({
                  validator(_, value) {
                    return overValidator(value);
                  },
                }),
              ],
            },
            variants: 'input',
          },
        ],
      },
      {
        isFrame: true,
        children: [
          {
            formItemAttr: {
              label: '防逆流',
              name: 'arc_switch',
            },
            variants: 'switch',
          },
          {
            formItemAttr: {
              label: '逆流數值設定',
              name: 'reverse',
              unit: 'kW',
              inputPattern: 'number',
              rules: [
                () => ({
                  validator(_, value) {
                    return reverseValidator(value);
                  },
                }),
              ],
            },
            variants: 'input',
          },
        ],
      },
      {
        isFrame: true,
        children: [
          {
            formItemAttr: {
              label: '備用電源開關',
              name: 'back_up_soc_switch',
            },
            variants: 'switch',
          },
          {
            formItemAttr: {
              label: '保留 SOC',
              name: 'keep_soc',
              inputPattern: 'number',
              unit: '%',
            },
            variants: 'input',
          },
        ],
      },
    ],
    advanced: [
      // {
      //   isFrame: true,
      //   children: [
      //     {
      //
      //       formItemAttr: {
      //         label: '最大輸出功率',
      //         name: 'max_p',
      //         unit: 'kW',
      //         inputPattern: 'number',
      //       },
      //       variants: 'input',
      //     },
      //     {
      //
      //       formItemAttr: {
      //         label: '最高電池容量',
      //         name: 'max_c',
      //         unit: 'kWh',
      //         inputPattern: 'number',
      //       },
      //       variants: 'input',
      //     },
      //   ],
      // },
      {
        isFrame: true,
        children: [
          {
            formItemAttr: {
              label: '最高 SOC',
              name: 'max_soc',
              unit: '%',
              inputPattern: 'number',
              rules: [
                () => ({
                  validator(_, value) {
                    return overValueValidator(value);
                  },
                }),
              ],
            },
            variants: 'input',
          },
          {
            formItemAttr: {
              label: '最低 SOC',
              name: 'min_soc',
              unit: '%',
              inputPattern: 'number',
              rules: [
                () => ({
                  validator(_, value) {
                    return overValueValidator(value);
                  },
                }),
              ],
            },
            variants: 'input',
          },
          {
            formItemAttr: {
              label: '充放模式',
              name: 'charge_mode',
              themecategory: 'circle-light',
              options: [
                { label: '平均分配', value: 'Average Dispatch' },
                { label: '動態 SOC', value: 'Dynamic Balance SOC' },
              ],
            },

            variants: 'select',
          },
        ],
      },
      {
        isFrame: true,
        children: [
          {
            formItemAttr: {
              label: '充市電限制',
              name: 'gridP_switch',
            },
            variants: 'switch',
          },
          {
            formItemAttr: {
              label: '市電 SOC 上限',
              name: 'gridP_max_soc',
              unit: '%',
              inputPattern: 'number',
            },
            variants: 'input',
          },
          {
            formItemAttr: {
              label: '太陽能棄光',
              name: 'solar_switch',
            },
            variants: 'switch',
          },
          {
            formItemAttr: {
              label: '充電樁限流',
              name: 'charger_switch',
            },
            variants: 'switch',
          },
        ],
      },
    ],
  };
};

// 送出表單
export async function onSubmit(form) {
  const toNullableNumber = (value) => {
    if (value === '' || value === undefined || value === null) return null;
    const num = Number(value);
    return Number.isNaN(num) ? null : num;
  };

  form
    .validateFields()
    .then(async (values) => {
      const finalValues = {
        ...values,
        contract: toNullableNumber(values.contract),
        over: toNullableNumber(values.over),
        reverse: toNullableNumber(values.reverse),
        max_p: toNullableNumber(values.max_p),
        max_c: toNullableNumber(values.max_c),
        max_soc: toNullableNumber(values.max_soc),
        min_soc: toNullableNumber(values.min_soc),
        gridP_max_soc: toNullableNumber(values.gridP_max_soc),
      };

      const response = await api.post(endpoints.setting.switch, finalValues);
      const limitResponse = await api.post(
        endpoints.setting.limit,
        finalValues,
      );

      if (response.status === 200 && limitResponse.status === 200) {
        const newValues = {
          ...response.data.data,
          ...limitResponse.data.data,
        };

        form.setFieldsValue(newValues); // 更新表單值
        successMsgHandler();
      }
    })
    .catch((error) => {
      errorMsgHandler(error?.response?.data?.detail || [], form.setFields);
    });
}
