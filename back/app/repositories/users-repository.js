"use strict";

const { async } = require("crypto-random-string");
const database = require("../infrastructure/database");

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

async function deletePreviousCodeActivation(id) {
  const connection = await database.getConnection();
  const query = "DELETE FROM activacion_usuarios WHERE id_usuario = ?";

  await connection.query(query, id);

  return true;
}

async function deleteDataUser(id) {
  const connection = await database.getConnection();
  const queryCode = "DELETE FROM activacion_usuarios WHERE id_usuario = ?";
  await connection.query(queryCode, id);

  const now = new Date();
  const fechaDeExpiracion = now
    .toISOString()
    .substring(0, 19)
    .replace("T", " ");

  const queryUser = `UPDATE usuarios 
  SET fecha_expiracion = ? 
  WHERE fecha_expiracion IS NULL AND id = ?`;
  await connection.query(queryUser, [fechaDeExpiracion, id]);

  return true;
}

async function findUserByEmail(email) {
  const connection = await database.getConnection();
  const query = `SELECT * FROM usuarios WHERE email= ?`;
  const [user] = await connection.query(query, email);
  return user[0];
}

async function findUserById(id) {
  const connection = await database.getConnection();
  const query = `SELECT * FROM usuarios WHERE id= ?`;
  const [user] = await connection.query(query, id);
  return user[0];
}

async function findUserImage(id) {
  const connection = await database.getConnection();
  const query = "SELECT foto FROM usuarios WHERE id = ?";
  const [users] = await connection.query(query, id);

  return users[0];
}

async function udpateDataUser(data) {
  const { id, nombre, email, contraseña } = data;
  const connection = await database.getConnection();

  const query = `UPDATE usuarios
  SET nombre = ?, email = ?, contraseña = ?
  WHERE id = ?`;
  await connection.query(query, [nombre, email, contraseña, id]);

  return true;
}

async function updateUserByPatch(id, dataUser) {
  const { nombre, email, contraseña } = dataUser;
  const connection = await database.getConnection();

  const query =
    "UPDATE usuarios SET nombre = ?, email = ?, contraseña = ? WHERE id = ?";
  await connection.query(query, [nombre, email, contraseña, id]);

  return true;
}

async function uploadUserImage(id, image) {
  const connection = await database.getConnection();
  const query = "UPDATE usuarios SET foto = ? WHERE id = ?";
  await connection.query(query, [image, id]);

  return true;
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
  deleteDataUser,
  deletePreviousCodeActivation,
  findUserByEmail,
  findUserById,
  findUserImage,
  udpateDataUser,
  updateUserByPatch,
  uploadUserImage,
  validateCodeActivation,
};
