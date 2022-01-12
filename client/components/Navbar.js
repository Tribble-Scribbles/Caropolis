import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../store'

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}))

export default function Navbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => {
    return {
      isLoggedIn: !!state.auth.id
    }
  })

  return(
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Link underline="none" variant="button" color="inherit" href="/home" className={classes.toolbarTitle}>
              <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                Caropolis
              </Typography>
            </Link>

            <nav>
              <Link variant="button" color="textPrimary" href="/home" className={classes.link}>
                Home
              </Link>
              <Link variant="button" color="textPrimary" href="/listings" className={classes.link}>
                Listings
              </Link>
              <Link variant="button" color="textPrimary" href="/account" className={classes.link}>
                Account
              </Link>
            </nav>
            {/* {
              isLoggedIn ? (
                <Button href="/" color="primary" variant="outlined" className={classes.link} onClick={() => {dispatch(logout())}}>
                  Logout
                  {console.log(isLoggedIn)}
                </Button>
              ) : (
                <Button href="/login" color="primary" variant="outlined" className={classes.link}>
                  Login
                  {console.log(isLoggedIn)}
                </Button>
              )
            } */}
            <Button href="/" color="primary" variant="outlined" className={classes.link} onClick={() => {dispatch(logout())}}>
              Logout
            </Button>
            <Button href="/login" color="primary" variant="outlined" className={classes.link}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
    </React.Fragment>
  )
}
/* <nav>
  {isLoggedIn ? (
    <div>
      <Link to="/home">Home</Link>
      <a href="#" onClick={handleClick}>
        Logout
      </a>
    </div>
  ) : (
    <div>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  )}
</nav>
<hr /> */

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }
