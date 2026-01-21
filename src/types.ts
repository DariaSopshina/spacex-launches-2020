export type Launch = {
  mission_name: string;
  rocket: {
    rocket_name: string;
  } | null;
  links: {
    mission_patch: string | null;
    mission_patch_small: string | null;
  };
  details: string | null;
};

export type State = {
  launches: Launch[];
  loading: boolean;
  error: string | null;

  isModalOpen: boolean;
  selectedLaunch: Launch | null;
};

export type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Launch[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'OPEN_MODAL'; payload: Launch }
  | { type: 'CLOSE_MODAL' };
