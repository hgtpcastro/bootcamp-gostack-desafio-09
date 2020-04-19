/* eslint-disable radix */
import styled from 'styled-components';

const gutter = '15px';

export const Container = styled.div`
  background: #fff;
  margin-top: 30px;
  border-radius: 4px;
  padding: ${parseInt(gutter) * 2}px ${gutter};

  form {
    width: 100%;
  }
`;
