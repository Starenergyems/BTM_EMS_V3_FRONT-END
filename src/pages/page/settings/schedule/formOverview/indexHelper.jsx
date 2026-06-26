import { useEffect } from 'react';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { getDefaultValues } from '@/components/widgets/modalForm/indexHelper';
import { api } from '@/slices/api/setting';
import { endpoints } from '@/utils/endpoints';
import { errorMsgHandler } from '@/utils/helpers';
import { Form } from 'antd';

import { useHelpers as useDemandRpHelpers } from '../../demandRp/indexHelper';
import { config } from '../indexConfig';
import { useFields } from './indexConfig';

export const useHelpers = ({
  events,
  formInstance,
  formSecInstance,
  getEventData,
  initialList,
  list,
  setFavList,
  setList,
}) => {
  const { submitResponse } = useDemandRpHelpers({});
  const {
    assertRangeGreaterThan30Minutes,
    ExtraFormFields,
    ExtraInitialFields,
    getScheduleRange,
  } = useFields({
    formInstance,
  });

  const strategy = Form.useWatch('strategy', formInstance);
  const selectedStrategy = Form.useWatch('demandRpType', formInstance);
  const fav = Form.useWatch('fav', formSecInstance);

  // 判斷清單中是否全部為同一天
  const isListAllSameDay = (() => {
    if (!Array.isArray(list) || list.length === 0) return false;
    const firstDay = dayjs(list[0]?.start).format('YYYY-MM-DD');
    return list.every(
      (item) => dayjs(item?.start).format('YYYY-MM-DD') === firstDay,
    );
  })();

  // 重置常用清單名稱欄位
  useEffect(() => {
    if (fav === 'no') {
      formSecInstance?.setFields([
        {
          errors: [],
          name: 'name',
        },
      ]);
    }
  }, [fav, formSecInstance]);

  // 如果是同一天，則取得該日期的常用清單
  useEffect(() => {
    if (!isListAllSameDay) {
      formSecInstance?.setFieldsValue({ fav: 'no', name: undefined });
      formSecInstance?.setFields([
        {
          errors: [],
          name: 'name',
        },
      ]);
    }
  }, [isListAllSameDay, formSecInstance]);

  useEffect(() => {
    formInstance?.setFields([
      {
        errors: [],
        name: 'range',
      },
    ]);
  }, [formInstance, selectedStrategy]);

  // 清空表單
  const handleClearList = () => {
    setList([]);
  };

  useEffect(() => {
    console.log('selectedStrategy 刪掉ㄌ', selectedStrategy);
    handleClearList();
  }, [selectedStrategy]);

  useEffect(() => {
    setList(initialList);
  }, [initialList]);

  // 新增排程表單資料
  const formFields = () => {
    return [
      {
        componentProps: {
          inputAttr: {
            placeholder: '請選擇服務模式',
          },
          options: config
            .filter((el) => el.strategy !== 'idle')
            .map((el) => ({
              label: el.title,
              value: el.strategy,
            })),

          themecategory: 'circle-light',
        },
        formItemAttr: {
          // defaultValue: 'arbitrage',
          label: '服務模式',
          name: 'strategy',
          rules: [{ message: '請選擇服務模式', required: true }],
        },

        variants: 'select',
      },

      ...(strategy && ExtraInitialFields?.[strategy]
        ? ExtraInitialFields[strategy]
        : []),

      ...(strategy && ExtraFormFields[strategy]
        ? ExtraFormFields[strategy]
        : []),
    ];
  };

  // 動態欄位切換時，僅補上尚未存在的預設值，避免覆蓋使用者已輸入內容
  useEffect(() => {
    if (!formInstance) return;

    const defaultFormFields = [
      {
        formItemAttr: {
          defaultValue: 'arbitrage',
          name: 'strategy',
        },
      },
      ...(strategy && ExtraInitialFields?.[strategy]
        ? ExtraInitialFields[strategy]
        : []),

      ...(strategy && ExtraFormFields?.[strategy]
        ? ExtraFormFields[strategy]
        : []),
    ];

    const defaults = getDefaultValues(defaultFormFields);
    const missingDefaults = Object.entries(defaults).reduce(
      (result, [name, value]) => {
        const currentValue = formInstance.getFieldValue(name);
        if (currentValue === undefined) {
          result[name] = value;
        }
        return result;
      },
      {},
    );

    if (Object.keys(missingDefaults).length > 0) {
      formInstance.setFieldsValue(missingDefaults);
    }
    // 僅依策略切換補預設，避免輸入過程被覆蓋
  }, [
    formInstance,
    strategy,
    selectedStrategy,
    ExtraInitialFields,
    ExtraFormFields,
  ]);

  // 新增至常用清單表單資料
  const favFormFields = () => {
    return [
      {
        componentProps: {
          defaultValue: 'no',
          options: [
            {
              label: '否',
              value: 'no',
            },
            {
              label: '是',
              value: 'yes',
            },
          ],
        },
        formItemAttr: {
          disabled: !isListAllSameDay,
          label: '新增至常用清單',
          name: 'fav',
          themecategory: 'circle-light',
        },
        variants: 'select',
      },
      {
        componentProps: {
          inputAttr: {
            placeholder: '請輸入項目名稱',
          },
        },
        formItemAttr: {
          disabled: fav !== 'yes',
          label: '項目名稱',
          name: 'name',
          rules: [
            { message: '請輸入項目名稱', required: fav === 'yes' },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();
                const isAsciiPrintable = /^[\x20-\x7E]+$/.test(value);
                if (!isAsciiPrintable) {
                  return Promise.reject(
                    new Error('僅允許英文、數字與特殊符號'),
                  );
                }
                return Promise.resolve();
              },
            },
          ],
        },
        id: 'name',
        variants: 'input',
      },
    ];
  };

  // 表單預設值
  const getDefaultValuesHandler = () => {
    const allFields = [...formFields(), ...favFormFields()];
    return getDefaultValues(allFields);
  };

  // 取得常用清單
  const getFavList = async () => {
    try {
      const response = await api.get(endpoints.schedule.favoriteList);
      if (response.status === 200) {
        setFavList(response.data.data || {});
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  // 判斷是否同一天
  const isListSameDay = (targetStart, targetEnd) => {
    if (!Array.isArray(list) || list.length === 0) return false;

    return list.some((item) => {
      const itemStart = dayjs(item.start);
      const itemEnd = dayjs(item.end);

      return (
        itemStart.isSame(targetStart, 'day') ||
        itemEnd.isSame(targetStart, 'day') ||
        itemStart.isSame(targetEnd, 'day') ||
        itemEnd.isSame(targetEnd, 'day')
      );
    });
  };

  // 判斷時間區間是否重疊
  const isRangeOverlap = (startA, endA, startB, endB) => {
    return startA < endB && endA > startB;
  };

  // 判斷是否與現有日曆時間衝突
  const assertNoEventConflict = (startAt, endAt) => {
    events?.forEach((event) => {
      const eventStart = dayjs(event?.start).valueOf();
      const eventEnd = dayjs(event?.end).valueOf();
      const newStart = startAt.valueOf();
      const newEnd = endAt.valueOf();

      if (isRangeOverlap(newStart, newEnd, eventStart, eventEnd)) {
        toast.error('與已設定之排程衝突');
        throw new Error('與已設定之排程衝突');
      }
    });
  };

  // 判斷是否與排程清單中時間衝突
  const assertNoListConflict = (startAt, endAt) => {
    const hasSameDay = isListSameDay(startAt, endAt);

    if (!hasSameDay) return;

    list?.forEach((element) => {
      const newStart = startAt.valueOf();
      const newEnd = endAt.valueOf();
      const oldStart = dayjs(element.start).valueOf();
      const oldEnd = dayjs(element.end).valueOf();

      if (isRangeOverlap(newStart, newEnd, oldStart, oldEnd)) {
        toast.error('已有相同時間區間的排程');
        throw new Error('已有相同時間區間的排程');
      }
    });
  };

  // 依照日期區間拆成每日排程
  const getDailyScheduleRanges = (values) => {
    console.log('values', values);
    if (values?.strategy === 'demandRp') return;

    const startDay = values.range[0].startOf('day');
    const endDay = values.range[1].startOf('day');
    const dayDiff = endDay.diff(startDay, 'day');

    if (dayDiff <= 0) {
      const singleRange = getScheduleRange(values);
      return [singleRange];
    }

    return Array.from({ length: dayDiff + 1 }, (_, index) => {
      const currentDay = startDay.add(index, 'day');
      const dailyValues = {
        ...values,
        range: [currentDay, currentDay],
      };

      return getScheduleRange(dailyValues);
    });
  };

  // 新增排程至清單
  const addListHandler = () => {
    formInstance.validateFields().then(async (values) => {
      if (values.strategy === 'demandRp') {
        const formattedValue = {
          end: values.range[1].format('YYYY-MM-DD HH:mm'),
          extendedProps: {
            ...values,
            daily_pick_time: values.daily_pick_time || '18:00-20:00',
            strategy: values.demandRpType,
          },
          id: uuidv4(),
          start: values.range[0].format('YYYY-MM-DD HH:mm'),
        };

        setList((prev) => [...prev, formattedValue]);
      } else {
        const dailyRanges = getDailyScheduleRanges(values);

        const formattedValuesList = dailyRanges.map(
          ({ endAt, isFullDay, startAt }) => {
            assertRangeGreaterThan30Minutes(startAt, endAt);
            assertNoEventConflict(startAt, endAt);
            assertNoListConflict(startAt, endAt);

            return {
              allDay: isFullDay,
              end: endAt.format('YYYY-MM-DD HH:mm'),
              extendedProps: {
                ...values,
                strategy: values.strategy,
              },
              id: uuidv4(),
              // title: config.find((c) => c.strategy === values.strategy)?.title || '',
              start: startAt.format('YYYY-MM-DD HH:mm'),
            };
          },
        );
        setList((prev) => [...prev, ...formattedValuesList]);
        formInstance.resetFields(); // 重置表單
        formInstance.setFieldsValue(getDefaultValuesHandler()); // 重置後重新設定預設值
      }
    });
  };

  // 刪除排程清單項目
  const handleDelete = (idx) => {
    setList((prev) => prev.filter((_, index) => index !== idx));
  };

  // 送出表單
  async function onSubmit() {
    formSecInstance
      .validateFields()
      .then(async (values) => {
        list?.forEach((item) => {
          const startAt = dayjs(item.start);
          const endAt = dayjs(item.end);

          if (item.extendedProps?.demandRpType) return; // 需量反應不進行時間衝突驗證
          assertNoEventConflict(startAt, endAt);
        });

        const isFav = values.fav === 'yes';

        // 如果是加入常用清單，需 post api 儲存常用清單資料
        if (isFav) {
          const payload = {
            [values.name]: list?.map((item) => ({
              end: dayjs(item.end).format('HH:mm'),
              extendedProps: {
                ...item.extendedProps,
              },
              start: dayjs(item.start).format('HH:mm'),
            })),
          };

          try {
            const response = await api.post(
              endpoints.schedule.favoriteList,
              payload,
            );
            if (response.status === 200) {
              toast.success('已成功加入常用清單');
              getFavList(); // 加入後重新取得常用清單資料
            }
          } catch (error) {
            console.error('API Error:', error);
            toast.error('加入常用清單失敗');
          }
        }

        const finalPayload = [...events, ...list];

        try {
          let response;
          if (list?.[0]?.extendedProps?.demandRpType) {
            console.log('需量反應');
            response = await submitResponse(
              list?.[0]?.extendedProps?.strategy,
              list?.[0]?.extendedProps,
            );
            console.log('response', response);
          } else {
            console.log('一般排程');
            response = await api.post(endpoints.schedule.calendarEvent, {
              events: finalPayload,
            });
          }

          if (response.status === 200) {
            toast.success('已成功設定排程');
            getEventData(); // 加入後重新取得日曆資料
            handleClearList(); // 清空清單
          }
        } catch (error) {
          console.error('API Error:', error);
          toast.error('設定排程失敗');
        }
      })
      .catch((error) => {
        errorMsgHandler(
          error?.response?.data?.detail || [],
          formSecInstance.setFields,
        );
      });
  }

  return {
    addListHandler,
    favFormFields,
    formFields,
    getDefaultValuesHandler,
    getFavList,
    handleDelete,
    onSubmit,
  };
};
