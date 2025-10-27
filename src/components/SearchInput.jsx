import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router';

export default function SearchInput({ type }) {
  const [searchValue, setSearchValue] = useState('');

  let navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (!searchValue) return;
    navigate(`/search?src=${searchValue}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className={`${type === 'nav' ? 'hidden lg:block' : 'lg:hidden'}`}
    >
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={`${
          type === 'side'
            ? 'pl-8 border-b w-56'
            : 'border-2 w-60 focus:w-sm transition-all ease px-4 py-1'
        } rounded-full outline-0 border-yellow-100 text-yellow-100`}
        placeholder="search..."
      />
      <button className="-ml-8 cursor-pointer" type="submit">
        <FaSearch />
      </button>
    </form>
  );
}
