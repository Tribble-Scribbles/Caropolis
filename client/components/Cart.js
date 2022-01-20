import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, clearCart, mergeCart } from '../store/cart';
import { useSnackbar } from 'notistack';
import { Grid, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CartItem from './CartItem'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: "95vh",
    flexWrap: 'nowrap',
  },
  itemDisplay: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'auto',
    maxHeight: '80vh',
  },
  pricingDisplay: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  list: {
    overflow: 'auto',
  },
  buttons: {
    alignItems: 'center'
  },
  extendedIcon: {
    margin: theme.spacing(1),
  },
  navButtonRoot: {
    '& > *': {
      margin: theme.spacing(1),
      alignItems: 'center',
      flexWrap: 'nowrap',
      flex: 2,
    },
  },
  cartAlign: {
    alignItems: 'center',
    flex: 1,
    height: '60vh',
    textAlign: 'center',
    padding: '125px'
  },
  buttonsList: {
    height: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}))

const Cart = () => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { cart, auth } = useSelector((state) => {
    return {
      cart: state.cart,
      auth: state.auth
    }
  })
  useEffect(() => {
    dispatch(fetchCart(auth))
  }, [])

  const handleClearCart = () => {
    enqueueSnackbar("Cart Cleared!", {
      variant: "success"
    })
    dispatch(clearCart(auth))
  }

  const mergeGuestCart = () => {
    enqueueSnackbar("Carts Merged Successfully!", {
      variant: "success"
    })
    dispatch(mergeCart(auth))
  }

  const itemsPrice = cart.reduce((accum, curr) => accum + curr.price, 0)
  const taxPrice = itemsPrice * 0.075;
  const shippingPrice = itemsPrice > 250000 ? 500 : 7500;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  return (
    <React.Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={false} sm={8} component={Paper} elevation={5} square>
        <div className={classes.itemDisplay}>
          {
            cart.length !== 0 ? (
              <List className={classes.list}>
                {
                  cart.map((car) => {
                    return(
                      <ListItem key={car.id}>
                        <CartItem car={car}/>
                      </ListItem>
                    )
                  })
                }
              </List>
            ) : (
              <Typography component="h1" variant="h5">
                Cart is Empty!
              </Typography>
            )
          }
        </div>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={3} square>
          <div className={classes.pricingDisplay}>
            <Typography component="h1" variant="h4">
              CART
            </Typography>
          </div>
          <Divider variant="middle" />
          <Grid container className={classes.buttonsList}>
            <Grid item xs className={classes.cartAlign}>
              <Typography gutterBottom variant="body1" color="textSecondary">
                {`Subtotal: $${itemsPrice.toFixed(2)}`}
              </Typography>
              <Typography variant="body1" gutterBottom color="textSecondary">
                {`Tax: $${taxPrice.toFixed(2)}`}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {`Shipping: $${shippingPrice.toFixed(2)}`}
              </Typography>
              <Typography variant="subtitle1">
                {`Total: $${totalPrice.toFixed(2)}`}
              </Typography>
            </Grid>
            <Grid item className={classes.navButtonRoot}>
              <Fab variant="extended" color="primary" onClick={() => handleClearCart()}>
                <RemoveShoppingCartIcon className={classes.extendedIcon} />
                Clear Cart
              </Fab>
              <form action={`/stripe/create-checkout-session/${totalPrice.toFixed(0) * 100 + 500}`} method="POST" body={totalPrice} >
                <Fab variant="extended" color="primary" type="submit">
                  <ShoppingCartIcon className={classes.extendedIcon} />
                  Checkout
                </Fab>
              </form>             
              {
                auth.id &&
                <Fab variant="extended" color="primary" onClick={() => mergeGuestCart()}>
                <AddShoppingCartIcon className={classes.extendedIcon} />
                Merge Carts
              </Fab>
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Cart
