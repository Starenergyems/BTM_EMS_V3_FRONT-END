// ----------------------------------------------------------------------

const currentVersion = 'v1';

export const endpoints = {
  alarm: {
    historic: `/api/${currentVersion}/alarm/hist/data`,
    real: `/api/${currentVersion}/alarm/real/data`,
  },
  charger: {
    billChart: `/api/${currentVersion}/bill/charger/chart`,
    billMonthChart: `/api/${currentVersion}/bill/charger/month_chart`,
    currentLineChart: `/api/${currentVersion}/charger/current_linechart`,
    invertor: `/api/${currentVersion}/charger/invertor`,
    lineChart: `/api/${currentVersion}/charger/linechart`,
  },
  demandRp: {
    demandSet: (id) =>
      `/api/${currentVersion}/setting/demandRp/demandSet/${id}`,
  },

  homepage: {
    currentTrendChart: `/api/${currentVersion}/current_trend_chart`,
    equipment: `/api/${currentVersion}/equipment`,
    equipmentChart: `/api/${currentVersion}/equipment_chart`,
    flowBlock: `/api/${currentVersion}/flow_block`,
    trendChart: `/api/${currentVersion}/trend_chart`,
  },
  report: {
    day: `/api/${currentVersion}/report/day`,
    month: `/api/${currentVersion}/report/month`,
    year: `/api/${currentVersion}/report/year`,
  },
  schedule: {
    calendarEvent: `/api/${currentVersion}/setting/schedule/calendarEvent`,
    deleteList: `/api/${currentVersion}/setting/schedule/deleteList`,
    favoriteList: `/api/${currentVersion}/setting/schedule/favoriteList`,
  },
  setting: {
    limit: `/api/${currentVersion}/setting/limit`,
    switch: `/api/${currentVersion}/setting/switch`,
  },
  solar: {
    billChart: `/api/${currentVersion}/bill/solar/chart`,
    billMonthChart: `/api/${currentVersion}/bill/solar/month_chart`,
    currentLineChart: `/api/${currentVersion}/solar/current_linechart`,
    invertor: `/api/${currentVersion}/solar/invertor`,
    lineChart: `/api/${currentVersion}/solar/linechart`,
  },
  storage: {
    billChart: `/api/${currentVersion}/bill/storage/chart`,
    billMonthChart: `/api/${currentVersion}/bill/storage/month_chart`,
    currentLineChart: `/api/${currentVersion}/storage/current_linechart`,
    invertor: `/api/${currentVersion}/storage/invertor`,
    lineChart: `/api/${currentVersion}/storage/linechart`,
  },
};
