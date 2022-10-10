import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { useAuthStore, useForm } from "../hooks"

export const Register = () => {

  const { onInputChange, formState } =  useForm({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { startRegister, startLogout } = useAuthStore();
  const { errorMessage } = useSelector( state => state.auth );

  const { 
      name,
      email,
      password,
      password2 } = formState;

  const onSubmit = ( event ) => {
      event.preventDefault();

      if( password !== password2 ){
          startLogout('¡Ups!, parece que hay un error, las contraseñas no coinciden');
          return;
      }

      //register start
      startRegister({ name,email, password });
  }

  return (
    <div className="auth">
      <h1 className="auth__title">Login</h1>
      <form onSubmit={onSubmit} className="auth__form">
        <input 
          type="text" 
          className="auth__form-input" 
          placeholder="Your name"
          name="name"
          value={ name }
          onChange={ onInputChange }
        />
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
        <input 
          type="password" 
          className="auth__form-input" 
          placeholder="Repeat password"
          name="password2"
          value={ password2 }
          onChange={ onInputChange }
        />
        <button type="submit" className="auth__form-button">Login</button>
        <p className="auth__form-p">{ errorMessage }</p>
        <span className="auth__form-span">¿No tienes una cuenta? <Link to={'/auth/register'}>Registrar</Link></span>
      </form>
    </div>
  )
}
