import dayjs from 'dayjs';
import { useUtils } from '../utils/index';

export const useFields = ({ formInstance, selectedStrategy }) => {
  const { isBetweenMayAndOctober } = useUtils({
    formInstance,
  });

  const { createDisabledTime, createGuaranResponseInformValidator } = useUtils({
    formInstance,
  });
  const guaranStartTime = dayjs('13:00', 'HH:mm');
  const guaranEndTime = dayjs('22:00', 'HH:mm');

  const DemandRpFormFields = {
    daily_pick_time: {
      formFields: [
        {
          componentProps: {
            inputAttr: {
              options: [
                { label: '18:00-20:00', value: '18:00-20:00' },
                { label: '16:00-20:00', value: '16:00-20:00' },
                { label: '16:00-22:00', value: '16:00-22:00' },
              ],
              placeholder: '請選擇時段',
            },
          },

          formItemAttr: {
            defaultValue: '18:00-20:00',
            label: '時段',
            name: 'daily_pick_time',
            themecategory: 'circle-light',
          },
          variants: 'select',
        },
      ],
      title: '日選時段型',
    },
    guaran_response: {
      formFields: [
        {
          componentProps: {
            inputAttr: {
              options: [
                { label: '提前30分鐘', value: 30 },
                { label: '提前1小時', value: 60 },
                { label: '提前2小時', value: 120 },
              ],
              placeholder: '請選擇通知方式',
            },
          },
          formItemAttr: {
            defaultValue: 30,
            format: 'HH:mm',
            label: '通知方式',
            name: 'notification_minutes_before',
            themecategory: 'circle-light',
          },
          variants: 'select',
        },
        {
          componentProps: {
            inputAttr: {
              disabled: true,
              disabledTime: createDisabledTime,
              hideDisabledOptions: true,
              minuteStep: 30,
              placeholder: '請選擇通知時段',
            },
          },
          formItemAttr: {
            defaultValue: [guaranStartTime, guaranEndTime],
            format: 'HH:mm',
            label: '待命時間',
            name: 'guaranteed_standby_time',
            rules: [
              {
                validator: (_, value) => {
                  return createGuaranResponseInformValidator(formInstance)(
                    _,
                    value,
                  );
                },
              },
            ],
            size: 'full',
          },
          variants: 'timerangepicker',
        },
      ],
      title: '保證反應型',
    },
    monthly_pick_date: {
      formFields: [
        {
          componentProps: {
            inputAttr: {
              options: Array.from({ length: 31 }, (_, i) => ({
                label: `${i + 1}日`,
                value: i + 1,
              })),
              placeholder: '請選擇日期',
            },
          },
          formItemAttr: {
            defaultValue: [],
            label: '日期',
            mode: 'multiple',
            name: 'monthly_pick_date',
            rules: [
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();
                  if (value.length > 8) {
                    return Promise.reject(new Error('最多只能輸入8個日期'));
                  }
                  return Promise.resolve();
                },
              },
            ],
          },
          variants: 'select',
        },
      ],
      title: '月選8日型',
    },
  };

  const FormFields = () => {
    return [
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
          name: 'strategy',
          rules: [{ required: true }],
          themecategory: 'circle-light',
        },
        variants: 'select',
      },
      {
        componentProps: {
          inputAttr: {
            placeholder: '請輸入抑低容量',
          },
        },
        formItemAttr: {
          inputPattern: 'number',
          label: '抑低容量',
          name: 'signKw',
          rules: [{ message: '請輸入抑低容量', required: true }],
        },
        variants: 'input',
      },
      {
        componentProps: {
          inputAttr: {
            placeholder: '請選擇簽約時間',
          },
        },
        formItemAttr: {
          defaultValue: [dayjs(new Date()), dayjs(new Date())],
          label: '簽約時間',
          name: 'range',
          rules: [
            { message: '請選擇簽約時間', required: true },
            {
              validator: (_, value) => {
                console.log('validate123', value);
                console.log('selectedStrategy', selectedStrategy);
                if (
                  selectedStrategy === 'monthly_pick_date' &&
                  !isBetweenMayAndOctober(value)
                ) {
                  return Promise.reject(
                    new Error('月選8日型需選擇5月1日至10月31日'),
                  );
                }
                return Promise.resolve();
              },
            },
          ],
        },
        variants: 'rangePicker',
      },
    ];
  };

  return {
    DemandRpFormFields,
    FormFields,
  };
};
