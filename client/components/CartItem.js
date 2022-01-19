import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { removeFromCart } from '../store/cart';
import SingleCar from './SingleCar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 900,
  },
  image: {
    width: 250,
    height: 250,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function CartItem(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { auth } = useSelector((state) => {
    return {
      auth: state.auth
    }
  })

  const { make, model, imageUrl, price, vin, dealerName, id } = props.car;

  const handleRemoveItem = (id, auth) => {
    enqueueSnackbar("Removed from cart!", {
      variant: "success"
    })
    dispatch(removeFromCart(id, auth))
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={imageUrl}/>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {`${make} ${model}`}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {`Dealer: ${dealerName}`}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {`VIN: ${vin}`}
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="text" color="primary" size="small" onClick={()=>{handleRemoveItem(id, auth)}}>
                  Remove from cart
                </Button>
                <SingleCar carId={id} />
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                {`$${price}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
