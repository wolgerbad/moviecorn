import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { getBySearch } from '../lib/helpers';
import { baseImageUrl } from '../components/Carousel';
import { useEffect } from 'react';

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

  if (isPending) return <p>Loading...</p>;

  if (!data.length)
    return (
      <h1 className="font-semibold font-lg text-yellow-100">
        No movies found for {searchedValue}, try searching something else!
      </h1>
    );

  return (
    <div className="text-yellow-100">
      <h1 className="font-semibold text-lg mb-4">
        Results for: {searchedValue}
      </h1>
      <div className="flex flex-wrap gap-4">
        {data.map((val) => (
          <div className="w-40">
            <img src={`${baseImageUrl}/w500/${val.poster_path}`} />
            <h1 className="text-center">{val.title || val.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
