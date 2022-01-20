import React, { Component } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import SingleCar from "./components/SingleCar";
import AllCars from "./components/AllCars";
import UserProfile from "./components/UserProfile";
import SuccessPayment from "./components/SuccessPayment";
import FailedPayment from "./components/FailedPayment";
import { connect } from "react-redux";
import { me } from "./store";
import CreateCar from "./components/CreateCar";
import EditCar from "./components/EditCar";

import Cart from "./components/Cart";

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/home" component={Home} />
          <Route exact path="/" exact component={LogIn} />
          <Route path="/login" component={LogIn} />
          <Route path="/signup" component={SignUp} />
          <Route exact path="/cars" component={AllCars} />
          <Route exact path="/cars/:id" component={SingleCar} />
          <Route exact path="/account" component={UserProfile} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/success" component={SuccessPayment} />
          <Route exact path="/canceled" component={FailedPayment} />
          <Route path="/createcar" component={CreateCar} />
          <Route path="/cars/edit/:id" component={EditCar} />
        </Switch>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes

export default withRouter(connect(mapState, mapDispatch)(Routes));

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
