import { useFields as useFormFields } from '../formOverview/indexConfig';
import { config } from '../indexConfig';

export const useFields = () => {
  const { ExtraInitialFields } = useFormFields({});

  const formFields = [
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
        defaultValue: 'arbitrage',
        label: '服務模式',
        name: 'strategy',
        rules: [{ message: '請選擇服務模式', required: true }],
      },
      variants: 'select',
    },
    ...(ExtraInitialFields['arbitrage'] || []),
  ];

  return {
    formFields,
  };
};
