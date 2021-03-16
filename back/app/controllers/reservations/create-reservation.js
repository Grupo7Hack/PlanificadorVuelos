"use strict";
const Joi = require("joi");
const makeReservation = require("../../repositories/reservations-repository");
const { sendEmailReservation } = require("../../helpers/mail-smtp");
const { findUserById } = require("../../repositories/users-repository");

const reservationSchema = Joi.object().keys({
  origen: Joi.string().min(3).max(100).required(),
  destino: Joi.string().min(3).max(100).required(),
  fechaIda: Joi.date().required(),
  fechaVuelta: Joi.date().allow(""),
  escalasIda: Joi.number(),
  escalasVuelta: Joi.number(),
  precio: Joi.number().required(),
  numAdultos: Joi.number().min(1).required(),
  numNinos: Joi.number(),
  numBebes: Joi.number(),
  aerolineaIda: Joi.string().required(),
  aerolineaVuelta: Joi.string().allow(""),
});

async function createReservation(req, res) {
  try {
    const { id } = req.auth;
    await reservationSchema.validateAsync(req.body);
    let {
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
    } = req.body;

    fechaVuelta = fechaVuelta ? fechaVuelta : "1999-01-01 00:00:00";

    const existUser = await findUserById(id);
    const { nombre, email } = existUser;
    if (!existUser) {
      const error = new Error(
        `El usuario debe estar registrado para realizar la reserva`
      );
      res.status(409);
      throw error;
    }

    const dataReservation = {
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
    };
    const reservation = await makeReservation(id, dataReservation);
    // await sendEmailReservation(nombre, email, dataReservation);

    res.status(201).send({ id: reservation });
  } catch (err) {
    res.status(409).send({ error: err.message });
  }
}

module.exports = createReservation;
