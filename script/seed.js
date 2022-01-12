
'use strict'
const axios = require('axios')
const {db, models: {User, Car} } = require('../server/db')
const token = 'ZrQEPSkKc3VuZzk2a2ltQGdtYWlsLmNvbQ=='

const {
  db,
  models: { User, Car },
} = require("../server/db");
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

//https://www.auto.dev/
// Apparently there is a max of 10,000 api calls with this api for free but I doubt we'll
// run this that many times (Just a headsup)

async function createCars(){
  const {data: carsData} = await axios.get('https://auto.dev/api/listings?apikey=ZrQEPSkKc3VuZzk2a2ltQGdtYWlsLmNvbQ==&make=Make&model=Model%203&category=supercar&radius=5000&page=1')
  const cars = carsData.records.map(car => {
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
    if(car.color === null){
      return false
    }else if(car.color.length <= 2){
      return false
    }
    return true
  })

  return cars;
}

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([

    User.create({  
      password: '123',
      firstName: 'Cody',
      lastName: 'Test',
      email: 'cody123@mail.com'
    }),
    User.create({
      password: '123',
      firstName: 'Murphy',
      lastName: 'Test',
      email: 'murphy123@mail.com'

  const cars = await Promise.all([
    Car.create({
      year: 2007,
      make: "Porshe",
      model: "911",
      price: 73260.0,
      imageUrl:
        "https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/images/07q1/267362/2007-porsche-911-targa-4s-photo-8803-s-original.jpg?fill=2:1&resize=480:*",
      color: "black",
      origin: "Germany",
      qty: 4,

    }),
    Car.create({
      year: 2005,
      make: "Lamborghini",
      model: "Gallardo",
      price: 176000.0,
      imageUrl:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mecum.com%2Flots%2FCA0819-389941%2F2005-lamborghini-gallardo%2F&psig=AOvVaw1Em3I_SLIWBo_pTbHQaPC6&ust=1642019682145000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMjRppnGqvUCFQAAAAAdAAAAABAD",
      color: "yellow",
      origin: "Italy",
      qty: 3,
    }),
  ])
  const cars = await createCars();

  await Promise.all(cars.map(car => {
    return Car.create(car)
  }))

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
=======
    Car.create({
      year: 2021,
      make: "Mercedes",
      model: "GT63",
      price: 73260.0,
      imageUrl:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcarbuzz.com%2Fcars%2Fmercedes-benz%2Famg-gt-63&psig=AOvVaw2_P31zAJyqFdjZuX90n6y7&ust=1642019916264000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMiS94LHqvUCFQAAAAAdAAAAABAD",
      color: "white",
      origin: "Germany",
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${cars.length} cars`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    cars,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
