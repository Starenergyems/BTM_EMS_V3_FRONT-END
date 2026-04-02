import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { api } from '@/slices/api/setting';
import { endpoints } from '@/utils/endpoints';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { Form } from 'antd';
import { errorMsgHandler } from '@/utils/helpers';
import { getDefaultValues } from '@/components/widgets/modalForm/indexHelper';

import { config } from '../indexConfig';
import { ExtraFormFields } from './indexConfig';

export const useHelpers = ({
  formInstance,
  formSecInstance,
  list,
  setList,
  events,
  setFavList,
  getEventData,
}) => {
  const strategy = Form.useWatch('strategy', formInstance);
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
          name: 'name',
          errors: [],
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
          name: 'name',
          errors: [],
        },
      ]);
    }
  }, [isListAllSameDay, formSecInstance]);

  const startTime = dayjs('00:00', 'HH:mm');
  const endTime = dayjs('00:00', 'HH:mm');

  // 新增排程表單資料
  const formFields = () => {
    return [
      {
        formItemAttr: {
          label: '日期',
          name: 'range',
          defaultValue: [dayjs(new Date()), dayjs(new Date())],
          rules: [{ required: true, message: '請選擇日期' }],
        },
        variants: 'rangePicker',
        componentProps: {
          inputAttr: {
            placeholder: '請選擇日期',
          },
        },
      },
      {
        formItemAttr: {
          label: '時段',
          name: 'time',
          format: 'HH:mm',
          defaultValue: [startTime, endTime],
          rules: [
            { required: true, message: '請選擇時段' },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();
                const range = formInstance.getFieldValue('range');
                if (!range || !range[0] || !range[1]) return Promise.resolve();

                try {
                  const { startAt, endAt } = getScheduleRange({
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
        componentProps: {
          inputAttr: {
            placeholder: '請選擇時段',
            minuteStep: 30,
            inputReadOnly: true,
          },
        },
      },
      {
        formItemAttr: {
          label: '服務模式',
          name: 'strategy',
          defaultValue: 'arbitrage',
          rules: [{ required: true, message: '請選擇服務模式' }],
        },
        variants: 'select',
        componentProps: {
          themecategory: 'circle-light',
          options: config
            .filter((el) => el.strategy !== 'idle')
            .map((el) => ({
              label: el.title,
              value: el.strategy,
            })),

          inputAttr: {
            placeholder: '請選擇服務模式',
          },
        },
      },
      ...(strategy && ExtraFormFields[strategy]
        ? ExtraFormFields[strategy]
        : []),
    ];
  };

  // 新增至常用清單表單資料
  const favFormFields = () => {
    return [
      {
        formItemAttr: {
          label: '新增至常用清單',
          name: 'fav',
          disabled: !isListAllSameDay,
          themecategory: 'circle-light',
        },
        variants: 'select',
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
      },
      {
        id: 'name',
        formItemAttr: {
          label: '項目名稱',
          name: 'name',
          disabled: fav !== 'yes',
          rules: [
            { required: fav === 'yes', message: '請輸入項目名稱' },
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
        variants: 'input',
        componentProps: {
          inputAttr: {
            placeholder: '請輸入項目名稱',
          },
        },
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

    return { startAt, endAt, isFullDay };
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
      const dailyRanges = getDailyScheduleRanges(values);

      const formattedValuesList = dailyRanges.map(
        ({ startAt, endAt, isFullDay }) => {
          assertRangeGreaterThan30Minutes(startAt, endAt);
          assertNoEventConflict(startAt, endAt);
          assertNoListConflict(startAt, endAt);

          return {
            id: uuidv4(),
            // title: config.find((c) => c.strategy === values.strategy)?.title || '',
            start: startAt.format('YYYY-MM-DD HH:mm'),
            end: endAt.format('YYYY-MM-DD HH:mm'),
            allDay: isFullDay,
            extendedProps: {
              ...values,
              strategy: values.strategy,
            },
          };
        },
      );

      setList((prev) => [...prev, ...formattedValuesList]);
      formInstance.resetFields(); // 重置表單
      formInstance.setFieldsValue(getDefaultValuesHandler()); // 重置後重新設定預設值
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
          assertNoEventConflict(startAt, endAt);
        });

        const isFav = values.fav === 'yes';

        // 如果是加入常用清單，需 post api 儲存常用清單資料
        if (isFav) {
          const payload = {
            [values.name]: list?.map((item) => ({
              start: dayjs(item.start).format('HH:mm'),
              end: dayjs(item.end).format('HH:mm'),
              extendedProps: {
                ...item.extendedProps,
              },
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
          const response = await api.post(endpoints.schedule.calendarEvent, {
            events: finalPayload,
          });
          if (response.status === 200) {
            toast.success('已成功設定排程');
            getEventData(); // 加入後重新取得日曆資料
            setList([]); // 清空清單
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
    getFavList,
    formFields,
    favFormFields,
    addListHandler,
    getDefaultValuesHandler,
    handleDelete,
    onSubmit,
  };
};
