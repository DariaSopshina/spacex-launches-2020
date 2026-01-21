const API_URL = 'https://api.spacexdata.com/v3/launches?launch_year=2020';

export async function fetchLaunches() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch launches');
  }

  return response.json();
}
