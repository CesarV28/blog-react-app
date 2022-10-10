
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore, useForm } from "../hooks"

export const Login = () => {

  const { onInputChange, formState } =  useForm({
    email: '',
    password: ''
  });

  const { startLogin } = useAuthStore();
  const { errorMessage, status } = useSelector( state => state.auth );

  const { email, password } = formState;

  const navigate = useNavigate();

  useEffect(() => {
    
    if( status === 'authenticated'){
      navigate('/blog/home');
    }

  }, [status])
  

  const onSubmit = ( event ) => {
      event.preventDefault();
      
      startLogin({ email, password });
  }

  return (
    <div className="auth">
      <h1 className="auth__title">Login</h1>
      <form onSubmit={ onSubmit } className="auth__form">
        <input 
          type="text" 
          className="auth__form-input" 
          placeholder="Email"
          name="email"
          value={ email }
          onChange={ onInputChange }
        />
        <input 
          type="password" 
          className="auth__form-input" 
          placeholder="Password"
          name="password"
          value={ password }
          onChange={ onInputChange }
        />
        <button type="submit" className="auth__form-button">Login</button>
        <p className="auth__form-p">{errorMessage}</p>
        <span className="auth__form-span">don't you have an acount? <Link to={'/auth/register'}>Register</Link></span>
      </form>
    </div>
  )
}
