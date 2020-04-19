/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Button({ children, icon, onClick, primary, type }) {
  return (
    <Container onClick={() => onClick()} type={type} primary={primary}>
      {icon}
      {children}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  primary: PropTypes.bool,
  type: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
};
