import NoSolarImage from '@/assets/img/home/no_solarP.png';
import NoChargerImage from '@/assets/img/home/no_chargerP.png';
import NoBatteryImage from '@/assets/img/home/no_batteryP.png';
import NoLoadImage from '@/assets/img/home/no_loadP.png';

const flowDatas = [
  {
    name: 'gridP',
    title: '台電電網',
    titleEn: 'grid',
    unit: 'kW',
    icon: 'mingcute:earth-3-line',
    iconSize: 22,
    hasSoc: false,
  },
  {
    name: 'solarP',
    title: '太陽能',
    titleEn: 'solar',
    icon: 'flowbite:sun-solid',
    iconSize: 22,
    hasSoc: false,
    noDataImage: NoSolarImage,
  },
  {
    name: 'chargerP',
    title: '充電樁',
    titleEn: 'charger',
    unit: 'kW',
    icon: 'material-symbols:ev-charger-rounded',
    iconSize: 24,
    hasSoc: false,
    noDataImage: NoChargerImage,
  },
  {
    name: 'batteryP',
    title: '儲能',
    titleEn: 'battery',
    icon: 'fa6-solid:car-battery',
    iconSize: 20,
    hasSoc: true,
    noDataImage: NoBatteryImage,
  },
  {
    name: 'loadP',
    title: '負載',
    titleEn: 'load',
    unit: 'kW',
    icon: 'material-symbols:home-rounded',
    iconSize: 25,
    hasSoc: false,
    noDataImage: NoLoadImage,
  },
];

export { flowDatas };
