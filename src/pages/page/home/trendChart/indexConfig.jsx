import { color } from '@/styles/variable/indexStyle';

const customLegendNameMap = [
  {
    name: 'grid',
    title: '市電圖',
    bgColor: color.white,
    showArea: false,
  },
  {
    name: 'load',
    title: '負載',
    bgColor: color.red,
    showArea: false,
  },
  {
    name: 'solar',
    title: '太陽能',
    bgColor: color.warningYellow,
    showArea: true,
  },
  {
    name: 'battery',
    title: '儲能',
    bgColor: color.lightBlue,
    showArea: true,
  },
  {
    name: 'charger',
    title: '充電樁',
    bgColor: color.lighterGreen,
    showArea: false,
  },
];

const trendNameMap = [
  {
    subTitle: '季節/尖離峰',
    name: 'season',
  },
  {
    subTitle: '時間電價(NT$)',
    name: 'price',
  },
  {
    subTitle: '節省電費(NT$)',
    name: 'save_expenses',
  },
  {
    subTitle: '減少碳排(噸)',
    name: 'carbon_reduction',
  },
];

const trendValueMap = {
  contract_value: '契約容量',
  aoc_value: '防超約',
  arc_value: '防逆流',
};

export { customLegendNameMap, trendNameMap, trendValueMap };
