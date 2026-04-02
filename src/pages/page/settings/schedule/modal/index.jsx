import ModalNormal from '@/components/widgets/modalNomal';
import Typography from '@/components/units/typography';
import { color } from '@/styles/variable/indexStyle';
import { ScopeStyle } from './indexStyle';

export const ModalOverview = ({ toggle, handleDelete }) => {
  if (!toggle?.value) return null;
  return (
    <ModalNormal
      modalAttr={{
        cancelText: '取消',
        centered: true,
        forceRender: true,
        maskClosable: false,
        onCancel: () => toggle.onFalse(),
        onOk: handleDelete,
        okText: '刪除',
        open: toggle.value,
        title: '',
      }}
    >
      <ScopeStyle>
        <Typography size="lg" color={color.themeBlack}>
          是否要刪除此排程？
        </Typography>
      </ScopeStyle>
    </ModalNormal>
  );
};
