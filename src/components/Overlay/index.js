import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdClose } from 'react-icons/md';

import { Container } from './styles';

import { closeOverlay } from '~/store/modules/overlay/actions';

export default function Overlay() {
  const dispatch = useDispatch();
  const open = useSelector(state => state.overlay.open);
  const content = useSelector(state => state.overlay.content);

  function handleButtonClose() {
    dispatch(closeOverlay());
  }
  return (
    <Container open={open}>
      <div>
        <button className="close-button" onClick={handleButtonClose}>
          <MdClose color="000" size={21} />
        </button>
        {content}
      </div>
    </Container>
  );
}
