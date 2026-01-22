import { useInfiniteQuery} from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router';
import { getBySearch } from '../lib/helpers';
import { baseImageUrl } from '../components/Carousel';
import { useEffect } from 'react';
import {useInView} from 'react-intersection-observer'
import Spinner from '../components/Spinner';

export default function Searchpage() {
  const [searchParams] = useSearchParams();
  const searchedValue = searchParams.get('src');

 const {ref, inView} =  useInView()

  const { data, isPending, error, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['search', searchedValue],
    queryFn: ({pageParam = 1, queryKey}) => {
      const [_, searchedValue] = queryKey
      return getBySearch({pageParam, searchedValue})
    },
    getNextPageParam: (lastPage) => lastPage.page + 1,
    initialPageParam: 1
  });

  useEffect(function() {
    if(inView) fetchNextPage()
  }, [inView, fetchNextPage])

  if(error) return <p className='text-white text-xl'>Something went wrong.</p>
  if (isPending) return <Spinner />;

  if (!data.pages[0].results.length)
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
        {data.pages.map((page) => ( 
          page.results.map(searchedItem => <Link key={searchedItem.id} to={`/${searchedItem.first_air_date ? 'series' : 'movies'}/${searchedItem.id}`}>
          <img
            loading="lazy"
            onLoad={(e) => e.currentTarget.classList.add('opacity-100')}
            src={`${baseImageUrl}/w500/${searchedItem.poster_path}`}
            className="rounded-lg border-2 border-transparent hover:brightness-75 hover:border-amber-500 transition-opacity duration-500 opacity-0 "
          />
          <h1 className="mt-1 text-sm text-center">
            {searchedItem.title || searchedItem.name}
          </h1>
        </Link> ) 
        ))}
        <div className='-mt-2' ref={ref}>{hasNextPage && isFetchingNextPage && 'Loading...'}</div>
      </div>
    </div>
  );
}
