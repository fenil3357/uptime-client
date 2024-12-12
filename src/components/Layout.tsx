import { Toaster } from 'react-hot-toast';
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
      <Toaster
        position="top-right"
        gutter={8}
        toastOptions={{
          style: {
            color: "#111827",
            fontWeight: "600",
            fontSize: "14px",
            border: "1px solid #F3F4F6",
            display: "flex",
            alignItems: "center",
            marginTop: '10px',
            marginRight: '10px'
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
