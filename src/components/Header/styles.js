import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  border-bottom: 1px solid #ddd;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    align-items: center;

    img {
      max-width: 135px;
      width: 100%;
      margin-right: 25px;
      padding-right: 25px;
      border-right: 1px solid #ddd;
    }

    ul {
      display: flex;
    }

    a {
      font-weight: bold;
      text-transform: uppercase;
      color: #999;
      text-decoration: none;
      padding: 0 20px;
      transition: color ease-out 300ms;

      &.active,
      &:hover {
        color: #444;
      }
    }
  }
`;

export const Profile = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  strong {
    color: #666;
  }
`;

export const Logout = styled.button`
  border: none;
  color: #de3b3b;
  font-size: 12px;
  margin-top: 4px;
  background: transparent;
`;
