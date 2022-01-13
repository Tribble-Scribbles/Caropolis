import React from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Home from './components/Home';
import SingleCar from './components/SingleCar';
import AllCars from './components/AllCars';

const Routes = () => {
  // const isLoggedIn = useSelector((state) => {
  //   return {
  //     loginStatus: state.auth.loginStatus
  //   }
  // })

  return (
    <div>
      {/* {isLoggedIn ? (
        <Switch>
          <Route path="/home" component={Home}/>
          <Redirect to="/home" component={Home}/>
        </Switch>
      ) : ( */}
        <Switch>
          <Route exact path='/' exact component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path='/cars' component={AllCars} />
          <Route exact path="/cars/:id" component={SingleCar} />
        </Switch>
      {/* )} */}
    </div>
  )
}
export default Routes;
