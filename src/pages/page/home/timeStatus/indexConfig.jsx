import { color } from '@/styles/variable/indexStyle';
import {
  CheckCircleFilled,
  ExclamationCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons';

const style = {
  fontSize: '16px',
  color: color.white,
};

const statusData = [
  {
    title: 'Success',
    title_cn: '正常',
    name: 'normal',
    status: 0,
    color: color.white,
    icon: <CheckCircleFilled style={{ ...style }} />,
  },
  {
    title: 'Warning',
    title_cn: '告警',
    name: 'alarm',
    status: 1,
    color: color.warningYellow,
    icon: (
      <ExclamationCircleFilled
        style={{ ...style, color: color.warningYellow }}
      />
    ),
  },
  {
    title: 'Error',
    status: 2,
    name: 'fault',
    color: color.red,
    title_cn: '故障',
    icon: <CloseCircleFilled style={{ ...style, color: color.red }} />,
  },
  {
    title: 'Idle',
    status: 3,
    name: 'idle',
    title_cn: '待機',
    color: color.buttonGray,
    icon: <CloseCircleFilled style={{ ...style, color: color.buttonGray }} />,
  },
  {
    title: 'No data',
    status: 4,
    name: 'no_data',
    title_cn: '無資料',
    color: color.black,
    icon: <CloseCircleFilled style={{ ...style, color: color.black }} />,
  },
];

export { statusData };
