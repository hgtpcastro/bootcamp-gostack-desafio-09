/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

/*
 * Click outside solution found on the web
 * Link: https://codesandbox.io/s/989y0758np
 */
function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible
  );
  const ref = useRef(null);

  const handleHideDropdown = event => {
    if (event.key === 'Escape') {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = event => {
    if (
      event.target.nodeName === 'BUTTON' ||
      (ref.current && !ref.current.contains(event.target))
    ) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}

export default function Popover({ children, trigger }) {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);

  return (
    <Container ref={ref}>
      <button onClick={() => setIsComponentVisible(true)}>{trigger}</button>
      <div className={isComponentVisible ? 'active' : undefined}>
        <i>▲</i>
        <span>{children}</span>
      </div>
    </Container>
  );
}

Popover.propTypes = {
  children: PropTypes.array.isRequired,
  trigger: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.object,
  ]),
};
