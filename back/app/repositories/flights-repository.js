"use strict";

const database = require("../infrastructure/database");

async function getClasses() {
  const pool = await database.getPool();
  const query = `SELECT * FROM classes`;
  const [classes] = await pool.query(query);

  return classes;
}

async function getFlights() {
  const pool = await database.getPool();
  const query = `SELECT * FROM flights`;
  const [flights] = await pool.query(query);

  return flights;
}

async function getPassengers() {
  const pool = await database.getPool();
  const query = `SELECT * FROM passengers`;
  const [passengers] = await pool.query(query);

  return passengers;
}

// es posible hacer un LIKE y que la función sea getPlacesByName
async function getPlaces() {
  const pool = await database.getPool();
  const query = `SELECT * FROM places`;
  const [places] = await pool.query(query);

  return places;
}

module.exports = {
  getClasses,
  getFlights,
  getPassengers,
  getPlaces,
};
