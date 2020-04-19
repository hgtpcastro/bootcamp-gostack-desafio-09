// Imports
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// UI Imports
import { Container, Content, Profile, Logout } from './styles';
import logo from '~/assets/fastfeet-logo.svg';

// App Imports
import history from '~/services/history';
import { logOut } from '~/store/modules/auth/actions';

const navigation = [
  { label: 'Entregas', url: '/deliveries' },
  { label: 'Entregadores', url: '/deliverymen' },
  { label: 'Destinatários', url: '/recipients' },
  { label: 'Ocorrências', url: '/occurrences' },
];

// Component
export default function Header() {
  const { pathname } = history.location;
  const { name } = useSelector(state => state.user.info);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Fastfeet" />
          <ul>
            {navigation.map(item => (
              <li key={item.label}>
                <Link
                  to={item.url}
                  className={pathname.includes(item.url) ? 'active' : null}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <aside>
          <Profile>
            <strong>{name}</strong>
            <Logout onClick={handleLogout}>Logout</Logout>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
