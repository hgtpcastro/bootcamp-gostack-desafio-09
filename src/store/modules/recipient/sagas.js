import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import errorHandling from '~/utils/errorHandling';
import history from '~/services/history';

import {
  recipientFindAllRequest,
  recipientFindAllSuccess,
  recipientFindAllFailure,
  recipientFindOneSuccess,
  recipientFindOneFailure,
  recipientCreateSuccess,
  recipientCreateFailure,
  recipientUpdateSuccess,
  recipientUpdateFailure,
} from './actions';

import { closeOverlay } from '../overlay/actions';

export function* findAllRecipients({ payload }) {
  try {
    const { page, search } = payload;

    const response = yield call(api.get, 'recipients', {
      params: { page, q: search !== '' ? search : null },
    });

    yield put(recipientFindAllSuccess(response.data));
    toast.success('Destinatários carregados com sucesso!');
  } catch (err) {
    errorHandling(err);
    yield put(recipientFindAllFailure());
  }
}

export function* findOneRecipient({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `recipients/${id}`);

    yield put(recipientFindOneSuccess(response.data));
    toast.success('Destinatário carregado com sucesso!');
  } catch (err) {
    errorHandling(err);
    yield put(recipientFindOneFailure());
    history.push('/recipients');
  }
}

export function* deleteRecipient({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `recipients/${id}`);

    toast.success('Destinatário excluído com sucesso!');
    yield put(closeOverlay());
    yield put(recipientFindAllRequest());
  } catch (err) {
    errorHandling(err);
  }
}

export function* createRecipient({ payload }) {
  try {
    const { data } = payload;

    const response = yield call(api.post, `recipients`, data);

    yield put(recipientCreateSuccess(response.data));
    toast.success('Destinatário inserido com sucesso!');
  } catch (err) {
    yield put(recipientCreateFailure());
    errorHandling(err);
  }
}

export function* updateRecipient({ payload }) {
  try {
    const { id, data } = payload;

    const response = yield call(api.put, `recipients/${id}`, data);

    yield put(recipientUpdateSuccess(response.data));
    toast.success('Destinatário alterado com sucesso!');
  } catch (err) {
    errorHandling(err);
    yield put(recipientUpdateFailure());
  }
}

export default all([
  takeLatest('@recipient/FIND_ALL_REQUEST', findAllRecipients),
  takeLatest('@recipient/FIND_ONE_REQUEST', findOneRecipient),
  takeLatest('@recipient/CREATE_REQUEST', createRecipient),
  takeLatest('@recipient/UPDATE_REQUEST', updateRecipient),
  takeLatest('@recipient/DELETE_REQUEST', deleteRecipient),
]);
