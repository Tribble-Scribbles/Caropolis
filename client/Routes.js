import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Home from './components/Home';
import SingleCar from './components/SingleCar';
import AllCars from './components/AllCars';
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path='/' exact component={LogIn} />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
            <Route exact path='/cars' component={AllCars} />
            <Route exact path="/cars/:id" component={SingleCar} />

          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
