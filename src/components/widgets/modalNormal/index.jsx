import { Icon } from '@iconify/react';
import Button from '@/components/units/button';
import Typography from '@/components/units/typography';
import { Flex } from 'antd';
import ScopeStyle from '../modalForm/indexStyle';
import { color } from '@/styles/variable/indexStyle';

function ModalNormal({ children, modalAttr, styles }) {
  return (
    <ScopeStyle
      $customStyle={styles}
      closeIcon={false}
      forceRender
      {...modalAttr}
      footer={[
        <Flex justify="center" key="modal-footer">
          {modalAttr?.onDelete ? (
            <Button
              className="btn-delete"
              danger
              onClick={modalAttr?.onDelete}
              size="md"
            >
              <Typography size="lg">{modalAttr?.deleteText}</Typography>
            </Button>
          ) : (
            <Button
              className="btn-cancel"
              onClick={modalAttr?.onCancel}
              size="md"
            >
              <Typography size="lg">{modalAttr?.cancelText}</Typography>
            </Button>
          )}
          <Button
            className="btn-submit"
            onClick={modalAttr?.onOk}
            size="md"
            type="primary"
          >
            <Typography size="lg">{modalAttr?.okText}</Typography>
          </Button>
        </Flex>,
      ]}
      style={{
        maxWidth: '555px',
        minWidth: '350px',
      }}
      styles={{
        footer: {
          direction: 'ltr',
          textAlign: 'center',
        },
        header: { textAlign: 'center' },
        ...modalAttr?.styles,
      }}
      title={
        <Typography color={color.black} size="lg">
          {modalAttr?.title}
        </Typography>
      }
      width="70vw"
    >
      {modalAttr?.closeBtn && (
        <Button
          className="btn-close"
          onClick={modalAttr?.onCancel}
          variant="icon"
        >
          <Icon
            color={color.themeBlack}
            fontSize="24"
            icon="material-symbols:close-rounded"
          />
        </Button>
      )}
      {children}
    </ScopeStyle>
  );
}

export default ModalNormal;
