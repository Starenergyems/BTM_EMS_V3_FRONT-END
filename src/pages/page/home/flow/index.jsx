import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import FlowImage from '@/assets/img/home/flow.png';
import FlowingImage from '@/assets/img/home/flowing.gif';
import Typography from '@/components/units/typography';
import { equipmentDatas } from '@/pages/page/home/equipmentConfiguration/indexConfig';
import TimeStatus from '@/pages/page/home/timeStatus';
import { statusData } from '@/pages/page/home/timeStatus/indexConfig';
import { Col, Flex, Space, Tooltip } from 'antd';
import { flowDatas } from './indexConfig';
import ScopeStyle from './indexStyle';
import { color } from '@/styles/variable/indexStyle';

function Flow({ data, detailDatas, getFlowDatas }) {
  useEffect(() => {
    getFlowDatas(); // 首次執行

    const timer = setInterval(() => {
      getFlowDatas(); // 每 30 秒只呼叫這個
    }, 30000);

    return () => clearInterval(timer);
  }, []);
  return (
    <ScopeStyle>
      <div className="flow-container">
        <img
          alt="flow png"
          className="flow-image"
          src={FlowImage}
          style={{ width: '100%' }}
        />

        {flowDatas?.map((flow, idx) => {
          const statusColor =
            statusData.find(
              (status) =>
                status.status > 0 &&
                status.status === data?.[flow.name]?.status,
            )?.color || color.buttonGray;

          const detailLabel = equipmentDatas.find(
            (item) => item.name === flow.name,
          );

          const flowBox = (
            <Flex
              align="center"
              className={`flow-box ${flow.name}`}
              justify={flow?.hasSoc ? 'space-around' : 'center'}
              key={`${flow.name}_${idx}`}
            >
              <DetailValue
                data={data}
                flow={flow}
                soc={false}
                statusColor={statusColor}
              />
              {flow?.hasSoc && (
                <DetailValue
                  data={{
                    soc: {
                      status: data?.[flow.name]?.status,
                      value: data?.[flow.name]?.soc,
                    },
                  }}
                  flow={{ name: `soc`, title: 'SOC', unit: '%' }}
                  soc={true}
                  statusColor={statusColor}
                />
              )}
            </Flex>
          );

          return (
            <div key={`${flow.name}_${idx}`}>
              {data?.[flow.name]?.status !== 4 && (
                <img
                  alt="flowing gif"
                  className={`flowing-image ${flow.name}_flowing`}
                  src={FlowingImage}
                />
              )}
              {data?.[flow.name]?.status === 4 && flow.noDataImage && (
                <img
                  alt="no data"
                  className={`noData-image ${flow.name}_noData`}
                  src={flow.noDataImage}
                />
              )}
              {detailLabel ? (
                <Tooltip
                  align={{ offset: [0, -10] }}
                  placement="bottom"
                  style={{
                    maxWidth: '100%',
                  }}
                  title={
                    <Flex gap={8}>
                      {detailLabel.children?.map((child, idx) => (
                        <TooltipContent
                          key={`${child.name}_${idx}`}
                          label={child}
                          value={detailDatas?.[child.name] ?? '--'}
                        />
                      ))}
                    </Flex>
                  }
                >
                  {flowBox}
                </Tooltip>
              ) : (
                flowBox
              )}
            </div>
          );
        })}
      </div>
      <Col className="pd-l-40 mg-t-50 mg-b-44" xl={0} xs={24}>
        <TimeStatus data={data?.timestamp} />
      </Col>
    </ScopeStyle>
  );
}

const DetailValue = ({ data, flow, soc, statusColor }) => {
  const renderColor =
    data?.[flow.name]?.status > 0 ? statusColor : color.buttonGray;
  return (
    <Space direction="vertical" gap={{ lg: 14, md: 12, sm: 10, xs: 8 }}>
      <Flex align="center" gap={10} justify="center">
        {!soc && (
          <Icon color={renderColor} fontSize={flow.iconSize} icon={flow.icon} />
        )}
        <Typography color={renderColor}>{flow.title}</Typography>
      </Flex>
      <Typography color={statusColor} size="xl">
        {data?.[flow.name]?.value ?? '--'}
        <span className="pd-l-5">{flow.unit}</span>
      </Typography>
    </Space>
  );
};

const TooltipContent = ({ label, value }) => {
  return (
    <Typography size="lg">
      {label?.title}
      <span className="pd-x-2"> {value}</span>
      {label?.unit}
    </Typography>
  );
};

export default Flow;
