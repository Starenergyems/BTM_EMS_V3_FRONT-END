import { ExcelIcon } from '@/components/units/icons';
import ScopeStyle from './indexStyle';


export const ExcelButton = ({ disabled,onClick }) => { 
  return (
    <ScopeStyle>
      <button disabled={disabled} onClick={onClick}>
        <ExcelIcon size={38} />
        Download
      </button>
    </ScopeStyle>
  );
}
