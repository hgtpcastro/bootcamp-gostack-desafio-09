/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function FormWrapper({ children }) {
  return <Container>{children}</Container>;
}

FormWrapper.propTypes = {
  children: PropTypes.object.isRequired,
};
