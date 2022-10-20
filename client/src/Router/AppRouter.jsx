
import { Route, Routes } from 'react-router-dom';
import { AuthLayout, BlogLayout } from '../layout';


import { 
    Home, 
    Login, 
    Register, 
    Single, 
    Write 
} from '../pages';

export const AppRouter = () => {

  return (
    <Routes>
  
        <Route path='/auth' element={<AuthLayout/>}>
          <Route path='register' element={ <Register/> }/>
          <Route index element={ <Login/> }/>
          <Route path='login' element={ <Login/> }/>
        </Route>
        <Route path='/blog' element={<BlogLayout/>}>
            <Route index element={ <Home/> }/>
            <Route path='home' element={ <Home/> }/>
            <Route path='post/:id' element={ <Single/> }/>
            <Route path='write' element={ <Write/> }>
               <Route path=':id' element={ <Write/>}></Route> 
            </Route>
        </Route>
    </Routes>
  )
}
