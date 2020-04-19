import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import errorHandling from '~/utils/errorHandling';
import history from '~/services/history';

import {
  deliverymanFindAllRequest,
  deliverymanFindAllSuccess,
  deliverymanFindAllFailure,
  deliverymanFindOneSuccess,
  deliverymanFindOneFailure,
  deliverymanCreateSuccess,
  deliverymanCreateFailure,
  deliverymanUpdateSuccess,
  deliverymanUpdateFailure,
} from './actions';

import { closeOverlay } from '../overlay/actions';

export function* findAllDeliverymen({ payload }) {
  try {
    const { page, search } = payload;

    const response = yield call(api.get, 'deliverymen', {
      params: { page, q: search !== '' ? search : null },
    });

    yield put(deliverymanFindAllSuccess(response.data));
    toast.success('Entregadores carregados com sucesso!');
  } catch (err) {
    errorHandling(err);
    yield put(deliverymanFindAllFailure());
  }
}

export function* findOndeDeliveryman({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `deliverymen/${id}`);

    yield put(deliverymanFindOneSuccess(response.data));
    toast.success('Enregador carregado com sucesso!');
  } catch (err) {
    errorHandling(err);
    yield put(deliverymanFindOneFailure());
    history.push('/deliverymen');
  }
}

export function* deleteDeliveryman({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `deliverymen/${id}`);

    toast.success('Entregador excluído com sucesso!');
    yield put(closeOverlay());
    yield put(deliverymanFindAllRequest());
  } catch (err) {
    errorHandling(err);
  }
}

export function* createDeliveryman({ payload }) {
  try {
    const { name, email, avatar_id } = payload;

    const response = yield call(api.post, `deliverymen`, {
      name,
      email,
      avatar_id,
    });

    yield put(deliverymanCreateSuccess(response.data));
    toast.success('Entregador inserido com sucesso!');
    history.push('/deliverymen');
  } catch (err) {
    errorHandling(err);
    yield put(deliverymanCreateFailure());
  }
}

export function* updateDeliveryman({ payload }) {
  try {
    const { id, name, email, avatar_id } = payload;

    const response = yield call(api.put, `deliverymen/${id}`, {
      id,
      name,
      email,
      avatar_id,
    });

    yield put(deliverymanUpdateSuccess(response.data));
    toast.success('Entregador alterado com sucesso!');
  } catch (err) {
    errorHandling(err);
    yield put(deliverymanUpdateFailure());
  }
}

export default all([
  takeLatest('@deliveryman/FIND_ALL_REQUEST', findAllDeliverymen),
  takeLatest('@deliveryman/FIND_ONE_REQUEST', findOndeDeliveryman),
  takeLatest('@deliveryman/CREATE_REQUEST', createDeliveryman),
  takeLatest('@deliveryman/UPDATE_REQUEST', updateDeliveryman),
  takeLatest('@deliveryman/DELETE_REQUEST', deleteDeliveryman),
]);
