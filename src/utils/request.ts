import { API_KEY, BASE_URL } from "./constants";

export const requests = {
  fetchPopularMovies: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`,
  fetchPopularSeries: `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=pt-BR`,
  fetchTopRatedMovies: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=pt-BR`,
  fetchTopRatedSeries: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=pt-BR`,

  fetchGenreMovies: `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=pt-BR`,
  fetchGenreSeries: `${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=pt-BR`,
};

export const getMovieDetails = (id: number) =>
  `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR&append_to_response=videos`;

export const getSerieDetails = (id: number) =>
  `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=pt-BR&append_to_response=videos`;

export const getMovieWithGenre = (genre: number, page: number) =>
  `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=${genre}&page=${page}`;

export const getSerieWithGenre = (genre: number, page: number) =>
  `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=pt-BR&with_genres=${genre}&page=${page}`;

export const getPerson = (page: number) =>
  `${BASE_URL}/person/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`;

export const getPersonDetails = (id: number) =>
  `${BASE_URL}/person/${id}?api_key=${API_KEY}&language=pt-BR`;

export const getSearch = (type: string, query: string) =>
  `${BASE_URL}/search/${type}?api_key=${API_KEY}&language=pt-BR&query=${query}`;
