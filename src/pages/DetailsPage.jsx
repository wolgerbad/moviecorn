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
  console.log('favorites:', favorites);
  console.log('isFavorite:', isFavorite);

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
    <div className="px-8 py-4 pb-64">
      <div className="grid grid-cols-8 gap-8 relative">
        <div className="col-start-1 col-span-full md:col-start-1 md:col-span-2">
          <img
            src={`${baseImageUrl}/w500/${poster_path}`}
            className="max-h-96 w-full object-cover"
          />
        </div>
        <div className="col-start-1 col-span-full md:col-start-3 md:col-span-4 flex flex-col gap-8 max-h-96 items-start">
          <div>
            <h1 className="text-xl font-bold mb-4">{title || name}</h1>
            <div className="flex gap-8 font-semibold tracking-wide">
              <p className="flex items-center gap-1">
                <span>
                  <MdDateRange />
                </span>
                <span>{formattedReleaseDate}</span>
              </p>

              <p className="flex items-center gap-1">
                <span>
                  <MdTimer />
                </span>
                <span>
                  {runtime || numOfEpisodes} {isMovie ? 'min' : 'episodes'}
                </span>
              </p>
              <p className="flex items-center gap-1">
                <span>
                  <MdStar />
                </span>
                {rating.toFixed(2)} / 10
              </p>
            </div>
          </div>
          <a
            href={`https://www.imdb.com/title/${imdb_id || homepage}`}
            target="_blank"
            className=" bg-gray-800 rounded-md font-semibold uppercase text-yellow-400 px-4 py-2 border-2 border-yellow-400 hover:bg-gray-900 cursor-pointer"
          >
            {isMovie ? 'imdB page' : 'show page'}
          </a>
          <p className="">{overview}</p>
          <div className="flex gap-4 items-center">
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
      <div className="mt-16">
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
