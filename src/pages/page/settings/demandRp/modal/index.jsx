import Typography from '@/components/units/typography';
import ModalNormal from '@/components/widgets/modalNormal';
import { pagesPathName } from '@/router';
import { router } from '@/router';
import { ScopeStyle } from './indexStyle';
import { color } from '@/styles/variable/indexStyle';

export const ModalOverview = ({ toggle }) => {
  if (!toggle?.value) return null;
  return (
    <ModalNormal
      modalAttr={{
        cancelText: '取消',
        centered: true,
        forceRender: true,
        maskClosable: false,
        okText: '確定',
        onCancel: () => toggle.onFalse(),
        onOk: () => router.navigate(`/${pagesPathName.setting.schedule.path}`),
        open: toggle.value,
        title: '',
      }}
    >
      <ScopeStyle>
        <Typography color={color.themeBlack} size="lg">
          是否要前往排程查看？
        </Typography>
      </ScopeStyle>
    </ModalNormal>
  );
};
