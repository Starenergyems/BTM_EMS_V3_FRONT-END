import NoBatteryImage from '@/assets/img/home/no_batteryP.png';
import NoChargerImage from '@/assets/img/home/no_chargerP.png';
import NoLoadImage from '@/assets/img/home/no_loadP.png';
import NoSolarImage from '@/assets/img/home/no_solarP.png';

const flowDatas = [
  {
    hasSoc: false,
    icon: 'mingcute:earth-3-line',
    iconSize: 22,
    name: 'gridP',
    title: '台電電網',
    titleEn: 'grid',
    unit: 'kW',
  },
  {
    hasSoc: false,
    icon: 'flowbite:sun-solid',
    iconSize: 22,
    name: 'solarP',
    noDataImage: NoSolarImage,
    title: '太陽能',
    titleEn: 'solar',
  },
  {
    hasSoc: false,
    icon: 'material-symbols:ev-charger-rounded',
    iconSize: 24,
    name: 'chargerP',
    noDataImage: NoChargerImage,
    title: '充電樁',
    titleEn: 'charger',
    unit: 'kW',
  },
  {
    hasSoc: true,
    icon: 'fa6-solid:car-battery',
    iconSize: 20,
    name: 'batteryP',
    noDataImage: NoBatteryImage,
    title: '儲能',
    titleEn: 'battery',
  },
  {
    hasSoc: false,
    icon: 'material-symbols:home-rounded',
    iconSize: 25,
    name: 'loadP',
    noDataImage: NoLoadImage,
    title: '負載',
    titleEn: 'load',
    unit: 'kW',
  },
];

export { flowDatas };
