import styled from 'styled-components';
import { darken } from 'polished';

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;

  button {
    padding: 8px 12px;
    background: #7d40e7;
    color: #fff;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    margin: 0 4px;
    transition: all 300ms ease-out;

    &[disabled] {
      cursor: not-allowed;
      pointer-events: none;
      opacity: 0.6;
    }

    &:not(disabled) {
      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }
    }

    &:first-child {
      &:hover {
        svg {
          transform: translateX(-4px);
        }
      }
    }
    &:nth-child(2) {
      &:hover {
        svg {
          transform: translateX(4px);
        }
      }
    }
  }

  svg {
    transition: all 300ms ease-out;
  }
`;

export default Pagination;
