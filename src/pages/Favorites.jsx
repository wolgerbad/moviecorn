import { useSelector } from 'react-redux';
import Carousel from '../components/Carousel';

export default function Favorites() {
  const { movies, series } = useSelector((state) => state.favorites);

  return (
    <div className="p-4 flex flex-col gap-8">
      <div>
        <h1 className="mb-4 font-semibold text-lg">favorite movies</h1>
        {movies.length ? (
          <Carousel items={movies} />
        ) : (
          <p>No favorite movie found.</p>
        )}
      </div>
      <div>
        <h1 className="mb-4 font-semibold text-lg">favorite series</h1>
        {series.length ? (
          <Carousel items={series} />
        ) : (
          <p>No favorite show found.</p>
        )}
      </div>
    </div>
  );
}
