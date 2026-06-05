const equipmentDatas = [
  {
    children: [
      {
        name: 'contract_value',
        title: '契約容量',
        unit: 'kW',
      },
    ],
    col: 7,
    icon: 'mingcute:earth-3-line',
    iconSize: 22,
    name: 'gridP',
    title: '台電電網',
  },
  {
    children: [
      {
        name: 'battery_total_kw',
        title: '總功率',
        unit: 'kW',
      },
      {
        name: 'battery_total_kwh',
        title: '總電池容量',
        unit: 'kWh',
      },
      {
        name: 'battery_total_number',
        title: '設備數量',
        unit: '台',
      },
    ],
    col: 17,
    icon: 'fa6-solid:car-battery',
    iconSize: 20,
    name: 'batteryP',
    title: '儲能系統',
  },
  {
    children: [
      {
        name: 'solar_total_kw',
        title: '最高發電功率',
        unit: 'kWp',
      },
      {
        name: 'solar_total_number',
        title: '設備數量',
        unit: '片',
      },
    ],
    col: 12,
    icon: 'flowbite:sun-solid',
    iconSize: 22,
    name: 'solarP',
    title: '太陽能',
  },
  {
    children: [
      {
        name: 'charger_total_kw',
        title: '總充電功率',
        unit: 'kW',
      },
      {
        name: 'charger_total_number',
        title: '設備數量',
        unit: '樁',
      },
    ],
    col: 12,
    icon: 'material-symbols:ev-charger-rounded',
    iconSize: 24,
    name: 'chargerP',
    title: '充電樁',
    unit: 'kW',
  },
];

export { equipmentDatas };
