"use strict";

const path = require("path");
const fs = require("fs");

const {
  findUserImage,
  uploadUserImage,
} = require("../../repositories/users-repository");

const validExtensions = [".jpeg", ".jpg", ".png"];

async function uploadImage(req, res) {
  try {
    const { id } = req.auth;

    if (!req.files || Object.keys(req.files).length === 0) {
      const error = new Error("Ningún archivo fue cargado");
      error.status = 400;
      throw error;
    }

    const newImage = req.files.image;
    const extension = path.extname(newImage.name);

    if (!validExtensions.includes(extension)) {
      const error = new Error("Formato no valido");
      error.status = 400;
      throw error;
    }

    const { HTTP_SERVER_DOMAIN, PATH_USER_IMAGE } = process.env;
    const user = await findUserImage(id);
    const pathNewImageFolder = `${__dirname}/../../../public/${PATH_USER_IMAGE}`;

    if (user.foto) {
      await fs.unlink(`${pathNewImageFolder}/${user.foto}`, () => {
        console.log("Borrada correctamente la imagen anterior del perfil ");
      });
    }

    const pathImage = `${pathNewImageFolder}/${id}${extension}`;
    newImage.mv(pathImage, async function (err) {
      if (err) return res.status(500).send(err);
      await uploadUserImage(id, `${id}${extension}`);

      res.send({
        url: `${HTTP_SERVER_DOMAIN}/${PATH_USER_IMAGE}/${id}${extension}`,
      });
    });
  } catch (err) {
    res.status(409).send({ error: err.message });
  }
}

module.exports = uploadImage;
