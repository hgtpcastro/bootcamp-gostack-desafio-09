/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import randomColor from 'random-color';

import { Container, Initials } from './styles';

const initials = name => {
  const fullNameArray = name.split(' ');
  const firstInitial = fullNameArray[0].split('')[0];
  const hasLastName = fullNameArray.length - 1 !== 0;
  if (hasLastName) {
    const lastInitial = fullNameArray[fullNameArray.length - 1].split('')[0];
    return firstInitial + lastInitial;
  }
  return firstInitial;
};

export default function Profile({ name, avatar, noName, border }) {
  const color = randomColor();
  return (
    <Container>
      {avatar ? (
        <img src={avatar} alt={name} />
      ) : (
        <Initials border={border} color={color.hexString()}>
          {initials(name)}
        </Initials>
      )}
      {!noName && <span>{name}</span>}
    </Container>
  );
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  noName: PropTypes.bool,
  border: PropTypes.bool,
};
