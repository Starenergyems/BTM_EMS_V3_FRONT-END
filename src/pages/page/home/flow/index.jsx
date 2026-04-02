import FlowImage from '@/assets/img/home/flow.png';
import FlowingImage from '@/assets/img/home/flowing.gif';
import { Icon } from '@iconify/react';
import { color } from '@/styles/variable/indexStyle';
import { Flex, Space, Col, Tooltip } from 'antd';
import Typography from '@/components/units/typography';
import TimeStatus from '@/pages/page/home/timeStatus';
import { statusData } from '@/pages/page/home/timeStatus/indexConfig';
import { equipmentDatas } from '@/pages/page/home/equipmentConfiguration/indexConfig';
import ScopeStyle from './indexStyle';
import { flowDatas } from './indexConfig';

function Flow({ data, detailDatas }) {
  return (
    <ScopeStyle>
      <div className="flow-container">
        <img
          className="flow-image"
          src={FlowImage}
          alt="flow png"
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
              key={`${flow.name}_${idx}`}
              align="center"
              justify={flow?.hasSoc ? 'space-around' : 'center'}
              className={`flow-box ${flow.name}`}
            >
              <DetailValue
                flow={flow}
                statusColor={statusColor}
                data={data}
                soc={false}
              />
              {flow?.hasSoc && (
                <DetailValue
                  flow={{ name: `soc`, title: 'SOC', unit: '%' }}
                  statusColor={statusColor}
                  data={{
                    soc: {
                      value: data?.[flow.name]?.soc,
                      status: data?.[flow.name]?.status,
                    },
                  }}
                  soc={true}
                />
              )}
            </Flex>
          );

          return (
            <div key={`${flow.name}_${idx}`}>
              {data?.[flow.name]?.status !== 4 && (
                <img
                  className={`flowing-image ${flow.name}_flowing`}
                  src={FlowingImage}
                  alt="flowing gif"
                />
              )}
              {data?.[flow.name]?.status === 4 && flow.noDataImage && (
                <img
                  className={`noData-image ${flow.name}_noData`}
                  src={flow.noDataImage}
                  alt="no data"
                />
              )}
              {detailLabel ? (
                <Tooltip
                  placement="bottom"
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
                  align={{ offset: [0, -10] }}
                  style={{
                    maxWidth: '100%',
                  }}
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
      <Col xs={24} xl={0} className="pd-l-40 mg-t-50 mg-b-44">
        <TimeStatus data={data?.timestamp} />
      </Col>
    </ScopeStyle>
  );
}

const DetailValue = ({ flow, statusColor, data, soc }) => {
  const renderColor =
    data?.[flow.name]?.status > 0 ? statusColor : color.buttonGray;
  return (
    <Space direction="vertical" gap={{ xs: 8, sm: 10, md: 12, lg: 14 }}>
      <Flex align="center" justify="center" gap={10}>
        {!soc && (
          <Icon icon={flow.icon} fontSize={flow.iconSize} color={renderColor} />
        )}
        <Typography color={renderColor}>{flow.title}</Typography>
      </Flex>
      <Typography size="xl" color={statusColor}>
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
