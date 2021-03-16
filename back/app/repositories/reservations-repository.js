"use strict";
const database = require("../infrastructure/database");

async function makeReservation(userId, data) {
  const pool = await database.getConnection();
  const {
    origen,
    destino,
    fechaIda,
    fechaVuelta,
    escalasIda,
    escalasVuelta,
    precio,
    numAdultos,
    numNinos,
    numBebes,
    aerolineaIda,
    aerolineaVuelta,
  } = data;

  const reservation = {
    id_usuario: userId,
    fecha_reserva: new Date(),
    origen: origen,
    destino: destino,
    fecha_inicio: fechaIda,
    fecha_fin: fechaVuelta,
    escalas_ida: escalasIda,
    escalas_vuelta: escalasVuelta,
    precio: precio,
    num_adultos: numAdultos,
    num_ninos: numNinos,
    num_bebes: numBebes,
    aerolinea_ida: aerolineaIda,
    aerolinea_vuelta: aerolineaVuelta,
  };
  const query = "INSERT INTO reservas SET ?";
  const [created] = await pool.query(query, reservation);

  return created.insertId;
}

module.exports = makeReservation;
