'use strict'
const axios = require('axios')
const {db, models: {User, Car} } = require('../server/db')
const token = 'ZrQEPSkKc3VuZzk2a2ltQGdtYWlsLmNvbQ=='
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

 // Apparently there is a max of 10,000 api calls with this api for free but I doubt we'll
 // run this that many times (Just a headsup)
async function createCars(){
  const {data: carsData} = await axios.get('https://auto.dev/api/listings?apikey=ZrQEPSkKc3VuZzk2a2ltQGdtYWlsLmNvbQ==&make=Make&model=Model%203&category=supercar&radius=5000&page=1')
  const cars = await Promise.all(carsData.records.map(car => {
    let carObj = {
      vin: car.vin,
      trim: car.trim,
      bodyType: car.bodyType,
      year: car.year,
      make: car.make,
      model: car.model,
      price: car.price,
      mileage: car.mileage === 'New' ? '0 Miles' : car.mileage,
      city: car.city,
      imageUrl: car.primaryPhotoUrl,
      color: car.displayColor,
    }
    return carObj;
  }).filter((car) => {
    if(car.color !== null || car.color !== '/'){
      return Car.create(car)
    }
  }))

  return cars;
}

async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: 'cody',
      password: '123',
      firstName: 'Cody',
      lastName: 'Test',
      email: 'cody123@mail.com'
    }),
    User.create({
      username: 'murphy',
      password: '123',
      firstName: 'Murphy',
      lastName: 'Test',
      email: 'murphy123@mail.com'
    }),
  ])
  const cars = await createCars();
  console.log(`seeded ${cars.length} cars`)
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    },
    cars
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
