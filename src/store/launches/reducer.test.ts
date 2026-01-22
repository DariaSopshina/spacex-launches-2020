import { describe, it, expect } from 'vitest';
import { reducer } from './reducer';
import type { State, Launch } from '../../types';

const initialState: State = {
  launches: [],
  loading: false,
  error: null,
  isModalOpen: false,
  selectedLaunch: null,
};

const fakeLaunch: Launch = {
  mission_name: 'Test mission',
  rocket: { rocket_name: 'Test rocket' },
  links: { mission_patch: null, mission_patch_small: null },
  details: 'Some details',
};

describe('reducer', () => {
  it('должен включать loading и очищать ошибку при FETCH_START', () => {
    const nextState = reducer(initialState, { type: 'FETCH_START' });
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('должен сохранять данные запусков и выключать loading при FETCH_SUCCESS', () => {
    const launches = [fakeLaunch];

    const nextState = reducer(initialState, {
      type: 'FETCH_SUCCESS',
      payload: launches,
    });

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBeNull();
    expect(nextState.launches).toEqual(launches);
  });

  it('должен сохранять текст ошибки и включать loading при FETCH_ERROR', () => {
    const nextState = reducer(initialState, {
      type: 'FETCH_ERROR',
      payload: 'Error message',
    });
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Error message');
    expect(nextState.launches).toEqual([]);
  });

  it('должен открывать модалку и созранять выбранный запуск при OPEN_MODAL', () => {
    const nextState = reducer(initialState, {
      type: 'OPEN_MODAL',
      payload: fakeLaunch,
    });
    expect(nextState.isModalOpen).toBe(true);
    expect(nextState.selectedLaunch).toEqual(fakeLaunch);
  });

  it('должен закрывать модалку и очищать выбранный запуск при CLOSE_MODAL', () => {
    const stateWithModalOpen: State = {
      ...initialState,
      isModalOpen: true,
      selectedLaunch: fakeLaunch,
    };
    const nextState = reducer(stateWithModalOpen, {
      type: 'CLOSE_MODAL',
    });
    expect(nextState.isModalOpen).toBe(false);
    expect(nextState.selectedLaunch).toBeNull();
  });
});
