import produce from 'immer';

const INITIAL_STATE = {
  product: '',
  deliveryman_id: null,
  recipient_id: null,
  saving: false,
  deliveries: [],
  count: 0,
};

export default function delivery(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@delivery/INPUT_CHANGE': {
        draft[action.payload.input] = action.payload.value;
        break;
      }
      case '@delivery/FIND_ALL_SUCCESS': {
        draft.deliveries = action.payload.rows;
        draft.count = action.payload.count;
        break;
      }
      case '@delivery/FIND_ONE_SUCCESS': {
        draft.product = action.payload.product;
        draft.deliveryman_id = action.payload.deliveryman.id;
        draft.recipient_id = action.payload.recipient.id;
        break;
      }
      case '@delivery/CREATE_REQUEST': {
        draft.saving = true;
        break;
      }
      case '@delivery/CREATE_SUCCESS': {
        draft.saving = false;
        break;
      }
      case '@delivery/UPDATE_REQUEST': {
        draft.saving = true;
        break;
      }
      case '@delivery/UPDATE_SUCCESS': {
        draft.saving = false;
        break;
      }
      default:
    }
  });
}
