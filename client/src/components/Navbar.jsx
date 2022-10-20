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
        <div className="navbar__logo">
          <Link to={'/blog/home'}>
              <img className='navbar__logo-img' src="https://www.logolynx.com/images/logolynx/36/362087235008be84086f892df697f50d.png" alt="" />
          </Link>
        </div>
        <header className="navbar__header">
          <Link to={'/blog/home/?category=art'} className="navbar__header-link">art</Link>
          <Link to={'/blog/home/?category=science'} className="navbar__header-link">science</Link>
          <Link to={'/blog/home/?category=technology'} className="navbar__header-link">technology</Link>
          <Link to={'/blog/home/?category=cinema'} className="navbar__header-link">cinema</Link>
          <Link to={'/blog/home/?category=desing'} className="navbar__header-link">desing</Link>
          <Link to={'/blog/home/?category=food'} className="navbar__header-link">food</Link>
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
