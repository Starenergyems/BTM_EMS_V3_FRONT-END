import { Table } from 'antd';

import { useHelpers } from './indexHelper';

function AlarmTable({ data = [], isPending, name, onChange }) {
  const { getColumnDatas } = useHelpers({
    name,
  });

  return (
    <Table
      columns={getColumnDatas()}
      dataSource={data}
      loading={isPending}
      onChange={onChange}
      pagination={{
        pageSize: 10,
        position: ['bottomCenter'],
        showTotal: (total) => `總共 ${Math.ceil(total / 10)} 頁`,
      }}
      rowClassName="custom-no-hover"
      rowKey={
        (record) =>
          `${record.id || ''}-${record.time || ''}-${record.type || ''}-${Math.random()}` // 確保每行有唯一的 key
      }
      scroll={{
        x: 'max-content',
      }}
      style={{
        '--nodata-overflow': data.length === 0 ? 'hidden' : 'auto hidden',
      }}
    />
  );
}

export default AlarmTable;
