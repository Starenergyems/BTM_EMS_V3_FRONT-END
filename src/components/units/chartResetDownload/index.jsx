import { Icon } from '@iconify/react';
import Button from '@/components/units/button';
import { downloadChartImageHandler, exportToExcelHandler } from '@/utils/chart';
import { Flex } from 'antd';

function ChartResetDownload({
  chartDatas,
  legendNameMap,
  printChartRef,
  setIsReset,
  setState
}) {
  const handleReset = () => {
    // 重置 React state 中的 customLegend
    setState((prevState) => ({
      ...prevState,
      customLegend:
        legendNameMap?.length > 0
          ? legendNameMap?.reduce((acc, legend) => {
              acc[legend.name] = true;
              return acc;
            }, {})
          : { [legendNameMap.name]: true },
    }));
    setIsReset(true);
  };
  return (
    <Flex align="center">
      <Button variant="icon">
        <Icon
          fontSize="24"
          icon="grommet-icons:power-reset"
          onClick={handleReset}
        />
      </Button>
      <Button variant="icon">
        <Icon
          fontSize="24"
          icon="fluent:arrow-download-20-filled"
          onClick={() => downloadChartImageHandler(printChartRef)}
        />
      </Button>
      <Button variant="icon">
        <Icon
          fontSize="25"
          icon="mdi:file-download-outline"
          onClick={() => exportToExcelHandler(legendNameMap,chartDatas)}
        />
      </Button>
    </Flex>
  );
}

export default ChartResetDownload;
