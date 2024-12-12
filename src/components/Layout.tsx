import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      {/* Persistent Navbar */}
      <Navbar />
      {/* Dynamic content for each route */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
