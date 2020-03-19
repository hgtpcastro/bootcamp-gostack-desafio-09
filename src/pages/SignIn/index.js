import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/fastfeet-logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Verifique sua email. Email inválido')
    .required('O email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="FastFeet" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <Input name="password" type="password" placeholder="*************" />
        <button type="submit">Entrar no sistema</button>
      </Form>
    </>
  );
}
