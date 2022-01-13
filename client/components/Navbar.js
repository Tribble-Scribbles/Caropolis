import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../store'
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { Button as MUIButton } from '@material-ui/core';

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
      loginStatus: state.auth.loginStatus
    }
  })

  return(
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              Caropolis
            </Typography>

            <nav>
              <MUIButton component={Link} to="/home" color="inherit" className={classes.link}>
                Home
              </MUIButton>

              <MUIButton component={Link} to="/cars" color="inherit" className={classes.link}>
                Listings
              </MUIButton>

              <MUIButton component={Link} to="/account" color="inherit" className={classes.link}>
                Account
              </MUIButton>

              <MUIButton component={Link} to="/signup" color="inherit" className={classes.link}>
                Sign Up
              </MUIButton>
              {
                isLoggedIn.loginStatus ? (
                  <MUIButton color="primary" component={Link} to="/home" variant="outlined" className={classes.link} onClick={() => {
                  dispatch(logout())
                    }}>
                    Logout
                  </MUIButton>
                ) : (
                  <MUIButton color="primary" component={Link} to="/login" variant="outlined" className={classes.link} >
                    Login
                  </MUIButton>
                )
              }
            </nav>
          </Toolbar>
        </AppBar>
    </React.Fragment>
  )
}
