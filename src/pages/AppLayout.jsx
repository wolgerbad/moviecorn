import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function AppLayout() {
  return (
    <div className="grid grid-cols-6 gap-2 px-4 py-2 overflow-hidden h-screen">
      <div className="col-start-1 col-span-full">
        <Navbar />
      </div>
      <div className="hidden lg:block col-start-1 col-span-1">
        <Sidebar />
      </div>
      <div className="col-start-1 lg:col-start-2 col-span-full h-[calc(100vh-75px)] overflow-scroll overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
}
