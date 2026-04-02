import { useRef } from 'react';

import { omRole } from '@/slices/api/main/accounts';
import ModalForm from '@/components/widgets/modalForm';
import { statusValues } from '../indexConfig';

export const ModalOverview = ({ toggle }) => {
  // const [isModalOpen, setModalOpen] = useState(true);
  const modalInnerFormRef = useRef();
  const modalFormIsSubmittedRef = useRef(false);

  return (
    <ModalForm
      list={[
        {
          id: 'id',
          formItemAttr: {
            label: '工號',
            name: 'id',
            value: '',
            rules: [{ required: true, message: '請輸入工號' }],
          },
          variants: 'input',
          componentProps: {
            inputAttr: {
              placeholder: '請輸入工號',
            },
          },
        },
        {
          id: 'name',
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
          id: 'company',
          formItemAttr: {
            label: '公司名稱',
            name: 'company',
            value: '',
          },
          variants: 'input',
          componentProps: {
            inputAttr: {
              placeholder: '請輸入公司名稱',
            },
          },
        },
        {
          id: 'department',
          formItemAttr: {
            label: '部門',
            name: 'department',
            value: '',
          },
          variants: 'input',
          componentProps: {
            inputAttr: {
              placeholder: '請輸入部門',
            },
          },
        },
        {
          id: 'email',
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
          id: 'permission',
          formItemAttr: {
            label: '權限',
            name: 'permission',
            value: '一般用戶',
            rules: [{ required: true, message: '請輸入權限' }],
          },
          variants: 'select',
          componentProps: {
            selectAttr: {
              placeholder: '請輸入權限',
            },
            options: Object.keys(omRole).map((key) => ({
              label: omRole[key].key,
              value: omRole[key].key,
            })),
          },
        },
        {
          id: 'status',
          formItemAttr: {
            label: '啟用狀態',
            name: 'status',
            value: 1,
            rules: [{ required: true, message: '請輸入啟用狀態' }],
          },
          variants: 'select',
          componentProps: {
            selectAttr: {
              placeholder: '請輸入啟用狀態',
            },
            options: Object.entries(statusValues).map(([key, label]) => ({
              label,
              value: Number(key),
            })),
          },
        },

        {
          id: 'password',
          formItemAttr: {
            label: '密碼',
            name: 'password',
            value: '',
          },
          variants: 'input',
          componentProps: {
            inputAttr: {
              placeholder: '請輸入密碼',
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
        title: '編輯帳戶',
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
