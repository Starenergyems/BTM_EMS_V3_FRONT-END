import styled from 'styled-components';
import { customScollbar } from '@/styles/customStyle/indexStyle';
import { color } from '@/styles/variable/indexStyle';

const ScopeStyle = styled.div`
  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 12px;
    background-color: ${color.white};
    border-radius: 8px;
    margin-bottom: 8px;
    white-space: wrap;
    button {
      padding: 0;
    }
  }

  ul {
    margin: 15px 0;
    max-height: 250px;
    overflow-y: auto;

    ${customScollbar}
    .list-item {
      margin-top: 10px;
      padding: 6px 10px;
      background-color: ${color.white};
      cursor: pointer;
      &.selected {
        outline: 2px solid ${color.blue};
      }
    }
  }
`;

export { ScopeStyle };
