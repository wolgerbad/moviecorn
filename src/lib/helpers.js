const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTY2ZmEyNzM2OGZhY2E1MzBiMjU3YzM1Y2E4ZWU5YiIsIm5iZiI6MTc2MTMwMTUyMy4xMTgsInN1YiI6IjY4ZmI1NDEzNTMyZjk3YTllNjAxODg1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-sjyBXTr9RrvCcH7cWIgtLFfuzVdiA6y5tO2hy_suwA',
  },
};

export async function getTvSeries({pageParam}) {  
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${pageParam}&sort_by=vote_count.desc`,
    options
  )
  const result = await res.json()
  return result
}

export async function getMovies({pageParam})  {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageParam}&sort_by=popularity.desc`,
    options
  )  
  const result = await res.json()
  return result
}

export async function getActionMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28`,
    options
  )
  const result = await res.json()
  
  return result
}
export async function getComedyMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35`,
    options
  )
  const result = await res.json()
  
  return result
}
export async function getActionSeries() {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=vote_count.desc&with_genres=10759`,
    options
  )
  const result = await res.json()
  return result
}
export async function getComedySeries() {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=vote_count.desc&with_genres=35`,
    options
  )
  const result = await res.json()
  return result  
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

export async function getBySearch({pageParam, searchedValue}) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${searchedValue}&include_adult=false&language=en-US&page=${pageParam}`,
    options
  );
  const data = await res.json();

  const filteredResults = {page: data.page, results: data.results.filter(result => result.backdrop_path)}

  return filteredResults;
}
