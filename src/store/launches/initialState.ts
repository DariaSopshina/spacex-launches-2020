import type { State } from '../../types';

export const initialState: State = {
  launches: [],
  loading: false,
  error: null,
  isModalOpen: false,
  selectedLaunch: null,
};
