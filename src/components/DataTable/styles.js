import styled from 'styled-components';

const rowBorderRadius = '6px';
const cellPadding = '16px';

export const Container = styled.table.attrs({
  cellspacing: 0,
  border: 0,
})`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 16px;

  thead {
    th {
      padding: ${cellPadding};
      padding-bottom: 0;
      font-size: 16px;
      text-align: left;

      &:last-child {
        text-align: right;
      }
    }
  }

  tbody {
    tr {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0);
      transition box-shadow ease-out 300ms;
      border-radius: ${rowBorderRadius};

      &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
      }
    }
  }

  td {
    font-size: 16px;
    font-weight: 400;
    color: #666;
    padding: ${cellPadding};
    background: #fff;

    > span {
      width: 80%;
      display: inline-block;
    }

    &:last-child {
      text-align: right;
      padding-right: 20px;
    }

    &:first-child {
      border-radius: ${rowBorderRadius} 0 0 ${rowBorderRadius};
    }

    &:last-child {
      border-radius: 0 ${rowBorderRadius} ${rowBorderRadius} 0;
    }
  }

  button {
    border: none;
    transition: opacity ease-out 300ms;

    &:hover {
      opacity: 0.6;
    }
  }
`;
