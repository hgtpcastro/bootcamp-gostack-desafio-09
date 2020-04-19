/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Heading({ title, children }) {
  return (
    <Container>
      <h1>{title}</h1>
      <aside>{children}</aside>
    </Container>
  );
}

Heading.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.array,
};
