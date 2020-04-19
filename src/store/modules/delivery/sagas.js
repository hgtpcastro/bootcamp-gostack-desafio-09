import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import errorHandling from '~/utils/errorHandling';
import history from '~/services/history';

import {
  deliveryFindAllRequest,
  deliveryFindAllSuccess,
  deliveryFindAllFailure,
  deliveryFindOneSuccess,
  deliveryFindOneFailure,
  deliveryCreateSuccess,
  deliveryCreateFailure,
  deliveryUpdateSuccess,
  deliveryUpdateFailure,
} from './actions';

import { closeOverlay } from '../overlay/actions';

export function* findAllDelivery({ payload }) {
  try {
    const { page, search, withProblems } = payload;

    const response = yield call(api.get, 'deliveries', {
      params: {
        page,
        q: search !== '' ? search : null,
        withProblems: withProblems || null,
      },
    });

    yield put(deliveryFindAllSuccess(response.data));
    toast.success('Entregas carregadas com sucesso!');
  } catch (err) {
    errorHandling(err);
    yield put(deliveryFindAllFailure());
  }
}

export function* findOneDelivery({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `deliveries/${id}`);

    yield put(deliveryFindOneSuccess(response.data));
    toast.success('Entrega carregada com sucesso!');
  } catch (err) {
    errorHandling(err);
    yield put(deliveryFindOneFailure());
    history.push('/deliveries');
  }
}

export function* createDelivery({ payload }) {
  try {
    const { product, deliveryman_id, recipient_id } = payload;

    const response = yield call(api.post, `deliveries`, {
      recipient_id,
      deliveryman_id,
      product,
    });

    yield put(deliveryCreateSuccess(response.data));
    toast.success('Entrega inserida com sucesso!');
    history.push('/deliveries');
  } catch (err) {
    errorHandling(err);
    yield put(deliveryCreateFailure());
  }
}

export function* updateDelivery({ payload }) {
  try {
    const { id, product, deliveryman_id, recipient_id } = payload;

    const response = yield call(api.put, `deliveries/${id}`, {
      recipient_id,
      deliveryman_id,
      product,
    });

    yield put(deliveryUpdateSuccess(response.data));
    toast.success('Entrega alterada com sucesso!');
  } catch (err) {
    errorHandling(err);
    yield put(deliveryUpdateFailure());
  }
}

export function* deleteDelivery({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `deliveries/${id}`);

    toast.success('Entrega exlcuída com sucesso!');
    yield put(closeOverlay());
    yield put(deliveryFindAllRequest());
  } catch (err) {
    errorHandling(err);
  }
}

export default all([
  takeLatest('@delivery/FIND_ALL_REQUEST', findAllDelivery),
  takeLatest('@delivery/FIND_ONE_REQUEST', findOneDelivery),
  takeLatest('@delivery/CREATE_REQUEST', createDelivery),
  takeLatest('@delivery/UPDATE_REQUEST', updateDelivery),
  takeLatest('@delivery/DELETE_REQUEST', deleteDelivery),
]);
