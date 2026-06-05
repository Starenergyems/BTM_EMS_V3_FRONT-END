import Typography from '@/components/units/typography';
import ModalNormal from '@/components/widgets/modalNormal';
import { ScopeStyle } from './indexStyle';
import { color } from '@/styles/variable/indexStyle';

export const ModalOverview = ({ handleDelete, toggle }) => {
  if (!toggle?.value) return null;
  return (
    <ModalNormal
      modalAttr={{
        cancelText: '取消',
        centered: true,
        forceRender: true,
        maskClosable: false,
        okText: '刪除',
        onCancel: () => toggle.onFalse(),
        onOk: handleDelete,
        open: toggle.value,
        title: '',
      }}
    >
      <ScopeStyle>
        <Typography color={color.themeBlack} size="lg">
          是否要刪除此排程？
        </Typography>
      </ScopeStyle>
    </ModalNormal>
  );
};
