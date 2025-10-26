const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTY2ZmEyNzM2OGZhY2E1MzBiMjU3YzM1Y2E4ZWU5YiIsIm5iZiI6MTc2MTMwMTUyMy4xMTgsInN1YiI6IjY4ZmI1NDEzNTMyZjk3YTllNjAxODg1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-sjyBXTr9RrvCcH7cWIgtLFfuzVdiA6y5tO2hy_suwA',
  },
};

export async function getTvSeries() {
  const pageLength = 10;
  const pages = Array.from({ length: pageLength }, (_, i) => i + 1);

  const requests = pages.map((page) =>
    fetch(
      `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=vote_count.desc`,
      options
    ).then((res) => res.json())
  );

  const results = await Promise.all(requests);

  const mappedResults = results.flatMap((result) => result.results);

  return mappedResults;
}

export async function getMovies() {
  const totalPages = 10;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const requests = pages.map((page) =>
    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
      options
    ).then((res) => res.json())
  );

  const results = await Promise.all(requests);

  const mappedResults = results.flatMap((res) => res.results);

  return mappedResults;
}

export async function getMoviesGenres() {
  const res = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?language=en',
    options
  );
  const data = await res.json();

  return data.genres;
}

export async function getTvSeriesGenres() {
  const res = await fetch(
    'https://api.themoviedb.org/3/genre/tv/list?language=en',
    options
  );
  const data = await res.json();

  return data;
}

export async function getMovieDetailsById(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options
  );
  const data = await res.json();

  return data;
}

export async function getShowDetailsById(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
    options
  );
  const data = await res.json();

  return data;
}

export async function getRecommendationsById(id, type) {
  const res = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}/recommendations?language=en-US&page=1`,
    options
  );
  const data = await res.json();

  return data.results;
}

export async function getBySearch(searchVal) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${searchVal}&include_adult=false&language=en-US`,
    options
  );
  const data = await res.json();

  const fixedData = data.results.filter((val) => val.poster_path);

  return fixedData;
}
