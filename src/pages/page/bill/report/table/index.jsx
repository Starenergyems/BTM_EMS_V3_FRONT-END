import { Table } from 'antd';

import { useHelpers } from './indexHelper';

export function ReportTable({ data = [], date, isPending, onChange, type }) {
  const { getColumnDatas } = useHelpers({
    date,
    type,
  });

  return (
    <Table
      columns={getColumnDatas()}
      dataSource={data}
      loading={isPending}
      onChange={onChange}
      pagination={{
        pageSize: 50,
        position: ['bottomCenter'],
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
