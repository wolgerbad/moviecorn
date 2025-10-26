import { useQuery } from '@tanstack/react-query';
import { getMovies } from '../lib/helpers';
import { baseImageUrl } from '../components/Carousel';
import { Link } from 'react-router';

export default function Moviespage() {
  const {
    isPending,
    data: movies,
    isError,
  } = useQuery({
    queryKey: ['movies'],
    queryFn: getMovies,
    staleTime: Infinity,
  });

  if (isError) return <p>Something went wrong.</p>;

  if (isPending) return <p>Loading...</p>;

  console.log('movies:', movies);

  return (
    <div>
      <h1 className="ml-16 block mb-2 text-yellow-100 font-bold text-lg">
        all movies
      </h1>
      <div className="flex justify-center flex-wrap gap-8 text-yellow-100">
        {movies.map((movie) => {
          console.log(movie);

          return (
            <Link to={`/movies/${movie.id}`} className="w-40" key={movie.id}>
              <img
                className="h-60 w-full object-cover rounded-lg border-2 border-transparent hover:border-2 hover:brightness-75 hover:border-amber-500 cursor-pointer"
                src={`${baseImageUrl}/w500/${movie.poster_path}`}
              />
              <p className="text-sm text-center">{movie.title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
