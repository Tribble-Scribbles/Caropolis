import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './App'
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <SnackbarProvider maxSnack={3} autoHideDuration={1000}>
        <App />
      </SnackbarProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
)
