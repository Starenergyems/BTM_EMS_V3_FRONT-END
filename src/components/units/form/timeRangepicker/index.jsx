import { forwardRef } from 'react';
import { TimePicker as AntdTimePicker } from 'antd';
import ScopeStyle from './indexStyle';

const format = 'HH:mm:ss';

const FormTimeRangePicker = ({
  errorMessage,
  inputAttr = {},
  isInvalid,
  ...forwardRefProps
}) => {
  const componentProps = { ...forwardRefProps, ...inputAttr };

  return (
    <ScopeStyle>
      <AntdTimePicker.RangePicker format={format} {...componentProps} />

      {(isInvalid || inputAttr?.status === 'error') && (
        <div className="ant-form-item-explain-error">*{errorMessage}</div>
      )}
    </ScopeStyle>
  );
};

export default forwardRef(FormTimeRangePicker);
