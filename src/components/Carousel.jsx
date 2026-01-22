import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { MdFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import { Link } from 'react-router';
import CarouselItem from './CarouselItem';

export const baseImageUrl = 'https://image.tmdb.org/t/p';

export default function Carousel({ items, error }) {

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000 }),
  ]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();


  if(error) return <p>Something went wrong while retrieving data. Refresh the page; and if it is still not working, please try again later.</p>

  return (
    <div className="relative">
      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 p-2 rounded-full cursor-pointer"
      >
        <BiChevronLeft className="text-white w-4 h-4 md:w-6 md:h-6" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 p-2 rounded-full cursor-pointer"
      >
        <BiChevronRight className="text-white w-4 h-4 md:w-6 md:h-6" />
      </button>
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex gap-1 md:gap-3">
          {items?.map((item) => (
            <CarouselItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
