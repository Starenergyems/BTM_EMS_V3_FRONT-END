import styled from 'styled-components';
import { color } from '@/styles/variable/indexStyle';

const style = styled.div`
  max-width: 1400px;
  width: 80vw;
  padding: 0 24px;
  margin: 50px auto;

  .item {
    display: flex;
    align-items: start;
    flex-wrap: wrap;
    gap: 24px;
    background-color: ${color.white};
    border-radius: 12px;
    padding: 0 3vw;
    margin-top: 25px;
  }

  .center-btn {
    text-align: center;
  }

  @media (max-width: 1550px) {
    .item {
      display: flex;
      gap: 20px;
    }
    @media (max-width: 990px) {
      .item {
        display: flex;
        gap: 12px;
      }
    }
  }
`;

export default style;
