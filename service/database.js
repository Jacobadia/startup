const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('inventoryApp');
const userCollection = db.collection('user');
const inventoryCollection = db.collection('inventory');

// Test connection
(async function testConnection() {
  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log('Connected to database');
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

// Save or update inventory for a user
async function saveInventory(email, items) {
  const filter = { email: email };
  const update = { $set: { items: items } };
  const options = { upsert: true };
  await inventoryCollection.updateOne(filter, update, options);
}

// Retrieve inventory for a user
function getInventory(email) {
  return inventoryCollection.findOne({ email: email });
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  saveInventory,
  getInventory,
};
