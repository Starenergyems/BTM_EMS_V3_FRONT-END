import { forwardRef } from "react";
import { Select as AntdSelect } from "antd";
import { GlobalStyle, ScopeStyle } from "@/components/units/select/indexStyle";

function Select(
  {
    className,
    errorMessage,
    isInvalid,
    selectAttr,
    size,
    themecategory,
    ...forwardRefProps
  },
  ref
) {
  const selectProps = { ...selectAttr, ...forwardRefProps };
  return (
    <ScopeStyle
      $size={size}
      $themecategory={themecategory}
      className={`styled-container-select ${className ?? ''}`}
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
