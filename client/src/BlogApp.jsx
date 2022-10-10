import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./Router/AppRouter"

import { store } from "./store";
import { Provider } from 'react-redux';

import './styles.scss';


export const BlogApp = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </Provider>
  )
}
