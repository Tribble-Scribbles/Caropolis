const router = require('express').Router();
const {
  models: { Car },
} = require('../db');

// All cars route
router.get('/', async (req, res, next) => {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (error) {
    next(error);
  }
});

// Single car route
router.get('/:id', async (req, res, next) => {
  try {
    const car = await Car.findByPk(req.params.id);
    res.json(car);
  } catch (error) {
    next(error);
  }
});

// add car
router.post('/', async (req, res, next) => {
  try {
    res.status(201).json(await Car.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const car = await Car.findByPk(req.params.id);
    res.json(
      await car.update({
        vin: req.body.vin,
        trim: req.body.trim,
        bodyType: req.body.bodyType,
        mileage: req.body.mileage,
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        color: req.body.color,
        city: req.body.city,
        qty: req.body.qty,
        condition: req.body.condition,
        dealerName: req.body.dealerName,
        state: req.body.state,
      })
    );
  } catch (error) {
    next(error);
  }
});

// Update car qty
// router.put('/purchase/:id', async (req, res, next) => {
//   try {
//     const car = await Car.findByPk(req.params.id);
//     res.status(201).send(
//       await car.update({
//         qty: car.qty - 1,
//       })
//     );
//   } catch (error) {
//     next(error);
//   }
// });

router.delete('/:id', async (req, res, next) => {
  try {
    const car = await Car.findByPk(req.params.id);
    await car.destroy();
    res.json(car);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
