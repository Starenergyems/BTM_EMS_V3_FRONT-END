import dayjs from 'dayjs';
import { api } from '@/slices/api/setting';
import { endpoints } from '@/utils/endpoints';
import { errorMsgHandler, successMsgHandler } from '@/utils/helpers';

export const useHelpers = ({ formInstance, selectedStrategy, toggle }) => {
  const getData = async (prefillValues) => {
    console.log('selectedStrategy123', selectedStrategy, prefillValues);
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
          if (typeof data?.guaranteed_standby_time === 'string') {
            const [start, end] = data.guaranteed_standby_time.split('-');
            normalizedData.guaranteed_standby_time =
              start && end
                ? [dayjs(start, 'HH:mm'), dayjs(end, 'HH:mm')]
                : [
                    dayjs(data?.guaranteed_standby_time[0], 'HH:mm'),
                    dayjs(data?.guaranteed_standby_time[1], 'HH:mm'),
                  ];
          }

          if (data?.notification_minutes_before !== undefined) {
            normalizedData.notification_minutes_before = String(
              data.notification_minutes_before,
            );
          }
        }

        const mergedData = {
          ...normalizedData,
          ...prefillValues,
        };

        formInstance.setFieldsValue(mergedData);
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const submitResponse = async (strategy, values) => {
    let formattedData = {
      ...values,
      sign_end_date: values.range[1].format('YYYY-MM-DD'),
      sign_start_date: values.range[0].format('YYYY-MM-DD'),
    };

    if (values.strategy === 'guaran_response') {
      const reserveTime = values.guaranteed_standby_time;
      formattedData.guaranteed_standby_time = `${reserveTime[0].format(
        'HH:mm',
      )}-${reserveTime[1].format('HH:mm')}`;
    }

    const response = await api.post(
      endpoints.demandRp.demandSet(strategy),
      formattedData,
    );

    return response;
  };

  async function onSubmit() {
    formInstance
      .validateFields()
      .then(async (values) => {
        // let finalValues = {
        //   ...values,
        //   sign_start_date: values.range[0].format('YYYY-MM-DD'),
        //   sign_end_date: values.range[1].format('YYYY-MM-DD'),
        // };
        // if (values.strategy === 'guaran_response') {
        //   const reserveTime = values.guaranteed_standby_time;
        //   finalValues = {
        //     ...values,
        //     sign_start_date: values.range[0].format('YYYY-MM-DD'),
        //     sign_end_date: values.range[1].format('YYYY-MM-DD'),
        //     guaranteed_standby_time: `${reserveTime[0].format('HH:mm')}-${reserveTime[1].format('HH:mm')}`,
        //   };
        // }

        // console.log('Final Values to Submit:', finalValues);
        // const response = await api.post(
        //   endpoints.demandRp.demandSet(selectedStrategy),
        //   finalValues,
        // );

        const response = await submitResponse(selectedStrategy, values);
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
    onSubmit,
    submitResponse,
  };
};
