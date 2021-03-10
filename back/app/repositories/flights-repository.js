"use strict";

const database = require("../infrastructure/database");
const unirest = require("unirest");
const { SKYKEY } = process.env;
const placesData = require("../../placesdb.json");

function findFlights(origen, destino, fechaIda) {
  return new Promise((resolve, reject) => {
    let req = unirest(
      "GET",
      `https://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/ES/eur/es-ES/${origen}/${destino}/${fechaIda}?apikey=${SKYKEY}`
    );

    req.end(function (res) {
      if (res) {
        resolve(res);
      } else {
        reject(res);
      }
    });
  });
}

function findAllPlaces() {
  const countries = { ...placesData.Continents[3].Countries };
  const countriesMap = new Map(Object.entries(countries));
  let countriesData = [];
  for (let country of countriesMap) {
    countriesData.push(country[1]);
  }

  let cities = countriesData.map(({ Cities }) => Cities);

  let airports = [];

  cities.forEach((city) => {
    city.map(({ Airports }) => {
      airports.push(Airports);
    });
  });
  return airports;
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
  inboundDate,
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
      inbounddate: inboundDate,
      adults: adults,
      children: children,
      infants: infants,
      grouppricing: true,
      apikey: SKYKEY,
    });

    req.end(function (res) {
      if (res) {
        const code = res.headers.location.substring(65);
        resolve(retrieveData(code, maxStops));
      } else {
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
          if (response.body.Status === "UpdatesPending") {
            console.log(response.body.Status);
            resolve(retrieveData(code, maxStops));
          } else {
            console.log(response.body.Status);
            resolve(response);
          }
        } else {
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
          // if (response.body.Status === "UpdatesPending") {
          //   console.log(response.body.Status);
          //   resolve(retrieveData(code, maxStops));
          // } else {
          //   console.log(response.body.Status);
          resolve(response);
          // }
        } else {
          reject(response);
        }
      });
    });
  }
}

module.exports = {
  findFlights,
  findPlaces,
  findAllPlaces,
  findOutboundFlights,
};
