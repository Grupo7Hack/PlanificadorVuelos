"use strict";

const { async } = require("crypto-random-string");
const database = require("../infrastructure/database");

async function findUserByEmail(email) {
  const connection = await database.getConnection();
  const query = `SELECT * FROM usuarios WHERE email= ?`;
  const [user] = await connection.query(query, email);
  return user[0];
}

async function createUser(name, email, password, foto, role) {
  const connection = await database.getConnection();

  const data = {
    nombre: name,
    email: email,
    contraseña: password,
    foto: foto,
    role: role,
  };
  const query = "INSERT INTO usuarios SET ?";
  const [created] = await connection.query(query, data);

  return created.insertId;
}

async function addCodeActivation(id, code) {
  const now = new Date();
  const fechaDeCreacion = now.toISOString().substring(0, 19).replace("T", " ");

  const data = {
    id_usuario: id,
    codigo_activacion: code,
    fecha_creacion: fechaDeCreacion,
  };

  const connection = await database.getConnection();
  const query = "INSERT INTO activacion_usuarios SET ?";
  const [created] = await connection.query(query, data);
  return created.insertId;
}

async function validateCodeActivation(code) {
  const now = new Date();
  const fechaDeActivacion = now
    .toISOString()
    .substring(0, 19)
    .replace("T", " ");

  const connection = await database.getConnection();
  const query = `UPDATE activacion_usuarios 
  SET fecha_activacion = ? 
  WHERE codigo_activacion = ?
  AND fecha_activacion IS NULL`;

  const [validation] = await connection.query(query, [fechaDeActivacion, code]);

  return validation.affectedRows === 1;
}

module.exports = {
  addCodeActivation,
  createUser,
  findUserByEmail,
  validateCodeActivation,
};
