import { forwardRef } from "react";

import {
  CheckboxGroupStyle,
  CheckboxStyle,
} from "@/components/units/checkbox/indexStyle";

const Checkbox = forwardRef(
  (
    { checkboxAttr, children, className, errorMessage, isInvalid, ...props },
    ref
  ) => {
    return (
      <>
        <CheckboxStyle
          {...checkboxAttr}
          // 使用Checkbox.XXX的時候才會將ant design設計的Prop傳遞下去
          {...props}
          $isInvalid={isInvalid}
          className={`styled-container-checkbox ${className ?? ""}`}
          ref={ref}
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
  ({ checkboxGroupAttr, children, className, ...props }, ref) => {
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
