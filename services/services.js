import axios from 'axios';
const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=098e25c8d129bb9184cc9dfc8c65fdf5';
export const getMoviesPopular = async () => {
  const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
  return resp.data.results;
};

export const getUpcomingMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
  return resp.data.results;
};
