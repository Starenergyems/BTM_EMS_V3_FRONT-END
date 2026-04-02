import { forwardRef } from "react";
import { Input as AntdInput } from "antd";
import ScopeStyle from "@/components/units/textarea/indexStyle";

function Textarea(
  {
    className,
    errorMessage,
    inputAttr,
    inputTextAreaAttr,
    isInvalid,
    noResize = false,
    ...forwardRefProps
  },
  ref
) {
  const inputProps = { ...inputAttr, ...inputTextAreaAttr, ...forwardRefProps };
  return (
    <ScopeStyle
      className={`styled-container-textarea ${className ?? ""}`}
      $status={inputAttr?.status}
      $isInvalid={isInvalid}
      $noResizeSetting={noResize}
    >
      <AntdInput.TextArea
        autoComplete="off"
        rows="3"
        {...inputProps}
        ref={ref}
      />
      {(isInvalid || inputAttr?.status === "error") && (
        <div className="ant-form-item-explain-error">*{errorMessage}</div>
      )}
    </ScopeStyle>
  );
}
export default forwardRef(Textarea);
