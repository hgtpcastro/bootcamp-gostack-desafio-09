import styled from 'styled-components';

export const SelectWrapper = styled.div`
  width: 100%;
  position: relative;

  svg {
    position: absolute;
    right: 10px;
    top: 10px;
    margin-top: 0;
  }

  select {
    display: block;
    width: 100%;
    -webkit-appearance: none;
    padding: 0 12px;
    height: 45px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fff;
    color: #747474;
    transition: all 300ms ease-out;

    &:focus {
      border-color: #444;
    }

    &.active {
      color: #000;
    }
  }
`;
