import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../hooks';
import '../styles.scss';

export const Navbar = () => {

  const navigate = useNavigate();
  const { user, status } = useSelector( state => state.auth);
  const { startLogout } = useAuthStore();

  const onLogin = () => {
      navigate('/auth/login');
  }

  const onLogout = () => {
      startLogout();
  }

  return (
    <div className="navbar">
        <div className="navbar__logo"><Link to={'/blog/home'}>Cesar</Link></div>
        <header className="navbar__header">
          <Link to={'/blog/?category=art'} className="navbar__header-link">art</Link>
          <Link to={'/blog/?category=science'} className="navbar__header-link">science</Link>
          <Link to={'/blog/?category=technology'} className="navbar__header-link">technology</Link>
          <Link to={'/blog/?category=cinema'} className="navbar__header-link">cinema</Link>
          <Link to={'/blog/?category=desing'} className="navbar__header-link">desing</Link>
          <Link to={'/blog/?category=food'} className="navbar__header-link">food</Link>
          <span className="navbar__header-span">{ user && user?.username}</span>
          {
            status === 'not-authenticated'
            ? <span onClick={ onLogin } className="navbar__header-span">Login</span>
            : <span onClick={ onLogout } className="navbar__header-span">Logout</span>
          }
          <span className="navbar__header-span">
            <Link className="header__span-link header__write" to={'write'}>Write</Link>
          </span>
        </header>
    </div>
  )
}
