import { color } from '@/styles/variable/indexStyle';
import { flowDatas } from '@/pages/page/home/flow/indexConfig';

const selectOptions = [
  {
    value: '',
    label: '全部',
  },
  ...(flowDatas?.map((flow) => ({
    value: flow.titleEn,
    label: flow.title,
  })) || []),
];

export const alertOptions = {
  Fault: {
    color: color.red,
  },
  Alarm: {
    color: color.warningYellow,
  },
};

export { selectOptions };
