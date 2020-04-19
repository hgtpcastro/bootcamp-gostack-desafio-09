import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;

  h1 {
    font-size: 24px;
    font-weight: 700;
    color: #444;
  }

  aside {
    display: flex;

    button {
      margin-left: 20px;
    }
  }
`;
