// ----------------------------------------------------------------------

const currentVersion = 'v1';

export const endpoints = {
  homepage: {
    flowBlock: `/api/${currentVersion}/flow_block`,
    equipment: `/api/${currentVersion}/equipment`,
    trendChart: `/api/${currentVersion}/trend_chart`,
    currentTrendChart: `/api/${currentVersion}/current_trend_chart`,
    equipmentChart: `/api/${currentVersion}/equipment_chart`,
  },
  solar: {
    lineChart: `/api/${currentVersion}/solar/linechart`,
    currentLineChart: `/api/${currentVersion}/solar/current_linechart`,
    invertor: `/api/${currentVersion}/solar/invertor`,
    billChart: `/api/${currentVersion}/bill/solar/chart`,
    billMonthChart: `/api/${currentVersion}/bill/solar/month_chart`,
  },
  charger: {
    lineChart: `/api/${currentVersion}/charger/linechart`,
    currentLineChart: `/api/${currentVersion}/charger/current_linechart`,
    invertor: `/api/${currentVersion}/charger/invertor`,
    billChart: `/api/${currentVersion}/bill/charger/chart`,
    billMonthChart: `/api/${currentVersion}/bill/charger/month_chart`,
  },

  storage: {
    lineChart: `/api/${currentVersion}/storage/linechart`,
    currentLineChart: `/api/${currentVersion}/storage/current_linechart`,
    invertor: `/api/${currentVersion}/storage/invertor`,
    billChart: `/api/${currentVersion}/bill/storage/chart`,
    billMonthChart: `/api/${currentVersion}/bill/storage/month_chart`,
  },
  alarm: {
    real: `/api/${currentVersion}/alarm/real/data`,
    historic: `/api/${currentVersion}/alarm/hist/data`,
  },
  report: {
    day: `/api/${currentVersion}/report/day`,
    month: `/api/${currentVersion}/report/month`,
    year: `/api/${currentVersion}/report/year`,
  },
  setting: {
    switch: `/api/${currentVersion}/setting/switch`,
    limit: `/api/${currentVersion}/setting/limit`,
  },
  schedule: {
    calendarEvent: `/api/${currentVersion}/setting/schedule/calendarEvent`,
    favoriteList: `/api/${currentVersion}/setting/schedule/favoriteList`,
    deleteList: `/api/${currentVersion}/setting/schedule/deleteList`,
  },
  demandRp: {
    demandSet: (id) =>
      `/api/${currentVersion}/setting/demandRp/demandSet/${id}`,
  },
};
