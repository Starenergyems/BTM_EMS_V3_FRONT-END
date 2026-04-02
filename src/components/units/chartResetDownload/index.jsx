import { downloadChartImageHandler, exportToExcelHandler } from '@/utils/chart';
import { Flex } from 'antd';
import { Icon } from '@iconify/react';
import Button from '@/components/units/button';

function ChartResetDownload({
  setIsReset,
  setState,
  legendNameMap,
  printChartRef,
  chartDatas
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
          icon="grommet-icons:power-reset"
          onClick={handleReset}
          fontSize="24"
        />
      </Button>
      <Button variant="icon">
        <Icon
          icon="fluent:arrow-download-20-filled"
          onClick={() => downloadChartImageHandler(printChartRef)}
          fontSize="24"
        />
      </Button>
      <Button variant="icon">
        <Icon
          icon="mdi:file-download-outline"
          onClick={() => exportToExcelHandler(legendNameMap,chartDatas)}
          fontSize="25"
        />
      </Button>
    </Flex>
  );
}

export default ChartResetDownload;
