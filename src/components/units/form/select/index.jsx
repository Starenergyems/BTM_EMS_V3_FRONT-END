import { forwardRef } from 'react';
import { Select as AntdSelect } from 'antd';
import {
  GlobalStyle,
  ScopeStyle,
} from '@/components/units/form/select/indexStyle';

function FormSelect(
  {
    className,
    errorMessage,
    isInvalid,
    inputAttr = {},
    themecategory,
    ...forwardRefProps
  },
  ref,
) {
  const componentProps = { ...inputAttr, ...forwardRefProps };
  return (
    <ScopeStyle
      className={`styled-container-select ${className ?? ''}`}
      $themecategory={themecategory}
    >
      <AntdSelect {...componentProps} ref={ref} />
      {(isInvalid || inputAttr?.status === 'error') && (
        <div className="ant-form-item-explain-error">*{errorMessage}</div>
      )}
      <GlobalStyle />
    </ScopeStyle>
  );
}
export default forwardRef(FormSelect);
