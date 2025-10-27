import { useQuery } from '@tanstack/react-query';
import { getTvSeries } from '../lib/helpers';
import { baseImageUrl } from '../components/Carousel';
import { Link } from 'react-router';
import Spinner from '../components/Spinner';

export default function TvSeriesPage() {
  const { isPending, data: series } = useQuery({
    queryKey: ['series'],
    queryFn: getTvSeries,
  });

  if (isPending) return <Spinner />;

  return (
    <div className="p-2 text-yellow-100 mb-8">
      <h1 className="font-bold text-lg mb-2">series</h1>
      <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
        {series.map((show) => (
          <Link to={`/series/${show.id}`}>
            <img
              src={`${baseImageUrl}/w500/${show.poster_path}`}
              className="w-full border-2 border-transparent hover:border-amber-500 hover:brightness-75 rounded-lg"
            />
            <h1 className="mt-1 text-sm text-center">{show.name}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
}
