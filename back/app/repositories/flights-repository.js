"use strict";

const database = require("../infrastructure/database");
const unirest = require("unirest");

const { SKYKEY } = process.env;

async function findClasses() {
  const pool = await database.getConnection();
  const query = `SELECT * FROM clases`;
  const [classes] = await pool.query(query);

  return classes;
}

function findFlights(origen, destino, fechaIda) {
  return new Promise((resolve, reject) => {
    let req = unirest(
      "GET",
      // `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/ES/EUR/es-ES/${origen}/${destino}/${fechaIda}/`
      `https://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/ES/eur/es-ES/${origen}/${destino}/${fechaIda}?apikey=${SKYKEY}`
    );

    // req.header({
    //   "x-rapidapi-key": RAPIDAPIKEY,
    //   "x-rapidapi-host": RAPIDAPIHOST,
    //   useQueryString: true,
    // });

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
  const pool = await database.getConnection();
  const query = `SELECT * FROM pasajeros`;
  const [passengers] = await pool.query(query);

  return passengers;
}

async function findAllPlaces() {
  const pool = await database.getConnection();
  const query = `SELECT * FROM aeropuertos`;
  const [places] = await pool.query(query);

  return places;
}

async function findPlaces(name) {
  const pool = await database.getConnection();
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

function findOutboundFlights(
  cabinclass,
  origin,
  destination,
  outboundDate,
  adults,
  children,
  infants,
  maxStops
) {
  return new Promise((resolve, reject) => {
    let req = unirest(
      "POST",
      `https://partners.api.skyscanner.net/apiservices/pricing/v1.0`
    );

    req.header({
      "Content-Type": "application/x-www-form-urlencoded",
    });

    req.send({
      cabinclass: cabinclass,
      country: "ES",
      currency: "EUR",
      locale: "es-ES",
      locationSchema: "iata",
      originplace: origin,
      destinationplace: destination,
      outbounddate: outboundDate,
      inbounddate: "",
      adults: adults,
      children: children,
      infants: infants,
      grouppricing: true,
      apikey: SKYKEY,
    });

    req.end(function (res) {
      if (res) {
        // resolve(res);
        const code = res.headers.location.substring(65);
        // console.log("1a", res);
        resolve(retrieveData(code, maxStops));
      } else {
        // console.log("1b", res);
        reject(res);
      }
    });
  });
}

function retrieveData(code, maxStops) {
  if (maxStops === 2) {
    return new Promise((resolve, reject) => {
      let req = unirest(
        "GET",
        `https://partners.api.skyscanner.net/apiservices/pricing/uk/v1.0/${code}?apiKey=${SKYKEY}`
      );

      req.end(function (response) {
        if (response) {
          // console.log("2a", response);
          if (response.body.Status === "UpdatesPending") {
            console.log(response.body.Status);
            resolve(retrieveData(code, maxStops));
          } else {
            console.log(response.body.Status);
            resolve(response);
          }
          // console.log(55, response.body);
        } else {
          // console.log("2b", response);
          reject(response);
        }
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      let req = unirest(
        "GET",
        `https://partners.api.skyscanner.net/apiservices/pricing/uk/v1.0/${code}?apiKey=${SKYKEY}&stops=${maxStops}`
      );

      req.end(function (response) {
        if (response) {
          // console.log("2a", response);
          if (response.body.Status === "UpdatesPending") {
            console.log(response.body.Status);
            resolve(retrieveData(code, maxStops));
          } else {
            console.log(response.body.Status);
            resolve(response);
          }
          // console.log(55, response.body);
        } else {
          // console.log("2b", response);
          reject(response);
        }
      });
    });
  }
}

module.exports = {
  findClasses,
  findFlights,
  findPassengers,
  findPlaces,
  findAllPlaces,
  findOutboundFlights,
};
