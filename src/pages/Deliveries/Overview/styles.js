import styled, { css } from 'styled-components';

export const Status = styled.span`
  border-radius: 10px;
  font-size: 14px;
  padding: 2px 4px;
  padding-left: 18px;
  text-transform: uppercase;
  font-weight: bold;
  position: relative;
  width: auto !important;
  display: inline-block;

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
      background: #f0f0df !important;
      color: #c1bc35;
      &:before {
        background: #c1bc35;
      }
    `}

  ${props =>
    props.status === 'delivered' &&
    css`
      background: #dff0df !important;
      color: #2ca42b;
      &:before {
        background: #2ca42b;
      }
    `}

  ${props =>
    props.status === 'pickedup' &&
    css`
      background: #bad2ff !important;
      color: #4d85ee;
      &:before {
        background: #4d85ee;
      }
    `}

  ${props =>
    props.status === 'canceled' &&
    css`
      background: #fab0b0 !important;
      color: #de3b3b;
      &:before {
        background: #de3b3b;
      }
    `}
`;

export const ToggleFilter = styled.button`
  background: transparent;
  border: 0;
  text-transform: uppercase;
  font-weight: bold;
  margin-right: 20px;
  border-bottom: 2px solid transparent;
  color: ${props => (props.active ? '#de3b3b' : '#666')};
  border-color: ${props => (props.active ? '#de3b3b' : 'transparent')};
  align-self: center;
  padding-bottom: 5px;
  transition: all 300ms ease-out;
`;
