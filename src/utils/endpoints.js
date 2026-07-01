// ----------------------------------------------------------------------

const currentVersion = 'v1';
const apiVersionPath = import.meta.env.MODE === 'development'
  ? `/api/${currentVersion}`
  : currentVersion;

export const endpoints = {
  alarm: {
    historic: `${apiVersionPath}/alarm/hist/data`,
    real: `${apiVersionPath}/alarm/real/data`,
  },
  charger: {
    billChart: `${apiVersionPath}/bill/charger/chart`,
    billMonthChart: `${apiVersionPath}/bill/charger/month_chart`,
    currentLineChart: `${apiVersionPath}/charger/current_linechart`,
    invertor: `${apiVersionPath}/charger/invertor`,
    lineChart: `${apiVersionPath}/charger/linechart`,
  },
  demandRp: {
    demandSet: (id) =>
      `${apiVersionPath}/setting/demandRp/demandSet/${id}`,
  },

  homepage: {
    currentTrendChart: `${apiVersionPath}/current_trend_chart`,
    equipment: `${apiVersionPath}/equipment`,
    equipmentChart: `${apiVersionPath}/equipment_chart`,
    flowBlock: `${apiVersionPath}/flow_block`,
    trendChart: `${apiVersionPath}/trend_chart`,
  },
  report: {
    day: `${apiVersionPath}/report/day`,
    month: `${apiVersionPath}/report/month`,
    year: `${apiVersionPath}/report/year`,
  },
  schedule: {
    calendarEvent: `${apiVersionPath}/setting/schedule/calendarEvent`,
    deleteCalendarEvent: (eventId) => `${apiVersionPath}/setting/schedule/calendarEvent/${eventId}`,
    deleteList: `${apiVersionPath}/setting/schedule/deleteList`,
    favoriteList: `${apiVersionPath}/setting/schedule/favoriteList`,
  },
  setting: {
    limit: `${apiVersionPath}/setting/limit`,
    switch: `${apiVersionPath}/setting/switch`,
  },
  solar: {
    billChart: `${apiVersionPath}/bill/solar/chart`,
    billMonthChart: `${apiVersionPath}/bill/solar/month_chart`,
    currentLineChart: `${apiVersionPath}/solar/current_linechart`,
    invertor: `${apiVersionPath}/solar/invertor`,
    lineChart: `${apiVersionPath}/solar/linechart`,
  },
  storage: {
    billChart: `${apiVersionPath}/bill/storage/chart`,
    billMonthChart: `${apiVersionPath}/bill/storage/month_chart`,
    currentLineChart: `${apiVersionPath}/storage/current_linechart`,
    invertor: `${apiVersionPath}/storage/invertor`,
    lineChart: `${apiVersionPath}/storage/linechart`,
  },
};
