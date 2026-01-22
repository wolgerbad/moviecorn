import { useInfiniteQuery } from '@tanstack/react-query';
import { getTvSeries } from '../lib/helpers';
import { baseImageUrl } from '../components/Carousel';
import { Link } from 'react-router';
import Spinner from '../components/Spinner';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export default function TvSeriesPage() {
 const {data, isPending, error, isFetchingNextPage, fetchNextPage} =  useInfiniteQuery({
    queryKey: ['series'],
    queryFn: getTvSeries,
    getNextPageParam: (lastPage) => lastPage.page + 1,
    initialPageParam: 1
  })

 const {ref, inView} = useInView()

  useEffect(function() {
    if(inView) fetchNextPage()
  }, [inView, fetchNextPage])

  if(error) return <p className='text-xl text-white-600 font-semibold'>Something went wrong</p>
  if (isPending) return <Spinner />;

  return (
    <div className="p-2 text-yellow-100 mb-8">
      <h1 className="font-bold text-lg mb-2">series</h1>
      <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
        {data.pages.map((page) => (
          page.results.map(show => <Link to={`/series/${show.id}`}>
            <img
              loading="lazy"
              onLoad={(e) => e.currentTarget.classList.add('opacity-100')}
              src={`${baseImageUrl}/w500/${show.poster_path}`}
              className="w-full border-2 border-transparent hover:border-amber-500 hover:brightness-75 rounded-lg transition-opacity duration-500 opacity-0"
            />
            <h1 className="mt-1 text-sm text-center">{show.name}</h1>
          </Link> )
        ))}
        <div ref={ref}>{isFetchingNextPage && 'Loading...'}</div>
      </div>
    </div>
  );
}
