// Imports
import React from 'react';
import PropTypes from 'prop-types';

// UI Imports
import { Wrapper, Content } from './styles';

// Component
export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
}

// Constraints
AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
