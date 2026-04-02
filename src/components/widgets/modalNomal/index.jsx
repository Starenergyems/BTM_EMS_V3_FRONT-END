import { color } from '@/styles/variable/indexStyle';
import { Flex } from 'antd';
import Button from '@/components/units/button';
import Typography from '@/components/units/typography';
import ScopeStyle from '../modalForm/indexStyle';

function ModalNormal({ modalAttr, styles, children }) {
  return (
    <ScopeStyle
      $customStyle={styles}
      closeIcon={false}
      forceRender
      {...modalAttr}
      title={
        <Typography size="lg" color={color.black}>
          {modalAttr?.title}
        </Typography>
      }
      footer={[
        <Flex key="modal-footer" justify="center">
          <Button
            size="md"
            className="btn-cancel"
            onClick={modalAttr?.onCancel}
          >
            <Typography size="lg">{modalAttr?.cancelText}</Typography>
          </Button>
          <Button
            size="md"
            type="primary"
            className="btn-submit"
            onClick={modalAttr?.onOk}
          >
            <Typography size="lg">{modalAttr?.okText}</Typography>
          </Button>
        </Flex>,
      ]}
      width="70vw"
      style={{
        maxWidth: '555px',
        minWidth: '350px',
      }}
      styles={{
        header: { textAlign: 'center' },
        footer: {
          textAlign: 'center',
          direction: 'rtl',
        },
        ...modalAttr?.styles,
      }}
    >
      {children}
    </ScopeStyle>
  );
}

export default ModalNormal;
