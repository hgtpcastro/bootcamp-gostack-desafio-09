import React from 'react';

import logo from '~/assets/fastfeet-logo.svg';

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="FastFeet" />

      <form>
        <input type="email" placeholder="exemplo@email.com" />
        <input type="password" placeholder="*************" />
        <button type="submit">Entrar no sistema</button>
      </form>
    </>
  );
}
