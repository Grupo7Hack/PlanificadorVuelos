"use strict";

require("dotenv").config();
const { default: axios } = require("axios");
const mysql = require("mysql2/promise");

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  RAPIDAPI_KEY,
  RAPIDAPI_HOST,
} = process.env;

let pool;

async function getPool() {
  if (!pool) {
    pool = await mysql.createPool({
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      database: DATABASE_NAME,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
    });
  }
  return pool;
}

async function getApiPool() {
  if (!pool) {
    pool = await axios.createPool({
      host: RAPIDAPI_HOST,
      key: RAPIDAPI_KEY,
    });
  }
}

module.exports = { getPool, getApiPool };
