import { color } from '@/styles/variable/indexStyle';

const equipmentInfoDatas = [
  {
    bill: [
      {
        name: 'solar_arbitrage',
        unit: 'NT$',
      },
    ],
    color: color.lightBlue,
    isSupply: true,
    name: 'solarP',
    percentage: [
      {
        name: 'solar_percentage',
        unit: '%',
      },
      {
        name: 'solar_kwh',
        unit: 'kWh',
      },
    ],
    title: '太陽能',
  },
  {
    bill: [
      {
        name: 'battery_arbitrage_demand',
        unit: 'NT$',
      },
    ],
    color: color.blue,
    isSupply: true,
    name: 'discharge',
    percentage: [
      {
        name: 'battery_demand_percentage',
        unit: '%',
      },
      {
        name: 'battery_kwh_demand',
        unit: 'kWh',
      },
    ],
    title: '儲能放電',
  },
  {
    bill: [],
    color: '',
    name: '',
    percentage: [],
    title: '',
  },
  {
    bill: [
      {
        name: 'charger_arbitrage',
        unit: 'NT$',
      },
    ],
    color: color.yellow,
    isSupply: false,
    name: 'chargerP',
    percentage: [
      {
        name: 'charger_percentage',
        unit: '%',
      },
      {
        name: 'charger_kwh',
        unit: 'kWh',
      },
    ],
    title: '充電樁',
  },
  {
    bill: [
      {
        name: 'battery_arbitrage_supply',
        unit: 'NT$',
      },
    ],
    color: color.warningYellow,
    isSupply: false,
    name: 'battery',
    percentage: [
      {
        name: 'battery_supply_percentage',
        unit: '%',
      },
      {
        name: 'battery_kwh_supply',
        unit: 'kWh',
      },
    ],
    title: '儲能充電',
  },
  {
    bill: [
      {
        name: 'load_arbitrage',
        unit: 'NT$',
      },
    ],
    color: color.red,
    isSupply: false,
    name: 'loaderP',
    percentage: [
      {
        name: 'load_percentage',
        unit: '%',
      },
      {
        name: 'load_kwh',
        unit: 'kWh',
      },
    ],
    title: '負載',
  },
];

export { equipmentInfoDatas };
