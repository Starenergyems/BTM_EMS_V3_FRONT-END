import { color } from '@/styles/variable/indexStyle';

const yAxisLabels = [
  {
    name: 'ntd',
    title: '金額 NT$',
    position: 'left',
    color: color.white,
  },
  {
    name: 'ntd',
    title: '累積效益 NT$',
    position: 'right',
    color: color.brightGreen,
  },
];

const config = {
  color: color.lightBlue,
  legendNameMap: [
    {
      name: 'load_hourly_sums',
      title: '負載',
      bgColor: color.red,
      accumulation: false,
      unit: 'NT$',
    },
    {
      name: 'load_add_solar_hourly_sums',
      title: '+光效益',
      bgColor: color.warningYellow,
      accumulation: false,
      unit: 'NT$',
    },
    {
      name: 'load_add_solar_battery_hourly_sums',
      title: '+光儲效益',
      bgColor: color.blue,
      accumulation: false,
      unit: 'NT$',
    },
    {
      name: 'acc_solar_battery_benefit_hourly_sums',
      title: '+累積效益',
      bgColor: color.brightGreen,
      accumulation: true,
      unit: 'NT$',
    },
  ],
};

export { config, yAxisLabels };
