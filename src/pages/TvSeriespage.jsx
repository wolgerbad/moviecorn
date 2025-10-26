import { useQuery } from '@tanstack/react-query';
import { getTvSeries } from '../lib/helpers';
import { baseImageUrl } from '../components/Carousel';

export default function TvSeriesPage() {
  const { isPending, data: series } = useQuery({
    queryKey: ['series'],
    queryFn: getTvSeries,
  });

  if (isPending) return <p>loading...</p>;

  console.log('dd:', series);

  return (
    <div className="p-2 text-yellow-100">
      <h1 className="font-semibold text-lg">all series</h1>
      <div className="flex flex-wrap gap-4">
        {series.map((show) => (
          <div className="w-40">
            <img
              src={`${baseImageUrl}/w500/${show.poster_path}`}
              className="w-full"
            />
            <h1 className="text-center">{show.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
