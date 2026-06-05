import { useRef } from 'react';
import ModalForm from '@/components/widgets/modalForm';
import { omRole } from '@/slices/api/main/accounts';
import { passwordValidationRules } from '@/utils/helpers';
import { statusValues } from '../indexConfig';

export const ModalOverview = ({ isEdit, toggle }) => {
  const modalInnerFormRef = useRef();
  const modalFormIsSubmittedRef = useRef(false);

  return (
    <ModalForm
      list={[
        {
          componentProps: {
            inputAttr: {
              placeholder: '請輸入姓名',
            },
          },
          formItemAttr: {
            label: '姓名',
            name: 'name',
            rules: [{ message: '請輸入姓名', required: true }],
            value: '',
          },
          variants: 'input',
        },
        {
          componentProps: {
            inputAttr: {
              placeholder: '請輸入 Email',
            },
          },
          formItemAttr: {
            label: 'Email(帳號)',
            name: 'email',
            rules: [{ message: '請輸入 Email', required: true }],
            value: '',
          },
          variants: 'input',
        },
        {
          componentProps: {
            defaultValue: 'viewer',
            options: Object.keys(omRole).map((key) => ({
              label: omRole[key].key,
              value: omRole[key].value,
            })),
            selectAttr: {
              placeholder: '請輸入權限',
            },
          },
          formItemAttr: {
            label: '權限',
            name: 'permission',

            rules: [{ message: '請輸入權限', required: true }],
            themecategory: 'circle-light',
          },
          variants: 'select',
        },
        {
          componentProps: {
            defaultValue: 'activate',
            options: Object.entries(statusValues).map(([key, label]) => ({
              label,
              value: key,
            })),
            selectAttr: {
              placeholder: '請輸入啟用狀態',
            },
          },
          formItemAttr: {
            label: '啟用狀態',
            name: 'status',
            rules: [{ message: '請輸入啟用狀態', required: true }],

            themecategory: 'circle-light',
            value: 1,
          },
          variants: 'select',
        },

        {
          componentProps: {
            inputAttr: {
              placeholder: '請輸入密碼',
              type: 'password',
            },
          },
          formItemAttr: {
            label: '密碼',
            name: 'password',
            rules: [
              { message: '請輸入密碼', required: true },
              { validator: (_, value) => passwordValidationRules(value) },
            ],
            value: '',
          },
          variants: 'input',
        },
        {
          componentProps: {
            inputAttr: {
              placeholder: '請輸入附註',
            },
          },
          formItemAttr: {
            label: '附註',
            name: 'note',
            value: '',
          },
          variants: 'input',
        },
      ]}
      modalAttr={{
        cancelText: '取消',
        centered: true,
        forceRender: true,
        maskClosable: false,
        okText: '儲存',
        onCancel: () => toggle.onToggle(),
        onOk: () => console.log('ok'),
        open: toggle.value,
        title: isEdit ? '編輯帳戶' : '新增帳戶',
      }}
      onFormReady={(formInstance, isSubmitted) => {
        modalInnerFormRef.current = formInstance;
        modalFormIsSubmittedRef.current = isSubmitted;
      }}
      onSuccess={(values, formInstance, isSubmitted) => {
        console.log('success');
        console.log(values);
        console.log(formInstance);
        console.log(isSubmitted);
      }}
      styles={`
        .custom-content {
            color: red
        }
      `}
    />
  );
};
