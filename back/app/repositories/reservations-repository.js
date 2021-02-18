"use strict";
const { number } = require("joi");
const database = require("../infrastructure/database");

async function makeReservation(userId, data) {
  const pool = await database.getConnection();
  const {
    origen,
    destino,
    fechaIda,
    fechaVuelta,
    escala,
    precio,
    numAdultos,
    numNinos,
    numBebes,
    aerolinea,
  } = data;

  const reservation = {
    id_usuario: userId,
    fecha_reserva: new Date(),
    origen: origen,
    destino: destino,
    fecha_inicio: fechaIda,
    fecha_fin: fechaVuelta,
    escalas: escala,
    precio: precio,
    num_adultos: numAdultos,
    num_ninos: numNinos,
    num_bebes: numBebes,
    id_aerolinea: aerolinea,
  };
  const query = "INSERT INTO reservas SET ?";
  const [created] = await pool.query(query, reservation);

  return created.insertId;
}

module.exports = makeReservation;
