import { Toaster } from 'react-hot-toast';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-950 text-white flex flex-col">
      {/* Persistent Navbar */}
      <Navbar />

      {/* Dynamic Content for Each Route */}
      <main className="flex-1 px-4 py-6">
        <Outlet />
      </main>

      {/* Toast Notifications */}
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
}

export default Layout;