import { color } from '@/styles/variable/indexStyle';

const selectOptions = [
  { value: 'day', label: 'Day' },
  { value: 'year', label: 'Month' },
];

const yAxisLabels = [
  {
    name: 'kWh',
    title: '電量(kWh)',
    position: 'left',
  },
  {
    name: 'ntd',
    title: '效益(NTD)',
    position: 'right',
  },
];

const systemConfig = {
  solar: {
    color: color.warningYellow,
    legendNameMap: [
      {
        name: 'solar_kwh_supply',
        title: '累積電量',
        bgColor: color.warningYellow,
        unit: 'kWh',
      },
      {
        name: 'solar_arbitrage_supply',
        title: '累積效益',
        bgColor: color.brightGreen,
        unit: 'NTD',
      },
    ],
    config: [
      {
        title: '總累積發電量(kWh)',
        name: 'solar_acc_kwh',
        icon: '',
      },
      {
        title: '總累積效益($NT)',
        name: 'solar_acc_arbitrage',
        icon: '',
      },
      {
        title: '總累積減碳量(kg)',
        name: 'solar_acc_carbon_reduction',
        icon: 'solar',
      },
    ],
  },
  charger: {
    color: color.brightGreen,
    legendNameMap: [
      {
        name: 'charger_kwh_demand',
        title: '累積電量',
        isGradient: false,
        bgColor: color.brightGreen,
        unit: 'kWh',
      },
      {
        name: 'charger_arbitrage_demand',
        title: '累積成本',
        isGradient: true,
        unit: 'NTD',
        bgColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 1, color: color.darkLegendGray },
            { offset: 0, color: color.lightLegendGray },
          ],
        },
      },
    ],
    config: [
      {
        title: '總累積用電量(kWh)',
        name: 'charger_acc_kwh',
        icon: '',
      },
      {
        title: '總累積成本($NT)',
        name: 'charger_acc_arbitrage',
        icon: '',
      },
      {
        title: '總累積排碳量(kg)',
        name: 'charger_acc_carbon',
        icon: 'charger',
      },
    ],
  },
  storage: {
    color: color.lightBlue,
    icon: 'la:car-battery',
    legendNameMap: [
      {
        name: 'battery_kwh_supply',
        title: '累積放電',
        bgColor: color.warningYellow,
        unit: 'kWh',
      },
      {
        name: 'battery_arbitrage_supply',
        title: '累積收入',
        bgColor: color.brightGreen,
        unit: 'NTD',
      },
      {
        name: 'battery_kwh_demand',
        title: '累積充電',
        bgColor: color.lightBlue,
        unit: 'kWh',
      },
      {
        name: 'battery_arbitrage_demand',
        title: '累積成本',
        bgColor: color.darkLegendGray,
        unit: 'NTD',
      },
    ],
    config: [
      {
        title: '總累積供電量(kWh)',
        name: 'battery_acc_discharge_kwh',
      },
      {
        title: '總累積充電量(kWh)',
        name: 'battery_acc_charge_kwh',
      },
      {
        title: '總累積效益($NT)',
        name: 'battery_acc_arbitrage',
      },
      {
        title: '總累積成本($NT)',
        name: 'battery_acc_charge_arbitrage',
      },
    ],
  },
};

export { systemConfig, selectOptions, yAxisLabels };
