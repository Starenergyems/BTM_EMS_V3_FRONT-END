import { forwardRef } from 'react';
import { Icon } from '@iconify/react';
import { useBoolean } from '@/hooks/useBoolean';
import { Input as AntdInput, Button } from 'antd';
import ScopeStyle from '@/components/units/form/input/indexStyle';

function FormInput(
  { className, errorMessage, inputAttr = {}, isInvalid, ...forwardRefProps },
  ref,
) {
  const componentProps = { ...forwardRefProps, ...inputAttr };
  const isTogglePassword = useBoolean(false);
  return (
    <ScopeStyle
      $isInvalid={isInvalid}
      $status={inputAttr?.status}
      className={`styled-container-input ${className ?? ''}`}
    >
      <div className="input-container">
        <AntdInput
          autoComplete="off"
          {...componentProps}
          ref={ref}
          type={
            isTogglePassword.value && componentProps.type === 'password'
              ? 'text'
              : componentProps.type
          }
        />
        {componentProps.unit && (
          <span className="input-unit">{componentProps.unit}</span>
        )}
        {componentProps.type && componentProps.type === 'password' && (
          <Button
            className="input-pwd"
            classNames="pd-0"
            onClick={isTogglePassword.onToggle}
            type="icon"
          >
            {isTogglePassword.value ? (
              <Icon fontSize="24" icon="iconoir:eye-solid" />
            ) : (
              <Icon fontSize="24" icon="iconoir:eye-closed" />
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
