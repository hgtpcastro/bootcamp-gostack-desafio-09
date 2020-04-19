import produce from 'immer';

const INITIAL_STATE = {
  occurrences: [],
  count: 0,
};

export default function occurrence(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@occurrence/FIND_ALL_SUCCESS': {
        draft.occurrences = action.payload.rows;
        draft.count = action.payload.count;
        break;
      }
      default:
    }
  });
}
