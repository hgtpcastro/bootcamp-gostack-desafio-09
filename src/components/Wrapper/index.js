import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Wrapper({ children }) {
  return <Container>{children}</Container>;
}

Wrapper.propTypes = {
  children: PropTypes.element.isRequired,
};
