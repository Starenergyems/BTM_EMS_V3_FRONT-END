import { forwardRef } from 'react';
import { Icon } from '@iconify/react';
import { Input as AntdInput, Button } from 'antd';
import ScopeStyle from '@/components/units/form/input/indexStyle';
import { useBoolean } from '@/hooks/useBoolean';

function FormInput(
  { className, errorMessage, inputAttr = {}, isInvalid, ...forwardRefProps },
  ref,
) {
  const componentProps = { ...forwardRefProps, ...inputAttr };
  const isTogglePassword = useBoolean(false);
  return (
    <ScopeStyle
      className={`styled-container-input ${className ?? ''}`}
      $status={inputAttr?.status}
      $isInvalid={isInvalid}
    >
      <div className="input-container">
        <AntdInput
          autoComplete="off"
          {...componentProps}
          type={
            isTogglePassword.value && componentProps.type === 'password'
              ? 'text'
              : componentProps.type
          }
          ref={ref}
        />
        {componentProps.unit && (
          <span className="input-unit">{componentProps.unit}</span>
        )}
        {componentProps.type && componentProps.type === 'password' && (
          <Button
            className="input-pwd"
            type="icon"
            classNames="pd-0"
            onClick={isTogglePassword.onToggle}
          >
            {isTogglePassword.value ? (
              <Icon icon="iconoir:eye-solid" fontSize="24" />
            ) : (
              <Icon icon="iconoir:eye-closed" fontSize="24" />
            )}
          </Button>
        )}
      </div>
      {(isInvalid || inputAttr?.status === 'error') && (
        <div className="ant-form-item-explain-error">*{errorMessage}</div>
      )}
    </ScopeStyle>
  );
}
export default forwardRef(FormInput);
