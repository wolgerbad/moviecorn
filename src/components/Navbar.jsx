import { Link } from 'react-router';
import SearchInput from './SearchInput';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center text-xl tracking-wide font-bold bg-black/60 text-yellow-100 px-8 py-4">
      <Link to="/">moviecorn</Link>
      <SearchInput />
    </nav>
  );
}
