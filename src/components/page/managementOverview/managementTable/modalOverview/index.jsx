import { useRef } from 'react';
import { passwordValidationRules } from '@/utils/helpers';
import { omRole } from '@/slices/api/main/accounts';
import ModalForm from '@/components/widgets/modalForm';
import { statusValues } from '../indexConfig';

export const ModalOverview = ({ toggle, isEdit }) => {
  const modalInnerFormRef = useRef();
  const modalFormIsSubmittedRef = useRef(false);

  return (
    <ModalForm
      list={[
        {
          formItemAttr: {
            label: '姓名',
            name: 'name',
            value: '',
            rules: [{ required: true, message: '請輸入姓名' }],
          },
          variants: 'input',
          componentProps: {
            inputAttr: {
              placeholder: '請輸入姓名',
            },
          },
        },
        {
          formItemAttr: {
            label: 'Email(帳號)',
            name: 'email',
            value: '',
            rules: [{ required: true, message: '請輸入 Email' }],
          },
          variants: 'input',
          componentProps: {
            inputAttr: {
              placeholder: '請輸入 Email',
            },
          },
        },
        {
          formItemAttr: {
            label: '權限',
            name: 'permission',

            themecategory: 'circle-light',
            rules: [{ required: true, message: '請輸入權限' }],
          },
          variants: 'select',
          componentProps: {
            selectAttr: {
              placeholder: '請輸入權限',
            },
            defaultValue: 'viewer',
            options: Object.keys(omRole).map((key) => ({
              label: omRole[key].key,
              value: omRole[key].value,
            })),
          },
        },
        {
          formItemAttr: {
            label: '啟用狀態',
            name: 'status',
            themecategory: 'circle-light',

            value: 1,
            rules: [{ required: true, message: '請輸入啟用狀態' }],
          },
          variants: 'select',
          componentProps: {
            selectAttr: {
              placeholder: '請輸入啟用狀態',
            },
            defaultValue: 'activate',
            options: Object.entries(statusValues).map(([key, label]) => ({
              label,
              value: key,
            })),
          },
        },

        {
          formItemAttr: {
            label: '密碼',
            name: 'password',
            value: '',
            rules: [
              { required: true, message: '請輸入密碼' },
              { validator: (_, value) => passwordValidationRules(value) },
            ],
          },
          variants: 'input',
          componentProps: {
            inputAttr: {
              placeholder: '請輸入密碼',
              type: 'password',
            },
          },
        },
        {
          formItemAttr: {
            label: '附註',
            name: 'note',
            value: '',
          },
          variants: 'input',
          componentProps: {
            inputAttr: {
              placeholder: '請輸入附註',
            },
          },
        },
      ]}
      modalAttr={{
        cancelText: '取消',
        centered: true,
        forceRender: true,
        maskClosable: false,
        onCancel: () => toggle.onToggle(),
        onOk: () => console.log('ok'),
        okText: '儲存',
        open: toggle.value,
        title: isEdit ? '編輯帳戶' : '新增帳戶',
      }}
      onSuccess={(values, formInstance, isSubmitted) => {
        console.log('success');
        console.log(values);
        console.log(formInstance);
        console.log(isSubmitted);
      }}
      onFormReady={(formInstance, isSubmitted) => {
        modalInnerFormRef.current = formInstance;
        modalFormIsSubmittedRef.current = isSubmitted;
      }}
      styles={`
        .custom-content {
            color: red
        }
      `}
    />
  );
};
