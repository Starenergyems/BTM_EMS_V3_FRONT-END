import { passwordValidationRules } from '@/utils/helpers';

// useHelpers 為最外層 function，function 內區塊的撰寫順序由上而下為：
// 1. useCallback 需要相依的 function
// 2. api function
// 3. 一般 function
function useHelpers({ formData }) {
  const formFields = [
    {
      componentProps: {
        inputAttr: {
          placeholder: '請輸入您的舊密碼',
          type: 'password',
        },
      },
      formItemAttr: {
        label: '新密碼',
        name: 'password',
        rules: [
          { message: '請輸入您的新密碼', required: true },
          {
            validator: (_, value) => passwordValidationRules(value),
          },
        ],
      },

      variants: 'input',
    },
    {
      componentProps: {
        inputAttr: {
          placeholder: '請輸入您的新密碼',
          type: 'password',
        },
      },
      formItemAttr: {
        label: '確認新密碼',
        name: 'newPassword',
        rules: [
          { message: '請輸入您的新密碼', required: true },
          {
            validator: (_, value) => {
              if (!value || value === formData.getFieldValue('password')) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('兩次輸入的密碼不一致'));
            },
          },
        ],
      },
      variants: 'input',
    },
  ];
  return {
    formFields,
  };
}

export { useHelpers };
