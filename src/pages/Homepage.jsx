import { useQuery } from '@tanstack/react-query';
import { getMovies, getTvSeries } from '../lib/helpers';
import Carousel from '../components/Carousel';

export default function Homepage() {
  const { isPending, data: movies } = useQuery({
    queryKey: ['movies'],
    queryFn: getMovies,
    staleTime: Infinity,
  });

  const { isPending: seriesPending, data: series } = useQuery({
    queryKey: ['series'],
    queryFn: getTvSeries,
    staleTime: Infinity,
  });

  if (isPending || seriesPending) return <p>Loading...</p>;

  const actionMovies = movies.filter((movie) => movie.genre_ids.includes(28));
  const comedyMovies = movies?.filter((movie) => movie.genre_ids.includes(35));
  const actionSeries = series.filter((show) => show.genre_ids.includes(10759));
  const comedySeries = series.filter((show) => show.genre_ids.includes(35));

  return (
    <div className="p-4 flex flex-col gap-8">
      <div className="text-orange-100">
        <h1 className="text-xl font-bold mb-2">featured movies</h1>
        <Carousel items={actionMovies} />
      </div>

      <div className="text-orange-100">
        <h1 className="text-xl font-bold mb-2">featured series</h1>
        <Carousel items={actionSeries} />
      </div>
      <div className="text-orange-100">
        <h1 className="text-xl font-bold mb-2">featured comedy movies</h1>
        <Carousel items={comedyMovies} />
      </div>
      <div className="text-orange-100">
        <h1 className="text-xl font-bold mb-2">featured comedy series</h1>
        <Carousel items={comedySeries} />
      </div>
    </div>
  );
}
