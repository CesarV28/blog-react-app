import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '../components';
import { useAuthStore } from '../hooks';

export const BlogLayout = () => {
 
  const { startCheckAuthToken } = useAuthStore();

  useEffect(() => {
      startCheckAuthToken();
  }, []);

  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}
