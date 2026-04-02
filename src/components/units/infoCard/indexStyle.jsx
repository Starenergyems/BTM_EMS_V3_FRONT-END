import styled from 'styled-components';
import { color } from '@/styles/variable/indexStyle';
import { hexToRgba } from '@/styles/function';

const style = styled.div`
  display: ${(props) => (props.$flex ? 'flex' : 'block')};
  position: relative;
  height: 147px;
  padding: 14px;
  background-color: ${hexToRgba(color.midDarkBlue, 0.8)};
  border-radius: 4px;

  .card-value {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .card-with-icon {
    margin-left: 40px;
    margin-top: 20px;
  }
  .flex {
    display: flex;
    justify-content: space-between;
  }
  img {
    align-self: end;
    max-height: 115px;
    min-height:60px;
    height: 9vw;
  }
`;

export default style;
