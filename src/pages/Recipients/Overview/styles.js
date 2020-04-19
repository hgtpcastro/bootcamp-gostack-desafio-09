import styled, { css } from 'styled-components';

export const Status = styled.span`
  border-radius: 10px;
  font-size: 14px;
  padding: 2px 4px;
  padding-left: 18px;
  text-transform: uppercase;
  font-weight: bold;
  position: relative;

  &:before {
    position: absolute;
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: 50%;
    margin-top: -5px;
    left: 4px;
  }

  ${props =>
    props.status === 'pending' &&
    css`
      background: #f0f0df;
      color: #c1bc35;
      &:before {
        background: #c1bc35;
      }
    `}

  ${props =>
    props.status === 'delivered' &&
    css`
      background: #dff0df;
      color: #2ca42b;
      &:before {
        background: #2ca42b;
      }
    `}

  ${props =>
    props.status === 'pickedup' &&
    css`
      background: #bad2ff;
      color: #4d85ee;
      &:before {
        background: #4d85ee;
      }
    `}

  ${props =>
    props.status === 'canceled' &&
    css`
      background: #fab0b0;
      color: #de3b3b;
      &:before {
        background: #de3b3b;
      }
    `}
`;
