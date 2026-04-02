const Events = [
  // {
  //   title: '待機',
  //   start: '2026-03-13 00:00',
  //   end: '2026-03-14 00:00',
  //   allDay: true,
  //   extendedProps: {
  //     strategy: 'idle',
  //   },
  // },
  // {
  //   title: '時間電價套利',
  //   start: '2026-03-15 00:00',
  //   end: '2026-03-15 02:00',
  //   allDay: false,
  //   extendedProps: {
  //     strategy: 'arbitrage',
  //   },
  // },
  // {
  //   title: '即時備轉',
  //   start: '2026-03-15 02:00',
  //   end: '2026-03-15 04:00',
  //   allDay: false,
  //   extendedProps: {
  //     strategy: 'spinning',

  //     offer: {
  //       offer_kw: 10.0,
  //       offer_start: '2026-03-15 02:00',
  //       offer_end: '2026-03-15 04:00',
  //       offer_update_time: '2026-03-12 14:00',
  //     },
  //     reserve: {
  //       reserve_kw: null,
  //       reserve_start: null,
  //       reserve_end: null,
  //       reserve_update_time: null,
  //     },
  //     spinning_status: 'offered',
  //   },
  // },
  // {
  //   title: '負載追隨+儲存餘電',
  //   start: '2026-03-16 00:00',
  //   end: '2026-03-16 07:00',
  //   allDay: false,
  //   extendedProps: {
  //     strategy: 'net_load_with_surplus_tracker',
  //   },
  // },
  // {
  //   title: '負載追隨',
  //   start: '2026-03-16 08:00',
  //   end: '2026-03-16 10:00',
  //   allDay: false,
  //   extendedProps: {
  //     strategy: 'net_load_tracker',
  //   },
  // },
  // {
  //   title: '儲存餘電',
  //   start: '2026-03-17 00:00',
  //   end: '2026-03-19 00:00',
  //   allDay: false,
  //   extendedProps: {
  //     strategy: 'surplus_tracker',
  //   },
  // },
  // {
  //   title: '手動充放電',
  //   start: '2026-03-19 00:00',
  //   end: '2026-03-19 01:00',
  //   allDay: false,
  //   extendedProps: {
  //     strategy: 'user_battery_schedule',
  //     operation: 'charge',
  //     value: '20',
  //     stop_soc: '30',
  //   },
  // },
  // {
  //   title: '抑低負載',
  //   start: '2026-03-20 00:00',
  //   end: '2026-03-21 00:00',
  //   allDay: false,
  //   extendedProps: {
  //     strategy: 'demand_response',
  //     demand_response_market: 'sReg',
  //     offer_kw: '15',
  //   },
  // },
];

export default Events;

// fav

export const favDatas = {
  aa: [
    {
      start: '02:00',
      end: '03:00',
      extendedProps: {
        strategy: 'net_load_tracker',
      },
    },
  ],
  bb: [
    {
      start: '03:00',
      end: '04:00',
      extendedProps: {
        strategy: 'net_load_tracker',
      },
    },
  ],
  ff: [
    {
      start: '02:00',
      end: '03:00',
      extendedProps: {
        strategy: 'net_load_tracker',
      },
    },
    {
      start: '03:00',
      end: '04:00',
      extendedProps: {
        strategy: 'arbitrage',
      },
    },
  ],
  gg: [
    {
      start: '03:00',
      end: '04:00',
      extendedProps: {
        strategy: 'spinning',
        offer_kw: '10',
      },
    },
  ],
  123: [
    {
      start: '03:00',
      end: '04:00',
      extendedProps: {
        strategy: 'spinning',
        offer_kw: '10',
      },
    },
  ],
  day: [
    {
      start: '02:00',
      end: '03:00',
      extendedProps: {
        strategy: 'arbitrage',
      },
    },
    {
      start: '03:00',
      end: '04:00',
      extendedProps: {
        strategy: 'spinning',
        offer_kw: '10',
      },
    },
    {
      start: '04:00',
      end: '05:00',
      extendedProps: {
        strategy: 'net_load_with_surplus_tracker',
      },
    },
    {
      start: '05:00',
      end: '06:00',
      extendedProps: {
        strategy: 'net_load_tracker',
      },
    },
    {
      start: '06:00',
      end: '07:00',
      extendedProps: {
        strategy: 'surplus_tracker',
      },
    },
    {
      start: '07:00',
      end: '08:00',
      extendedProps: {
        strategy: 'user_battery_schedule',
        operation: 'charge',
        value: '10',
        stop_soc: '20',
      },
    },
    {
      start: '08:00',
      end: '09:00',
      extendedProps: {
        strategy: 'demand_response',
        demand_response_market: 'sReg',
        offer_kw: '10',
      },
    },
  ],
};
