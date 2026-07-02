import styled from 'styled-components';

const style = styled.div`
  .chat-bot-shell {
    width: 400px;
    height: 600px;
    position: relative;
  }

  .chat-bot,
  openai-chatkit.chat-bot {
    display: block;
    width: 400px;
    height: 600px;
    border-radius: 16px;
    overflow: hidden;
  }

  .page-actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    position: absolute;
    right: 24px;
    bottom: 112px;
    left: 24px;
    z-index: 2;
  }

  .page-action {
    display: flex;
    align-items: center;
    min-width: 0;
    min-height: 48px;
    padding: 10px 12px;
    gap: 8px;
    color: #1f2937;
    background: #fff;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgb(0 0 0 / 8%);
    cursor: pointer;
    font: inherit;
    text-align: left;

    svg {
      flex: 0 0 auto;
      width: 18px;
      height: 18px;
    }

    span {
      min-width: 0;
      overflow-wrap: anywhere;
    }

    &:hover {
      background: #f3f4f6;
      border-color: #9ca3af;
    }

    &:focus-visible {
      outline: 2px solid #2563eb;
      outline-offset: 2px;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
  .NBPKZ {
    white-space: normal !important;
    line-height: 1.2 !important;
  }
`;

export default style;
