import { forwardRef } from 'react';
import { TimePicker as AntdTimePicker } from 'antd';
import ScopeStyle from './indexStyle';

const format = 'HH:mm:ss';

const FormTimePicker = ({
  errorMessage,
  inputAttr = {},
  isInvalid,
  ...forwardRefProps
}) => {
  const componentProps = { ...forwardRefProps, ...inputAttr };

  return (
    <ScopeStyle>
      <AntdTimePicker format={format} {...componentProps} />

      {(isInvalid || inputAttr?.status === 'error') && (
        <div className="ant-form-item-explain-error">*{errorMessage}</div>
      )}
    </ScopeStyle>
  );
};

export default forwardRef(FormTimePicker);
