import { color } from '@/styles/variable/indexStyle';

const selectOptions = [
  { label: 'Day', value: 'day' },
  { label: 'Month', value: 'year' },
];

const yAxisLabels = [
  {
    name: 'kWh',
    position: 'left',
    title: '電量(kWh)',
  },
  {
    name: 'ntd',
    position: 'right',
    title: '效益(NTD)',
  },
];

const systemConfig = {
  charger: {
    color: color.brightGreen,
    config: [
      {
        icon: '',
        name: 'charger_acc_kwh',
        title: '總累積用電量(kWh)',
      },
      {
        icon: '',
        name: 'charger_acc_arbitrage',
        title: '總累積成本($NT)',
      },
      {
        icon: 'charger',
        name: 'charger_acc_carbon',
        title: '總累積排碳量(kg)',
      },
    ],
    legendNameMap: [
      {
        bgColor: color.brightGreen,
        isGradient: false,
        name: 'charger_kwh_demand',
        title: '累積電量',
        unit: 'kWh',
      },
      {
        bgColor: {
          colorStops: [
            { color: color.darkLegendGray, offset: 1 },
            { color: color.lightLegendGray, offset: 0 },
          ],
          type: 'linear',
          x: 0,
          x2: 0,
          y: 0,
          y2: 1,
        },
        isGradient: true,
        name: 'charger_arbitrage_demand',
        title: '累積成本',
        unit: 'NTD',
      },
    ],
  },
  solar: {
    color: color.warningYellow,
    config: [
      {
        icon: '',
        name: 'solar_acc_kwh',
        title: '總累積發電量(kWh)',
      },
      {
        icon: '',
        name: 'solar_acc_arbitrage',
        title: '總累積效益($NT)',
      },
      {
        icon: 'solar',
        name: 'solar_acc_carbon_reduction',
        title: '總累積減碳量(kg)',
      },
    ],
    legendNameMap: [
      {
        bgColor: color.warningYellow,
        name: 'solar_kwh_supply',
        title: '累積電量',
        unit: 'kWh',
      },
      {
        bgColor: color.brightGreen,
        name: 'solar_arbitrage_supply',
        title: '累積效益',
        unit: 'NTD',
      },
    ],
  },
  storage: {
    color: color.lightBlue,
    config: [
      {
        name: 'battery_acc_discharge_kwh',
        title: '總累積供電量(kWh)',
      },
      {
        name: 'battery_acc_charge_kwh',
        title: '總累積充電量(kWh)',
      },
      {
        name: 'battery_acc_arbitrage',
        title: '總累積效益($NT)',
      },
      {
        name: 'battery_acc_charge_arbitrage',
        title: '總累積成本($NT)',
      },
    ],
    icon: 'la:car-battery',
    legendNameMap: [
      {
        bgColor: color.warningYellow,
        name: 'battery_kwh_supply',
        title: '累積放電',
        unit: 'kWh',
      },
      {
        bgColor: color.brightGreen,
        name: 'battery_arbitrage_supply',
        title: '累積收入',
        unit: 'NTD',
      },
      {
        bgColor: color.lightBlue,
        name: 'battery_kwh_demand',
        title: '累積充電',
        unit: 'kWh',
      },
      {
        bgColor: color.darkLegendGray,
        name: 'battery_arbitrage_demand',
        title: '累積成本',
        unit: 'NTD',
      },
    ],
  },
};

export { selectOptions, systemConfig, yAxisLabels };
