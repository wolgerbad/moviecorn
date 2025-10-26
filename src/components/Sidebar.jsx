import { IoIosHome } from 'react-icons/io';
import { MdFavorite, MdLiveTv, MdMovie } from 'react-icons/md';
import { NavLink } from 'react-router';

export default function Sidebar() {
  return (
    <nav className="h-[calc(100vh-80px)] text-yellow-100 bg-black/60 py-4">
      <ul className="flex flex-col gap-8 text-lg font-semibold py-2">
        <NavLink
          to="/"
          className="flex items-center gap-2 px-4 py-2"
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#733e0a' : '',
          })}
        >
          <IoIosHome />
          home
        </NavLink>
        <NavLink
          to="/movies"
          className="flex items-center gap-2 px-4 py-2"
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#733e0a' : '',
          })}
        >
          <MdMovie />
          movies
        </NavLink>
        <NavLink
          to="/tvseries"
          className="flex items-center gap-2 px-4 py-2"
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#733e0a' : '',
          })}
        >
          <MdLiveTv />
          tv series
        </NavLink>
        <NavLink
          to="/favorites"
          className="flex items-center gap-2 px-4 py-2"
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#733e0a' : '',
          })}
        >
          <MdFavorite />
          favorites
        </NavLink>
      </ul>
    </nav>
  );
}
