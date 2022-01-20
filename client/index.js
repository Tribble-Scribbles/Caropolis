import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './App'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

const publishableKey = 'pk_test_51KJR7qK0FFw79ydDlhCcSmMc6ByOEGcujr2ycFE5IYY3nuqTapPXXl8Q9flkdhMeIbPpK3kr9r9xKN86cODrs6Ef00yysGz1Jb'
const stripePromise = loadStripe(publishableKey)
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Elements stripe={stripePromise}>
        <SnackbarProvider maxSnack={3} autoHideDuration={1000}>
          <App />
        </SnackbarProvider>
      </Elements>
    </Router>
  </Provider>,
  document.getElementById('app')
)
