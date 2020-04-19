export function deliveryFindAllRequest(data) {
  return {
    type: '@delivery/FIND_ALL_REQUEST',
    payload: { ...data },
  };
}

export function deliveryFindAllSuccess(data) {
  return {
    type: '@delivery/FIND_ALL_SUCCESS',
    payload: { ...data },
  };
}

export function deliveryFindAllFailure() {
  return {
    type: '@delivery/FIND_ALL_FAILURE',
  };
}

export function deliveryFindOneRequest(id) {
  return {
    type: '@delivery/FIND_ONE_REQUEST',
    payload: { id },
  };
}

export function deliveryFindOneSuccess(data) {
  return {
    type: '@delivery/FIND_ONE_SUCCESS',
    payload: { ...data },
  };
}

export function deliveryFindOneFailure() {
  return {
    type: '@delivery/FIND_ONE_FAILURE',
  };
}

export function deliveryCreateRequest(data) {
  return {
    type: '@delivery/CREATE_REQUEST',
    payload: { ...data },
  };
}

export function deliveryCreateSuccess(data) {
  return {
    type: '@delivery/CREATE_SUCCESS',
    payload: { ...data },
  };
}

export function deliveryCreateFailure() {
  return {
    type: '@delivery/CREATE_FAILURE',
  };
}

export function deliveryUpdateRequest(id, data) {
  return {
    type: '@delivery/UPDATE_REQUEST',
    payload: { id, ...data },
  };
}

export function deliveryUpdateSuccess(id, data) {
  return {
    type: '@delivery/UPDATE_SUCCESS',
    payload: { id, ...data },
  };
}

export function deliveryUpdateFailure() {
  return {
    type: '@delivery/UPDATE_FAILURE',
  };
}

export function deliveryDeleteRequest(id) {
  return {
    type: '@delivery/DELETE_REQUEST',
    payload: { id },
  };
}

export function deliveryDeleteSuccess() {
  return {
    type: '@delivery/DELETE_SUCCESS',
  };
}

export function deliveryDeleteFailure() {
  return {
    type: '@delivery/DELETE_FAILURE',
  };
}

export function deliveryInputChange(input, value) {
  return {
    type: '@delivery/INPUT_CHANGE',
    payload: { input, value },
  };
}
