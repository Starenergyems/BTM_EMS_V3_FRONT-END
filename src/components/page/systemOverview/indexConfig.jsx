import { color } from '@/styles/variable/indexStyle';

const systemConfig = {
  solar: {
    color: color.warningYellow,
    icon: 'heroicons:sun-solid',
    legendNameMap: [
      {
        name: 'solar',
        title: '太陽能',
        bgColor: color.warningYellow,
      },
    ],
    config: [
      {
        title: '當日累積發電量(kWh)',
        name: 'kwh',
      },
      {
        title: '當日累積效益($NT)',
        name: 'bill',
      },
      {
        title: '當日累積減碳量(kg)',
        name: 'carbon',
      },
    ],
  },
  charger: {
    color: color.brightGreen,
    icon: 'streamline-ultimate:charger-1-bold',
    legendNameMap: [
      {
        name: 'charger',
        title: '充電樁',
        bgColor: color.brightGreen,
      },
    ],
    config: [
      {
        title: '當日累積用電量(kWh)',
        name: 'kwh',
      },
      {
        title: '當日累積成本($NT)',
        name: 'bill',
      },
      {
        title: '當日累積排碳量(kg)',
        name: 'carbon',
      },
    ],
  },
  storage: {
    color: color.lightBlue,
    icon: 'la:car-battery',
    legendNameMap: [
      {
        name: 'storage',
        title: '儲能',
        bgColor: color.lightBlue,
      },
    ],
    config: [
      {
        title: '當日累積供電量(kWh)',
        name: 'kwh_supply',
      },
      {
        title: '當日累積用電量(kWh)',
        name: 'kwh_demand',
      },
      {
        title: '當日累積效益($NT)',
        name: 'bill',
      },
    ],
  },
};

export { systemConfig };
