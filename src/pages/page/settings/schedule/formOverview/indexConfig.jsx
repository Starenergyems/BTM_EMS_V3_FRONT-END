import dayjs from 'dayjs';

import { Form } from 'antd';
import { useFields as useDemandRpFields } from '../../demandRp/indexConfig';

export const useFields = ({ formInstance }) => {
  const selectedStrategy = Form.useWatch('demandRpType', formInstance);

  const { DemandRpFormFields, FormFields } = useDemandRpFields({
    formInstance,
    selectedStrategy,
  });

  const startTime = dayjs('00:00', 'HH:mm');
  const endTime = dayjs('00:00', 'HH:mm');

  // 判斷時間區間是否大於 30 分鐘
  const assertRangeGreaterThan30Minutes = (startAt, endAt) => {
    const diffMinutes = endAt.diff(startAt, 'minute');
    if (diffMinutes <= 30) {
      throw new Error('時段區間需大於 30 分鐘');
    }
  };

  // 取得排程時間範圍
  const getScheduleRange = (values) => {
    const isFullDay =
      values.time[0].format('HH:mm') === '00:00' &&
      values.time[1].format('HH:mm') === '00:00' &&
      values.range[0].isSame(values.range[1], 'day');

    const startAt = isFullDay
      ? values.range[0].startOf('day')
      : values.range[0]
          .hour(values.time[0].hour())
          .minute(values.time[0].minute())
          .second(0)
          .millisecond(0);

    let endAt = values.range[1]
      .hour(values.time[1].hour())
      .minute(values.time[1].minute())
      .second(0)
      .millisecond(0);

    if (isFullDay) {
      endAt = startAt.add(1, 'day');
    }

    if (!endAt.isAfter(startAt)) {
      endAt = endAt.add(1, 'day');
    }

    return { endAt, isFullDay, startAt };
  };

  const ExtraInitialFields = {
    arbitrage: [
      {
        componentProps: {
          inputAttr: {
            placeholder: '請選擇日期',
          },
        },
        formItemAttr: {
          defaultValue: [dayjs(new Date()), dayjs(new Date())],
          label: '日期',
          name: 'range',
          rules: [{ message: '請選擇日期', required: true }],
        },
        variants: 'rangePicker',
      },

      {
        componentProps: {
          inputAttr: {
            inputReadOnly: true,
            minuteStep: 30,
            placeholder: '請選擇時段',
          },
        },
        formItemAttr: {
          defaultValue: [startTime, endTime],
          format: 'HH:mm',
          label: '時段',
          name: 'time',
          rules: [
            { message: '請選擇時段', required: true },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();
                const range = formInstance.getFieldValue('range');
                if (!range || !range[0] || !range[1]) return Promise.resolve();

                try {
                  const { endAt, startAt } = getScheduleRange({
                    range,
                    time: value,
                  });
                  assertRangeGreaterThan30Minutes(startAt, endAt);
                } catch {
                  return Promise.reject(new Error('時段區間需大於 30 分鐘'));
                }

                return Promise.resolve();
              },
            },
          ],
        },
        variants: 'timerangepicker',
      },
    ],
    demandRp: [
      {
        componentProps: {
          inputAttr: {
            placeholder: '請選擇需量類型',
          },
          options: Object.entries(DemandRpFormFields).map(
            ([key, { title }]) => ({
              label: title,
              value: key,
            }),
          ),
        },
        formItemAttr: {
          defaultValue: 'daily_pick_time',
          label: '需量類型',
          name: 'demandRpType',
          rules: [{ message: '請選擇需量類型', required: true }],
          themecategory: 'circle-light',
        },
        variants: 'select',
      },
      ...FormFields().filter(
        (element) => element.formItemAttr.name !== 'strategy',
      ),
    ],
  };

  const ExtraFormFields = {
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
    demandRp:
      DemandRpFormFields?.[selectedStrategy || 'daily_pick_time']?.formFields ||
      [],
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
  const ExtraLabels = {
    demand_guaranteed: labels,
    demand_monthly_pick: labels,
    guaran_response: labels,
  };

  return {
    assertRangeGreaterThan30Minutes,
    DemandRpFormFields,
    ExtraFormFields,
    ExtraInitialFields,
    ExtraLabels,
    getScheduleRange,
  };
};
