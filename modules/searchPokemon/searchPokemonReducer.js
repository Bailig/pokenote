import { UPDATE_SEARCH_TEXT } from '.';

const initialState = {
  searchText: '',
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_SEARCH_TEXT:
      return { ...state, searchText: payload };
    default: return state;
  }
};
