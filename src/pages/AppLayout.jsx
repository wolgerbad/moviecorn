import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useEffect, useRef, useState } from 'react';

export default function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (!isMenuOpen) return;
      const target = e.target;
      const clickedToggle =
        typeof target.closest === 'function' && target.closest('.menu-toggle');
      if (clickedToggle) return;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setIsMenuOpen(false);
      }
    }

    function handleEsc(e) {
      if (e.key === 'Escape' && isMenuOpen) setIsMenuOpen(false);
    }

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isMenuOpen]);

  return (
    <div className="grid grid-cols-6 gap-2 lg:px-4 lg:py-2 overflow-hidden h-screen xs:max-lg:relative">
      <div className="col-start-1 col-span-full">
        <Navbar setIsMenuOpen={setIsMenuOpen} />
      </div>
      <div
        ref={menuRef}
        className={`lg:block lg:col-start-1 lg:col-span-1 xs:max-lg:absolute xs:max-lg:z-50 xs:max-lg:bottom-0 xs:max-lg:px-2 xs:max-lg:w-64 xs:max-lg:transform xs:max-lg:transition xs:max-lg:duration-200 xs:max-lg:ease-out xs:max-lg:shadow-lg ${
          isMenuOpen
            ? 'xs:max-lg:translate-x-0 xs:max-lg:opacity-100 xs:max-lg:pointer-events-auto xs:max-lg:visible'
            : 'xs:max-lg:-translate-x-full xs:max-lg:opacity-0 xs:max-lg:pointer-events-none xs:max-lg:invisible'
        }`}
      >
        <Sidebar />
      </div>

      <div
        className="col-start-1 lg:col-start-2 col-span-full h-[calc(100vh-75px)] overflow-scroll [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-yellow-100
         [&::-webkit-scrollbar-thumb]:bg-amber-800 overflow-x-hidden"
      >
        <Outlet />
      </div>
    </div>
  );
}
