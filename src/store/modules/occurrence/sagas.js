import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import errorHandling from '~/utils/errorHandling';

import {
  occurrenceFindAllRequest,
  occurrenceFindAllSuccess,
  occurrenceFindAllFailure,
} from './actions';

import { closeOverlay } from '../overlay/actions';

export function* findAllOccurrences({ payload }) {
  try {
    const { page = 1, withProblems = true } = payload;

    const response = yield call(api.get, 'deliveries', {
      params: { page, withProblems },
    });

    yield put(occurrenceFindAllSuccess(response.data));
    toast.success('Ocorrências carregadas com sucesso!');
  } catch (err) {
    errorHandling(err);
    yield put(occurrenceFindAllFailure());
  }
}

export function* cancelDelivery({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `problem/${id}/cancel-delivery`);

    toast.success('Entrega cancelada com sucesso!');
    yield put(closeOverlay());
    yield put(occurrenceFindAllRequest());
  } catch (err) {
    errorHandling(err);
  }
}

export default all([
  takeLatest('@occurrence/FIND_ALL_REQUEST', findAllOccurrences),
  takeLatest('@occurrence/CANCEL_DELIVERY_REQUEST', cancelDelivery),
]);
