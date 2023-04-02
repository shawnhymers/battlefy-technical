import React from 'react'
import { createRoot } from 'react-dom/client'
import LOL from './games/LOL'
const container = document.getElementById('app-root')!
const root = createRoot(container)
import {store} from './store/store';
import {Provider} from 'react-redux';
import './index.css';

root.render(
  <Provider store ={store}>
    <LOL></LOL>
  </Provider>


)
