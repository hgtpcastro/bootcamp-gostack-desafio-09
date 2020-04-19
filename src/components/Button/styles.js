import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  min-width: 95px;
  border-radius: 4px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 700;
  transition: background ease-out 300ms;
  background: #ccc;

  &:hover {
    background: ${darken(0.03, '#ccc')};
  }

  ${props =>
    props.primary &&
    css`
      background: #7d40e7;

      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }
    `}

  svg {
    margin-right: 10px;
  }
`;
