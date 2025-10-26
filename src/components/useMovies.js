import { useQuery } from '@tanstack/react-query';
import { getMovies } from '../lib/helpers';

export default function useMovies() {
  const { isPending, data } = useQuery({
    queryKey: ['movies'],
    queryFn: getMovies,
  });

  const actionMovies = data?.filter((movie) => movie.genre_ids.includes(28));
  const comedyMovies = data?.filter((movie) => movie.genre_ids.includes(35));
  const dramaMovies = data?.filter((movie) => movie.genre_ids.includes(18));
  const romanceMovies = data?.filter((movie) =>
    movie.genre_ids.includes(10749)
  );

  return {
    allMovies: data,
    actionMovies,
    comedyMovies,
    dramaMovies,
    romanceMovies,
    isMoviesLoading: isPending,
  };
}
