import { color } from '@/styles/variable/indexStyle';

export const config = [
  {
    strategy: 'idle',
    title: '待機',
    color: color.buttonGray,
  },
  {
    strategy: 'arbitrage',
    title: '時間電價套利',
    color: color.warningYellow,
  },
  {
    strategy: 'spinning',
    title: '即時備轉',
    color: '#15AE31',
  },
  {
    strategy: 'net_load_with_surplus_tracker',
    title: '負載追隨+儲存餘電',
    color: color.darkBlue,
  },
  {
    strategy: 'net_load_tracker',
    title: '負載追隨',
    color: color.blue,
  },
  {
    strategy: 'surplus_tracker',
    title: '儲存餘電',
    color: color.lightBlue,
  },
  {
    strategy: 'user_battery_schedule',
    title: '手動充放電',
    color: '#B900C3',
  },
  {
    strategy: 'demand_response',
    title: '抑低負載',
    color: '#7557D0',
  },
];


