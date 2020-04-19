/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function PopoverButton({ icon, label, clickAction }) {
  return (
    <Container onClick={() => clickAction()}>
      {icon}
      {label}
    </Container>
  );
}

PopoverButton.propTypes = {
  icon: PropTypes.element,
  label: PropTypes.string.isRequired,
  clickAction: PropTypes.func.isRequired,
};
