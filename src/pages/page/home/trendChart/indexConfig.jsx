import { color } from '@/styles/variable/indexStyle';

const customLegendNameMap = [
  {
    bgColor: color.white,
    name: 'grid',
    showArea: false,
    title: '市電圖',
  },
  {
    bgColor: color.red,
    name: 'load',
    showArea: false,
    title: '負載',
  },
  {
    bgColor: color.warningYellow,
    name: 'solar',
    showArea: true,
    title: '太陽能',
  },
  {
    bgColor: color.lightBlue,
    name: 'battery',
    showArea: true,
    title: '儲能',
  },
  {
    bgColor: color.lighterGreen,
    name: 'charger',
    showArea: false,
    title: '充電樁',
  },
];

const trendNameMap = [
  {
    name: 'season',
    subTitle: '季節/尖離峰',
  },
  {
    name: 'price',
    subTitle: '時間電價(NT$)',
  },
  {
    name: 'save_expenses',
    subTitle: '節省電費(NT$)',
  },
  {
    name: 'carbon_reduction',
    subTitle: '減少碳排(噸)',
  },
];

const trendValueMap = {
  aoc_value: '防超約',
  arc_value: '防逆流',
  contract_value: '契約容量',
};

export { customLegendNameMap, trendNameMap, trendValueMap };
