import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto 45px;

  label {
    cursor: pointer;

    > div {
      div {
        width: 150px;
        height: 150px;
        font-size: 42px;
        position: relative;

        &:hover {
          &:before {
            opacity: 1;
          }
        }

        &:before {
          position: absolute;
          opacity: 0;
          content: 'Upload a photo';
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.85);
          color: #444;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 16px;
          border: 1px dashed #444;
          transition: opacity 300ms ease-out;
        }
      }
    }

    &:hover {
      opacity: 0.7;
    }

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }

    input {
      display: none;
    }
  }
`;
