/* eslint-disable jsx-a11y/label-has-associated-control */
// Imports
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// UI Imports
import { InputControl } from '~/components/Layout';
import logo from '~/assets/fastfeet-logo.svg';

// App Imports
import { loginRequest } from '~/store/modules/auth/actions';

// Validations
const schema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Verifique sua senha. Mínimo de 6 caracteres.')
    .required('A senha é requerida.'),
  email: Yup.string()
    .email('Endereço de e-mail inválido.')
    .required('O e-mail é requerido.'),
});

// Component
export default function Login() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    schema
      .validate({
        email,
        password,
      })
      .catch(err => {
        toast.error(err.message);
      })
      .then(valid => {
        if (valid) {
          dispatch(loginRequest(email, password));
        }
      });
  }

  return (
    <>
      <img src={logo} alt="Fastfeet" />

      <Form onSubmit={handleSubmit}>
        <InputControl>
          <label>E-mail:</label>
          <Input
            name="email"
            type="email"
            placeholder="Informe seu e-mail..."
          />
        </InputControl>
        <InputControl>
          <label>Senha:</label>
          <Input
            name="password"
            type="password"
            placeholder="Informe sua senha..."
          />
        </InputControl>
        <button type="submit">{loading ? 'Carregando...' : 'Entrar'}</button>
      </Form>
    </>
  );
}
