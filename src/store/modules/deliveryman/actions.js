export function deliverymanFindAllRequest(data) {
  return {
    type: '@deliveryman/FIND_ALL_REQUEST',
    payload: { ...data },
  };
}

export function deliverymanFindAllSuccess(data) {
  return {
    type: '@deliveryman/FIND_ALL_SUCCESS',
    payload: { ...data },
  };
}

export function deliverymanFindAllFailure() {
  return {
    type: '@deliveryman/FIND_ALL_FAILURE',
  };
}

export function deliverymanFindOneRequest(id) {
  return {
    type: '@deliveryman/FIND_ONE_REQUEST',
    payload: { id },
  };
}

export function deliverymanFindOneSuccess(data) {
  return {
    type: '@deliveryman/FIND_ONE_SUCCESS',
    payload: { ...data },
  };
}

export function deliverymanFindOneFailure() {
  return {
    type: '@deliveryman/FIND_ONE_FAILURE',
  };
}

export function deliverymanCreateRequest(data) {
  return {
    type: '@deliveryman/CREATE_REQUEST',
    payload: { ...data },
  };
}

export function deliverymanCreateSuccess(data) {
  return {
    type: '@deliveryman/CREATE_SUCCESS',
    payload: { ...data },
  };
}

export function deliverymanCreateFailure() {
  return {
    type: '@deliveryman/CREATE_FAILURE',
  };
}

export function deliverymanUpdateRequest(id, data) {
  return {
    type: '@deliveryman/UPDATE_REQUEST',
    payload: { id, ...data },
  };
}

export function deliverymanUpdateSuccess(id, data) {
  return {
    type: '@deliveryman/UPDATE_SUCCESS',
    payload: { id, ...data },
  };
}

export function deliverymanAvatarUploadRequest(data) {
  return {
    type: '@deliveryman/UPLOAD_AVATAR_REQUEST',
    payload: { data },
  };
}

export function deliverymanAvatarUploadSuccess(data) {
  return {
    type: '@deliveryman/UPLOAD_AVATAR_SUCCESS',
    payload: { data },
  };
}

export function deliverymanUpdateFailure() {
  return {
    type: '@deliveryman/UPDATE_FAILURE',
  };
}

export function deliverymanDeleteRequest(id) {
  return {
    type: '@deliveryman/DELETE_REQUEST',
    payload: { id },
  };
}

export function deliverymanDeleteSuccess() {
  return {
    type: '@deliveryman/DELETE_SUCCESS',
  };
}

export function deliverymanDeleteFailure() {
  return {
    type: '@deliveryman/DELETE_FAILURE',
  };
}

export function deliverymanInputChange(input, value) {
  return {
    type: '@deliveryman/INPUT_CHANGE',
    payload: { input, value },
  };
}
