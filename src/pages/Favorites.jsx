import { useSelector } from 'react-redux';
import { baseImageUrl } from '../components/Carousel';
import { Link } from 'react-router';

export default function Favorites() {
  const { movies, series } = useSelector((state) => state.favorites);

  return (
    <div className="p-4 flex flex-col gap-8">
      <div>
        <h1 className="mb-4">Favorite Movies</h1>
        <div className="text-yellow-100 flex gap-8">
          {movies.map((movie) => (
            <Link to={`/movies/${movie.id}`} className="w-40">
              <img
                src={`${baseImageUrl}/w500/${movie.poster_path}`}
                className="h-60 w-full border-2 border-transparent hover:border-amber-500 hover:brightness-75 rounded-lg"
              />
              <h1 className="text-center">{movie.title}</h1>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h1 className="mb-4">Favorite Series</h1>
        <div className="text-yellow-100 flex gap-8">
          {series.map((show) => (
            <Link to={`/series/${show.id}`} className="w-40">
              <img
                src={`${baseImageUrl}/w500/${show.poster_path}`}
                className="h-60 w-full"
              />
              <h1 className="text-center">{show.title || show.name} </h1>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
