import { color } from '@/styles/variable/indexStyle';

const systemConfig = {
  charger: {
    color: color.brightGreen,
    config: [
      {
        name: 'kwh',
        title: '當日累積用電量(kWh)',
      },
      {
        name: 'bill',
        title: '當日累積成本($NT)',
      },
      {
        name: 'carbon',
        title: '當日累積排碳量(kg)',
      },
    ],
    icon: 'streamline-ultimate:charger-1-bold',
    legendNameMap: [
      {
        bgColor: color.brightGreen,
        name: 'charger',
        title: '充電樁',
      },
    ],
  },
  solar: {
    color: color.warningYellow,
    config: [
      {
        name: 'kwh',
        title: '當日累積發電量(kWh)',
      },
      {
        name: 'bill',
        title: '當日累積效益($NT)',
      },
      {
        name: 'carbon',
        title: '當日累積減碳量(kg)',
      },
    ],
    icon: 'heroicons:sun-solid',
    legendNameMap: [
      {
        bgColor: color.warningYellow,
        name: 'solar',
        title: '太陽能',
      },
    ],
  },
  storage: {
    color: color.lightBlue,
    config: [
      {
        name: 'kwh_supply',
        title: '當日累積供電量(kWh)',
      },
      {
        name: 'kwh_demand',
        title: '當日累積用電量(kWh)',
      },
      {
        name: 'bill',
        title: '當日累積效益($NT)',
      },
    ],
    icon: 'la:car-battery',
    legendNameMap: [
      {
        bgColor: color.lightBlue,
        name: 'storage',
        title: '儲能',
      },
    ],
  },
};

export { systemConfig };
