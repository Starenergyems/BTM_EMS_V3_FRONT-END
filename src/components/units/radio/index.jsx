import { forwardRef } from "react";
import {
  RadioGroupStyle,
  RadioStyle,
} from "@/components/units/radio/indexStyle";

const Radio = forwardRef(
  (
    { children, className, errorMessage, isInvalid, radioAttr, ...props },
    ref
  ) => {
    return (
      <>
        <RadioStyle
          {...radioAttr}
          // 使用Radio.XXX的時候才會將ant design設計的Prop傳遞下去
          {...props}
          $isInvalid={isInvalid}
          className={`styled-container-radio ${className ?? ""}`}
          ref={ref}
        >
          {children}
        </RadioStyle>
        {isInvalid && (
          <div className="ant-form-item-explain-error">{errorMessage}</div>
        )}
      </>
    );
  }
);
Radio.Group = forwardRef(
  (
    { children, className, errorMessage, isInvalid, radioGroupAttr, ...props },
    ref
  ) => {
    return (
      <>
        <RadioGroupStyle
          {...radioGroupAttr}
          {...props}
          $isInvalid={isInvalid}
          className={`styled-container-radio-group ${className ?? ""}`}
          ref={ref}
        >
          {children}
        </RadioGroupStyle>
        {isInvalid && (
          <div className="ant-form-item-explain-error">{errorMessage}</div>
        )}
      </>
    );
  }
);

export default Radio;
