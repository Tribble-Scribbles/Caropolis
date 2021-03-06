import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCars } from '../store/cars';
import SingleCar from './SingleCar';
import { addToCart } from '../store/cart';
import { useSnackbar } from 'notistack';

import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SpeedIcon from '@material-ui/icons/Speed';
import { LinkedCamera } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  icon: {
    marginRight: '20px',
  },
  buttons: {
    marginTop: '40px',
  },
  cardGrid: {
    padding: '20px 0',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: '50px 0',
  },
}));

const AllCars = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const { cars, auth, isAdmin } = useSelector((state) => {
    return {
      cars: state.cars,
      auth: state.auth,
      isAdmin: state.auth.isAdmin,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, []);

  const handleAddToCart = (car) => {
    enqueueSnackbar('Successfully added to cart!', {
      variant: 'success',
    });
    dispatch(addToCart(car, auth));
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position='relative'>
        <Toolbar>
          <SpeedIcon className={classes.icon} />
          <Typography variant='h6'>MOTORCARS</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <Container maxWidth='sm'>
          <Typography
            variant='h2'
            align='center'
            color='textPrimary'
            gutterBottom
          >
            LUXURY VEHICLES
          </Typography>
          <Typography
            variant='h5'
            align='center'
            color='textSecondary'
            paragraph
          >
            EXPERIENCE YOUR DREAM CAR TODAY
          </Typography>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth='md'>
        <Grid container spacing={4}>
          {cars.map((car) => (
            <Grid item key={car.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={car.imageUrl}
                  title='Image Title'
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant='h6'>
                    {car.year} {car.make} {car.model}
                  </Typography>
                  <Typography>${car.price}</Typography>
                </CardContent>
                <CardActions>
                  <SingleCar
                    carId={car.id}
                  />
                  <Button
                    onClick={() => {
                      handleAddToCart(car);
                    }}
                    size='small'
                    color='primary'
                  >
                    Add to Cart
                  </Button>
                  {isAdmin && (
                    <Button
                      component={Link}
                      to={`/cars/edit/${car.id}`}
                      size='small'
                      color='primary'
                    >
                      Edit
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <footer className={classes.footer}>
        <Typography variant='h6' align='center' gutterBottom>
          Footer
        </Typography>
        <Typography variant='subtitle1' align='center' color='textSecondary'>
          Note for the Footer
        </Typography>
      </footer>
    </div>
  );
};

export default AllCars;
