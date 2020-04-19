import styled from 'styled-components';
import { transparentize, darken } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;

  img,
  div {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 10px;
    flex-shrink: 0;
  }
`;

export const Initials = styled.div`
  color: ${props => darken(0.04, props.color)};
  background-color: ${props => transparentize(0.9, props.color)};
  border: ${props => props.border && `1px dashed ${props.color}`};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
