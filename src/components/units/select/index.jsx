import { forwardRef } from "react";
import { Select as AntdSelect } from "antd";
import { GlobalStyle, ScopeStyle } from "@/components/units/select/indexStyle";

function Select(
  {
    size,
    className,
    errorMessage,
    isInvalid,
    selectAttr,
    themecategory,
    ...forwardRefProps
  },
  ref
) {
  const selectProps = { ...selectAttr, ...forwardRefProps };
  return (
    <ScopeStyle
      className={`styled-container-select ${className ?? ''}`}
      $themecategory={themecategory}
      $size={size}
    >
      <AntdSelect {...selectProps} ref={ref} />
      {(isInvalid || selectAttr?.status === 'error') && (
        <div className="ant-form-item-explain-error">*{errorMessage}</div>
      )}
      <GlobalStyle />
    </ScopeStyle>
  );
}
export default forwardRef(Select);
