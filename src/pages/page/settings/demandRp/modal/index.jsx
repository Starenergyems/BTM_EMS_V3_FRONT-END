import { pagesPathName } from '@/router';
import ModalNormal from '@/components/widgets/modalNomal';
import Typography from '@/components/units/typography';
import { color } from '@/styles/variable/indexStyle';
import { ScopeStyle } from './indexStyle';
import { router } from '@/router';

export const ModalOverview = ({ toggle }) => {
  if (!toggle?.value) return null;
  return (
    <ModalNormal
      modalAttr={{
        cancelText: '取消',
        centered: true,
        forceRender: true,
        maskClosable: false,
        onCancel: () => toggle.onFalse(),
        onOk: () => router.navigate(`/${pagesPathName.setting.schedule.path}`),
        okText: '確定',
        open: toggle.value,
        title: '',
      }}
    >
      <ScopeStyle>
        <Typography size="lg" color={color.themeBlack}>
          是否要前往排程查看？
        </Typography>
      </ScopeStyle>
    </ModalNormal>
  );
};
