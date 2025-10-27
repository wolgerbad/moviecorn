import { FaSearch } from 'react-icons/fa';
import { IoIosHome } from 'react-icons/io';
import { MdFavorite, MdLiveTv, MdMovie } from 'react-icons/md';
import { NavLink } from 'react-router';
import SearchInput from './SearchInput';

export default function Sidebar() {
  return (
    <nav className="h-[calc(100vh-80px)] text-yellow-100 bg-black/90 py-4">
      <ul className="flex flex-col gap-8 text-lg font-semibold py-2">
        <SearchInput type="side" />
        <NavLink
          to="/"
          className="flex items-center gap-2 px-4 py-2 border-l-4 border-transparent"
          style={({ isActive }) => ({
            borderLeft: isActive ? '4px solid' : '',
          })}
        >
          <IoIosHome />
          home
        </NavLink>
        <NavLink
          to="/movies"
          className="flex items-center gap-2 px-4 py-2 border-l-4 border-transparent"
          style={({ isActive }) => ({
            borderLeft: isActive ? '4px solid' : '',
          })}
        >
          <MdMovie />
          movies
        </NavLink>
        <NavLink
          to="/tvseries"
          className="flex items-center gap-2 px-4 py-2 border-l-4 border-transparent"
          style={({ isActive }) => ({
            borderLeft: isActive ? '4px solid' : '',
          })}
        >
          <MdLiveTv />
          tv series
        </NavLink>
        <NavLink
          to="/favorites"
          className="flex items-center gap-2 px-4 py-2 border-l-4 border-transparent"
          style={({ isActive }) => ({
            borderLeft: isActive ? '4px solid' : '',
          })}
        >
          <MdFavorite />
          favorites
        </NavLink>
      </ul>
    </nav>
  );
}
