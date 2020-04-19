/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import api from '~/services/api';

import { Container } from './styles';

import { deliverymanAvatarUploadSuccess } from '~/store/modules/deliveryman/actions';

import AvatarPlaceholder from '~/assets/avatar_placeholder.png';
import Profile from '~/components/Profile';

export default function AvatarInput({ avatar, name }) {
  const dispatch = useDispatch();

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    dispatch(deliverymanAvatarUploadSuccess({ id, url }));
  }

  return (
    <Container>
      <label htmlFor="avatar">
        {name !== '' && avatar === null ? (
          <Profile noName border name={name} />
        ) : (
          <img
            src={avatar !== null ? avatar.url : AvatarPlaceholder}
            alt="avatar"
          />
        )}
        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={handleChange}
        />
      </label>
    </Container>
  );
}

AvatarInput.propTypes = {
  avatar: PropTypes.object,
  name: PropTypes.string,
};
