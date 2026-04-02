const equipmentDatas = [
  {
    name: 'gridP',
    title: '台電電網',
    col: 7,
    icon: 'mingcute:earth-3-line',
    iconSize: 22,
    children: [
      {
        title: '契約容量',
        name: 'contract_value',
        unit: 'kW',
      },
    ],
  },
  {
    name: 'batteryP',
    title: '儲能系統',
    col: 17,
    icon: 'fa6-solid:car-battery',
    iconSize: 20,
    children: [
      {
        title: '總功率',
        name: 'battery_total_kw',
        unit: 'kW',
      },
      {
        title: '總電池容量',
        name: 'battery_total_kwh',
        unit: 'kWh',
      },
      {
        title: '設備數量',
        name: 'battery_total_number',
        unit: '台',
      },
    ],
  },
  {
    name: 'solarP',
    title: '太陽能',
    col: 12,
    icon: 'flowbite:sun-solid',
    iconSize: 22,
    children: [
      {
        title: '最高發電功率',
        name: 'solar_total_kw',
        unit: 'kWp',
      },
      {
        title: '設備數量',
        name: 'solar_total_number',
        unit: '片',
      },
    ],
  },
  {
    name: 'chargerP',
    title: '充電樁',
    col: 12,
    unit: 'kW',
    icon: 'material-symbols:ev-charger-rounded',
    iconSize: 24,
    children: [
      {
        title: '總充電功率',
        name: 'charger_total_kw',
        unit: 'kW',
      },
      {
        title: '設備數量',
        name: 'charger_total_number',
        unit: '樁',
      },
    ],
  },
];

export { equipmentDatas };
