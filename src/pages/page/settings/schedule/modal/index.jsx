import { renderField } from '@/components/widgets/modalForm/indexHelper';
import ModalNormal from '@/components/widgets/modalNormal';
import { useBoolean } from '@/hooks/useBoolean';
import Form from 'antd/lib/form';
import { ModalDeleteOverview } from './delete';
import { useFields } from './indexConfig';
import { useHelpers } from './indexHelper';
import { ScopeStyle } from './indexStyle';

export const ModalOverview = ({ eventIndex, getEventData, toggle }) => {
  console.log('toggletoggle', toggle);
  const toggleDelete = useBoolean(false);
  const [formInstance] = Form.useForm();

  const { handleDelete } = useHelpers({
    eventIndex,
    getEventData,
    toggle,
    toggleDelete,
  });

  if (!toggle?.value) return null;

  return (
    <>
      <ModalNormal
        modalAttr={{
          centered: true,
          closeBtn: true,
          deleteText: '刪除',
          forceRender: true,
          maskClosable: false,
          okText: '儲存',
          onCancel: () => toggle.onFalse(),
          onDelete: () => toggleDelete.onTrue(),
          onOk: handleDelete,
          open: toggle.value,
          title: '編輯排程',
        }}
      >
        <ScopeStyle>
          {/* <Typography size="lg" color={color.themeBlack}> */}
          <EditFields eventIndex={eventIndex} formInstance={formInstance} />
          {/* </Typography> */}
        </ScopeStyle>
      </ModalNormal>
      <ModalDeleteOverview handleDelete={handleDelete} toggle={toggleDelete} />
    </>
  );
};

const EditFields = ({ eventIndex, formInstance }) => {
  const { formFields } = useFields({});
  return (
    <Form form={formInstance} initialValues={eventIndex}>
      {formFields?.map((item, idx) => (
        <Form.Item key={`form-item-${idx}`} {...item.formItemAttr}>
          {renderField(item)}
        </Form.Item>
      ))}
    </Form>
  );
};
