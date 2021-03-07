"use strict";

const nodemailer = require("nodemailer");

const {
  HTTP_SERVER_DOMAIN,
  SMTP_PORT,
  SMTP_HOST,
  SMTP_USER,
  SMTP_PASS,
} = process.env;

const transporter = nodemailer.createTransport({
  port: SMTP_PORT,
  host: SMTP_HOST,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  secure: false,
});

async function sendEmailActivation(name, email, codeActivation) {
  const linkActivation = `${HTTP_SERVER_DOMAIN}/api/v1/users/activation?code=${codeActivation}`;
  console.log(linkActivation);

  const mailData = {
    from: "youremail@yopmail.com",
    to: email,
    subject: "Bienvenido al Planificador de Vuelos",
    text: `Hola ${name}, Para activar tu cuenta hacer click aquí ${linkActivation}`,
    html: `Hola ${name}, Para activar tu cuenta hacer <a href="${linkActivation}">Click aquí</a>`,
  };
  console.log("mailData", mailData);
  const data = await transporter.sendMail(mailData);

  return data;
}

async function sendEmailCorrectActivation(name, email) {
  const mailData = {
    from: "youremail@yopmail.com",
    to: email,
    subject: "Cuenta Activada",
    text: `Hola ${name},\n Tu cuenta a sido activada con exito, ya puedes planificar tus proximos vuelos`,
    html: `<p>Hola ${name},</p><p>Tu cuenta a sido activada con exito, ya puedes planificar tus proximos vuelos</p>`,
  };

  const data = await transporter.sendMail(mailData);

  return data;
}
async function sendEmailReservation(name, email, datos) {
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
  } = datos;

  const mailData = {
    from: "noresponder@yopmail.com",
    to: email,
    subject: "Reservacion",
    text: `Hola ${name},\n Tu reservacion se realizo con exito`,
    html: `<p>Hola ${name},</p>
    <p>Tu reserva se realizo con exito</p>
    <p>Los datos de tu reserva son:</p>
    <p>Origen:${origen}
    Destino:${destino}
    Fecha de Ida:${fechaIda}
    Fecha de Vuelta:${fechaVuelta}
    Precio:${precio}
    Pasajeros:${numAdultos}
    Aerolinea:${aerolinea}</p>`,
  };

  const data = await transporter.sendMail(mailData);

  return data;
}

module.exports = {
  sendEmailActivation,
  sendEmailCorrectActivation,
  sendEmailReservation,
};
