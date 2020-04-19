import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: fixed;
  opacity: 0;
  visibility: hidden;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  pointer-events: none;
  transition-delay: 300ms;
  transition: opacity 300ms ease-out;

  ${props =>
    props.open &&
    css`
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    `}

  > div {
    padding: 45px 30px 30px 30px;
    width: 100%;
    max-width: 450px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    position: relative;
    opacity: 0;
    transform: translateY(20px);
    transition: all 300ms ease-out;

    ${props =>
      props.open &&
      css`
        opacity: 1;
        transform: translateY(0px);
        transition-delay: 300ms;
      `}

    .close-button {
      background: transparent;
      border: 0;
      position: absolute;
      top: 15px;
      right: 15px;
      z-index: 1;

      + div {
        overflow-y: auto;
        max-height: 70vh;
      }
    }
  }
`;
