import { useInfiniteQuery } from '@tanstack/react-query';
import { getMovies } from '../lib/helpers';
import { baseImageUrl } from '../components/Carousel';
import { Link } from 'react-router';
import Spinner from '../components/Spinner';
import { useEffect } from 'react';
import {useInView} from 'react-intersection-observer'

export default function Moviespage() {

  const {ref, inView} = useInView()

 const {data, error: isError, isPending, fetchNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey: ['movies'],
    queryFn: getMovies,
    getNextPageParam: (lastPage) => lastPage.page + 1,
    initialPageParam: 1
  })

  useEffect(function() {
    if(inView) fetchNextPage()
  }, [inView, fetchNextPage])

  if (isError) return <p>Something went wrong.</p>;

  if (isPending) return <Spinner />;


  return (
    <div className="p-2 mb-8">
      <h1 className="block mb-2 text-yellow-100 font-bold text-lg">movies</h1>
      <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 text-yellow-100">
        {data.pages.map((page) => (
         page.results.map(movie => <Link to={`/movies/${movie.id}`} key={movie.id}>
            <img
              loading="lazy"
              onLoad={(e) => e.currentTarget.classList.add('opacity-100')}
              className="w-full rounded-lg border-2 border-transparent hover:border-2 hover:brightness-75 hover:border-amber-500 cursor-pointer transition-opacity duration-500 opacity-0"
              src={`${baseImageUrl}/w500/${movie.poster_path}`}
            />
            <h1 className="mt-1 text-sm text-center">{movie.title}</h1>
          </Link> )
        ))}
        <div ref={ref}>{isFetchingNextPage && 'Loading...'}</div>
      </div>
    </div>
  );
}
