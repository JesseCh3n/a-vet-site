const db = require('./connection');
const { User } = require('../models');
const userSeeds = require('./userSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('User', 'users');
  await User.create(userSeeds);

  console.log('users seeded');

  process.exit();
});
