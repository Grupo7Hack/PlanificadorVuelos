"use strict";
require("dotenv").config();

const mysql = require("mysql2/promise");
const {
  DATABASEHOST,
  DATABASEPORT,
  DATABASENAME,
  DATABASEUSER,
  DATABASEPASSWORD,
} = process.env;

let connection;

async function getConnection() {
  if (!connection) {
    connection = await mysql.createPool({
      host: DATABASEHOST,
      port: DATABASEPORT,
      database: DATABASENAME,
      user: DATABASEUSER,
      password: DATABASEPASSWORD,
    });
  }
  return connection;
}

module.exports = { getConnection };
