import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import store from './store'

import {positions, transitions, Provider as Prov} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  timeout: 5000, 
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
}

ReactDOM.render(
   <Provider store={store}>
      <Prov template={AlertTemplate} {...options}>
        <App />
      </Prov>

   </Provider>,
   
  
  document.getElementById('root')
);
