import produce from 'immer';

const INITIAL_STATE = {
  saving: false,
  name: '',
  email: '',
  avatar: null,
  deliverymen: [],
  count: 0,
};

export default function deliveryman(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@deliveryman/INPUT_CHANGE': {
        draft[action.payload.input] = action.payload.value;
        break;
      }
      case '@deliveryman/FIND_ALL_SUCCESS': {
        draft.deliverymen = action.payload.rows;
        draft.count = action.payload.count;
        break;
      }
      case '@deliveryman/FIND_ONE_SUCCESS': {
        draft.name = action.payload.name;
        draft.email = action.payload.email;
        draft.avatar = action.payload.avatar;
        break;
      }
      case '@deliveryman/UPLOAD_AVATAR_REQUEST': {
        break;
      }
      case '@deliveryman/UPLOAD_AVATAR_SUCCESS': {
        draft.avatar = {
          id: action.payload.data.id,
          url: action.payload.data.url,
        };
        break;
      }
      case '@deliveryman/CREATE_REQUEST': {
        draft.saving = true;
        break;
      }
      case '@deliveryman/CREATE_SUCCESS': {
        draft.saving = false;
        break;
      }
      case '@deliveryman/CREATE_FAILURE': {
        draft.saving = false;
        break;
      }
      case '@deliveryman/UPDATE_REQUEST': {
        draft.saving = true;
        break;
      }
      case '@deliveryman/UPDATE_SUCCESS': {
        draft.saving = false;
        break;
      }
      default:
    }
  });
}
