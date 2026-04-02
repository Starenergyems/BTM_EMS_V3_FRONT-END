import { forwardRef } from "react";

import {
  CheckboxStyle,
  CheckboxGroupStyle,
} from "@/components/units/checkbox/indexStyle";

const Checkbox = forwardRef(
  (
    { className, children, checkboxAttr, errorMessage, isInvalid, ...props },
    ref
  ) => {
    return (
      <>
        <CheckboxStyle
          {...checkboxAttr}
          // 使用Checkbox.XXX的時候才會將ant design設計的Prop傳遞下去
          {...props}
          className={`styled-container-checkbox ${className ?? ""}`}
          ref={ref}
          $isInvalid={isInvalid}
        >
          {children}
        </CheckboxStyle>
        {isInvalid && (
          <div className="ant-form-item-explain-error">{errorMessage}</div>
        )}
      </>
    );
  }
);
Checkbox.Group = forwardRef(
  ({ className, children, checkboxGroupAttr, ...props }, ref) => {
    return (
      <CheckboxGroupStyle
        {...checkboxGroupAttr}
        {...props}
        className={`styled-container-checkbox-group ${className}`}
        ref={ref}
      >
        {children}
      </CheckboxGroupStyle>
    );
  }
);

export default Checkbox;
