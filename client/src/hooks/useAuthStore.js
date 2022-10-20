import { useDispatch, useSelector } from "react-redux"
import blogApi from "../api/blogApi";

import { clearErrorMessage, onChecking, onLogout, onLogin, onRegister } from "../store";



export const useAuthStore = () => {

    const { 
        status, 
        user, 
        errorMessage,
    } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async({ email, password}) => {
        
        dispatch( onChecking() )

        try {

            const { data } = await blogApi.post('auth/login', {email, password});
            
            const { token, user } = data;

            localStorage.setItem('x-token', token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ username: user.username, id: user.id, img: user.img }));

        } catch (error) {
            dispatch( onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const startRegister = async({ name, email, password }) => {
        dispatch( onChecking() );

        try {
            
            await blogApi.post('auth/register', { username: name, email, password });
            dispatch( onRegister());

        } catch (error) {
            dispatch( onLogout( error.response.data?.msg || 'Error al registrar.'));
            console.log({error})
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 3000);
        }
    }

    const startCheckAuthToken = async() => {

        const token = localStorage.getItem('x-token');
 
        if( !!!token ){
            return dispatch( onLogout() );
        }

        try {
            const { data } = await blogApi.get('/auth/renew');
            localStorage.setItem( 'x-token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ username: data.username, uid: data.uid }));
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout());
        }
    }

    const startLogout = ( message = '' ) => {
        localStorage.clear();
        dispatch( onLogout(message));
    }


    return {
        // Properties
        status, 
        user, 
        errorMessage,

        // Methos
        startLogin,
        startRegister,
        startCheckAuthToken,
        startLogout,
    }
}              