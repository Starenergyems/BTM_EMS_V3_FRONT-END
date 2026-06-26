import { useState } from 'react';
import { Select } from '@/components/units';
import Button from '@/components/units/button';
import { useBoolean } from '@/hooks/useBoolean';
import { omRole } from '@/slices/api/main/accounts';
import { Flex, Table } from 'antd';
import { useHelpers } from './indexHelper';
import { ModalOverview } from './modalOverview';

function ManagementTable({ data, name, onChange }) {
  const toggle = useBoolean(false);

  const [state, setState] = useState({
    data: data,
    filteredDatas: data,
  });
  const [isEdit, setisEdit] = useState(false);

  const isPermissionManagement = name === 'permissionManagement';

  const { getColumnDatas, handleSelectChange } = useHelpers({
    name,
    setisEdit,
    setState,
    state,
    toggle,
  });

  const selectOptions = Object.keys(omRole).map((key) => ({
    label: omRole[key].key,
    value: omRole[key].key,
  }));
  selectOptions.unshift({ label: '全部', value: '' });

  return (
    <>
      {isPermissionManagement && (
        <Flex align="center" justify="space-between">
          <Select
            className="mg-y-20"
            onChange={handleSelectChange}
            options={selectOptions}
            placeholder="選擇角色名稱"
            size="sm"
          />
          <Button
            onClick={() => {
              setisEdit(false);
              toggle.onTrue();
            }}
            type="primary"
          >
            新增帳號
          </Button>
        </Flex>
      )}
      <Table
        columns={getColumnDatas()}
        dataSource={isPermissionManagement ? state.filteredDatas : data}
        loading={state.isLoading}
        onChange={onChange}
        pagination={{
          pageSize: 10,
          position: ['bottomCenter'],
          showTotal: (total) => `總共 ${Math.ceil(total / 10)} 頁`,
        }}
        rowClassName="custom-no-hover"
        rowKey="id"
        scroll={{
          x: 'max-content',
        }}
        style={{
          '--nodata-overflow': data?.length === 0 ? 'hidden' : 'auto hidden',
        }}
      />
      <ModalOverview isEdit={isEdit} toggle={toggle} />
    </>
  );
}

export default ManagementTable;
