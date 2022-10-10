import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export const AuthLayout = () => {
 
  const { status } = useSelector( state => state.auth );
  
  if( status === 'authenticated'){
      return <Navigate to={'/blog/home'} />
  }

  return (
    <>
        <Outlet/>
    </>
  )
}
