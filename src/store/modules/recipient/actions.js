export function recipientFindAllRequest(data) {
  return {
    type: '@recipient/FIND_ALL_REQUEST',
    payload: { ...data },
  };
}

export function recipientFindAllSuccess(data) {
  return {
    type: '@recipient/FIND_ALL_SUCCESS',
    payload: { ...data },
  };
}

export function recipientFindAllFailure() {
  return {
    type: '@recipient/FIND_ALL_FAILURE',
  };
}

export function recipientFindOneRequest(id) {
  return {
    type: '@recipient/FIND_ONE_REQUEST',
    payload: { id },
  };
}

export function recipientFindOneSuccess(data) {
  return {
    type: '@recipient/FIND_ONE_SUCCESS',
    payload: { ...data },
  };
}

export function recipientFindOneFailure() {
  return {
    type: '@recipient/FIND_ONE_FAILURE',
  };
}

export function recipientCreateRequest(data) {
  return {
    type: '@recipient/CREATE_REQUEST',
    payload: { data },
  };
}

export function recipientCreateSuccess(data) {
  return {
    type: '@recipient/CREATE_SUCCESS',
    payload: { data },
  };
}

export function recipientCreateFailure() {
  return {
    type: '@recipient/CREATE_FAILURE',
  };
}

export function recipientUpdateRequest(id, data) {
  return {
    type: '@recipient/UPDATE_REQUEST',
    payload: { id, data },
  };
}

export function recipientUpdateSuccess(id, data) {
  return {
    type: '@recipient/UPDATE_SUCCESS',
    payload: { id, ...data },
  };
}

export function recipientUpdateFailure() {
  return {
    type: '@recipient/UPDATE_FAILURE',
  };
}

export function recipientDeleteRequest(id) {
  return {
    type: '@recipient/DELETE_REQUEST',
    payload: { id },
  };
}

export function recipientDeleteSuccess() {
  return {
    type: '@recipient/DELETE_SUCCESS',
  };
}

export function recipientDeleteFailure() {
  return {
    type: '@recipient/DELETE_FAILURE',
  };
}

export function recipientInputChange(input, value) {
  return {
    type: '@recipient/INPUT_CHANGE',
    payload: { input, value },
  };
}
