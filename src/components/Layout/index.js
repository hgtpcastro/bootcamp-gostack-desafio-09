/* eslint-disable radix */
import styled, { css } from 'styled-components';

const gutter = '15px';

export const Row = styled.div`
  display: flex;
  width: 100%;

  @media screen and (max-width: 620px) {
    flex-direction: column;
  }
`;

export const Column = styled.div`
  display: flex;
  width: ${props => (props.size ? `${props.size}%` : '100%')};
  margin: 0 ${gutter};

  @media screen and (max-width: 620px) {
    width: calc(100% - ${parseInt(gutter) * 2}px);
  }
`;

export const Actions = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;

  div {
    margin-right: auto;
  }

  button {
    margin-left: 12px;
  }
`;

export const InputControl = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  position: relative;
  margin-bottom: ${props => (props.noMargin ? '0' : '15px')};
  width: ${props => (props.autoWidth ? 'auto' : '100%')};

  input {
    padding: 0 12px;
    height: 45px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fff !important;
    transition: all 300ms ease-out;

    &:focus {
      border-color: #444;

      + svg {
        color: #444 !important;
      }
    }

    &:placeholder {
      color: #999;
    }
  }

  label {
    text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
    display: ${props => (props.hideLabel ? 'none' : 'block')};
    color: #444;
    font-weight: 700;
    margin-bottom: 8px;
  }

  svg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    margin-top: -12px;
    transition: all 300ms ease-out;
  }

  ${props =>
    props.iconLeft &&
    css`
      input {
        padding-left: 40px;
      }
      svg {
        top: 50%;
        left: 10px;
      }
    `}

  @media screen and (max-width: 620px) {
    width: calc(100% - ${parseInt(gutter) * 2}px);
  }
`;

export const NotFound = styled.p`
  margin-top: 24px;
  font-size: 14px;
  color: #444;
`;

export const IssueCanceled = styled.span`
  font-size: 12px;
  color: #de3b3b !important;
`;
