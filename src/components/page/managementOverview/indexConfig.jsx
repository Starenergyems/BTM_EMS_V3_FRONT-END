import { flowDatas } from '@/pages/page/home/flow/indexConfig';
import { color } from '@/styles/variable/indexStyle';

const selectOptions = [
  {
    label: '全部',
    value: '',
  },
  ...(flowDatas?.map((flow) => ({
    label: flow.title,
    value: flow.titleEn,
  })) || []),
];

export const alertOptions = {
  Alarm: {
    color: color.warningYellow,
  },
  Fault: {
    color: color.red,
  },
};

export { selectOptions };
