export function occurrenceFindAllRequest(data) {
  return {
    type: '@occurrence/FIND_ALL_REQUEST',
    payload: { ...data },
  };
}

export function occurrenceFindAllSuccess(data) {
  return {
    type: '@occurrence/FIND_ALL_SUCCESS',
    payload: { ...data },
  };
}

export function occurrenceFindAllFailure() {
  return {
    type: '@occurrence/FIND_ALL_FAILURE',
  };
}

export function occurrenceCancelDeliveryRequest(id) {
  return {
    type: '@occurrence/CANCEL_DELIVERY_REQUEST',
    payload: { id },
  };
}

export function occurrenceCancelDeliverySuccess() {
  return {
    type: '@occurrence/CANCEL_DELIVERY_SUCCESS',
  };
}

export function occurrenceCancelDeliveryFailure() {
  return {
    type: '@occurrence/CANCEL_DELIVERY_FAILURE',
  };
}
