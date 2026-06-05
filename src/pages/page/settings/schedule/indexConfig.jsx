import { color } from '@/styles/variable/indexStyle';

export const config = [
  {
    color: color.buttonGray,
    strategy: 'idle',
    title: '待機',
  },
  {
    color: color.warningYellow,
    strategy: 'arbitrage',
    title: '時間電價套利',
  },
  {
    color: '#15AE31',
    strategy: 'spinning',
    title: '即時備轉',
  },
  {
    color: color.darkBlue,
    strategy: 'net_load_with_surplus_tracker',
    title: '負載追隨+儲存餘電',
  },
  {
    color: color.blue,
    strategy: 'net_load_tracker',
    title: '負載追隨',
  },
  {
    color: color.lightBlue,
    strategy: 'surplus_tracker',
    title: '儲存餘電',
  },
  {
    color: '#B900C3',
    strategy: 'user_battery_schedule',
    title: '手動充放電',
  },
  {
    color: '#7557D0',
    strategy: 'demand_response',
    title: '抑低負載',
  },
];


