import XlsxPopulate from 'xlsx-populate/browser/xlsx-populate';
import { api } from '@/slices/api/setting';
import { endpoints } from '@/utils/endpoints';

// useHelpers 為最外層 function，function 內區塊的撰寫順序由上而下為：
// 1. useCallback 需要相依的 function
// 2. api function
// 3. 一般function

function useHelpers({ range, setState }) {
  const getDatas = async (timeUnit) => {
    try {
      let data;
      if (range === 'day') {
        data = await api.get(endpoints?.report?.day, {
          params: { date: timeUnit.day },
        });
      } else if (range === 'month') {
        data = await api.get(endpoints?.report?.month, {
          params: { date: timeUnit.month },
        });
      } else if (range === 'year') {
        data = await api.get(endpoints?.report?.year, {
          params: { date: timeUnit.year },
        });
      }
      // const data = await api.get(endpoints?.alarm?.[name]);

      setState(data?.data || {}); // 根據實際資料結構調整這裡
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  // 匯出 Excel + 圖表 檔案
  const exportToExcelChartHandler = async (
    legendNameMap,
    datas,
    title = '報表資料',
  ) => {
    let fileName, fileTemp;

    switch (range) {
      case 'day':
        fileTemp = '/src/assets/static/excel/daily_report_temp.xlsx';
        fileName = '日報表';
        break;
      case 'month':
        fileTemp = '/src/assets/static/excel/monthly_report_temp.xlsx';
        fileName = '月報表';
        break;
      case 'year':
        fileTemp = '/src/assets/static/excel/yearly_report_temp.xlsx';
        fileName = '年報表';
        break;
      default:
        break;
    }

    // 1. Fetch 取得模板檔案 (使用 arrayBuffer)
    const response = await fetch(fileTemp);
    const arrayBuffer = await response.arrayBuffer();

    // 2. 使用 xlsx-populate 載入模板
    const workbook = await XlsxPopulate.fromDataAsync(arrayBuffer);

    // 3. 取得工作表 (名稱為 'Data')
    const sheet = workbook.sheet('Data');

    // 4. 設定標題 (A1)
    sheet.cell('A1').value(title);

    // 5. 填寫資料 (從第 3 行開始)
    datas.forEach((data, index) => {
      const rowIndex = index + 3;

      // 寫入時間 (A 欄)
      sheet.cell(`A${rowIndex}`).value(data.time) || '--';

      // 寫入數值 (B, C, D, E 欄)
      legendNameMap.forEach((legend, colIndex) => {
        sheet.cell(rowIndex, colIndex + 2).value(data[legend.name] || 0);
      });
    });

    // 6. 轉出檔案並下載
    const blob = await workbook.outputAsync('blob');

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${title}_${fileName}.xlsx`;
    link.click();
  };

  return {
    exportToExcelChartHandler,
    getDatas,
  };
}

export { useHelpers };
