import { forwardRef } from 'react';
import { Input as AntdInput } from 'antd';
import ScopeStyle from '@/components/units/form/input/indexStyle';

function FormInput(
  { className, errorMessage, inputAttr = {}, isInvalid, ...forwardRefProps },
  ref,
) {
  const componentProps = { ...forwardRefProps, ...inputAttr };
console.log('componentProps', componentProps);
  return (
    <ScopeStyle
      className={`styled-container-input ${className ?? ''}`}
      $status={inputAttr?.status}
      $isInvalid={isInvalid}
    >
      <div className="input-container">
        <AntdInput autoComplete="off" {...componentProps} ref={ref} />
        {componentProps.unit && (
          <span className="input-unit">{componentProps.unit}</span>
        )}
      </div>
      {(isInvalid || inputAttr?.status === 'error') && (
        <div className="ant-form-item-explain-error">*{errorMessage}</div>
      )}
    </ScopeStyle>
  );
}
export default forwardRef(FormInput);
