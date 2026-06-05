import { color } from '@/styles/variable/indexStyle';

const yAxisLabels = [
  {
    color: color.white,
    name: 'ntd',
    position: 'left',
    title: '金額 NT$',
  },
  {
    color: color.brightGreen,
    name: 'ntd',
    position: 'right',
    title: '累積效益 NT$',
  },
];

const config = {
  color: color.lightBlue,
  legendNameMap: [
    {
      accumulation: false,
      bgColor: color.red,
      name: 'load_hourly_sums',
      title: '負載',
      unit: 'NT$',
    },
    {
      accumulation: false,
      bgColor: color.warningYellow,
      name: 'load_add_solar_hourly_sums',
      title: '+光效益',
      unit: 'NT$',
    },
    {
      accumulation: false,
      bgColor: color.blue,
      name: 'load_add_solar_battery_hourly_sums',
      title: '+光儲效益',
      unit: 'NT$',
    },
    {
      accumulation: true,
      bgColor: color.brightGreen,
      name: 'acc_solar_battery_benefit_hourly_sums',
      title: '+累積效益',
      unit: 'NT$',
    },
  ],
};

export { config, yAxisLabels };
