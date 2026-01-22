import type { State, Action } from '../../types';

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        launches: action.payload,
        loading: false,
        error: null,
      };

    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'OPEN_MODAL':
      return {
        ...state,
        isModalOpen: true,
        selectedLaunch: action.payload,
      };

    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalOpen: false,
        selectedLaunch: null,
      };

    default:
      return state;
  }
}
