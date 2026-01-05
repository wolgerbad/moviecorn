import { Link } from 'react-router';
import SearchInput from './SearchInput';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function Navbar({ setIsMenuOpen }) {
  function handleMenu() {
    setIsMenuOpen((menu) => !menu);
  }
  return (
    <nav className="flex justify-between items-center text-xl tracking-wide font-bold bg-black/60 text-yellow-100 px-4 lg:px-8 py-4">
      <div className="flex gap-2 items-center">
        <GiHamburgerMenu
          className="h-10 lg:hidden cursor-pointer menu-toggle"
          onClick={handleMenu}
        />

        <Link to="/" className="h-8">
          moviecorn
        </Link>
      </div>

      <SearchInput type="nav" />
    </nav>
  );
}
