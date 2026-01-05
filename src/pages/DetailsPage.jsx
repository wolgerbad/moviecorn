import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import {
  getMovieDetailsById,
  getRecommendationsById,
  getShowDetailsById,
} from '../lib/helpers';
import Carousel, { baseImageUrl } from '../components/Carousel';
import { format } from 'date-fns';
import {
  MdDateRange,
  MdFavoriteBorder,
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
  MdStar,
  MdTimer,
} from 'react-icons/md';
import { HiOutlineLink } from 'react-icons/hi';

import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../store/favoritesSlice';
import { useEffect } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import Spinner from '../components/Spinner';

export default function DetailsPage({ type }) {
  const isMovie = type === 'movie';
  const { id } = useParams();
  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites);

  const {
    isPending: isDetailsLoading,
    data,
    isRefetching,
  } = useQuery({
    queryKey: [`${isMovie ? 'movieDetails' : 'showDetails'}`],
    queryFn: async () =>
      isMovie ? await getMovieDetailsById(+id) : getShowDetailsById(+id),
  });

  const {
    isPending: isRecommendationsLoading,
    isRefetching: isRecommendationsRefetching,
    data: recommendations,
  } = useQuery({
    queryKey: ['recommendations'],
    queryFn: async () => getRecommendationsById(+id, isMovie ? 'movie' : 'tv'),
  });

  useEffect(
    function () {
      queryClient.invalidateQueries([
        `${isMovie ? 'movieDetails' : 'showDetails'}`,
      ]);
    },
    [isMovie, id, queryClient]
  );

  if (
    isDetailsLoading ||
    isRecommendationsLoading ||
    isRefetching ||
    isRecommendationsRefetching
  )
    return <Spinner />;

  const {
    poster_path,
    title,
    name,
    vote_average: rating,
    overview,
    release_date: releaseDate,
    first_air_date: firstAirDate,
    genres,
    runtime,
    number_of_episodes: numOfEpisodes,
    imdb_id,
    homepage,
  } = data;

  const isFavorite = isMovie
    ? favorites?.movies?.some((favorite) => favorite?.id === data.id)
    : favorites?.series?.some((favorite) => favorite?.id === data.id);

  const notify = () => {
    isFavorite
      ? toast('Removed from favorites!')
      : toast('Added to favorites successfully');
  };

  const formattedReleaseDate = format(
    releaseDate || firstAirDate,
    'MM / yyyy '
  );

  function handleFavorite() {
    if (isFavorite) {
      dispatch(remove({ id: +id, isMovie }));
    } else dispatch(add({ item: data, isMovie }));
  }

  return (
    <div className="px-8 py-4 sm:pb-8">
      <div className="grid grid-cols-8 gap-8 relative">
        <div className="col-start-1 col-span-full md:col-start-1 md:col-span-2">
          <img
            loading="lazy"
            src={`${baseImageUrl}/w500/${poster_path}`}
            onLoad={(e) => e.currentTarget.classList.add('opacity-100')}
            className="max-h-96 w-full object-center transition-opacity duration-500 opacity-0"
          />
        </div>
        <div className="col-start-1 col-span-full md:col-start-3 md:col-span-4 flex flex-col gap-8 max-h-96 items-start mb-16">
          <div className="w-full">
            <h1 className="text-xl font-bold mb-4">{title || name}</h1>
            <div className="w-full flex xs:max-md:justify-between sm:gap-4 font-semibold tracking-wide">
              <p className="flex items-center gap-1 text-xs sm:text-sm">
                <span>
                  <MdDateRange />
                </span>
                <span>{formattedReleaseDate}</span>
              </p>

              <p className="flex items-center gap-1 text-xs sm:text-sm">
                <span>
                  <MdTimer />
                </span>
                <span>
                  {runtime || numOfEpisodes} {isMovie ? 'min' : 'episodes'}
                </span>
              </p>
              <p className="flex items-center gap-1 text-xs sm:text-sm">
                <span>
                  <MdStar />
                </span>
                {rating.toFixed(2)} / 10
              </p>
            </div>
          </div>
          <a
            href={homepage ? homepage : `https://www.imdb.com/title/${imdb_id}`}
            target="_blank"
            className=" flex gap-2 items-center bg-gray-800 rounded-md  uppercase text-yellow-400 px-4 py-2 border-2 border-yellow-400 hover:bg-gray-900 cursor-pointer"
          >
            <span>
              <HiOutlineLink />
            </span>
            Website
          </a>
          <p>{overview}</p>
          <div className="hidden sm:flex gap-4 items-center">
            <span className="font-semibold">Genre:</span>
            {genres.map((genre) => (
              <span className="border-2 border-yellow-50 px-2 py-1 rounded-full cursor-context-menu hover:border-yellow-200">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => {
            handleFavorite();
            notify();
          }}
          className="absolute top-0 right-0 cursor-pointer text-amber bg-yellow-700 hover:brightness-125 text-white overflow-hidden z-50 border-red-500 py-2 px-1 rounded-md"
        >
          {isFavorite ? (
            <MdOutlineFavorite className="text-4xl" />
          ) : (
            <MdFavoriteBorder className="text-4xl" />
          )}
        </button>
      </div>
      <div>
        {!recommendations ? (
          <p>No recommendations found.</p>
        ) : (
          <>
            <h1 className="font-semibold text-lg uppercase italic mb-2">
              {isMovie ? 'Movies' : 'Tv Series'} similar to {title || name}
            </h1>
            <Carousel items={recommendations} />
          </>
        )}
      </div>

      <ToastContainer
        position="top-center"
        className="translate-y-4"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
}
