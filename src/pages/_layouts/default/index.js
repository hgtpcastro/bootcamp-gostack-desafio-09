// Imports
import React from 'react';
import PropTypes from 'prop-types';

// UI Imports
import Header from '~/components/Header';
import { Wrapper } from './styles';

// Component
export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
}

// Constraints
DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
