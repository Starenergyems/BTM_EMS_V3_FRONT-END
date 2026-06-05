import styled from 'styled-components';

const style = styled.div`
  .chatbot-button {
    max-width: 200px;
    max-height: 200px;
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 990;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .chat-wrap {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 990;
  }
  .chatbot-button-close {
    position: absolute;
    top: -45px;
    right: -5px;
  }
`;

export default style;
