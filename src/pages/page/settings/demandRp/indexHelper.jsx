import { api } from '@/slices/api/setting';
import { endpoints } from '@/utils/endpoints';
import { Form } from 'antd';
import dayjs from 'dayjs';
import { errorMsgHandler, successMsgHandler } from '@/utils/helpers';

export const useHelpers = ({ formInstance, selectedStrategy, toggle }) => {
  const rangeValue = Form.useWatch('range', formInstance);

  const getData = async () => {
    try {
      const response = await api.get(
        endpoints.demandRp.demandSet(selectedStrategy),
      );
      if (response.status === 200) {
        const data = response?.data?.data || {};
        const normalizedData = { ...data };

        if (data?.sign_start_date && data?.sign_end_date) {
          normalizedData.range = [
            dayjs(data.sign_start_date, 'YYYY-MM-DD'),
            dayjs(data.sign_end_date, 'YYYY-MM-DD'),
          ];
        }

        if (selectedStrategy === 'guaran_response') {
          if (typeof data?.guaran_reserve_time === 'string') {
            const [start, end] = data.guaran_reserve_time.split('-');
            normalizedData.guaran_reserve_time =
              start && end
                ? [dayjs(start, 'HH:mm'), dayjs(end, 'HH:mm')]
                : undefined;
          }

          if (data?.guaran_response_notification !== undefined) {
            normalizedData.guaran_response_notification = String(
              data.guaran_response_notification,
            );
          }
        }

        formInstance.setFieldsValue(normalizedData);
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const formFields = () => {
    return [
      {
        formItemAttr: {
          label: '需量類型',
          name: 'strategy',
          themecategory: 'circle-light',
          defaultValue: 'daily_pick_time',
          rules: [{ required: true, message: '請選擇需量類型' }],
        },
        variants: 'select',
        componentProps: {
          inputAttr: {
            placeholder: '請選擇需量類型',
          },
          options: Object.entries(ExtraFormFields).map(([key, { title }]) => ({
            label: title,
            value: key,
          })),
        },
      },
      {
        formItemAttr: {
          label: '抑低容量',
          name: 'signKw',
          inputPattern: 'number',
          rules: [{ required: true, message: '請輸入抑低容量' }],
        },
        variants: 'input',
        componentProps: {
          inputAttr: {
            placeholder: '請輸入抑低容量',
          },
        },
      },
      {
        formItemAttr: {
          label: '簽約時間',
          name: 'range',
          defaultValue: [dayjs(new Date()), dayjs(new Date())],
          rules: [
            { required: true, message: '請選擇簽約時間' },
            {
              validator: (_, value) => {
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
        componentProps: {
          inputAttr: {
            placeholder: '請選擇簽約時間',
          },
        },
      },
    ];
  };

  const MIN_HOUR = 13;
  const MAX_HOUR = 22;

  const createDisabledTime = () => ({
    disabledHours: () =>
      Array.from({ length: 24 }, (_, hour) => hour).filter(
        (hour) => hour < MIN_HOUR || hour > MAX_HOUR,
      ),
    disabledMinutes: (selectedHour) => {
      if (selectedHour === MAX_HOUR) {
        return Array.from({ length: 60 }, (_, minute) => minute).filter(
          (minute) => minute > 0,
        );
      }
      return [];
    },
    disabledSeconds: () =>
      Array.from({ length: 60 }, (_, second) => second).filter(
        (second) => second > 0,
      ),
  });

  // 月選 8 日型選項控制 disabled
  const isBetweenMayAndOctober = (
    current = formInstance.getFieldValue('range'),
  ) => {
    if (!current) return false;

    if (Array.isArray(current)) {
      const [rangeStart, rangeEnd] = current;
      if (!rangeStart || !rangeEnd) return false;

      const start = dayjs(rangeStart);
      const end = dayjs(rangeEnd);
      if (!start.isValid() || !end.isValid()) return false;

      const targetYear = start.year();
      const seasonStart = dayjs()
        .year(targetYear)
        .month(4)
        .date(1)
        .startOf('day');
      const seasonEnd = dayjs().year(targetYear).month(9).date(31).endOf('day');

      return start.isSame(seasonStart, 'day') && end.isSame(seasonEnd, 'day');
    }

    const targetDate = dayjs(current);
    if (!targetDate.isValid()) return false;

    return false;
  };

  // 保證行反應通知時間驗證
  const createGuaranResponseInformValidator = (form) => (_, value) => {
    if (!value) return Promise.resolve();

    const timeRange = form.getFieldValue('guaran_response_time');
    if (!timeRange || !Array.isArray(timeRange) || timeRange.length !== 2) {
      return Promise.resolve();
    }

    const [startTime, endTime] = timeRange;
    const selectedTime = value.format('HH:mm');
    const rangeStart = startTime.format('HH:mm');
    const rangeEnd = endTime.format('HH:mm');

    if (selectedTime <= rangeStart || selectedTime >= rangeEnd) {
      return Promise.reject(
        new Error(`通知時間必須在 ${rangeStart} 到 ${rangeEnd} 之間`),
      );
    }

    return Promise.resolve();
  };

  const guaranStartTime = dayjs('13:00', 'HH:mm');
  const guaranEndTime = dayjs('22:00', 'HH:mm');

  const ExtraFormFields = {
    daily_pick_time: {
      title: '日選時段型',
      formEields: [
        {
          formItemAttr: {
            label: '時段',
            name: 'daily_pick_time',
            defaultValue: '18:00-20:00',
            themecategory: 'circle-light',
          },

          variants: 'select',
          componentProps: {
            inputAttr: {
              placeholder: '請選擇時段',
              options: [
                { label: '18:00-20:00', value: '18:00-20:00' },
                { label: '16:00-20:00', value: '16:00-20:00' },
                { label: '16:00-22:00', value: '16:00-22:00' },
              ],
            },
          },
        },
      ],
    },
    monthly_pick_date: {
      title: '月選8日型',
      formEields: [
        {
          formItemAttr: {
            label: '日期',
            name: 'monthly_pick_date',
            mode: 'multiple',
            defaultValue: [],
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
          componentProps: {
            inputAttr: {
              placeholder: '請選擇日期',
              options: Array.from({ length: 31 }, (_, i) => ({
                label: `${i + 1}日`,
                value: i + 1,
              })),
            },
          },
        },
      ],
    },
    guaran_response: {
      title: '保證反應型',
      formEields: [
        {
          formItemAttr: {
            label: '通知方式',
            name: 'guaran_response_notification',
            themecategory: 'circle-light',
            format: 'HH:mm',
            defaultValue: '0.5',
          },
          variants: 'select',
          componentProps: {
            inputAttr: {
              placeholder: '請選擇通知方式',
              options: [
                { label: '提前30分鐘', value: '0.5' },
                { label: '提前1小時', value: '1' },
                { label: '提前2小時', value: '2' },
              ],
            },
          },
        },
        {
          formItemAttr: {
            label: '待命時間',
            name: 'guaran_reserve_time',
            format: 'HH:mm',
            size: 'full',
            defaultValue: [guaranStartTime, guaranEndTime],
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
          },
          variants: 'timerangepicker',
          componentProps: {
            inputAttr: {
              placeholder: '請選擇通知時段',
              minuteStep: 30,
              disabledTime: createDisabledTime,
              disabled: true,
              hideDisabledOptions: true,
            },
          },
        },
      ],
    },
  };

  // 送出表單
  async function onSubmit() {
    formInstance
      .validateFields()
      .then(async (values) => {
        let finalValues = {
          ...values,
          sign_start_date: values.range[0].format('YYYY-MM-DD'),
          sign_end_date: values.range[1].format('YYYY-MM-DD'),
        };
        if (values.strategy === 'guaran_response') {
          const reserveTime = values.guaran_reserve_time;
          finalValues = {
            ...values,
            sign_start_date: values.range[0].format('YYYY-MM-DD'),
            sign_end_date: values.range[1].format('YYYY-MM-DD'),
            guaran_reserve_time: `${reserveTime[0].format('HH:mm')}-${reserveTime[1].format('HH:mm')}`,
          };
        }
        const response = await api.post(
          endpoints.demandRp.demandSet(selectedStrategy),
          finalValues,
        );
        if (response.status === 200) {
          successMsgHandler();
          toggle.onTrue();
        }
      })
      .catch((error) => {
        errorMsgHandler(
          error?.response?.data?.detail || [],
          formInstance.setFields,
        );
      });
  }

  return {
    getData,
    formFields,
    ExtraFormFields,
    onSubmit,
  };
};
