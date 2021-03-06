import { takeLatest, call, put, all } from 'redux-saga/effects';

import errorHandling from '~/utils/errorHandling';
import api from '~/services/api';
import history from '~/services/history';

import { loginSuccess, loginFailure } from './actions';

export function* login({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', { email, password });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(loginSuccess(token, user));
    history.push('/deliveries');
  } catch (err) {
    errorHandling(err);
    yield put(loginFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function logout() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/LOGIN_REQUEST', login),
  takeLatest('@auth/LOGOUT', logout),
]);
