import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router';

export default function SearchInput() {
  const [searchValue, setSearchValue] = useState('');

  let navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (!searchValue) return;
    navigate(`/search?src=${searchValue}`);
  }

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="border-2 border-yellow-100 text-yellow-100 outline-none w-60 focus:w-sm transition-all ease px-4 py-1 rounded-full"
        placeholder="search..."
      />
      <button className="-ml-8 cursor-pointer" type="submit">
        <FaSearch />
      </button>
    </form>
  );
}
