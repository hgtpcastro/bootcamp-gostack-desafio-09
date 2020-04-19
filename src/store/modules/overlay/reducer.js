import produce from 'immer';

const INITIAL_STATE = {
  open: false,
  content: '',
};

export default function order(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@overlay/OPEN': {
        draft.open = true;
        draft.content = action.payload;
        break;
      }
      case '@overlay/CLOSE': {
        draft.open = false;
        break;
      }
      default:
    }
  });
}
