import { forwardRef } from 'react';
import { Switch as AntdSwitch } from 'antd';
import ScopeStyle from './indexStyle';

function FormSwitch(
  { className, errorMessage, inputAttr = {}, isInvalid, ...forwardRefProps },
  ref,
) {
  const componentProps = { ...inputAttr, ...forwardRefProps };

  componentProps.value = inputAttr.value ?? forwardRefProps.value;
  return (
    <ScopeStyle
      $isInvalid={isInvalid}
      $status={inputAttr?.status}
      className={`styled-container-input ${className ?? ''}`}
    >
      <AntdSwitch {...componentProps} ref={ref} />
      {(isInvalid || inputAttr?.status === 'error') && (
        <div className="ant-form-item-explain-error">*{errorMessage}</div>
      )}
    </ScopeStyle>
  );
}
export default forwardRef(FormSwitch);
