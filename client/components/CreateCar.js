import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { createCar } from '../store/cars';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SpeedIcon from '@material-ui/icons/Speed';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CreateCar = () => {
  const classes = useStyles();

  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [imageUrl, setimageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [vin, setVin] = useState('');
  const [trim, setTrim] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [mileage, setMileage] = useState('');
  const [color, setColor] = useState('');
  const [city, setCity] = useState('');
  const [qty, setQty] = useState('');
  const [condition, setCondition] = useState('');
  const [dealerName, setDealerName] = useState('');
  const [state, setStateLoc] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!year.length || !make.length || !model.length)
    dispatch(
      createCar({
        year,
        make,
        model,
        imageUrl,
        price,
        vin,
        trim,
        bodyType,
        mileage,
        color,
        city,
        qty,
        condition,
        dealerName,
        state,
      })
    );
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <SpeedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Add New Vehicle
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='year'
            label='Car Year'
            name='year'
            // autoComplete='year'
            autoFocus
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='make'
            label='Car Make'
            type='make'
            id='make'
            // autoComplete='current-password'
            value={make}
            onChange={(e) => setMake(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='model'
            label='Car Model'
            name='model'
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='price'
            label='Price (No Commas)'
            name='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='image'
            label='Image (Url)'
            name='image'
            value={imageUrl}
            onChange={(e) => setimageUrl(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='vin'
            label='VIN'
            name='vin'
            value={vin}
            onChange={(e) => setVin(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='trim'
            label='Trim'
            name='trim'
            value={trim}
            onChange={(e) => setTrim(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='bodytype'
            label='Body Type'
            name='bodytype'
            value={bodyType}
            onChange={(e) => setBodyType(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='mileage'
            label='Mileage'
            name='mileage'
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='color'
            label='Color'
            name='color'
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='city'
            label='City'
            name='city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='qty'
            label='Quantity'
            name='qty'
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='condition'
            label='Condition'
            name='condition'
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='dealerName'
            label='Dealer Name'
            name='dealerName'
            value={dealerName}
            onChange={(e) => setDealerName(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='state'
            label='State'
            name='state'
            value={state}
            onChange={(e) => setStateLoc(e.target.value)}
          />

          <Grid container>
            <Grid item xs>
              * All Fields Are Required
            </Grid>
          </Grid>

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            ADD
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default CreateCar;
