import { baseImageUrl } from './Carousel';
import { Link, Links } from 'react-router';

export default function CarouselItem({ item }) {
  const movieOrSeries = item.first_air_date ? 'series' : 'movies';

  return (
    <div className="embla__slide flex-[0_0_auto] w-40 mr-3 shrink-0 select-none relative">
      <Link to={`/${movieOrSeries}/${item.id}`}>
        <img
          src={`${baseImageUrl}/w500${item.poster_path}`}
          alt={item.title}
          className="rounded-lg w-full h-60 object-cover border-2 border-transparent hover:brightness-75 hover:border-amber-500 cursor-pointer"
        />
        <p className="mt-1 text-sm text-center">{item.title || item.name}</p>
      </Link>
    </div>
  );
}
