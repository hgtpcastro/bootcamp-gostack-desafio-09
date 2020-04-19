import styled from 'styled-components';

export const Container = styled.div`
  display: inline-block;
  position: relative;

  button {
    background: transparent;
    transition: opacity ease-out 300ms;

    &:hover {
      opacity: 0.6;
    }
  }

  div {
    position: absolute;
    width: 150px;
    left: calc(50% - 75px);
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
    padding: 8px;
    visibility: hidden;
    opacity: 0;
    transform: translateY(20px);
    transition: all ease-out 300ms;
    z-index: 1;

    i {
      color: #fff;
      font-style: normal;
      position: absolute;
      left: calc(50% - 5px);
      top: -15px;
      font-size: 16px;
      text-shadow: 0 -2px 2px rgba(0, 0, 0, 0.08);
      transform: scaleX(1.5) scaleY(0.6);
      z-index: 1;
      pointer-events: none;

      @media screen and (max-width: 1200px) {
        left: calc(100% - 35px);
      }
    }

    button {
      border-bottom: 1px solid #eee;
      &:last-child {
        border-bottom: none;
        margin-bottom: 0;
      }
    }

    span {
      position: relative;
      z-index: 0;
    }

    @media screen and (max-width: 1200px) {
      right: -20px;
      left: auto;
    }

    &.active {
      opacity: 1;
      visibility: visible;
      transform: translateY(10px);
    }
  }
`;
