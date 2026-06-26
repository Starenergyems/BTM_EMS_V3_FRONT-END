import {
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import { color } from '@/styles/variable/indexStyle';

const style = {
  color: color.white,
  fontSize: '16px',
};

const statusData = [
  {
    color: color.white,
    icon: <CheckCircleFilled style={{ ...style }} />,
    name: 'normal',
    status: 0,
    title: 'Success',
    title_cn: '正常',
  },
  {
    color: color.warningYellow,
    icon: (
      <ExclamationCircleFilled
        style={{ ...style, color: color.warningYellow }}
      />
    ),
    name: 'alarm',
    status: 1,
    title: 'Warning',
    title_cn: '告警',
  },
  {
    color: color.red,
    icon: <CloseCircleFilled style={{ ...style, color: color.red }} />,
    name: 'fault',
    status: 2,
    title: 'Error',
    title_cn: '故障',
  },
  {
    color: color.buttonGray,
    icon: <CloseCircleFilled style={{ ...style, color: color.buttonGray }} />,
    name: 'idle',
    status: 3,
    title: 'Idle',
    title_cn: '待機',
  },
  {
    color: color.black,
    icon: <CloseCircleFilled style={{ ...style, color: color.black }} />,
    name: 'no_data',
    status: 4,
    title: 'No data',
    title_cn: '無資料',
  },
  {
    color: color.black,
    icon: <CloseCircleFilled style={{ ...style, color: color.black }} />,
    name: 'fake_data',
    status: 5,
    title: 'Fake data',
    title_cn: '假資料',
  },
];

export { statusData };
