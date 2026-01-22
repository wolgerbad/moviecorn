import { useQuery } from '@tanstack/react-query';
import { getActionMovies, getActionSeries, getComedyMovies, getComedySeries} from '../lib/helpers';
import Carousel from '../components/Carousel';
import Spinner from '../components/Spinner';

export default function Homepage() {
  const {data: actionMovies, error:actionMoviesError} = useQuery({
    queryKey: ['actionMovies'],
    queryFn: getActionMovies,
  })
  const {data: comedyMovies, error: comedyMoviesError} = useQuery({
    queryKey: ['comedyMovies'],
    queryFn: getComedyMovies,
  })
  const {data: actionSeries, error: actionSeriesError} = useQuery({
    queryKey: ['actionSeries'],
    queryFn: getActionSeries,
  })
  const {data: comedySeries, error:comedySeriesError} = useQuery({
    queryKey: ['comedySeries'],
    queryFn: getComedySeries,
  })

  return (
    <div className="p-4 flex flex-col gap-8">
      <div className="text-orange-100">
        <h1 className="text-xl font-bold mb-2">featured movies</h1>
        <Carousel items={actionMovies?.results} error={actionMoviesError} />
      </div>
      <div className="text-orange-100">
        <h1 className="text-xl font-bold mb-2">featured series</h1>
        <Carousel items={actionSeries?.results} error={actionSeriesError} />
      </div>
      <div className="text-orange-100">
        <h1 className="text-xl font-bold mb-2">featured comedy movies</h1>
        <Carousel items={comedyMovies?.results} error={comedyMoviesError} />
      </div>
      <div className="text-orange-100">
        <h1 className="text-xl font-bold mb-2">featured comedy series</h1>
        <Carousel items={comedySeries?.results} error={comedySeriesError} />
      </div>
    </div>
  );
}
