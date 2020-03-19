import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  padding: 60px 30px;

  img {
    width: 100%;
    height: 100%;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin-bottom: 15px;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #7d40e7;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#7d40e7')};
      }
    }
  }
`;
