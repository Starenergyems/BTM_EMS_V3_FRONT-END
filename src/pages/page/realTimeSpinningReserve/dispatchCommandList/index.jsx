import { useState } from "react";
import { Table } from "antd";
import { useHelpers } from "./indexHelper";
import ScopeStyle from "./indexStyle";

function DispatchCommandList() {
  const [mainState, setMainState] = useState({
    dispatchCommandTableData: [
      {
        fullResponseTime: 4,
        notificationTime: "2025-08-06T00:38:42.472204Z",
        prev5minAvgPower: 72,
        serviceEnd: "2025-08-06T01:48:42.472204Z",
        serviceEnergy: 56,
        serviceStart: "2025-08-06T00:48:42.472204Z",
        spm: 100,
      },
    ],
    isDispatchCommandTableLoading: false,
  });
  const { getDispatchCommandTableColumns } = useHelpers({
    setMainState,
  });

  return (
    <ScopeStyle className="mg-t-30">
      <h2>調度指令列表</h2>
      <Table
        columns={getDispatchCommandTableColumns()}
        dataSource={mainState.dispatchCommandTableData}
        loading={mainState.isDispatchCommandTableLoading}
        pagination={false}
        rowClassName="custom-no-hover"
        rowKey="id"
        scroll={{
          x: "max-content",
        }}
      />
    </ScopeStyle>
  );
}

export default DispatchCommandList;
