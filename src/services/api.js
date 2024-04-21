import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';

const params = {
  language: 'en-US',
  include_adult: false,
  page: 1,
};

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZmVlZTJjMmRmZjc4M2U1ODkxNDY3NmY5MmUzMmY1OCIsInN1YiI6IjY2MWMzMjM5ZWE0MjYzMDE2MjI3ZWViOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7dQU2XIHn-QHsUqPb7jVUMYY_CbD3FW3r0uPGhbcEAI',
  },
};

export const requestTrending = async () => {
  const urlTrending = `${BASE_URL}trending/movie/day?${params}`;
  const { data } = await axios.get(urlTrending, options);
  return data;
};

export const requestSearch = async query => {
  const urlSearch = `${BASE_URL}search/movie?query=${query}`;
  const { data } = await axios.get(urlSearch, options);
  return data;
};

export const requestMovieId = async movieId => {
  const urlMovieId = `${BASE_URL}movie/${movieId}${params}`;
  const { data } = await axios.get(urlMovieId, options);
  return data;
};

export const requestMovieReviews = async movieId => {
  const urlMovieReviews = `${BASE_URL}movie/${movieId}/reviews?${params}`;
  const { data } = await axios.get(urlMovieReviews, options);
  return data;
};

export const requestMovieCredits = async movieId => {
  const urlMovieCredits = `${BASE_URL}movie/${movieId}/credits?${params}`;
  const { data } = await axios.get(urlMovieCredits, options);
  return data;
};
