"use strict";

const database = require("../infrastructure/database");
const unirest = require("unirest");

async function findClasses() {
  const pool = await database.getPool();
  const query = `SELECT * FROM clases`;
  const [classes] = await pool.query(query);

  return classes;
}

function findFlights(origen, destino, fechaIda) {
  return new Promise((resolve, reject) => {
    let req = unirest(
      "GET",
      `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/ES/EUR/es-ES/${origen}/${destino}/${fechaIda}/`
    );

    req.header({
      "x-rapidapi-key": "60051f9eb4msh4aba1f88f85eb78p12e3d0jsn7a0b9c392646",
      "x-rapidapi-host":
        "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      useQueryString: true,
    });

    req.end(function (res) {
      if (res) {
        resolve(res);
      } else {
        reject(res);
      }
    });
  });
}

async function findPassengers() {
  const pool = await database.getPool();
  const query = `SELECT * FROM pasajeros`;
  const [passengers] = await pool.query(query);

  return passengers;
}

async function findAllPlaces() {
  const pool = await database.getPool();
  const query = `SELECT * FROM aeropuertos`;
  const [places] = await pool.query(query);

  return places;
}

async function findPlaces(name) {
  const pool = await database.getPool();
  const query = `SELECT a.nombre as aeropuerto, a.codigo_iata, c.id as id_ciudad, c.nombre as ciudad, p.id as id_pais, p.nombre as pais
                 FROM aeropuertos a
                 LEFT JOIN ciudades c on a.id_ciudad = c.id
                 LEFT JOIN paises p on a.id_pais = p.id
                 WHERE a.nombre LIKE '%${name}%'
                 OR c.nombre LIKE '%${name}%'
                 OR p.nombre LIKE '%${name}%'`;
  const [places] = await pool.query(query, [name]);

  return places;
}

module.exports = {
  findClasses,
  findFlights,
  findPassengers,
  findPlaces,
  findAllPlaces,
};
