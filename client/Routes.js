import React, { Component } from 'react'
import { withRouter, Route, Switch, Redirect} from 'react-router-dom'
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Home from './components/Home';
import SingleCar from './components/SingleCar';
import AllCars from './components/AllCars';
import { connect } from 'react-redux';
import { me } from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {/* {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
          </Switch>
        ) : ( */}
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path='/' exact component={LogIn} />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
            <Route exact path='/cars' component={AllCars} />
            <Route exact path="/cars/:id" component={SingleCar} />

          </Switch>
        // )}
      </div>
    )
  }
}

const mapState = state => {
  return {
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


// Refactored hook version but it is missing withRouter implementation

// const Routes = () => {
//   // const isLoggedIn = useSelector((state) => {
//   //   return {
//   //     loginStatus: state.auth.loginStatus
//   //   }
//   // })

//   return (
//     <div>
//       {/* {isLoggedIn ? (
//         <Switch>
//           <Route path="/home" component={Home}/>
//           <Redirect to="/home" component={Home}/>
//         </Switch>
//       ) : ( */}
//         <Switch>
//           <Route exact path='/' exact component={Home} />
//           <Route exact path="/home" component={Home} />
//           <Route exact path="/login" component={LogIn} />
//           <Route exact path="/signup" component={SignUp} />
//           <Route exact path='/cars' component={AllCars} />
//           <Route exact path="/cars/:id" component={SingleCar} />
//         </Switch>
//       {/* )} */}
//     </div>
//   )
// }
// export default Routes;
