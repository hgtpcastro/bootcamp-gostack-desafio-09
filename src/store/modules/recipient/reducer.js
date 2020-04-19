import produce from 'immer';

const INITIAL_STATE = {
  saving: false,
  recipients: [],
  current: {},
  count: 0,
};

export default function recipient(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@recipient/INPUT_CHANGE': {
        draft.current[action.payload.input] = action.payload.value;
        break;
      }
      case '@recipient/FIND_ALL_SUCCESS': {
        draft.recipients = action.payload.rows;
        draft.count = action.payload.count;
        break;
      }
      case '@recipient/FIND_ONE_SUCCESS': {
        draft.current = action.payload;
        break;
      }
      case '@recipient/CREATE_REQUEST': {
        draft.saving = true;
        break;
      }
      case '@recipient/CREATE_SUCCESS': {
        draft.saving = false;
        break;
      }
      case '@recipient/UPDATE_REQUEST': {
        draft.saving = true;
        break;
      }
      case '@recipient/UPDATE_SUCCESS': {
        draft.saving = false;
        break;
      }
      default:
    }
  });
}
