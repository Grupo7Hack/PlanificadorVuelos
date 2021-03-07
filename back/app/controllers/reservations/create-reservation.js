"use strict";
const Joi = require("joi");
const makeReservation = require("../../repositories/reservations-repository");
const { sendEmailReservation } = require("../../helpers/mail-smtp");

const { findUserById } = require("../../repositories/users-repository");

const reservationSchema = Joi.object().keys({
  origen: Joi.string().min(3).max(20).required(),
  destino: Joi.string().min(3).max(20).required(),
  fechaIda: Joi.date().required(),
  fechaVuelta: Joi.date(),
  escala: Joi.boolean(),
  precio: Joi.number().required(),
  numAdultos: Joi.number().min(1).required(),
  numNinos: Joi.number(),
  numBebes: Joi.number(),
  aerolinea: Joi.number().min(3).required(),
});

async function createReservation(req, res) {
  try {
    const { id } = req.auth;
    await reservationSchema.validateAsync(req.body);
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
    } = req.body;

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
      escala,
      precio,
      numAdultos,
      numNinos,
      numBebes,
      aerolinea,
    };
    const reservation = await makeReservation(id, dataReservation);
    await sendEmailReservation(nombre, email, dataReservation);

    res.status(201).send({ id: reservation });
  } catch (err) {
    res.status(409).send({ error: err.message });
  }
}

module.exports = createReservation;
