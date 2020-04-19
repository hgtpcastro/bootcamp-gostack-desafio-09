import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  background: #fff;
  padding: 30px 30px 55px;
  width: 100%;
  max-width: 360px;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  img {
    margin-bottom: 25px;
  }

  button {
    background: #7d40e7;
    color: #fff;
    text-transform: uppercase;
    width: 100%;
    text-align: center;
    height: 45px;
    border: 0;
    border-radius: 4px;
    font-weight: bold;
    transition: background ease-out 300ms;

    &:hover {
      background: ${darken(0.03, '#7d40e7')};
    }
  }
`;
