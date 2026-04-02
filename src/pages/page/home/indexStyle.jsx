import styled from 'styled-components';

const style = styled.div`
  padding: 30px 24px;
  .block {
    position: relative;
  }

  .block3,
  .block4,
  .block2 {
    padding-left: 40px;
  }
  h2 {
    margin: 0;
  }

  .current-time {
    position: absolute;
    top: 18px;
    right: 24px;
  }

  @media (max-width: 576px) {
    .block3,
    .block4,
    .block2 {
      padding-left: 0px;
    }
    .block2 {
      margin-top: 40px;
    }
  }
`;

export default style;
