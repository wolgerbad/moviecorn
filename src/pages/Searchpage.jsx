import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router';
import { getBySearch } from '../lib/helpers';
import { baseImageUrl } from '../components/Carousel';
import { useEffect } from 'react';
import Spinner from '../components/Spinner';

export default function Searchpage() {
  const [searchParams] = useSearchParams();
  const searchedValue = searchParams.get('src');

  const queryClient = useQueryClient();

  const { isPending, data } = useQuery({
    queryKey: ['search'],
    queryFn: async () => await getBySearch(searchedValue),
  });

  useEffect(
    function () {
      queryClient.invalidateQueries(['search']);
    },
    [searchedValue, queryClient]
  );

  if (isPending) return <Spinner />;

  if (!data.length)
    return (
      <h1 className="font-semibold font-lg text-yellow-100">
        No movies found for {searchedValue}, try searching something else!
      </h1>
    );

  return (
    <div className="p-2 text-yellow-100">
      <h1 className="font-bold text-lg mb-4">
        Results shown for:{' '}
        <span className="italic underline tracking-wider">{searchedValue}</span>
      </h1>
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
        {data.map((val) => (
          <Link to={`/${val.first_air_date ? 'series' : 'movies'}/${val.id}`}>
            <img
              src={`${baseImageUrl}/w500/${val.poster_path}`}
              className="rounded-lg border-2 border-transparent hover:brightness-75 hover:border-amber-500 "
            />
            <h1 className="mt-1 text-sm text-center">
              {val.title || val.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
}
