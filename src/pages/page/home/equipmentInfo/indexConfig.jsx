import { color } from '@/styles/variable/indexStyle';

const equipmentInfoDatas = [
  {
    name: 'solarP',
    title: '太陽能',
    color: color.lightBlue,
    isSupply: true,
    bill: [
      {
        name: 'solar_arbitrage',
        unit: 'NT$',
      },
    ],
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
  },
  {
    name: 'discharge',
    title: '儲能放電',
    color: color.blue,
    isSupply: true,
    bill: [
      {
        name: 'battery_arbitrage_demand',
        unit: 'NT$',
      },
    ],
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
  },
  {
    name: '',
    title: '',
    color: '',
    bill: [],
    percentage: [],
  },
  {
    name: 'chargerP',
    title: '充電樁',
    color: color.yellow,
    isSupply: false,
    bill: [
      {
        name: 'charger_arbitrage',
        unit: 'NT$',
      },
    ],
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
  },
  {
    name: 'battery',
    title: '儲能充電',
    color: color.warningYellow,
    isSupply: false,
    bill: [
      {
        name: 'battery_arbitrage_supply',
        unit: 'NT$',
      },
    ],
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
  },
  {
    name: 'loaderP',
    title: '負載',
    color: color.red,
    isSupply: false,
    bill: [
      {
        name: 'load_arbitrage',
        unit: 'NT$',
      },
    ],
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
  },
];

export { equipmentInfoDatas };
