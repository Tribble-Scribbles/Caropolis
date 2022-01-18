import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCar } from "../store/car";
import { useHistory } from 'react-router-dom'

import { addToCart } from "../store/cart"
import { makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Grid } from "@material-ui/core";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  modalOuterContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center"
  },
  image: {
    flexGrow: 1,
    padding: "10px"
  },
  text: {
    flexGrow: 2,
    padding: "10px"
  },
  align:{
    textAlign: "center"
  }
}));

export default function SingleCar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { carId } = props;

  const dispatch = useDispatch();
  const history = useHistory();
  const { car } = useSelector((state) => {
    return {
      car: state.car,
    };
  });

  const handleClickOpen = () => {
    history.push(carId)
    dispatch(fetchCar(carId));
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="text" color="primary" size="small" onClick={handleClickOpen}>
        View
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        className={classes.align}
      >
        <DialogTitle id="max-width-dialog-title" className={classes.align}>{car.year} {car.make} {car.model}</DialogTitle>

        <DialogContent dividers className={classes.modalOuterContainer}>
            <Grid item className={classes.image} >
              <img src={car.imageUrl} style={{height: "500px", width: "90%", padding: "10px"}}/>
            </Grid>
            <Grid item className={classes.text}>
              <DialogContentText>
                {`
                  Sold by: ${car.dealerName} |
                  Located in: ${car.city}, ${car.state} |
                  VIN: ${car.vin} |
                  Condition: ${car.condition} |
                  `}
              </DialogContentText>
              <DialogContentText>
                {`
                  Mileage: ${car.mileage} |
                  Trim: ${car.trim} |
                  Body Style: ${car.bodyType} |
                  Exterior color: ${car.color} |
                `}
              </DialogContentText>
              <DialogContent>
                {`
                  Price: $${car.price}
                `}
              </DialogContent>
            </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => {dispatch(addToCart(car))}} color="primary">
            Add To Cart
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    )
  }
