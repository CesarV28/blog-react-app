import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '../components';

export const BlogLayout = () => {
 
  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}
