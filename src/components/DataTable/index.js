/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function DataTable({ children }) {
  return <Container>{children}</Container>;
}

DataTable.propTypes = {
  children: PropTypes.array.isRequired,
};
