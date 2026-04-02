import { forwardRef } from "react";
import {
  RadioStyle,
  RadioGroupStyle,
} from "@/components/units/radio/indexStyle";

const Radio = forwardRef(
  (
    { className, children, errorMessage, isInvalid, radioAttr, ...props },
    ref
  ) => {
    return (
      <>
        <RadioStyle
          {...radioAttr}
          // 使用Radio.XXX的時候才會將ant design設計的Prop傳遞下去
          {...props}
          className={`styled-container-radio ${className ?? ""}`}
          ref={ref}
          $isInvalid={isInvalid}
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
    { className, children, errorMessage, isInvalid, radioGroupAttr, ...props },
    ref
  ) => {
    return (
      <>
        <RadioGroupStyle
          {...radioGroupAttr}
          {...props}
          className={`styled-container-radio-group ${className ?? ""}`}
          ref={ref}
          $isInvalid={isInvalid}
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
