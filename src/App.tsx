import { Container, Title } from '@mantine/core';
import { useReducer, useEffect } from 'react';
import { reducer } from './reducer';
import type { State } from './types';
import { LaunchCard } from './components/launchCard/LaunchCard';
import { Modal } from './components/modal/Modal';
import { fetchLaunches } from './api/launchesApi';

import './App.css';

const initialState: State = {
  launches: [],
  loading: false,
  error: null,
  isModalOpen: false,
  selectedLaunch: null,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'FETCH_START' });

    fetchLaunches()
      .then((data) => {
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      })
      .catch((error) => {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      });
  }, []);

  return (
    <Container size="lg">
      <Title ta="center" mt="lg">
        SpaceX Launches 2020
      </Title>

      <div className="launches-grid">
        {state.launches.map((launch) => (
          <LaunchCard
            key={launch.mission_name}
            launch={launch}
            openModal={(launch) =>
              dispatch({ type: 'OPEN_MODAL', payload: launch })
            }
          />
        ))}
      </div>

      <Modal
        isOpen={state.isModalOpen}
        launch={state.selectedLaunch}
        onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
      />
    </Container>
  );
}

export default App;
