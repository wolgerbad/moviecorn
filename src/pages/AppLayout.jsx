import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useEffect, useRef, useState } from 'react';

export default function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(function () {
    menuRef.current && !menuRef.current.contains;
  }, []);

  return (
    <div className="grid grid-cols-6 gap-2 px-4 py-2 overflow-hidden h-screen xs:max-lg:relative">
      <div className="col-start-1 col-span-full">
        <Navbar setIsMenuOpen={setIsMenuOpen} />
      </div>
      <div
        ref={menuRef}
        className={`${
          isMenuOpen
            ? 'xs:max-lg:absolute xs:max-lg:z-50 xs:max-lg:bottom-0 xs:max-lg:px-4 xs:max-lg:w-64 '
            : 'hidden'
        } lg:block lg:col-start-1 lg:col-span-1`}
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
