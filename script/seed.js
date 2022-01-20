
'use strict'
const axios = require('axios')
const {db, models: {User, Car, Order} } = require('../server/db')
const token = 'ZrQEPSkKc3VuZzk2a2ltQGdtYWlsLmNvbQ=='

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

//https://www.auto.dev/
// Apparently there is a max of 10,000 api calls with this api for free but I doubt we'll
// run this that many times (Just a headsup)

async function createCars(page = 1, category = "supercar", make = "Make", model = "Model", radius = 5000){
  const {data: carsData} = await axios.get(`https://auto.dev/api/listings?apikey=${token}&make=${make}&model=${model}%203&category=${category}&radius=${radius}&page=${page}`
  )
  const filtered = carsData.records.map(car => {
    let carObj = {
      vin: car.vin,
      trim: car.trim,
      bodyType: car.bodyType,
      year: car.year,
      make: car.make,
      model: car.model,
      price: parseInt(car.price.slice(1).split(',').join('')),
      mileage: car.mileage === 'New' ? '0 Miles' : car.mileage,
      city: car.city,
      imageUrl: car.primaryPhotoUrl,
      color: car.displayColor,
      dealerName: car.dealerName,
      state: car.state,
      condition: car.condition
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

  return filtered;
}

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const [cody, murphy, admin] = await Promise.all([
    User.create({
      password: '123',
      firstName: 'Cody',
      lastName: 'Test',
      email: 'cody123@mail.com',
      isAdmin: false
    }),
    User.create({
      password: '123',
      firstName: 'Murphy',
      lastName: 'Test',
      email: 'murphy123@mail.com',
      isAdmin: false
    }),
    User.create({
      password: 'admin',
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@mail.com',
      isAdmin: true
    })
  ])

  const [dummyCar1, dummyCar2, dummyCar3] = await Promise.all([
    Car.create({
      vin: 'vin1',
      trim: 'sport',
      bodyType: 'coupe',
      year: 1999,
      make: 'toyota',
      model: 'camry',
      price: 5000,
      mileage: '25000 miles',
      city: 'Simi Valley',
      state: 'CA',
      condition: 'Used',
      color: 'Blue',
      imageUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0JTIwd2l0aCUyMGdsYXNzZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
    }),
    Car.create({
      vin: 'vin2',
      trim: 'supersport',
      bodyType: 'convertible',
      year: 2010,
      make: 'toyota',
      model: 'celica',
      price: 5000,
      mileage: '2500 miles',
      city: 'Simi Valley',
      state: 'CA',
      condition: 'Used',
      color: 'Black',
      imageUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0JTIwd2l0aCUyMGdsYXNzZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
    }),
    Car.create({
      vin: 'vin3',
      trim: 'sport',
      bodyType: 'sedan',
      year: 2020,
      make: 'toyota',
      model: 'corolla',
      price: 55000,
      mileage: '2500 miles',
      city: 'Simi Valley',
      state: 'CA',
      condition: 'Used',
      color: 'Red',
      imageUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0JTIwd2l0aCUyMGdsYXNzZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
    })
  ])

  // console.log('PROTO?', Object.keys(dummyCar1.__proto__))
  // console.log('PROTO?', Object.keys(cody.__proto__))

  const [dummyOrder1, dummyOrder2, dummyOrder3] = await Promise.all([
    Order.create({}),
    Order.create({}),
    Order.create({})
  ])

  cody.addOrder(dummyOrder1)
  murphy.addOrder(dummyOrder2)
  murphy.addOrder(dummyOrder3)

  dummyCar1.setOrder(dummyOrder1)
  dummyCar2.setOrder(dummyOrder2)
  dummyCar3.setOrder(dummyOrder2)

  let cars = [];

  //Change conditional page value (page < 4) to seed more or less than 4 pages of data
  for(let page = 1; page < 10; page++){
    cars = [...cars, ...await createCars(page)];
  }

  await Promise.all(cars.map(car => {
    return Car.create(car)
  }))

  console.log(`seeded ${cars.length} cars`)
  console.log(`seeded 3 users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody,
      murphy,
      admin,
    },
    cars
  }
}

/*npm run
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
