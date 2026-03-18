import { Toaster } from 'react-hot-toast';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      <Navbar />
      <main className={`flex-1 ${isHome ? '' : 'pt-20 px-4 pb-6'}`}>
        <Outlet />
      </main>
      <Toaster
        position="top-center"
        gutter={8}
        toastOptions={{
          style: {
            color: '#111827',
            fontWeight: '600',
            fontSize: '14px',
            border: '1px solid #F3F4F6',
            display: 'flex',
            alignItems: 'center',
            marginTop: '20px',
          },
          success: {
            duration: 3000,
            style: {},
          },
        }}
      />
    </div>
  );
};

export default Layout;
