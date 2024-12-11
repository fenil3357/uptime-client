import { Navbar } from './Navbar';
// import { Routes, Route, Outlet } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      {/* <Outlet /> */}
    </div>
  );
}
