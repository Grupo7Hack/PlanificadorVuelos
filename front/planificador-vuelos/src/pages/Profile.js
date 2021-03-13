import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const Profile = () => {
  const [token, setToken] = useContext(AuthContext);

  const [profileImage, setProfileImage] = useLocalStorage("imgProfile");
  const [name, setName] = useLocalStorage("name");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [rpassword, setRPassword] = useState("");
  const [file, setFile] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [okMsg, setOkMsg] = useState("");

  const expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const dataUser = JSON.parse(window.atob(base64));
  const { id, nombre, email, password, foto } = dataUser;

  if (userEmail === "") setUserEmail(email);
  if (profileImage === "")
    setProfileImage(`http://localhost:8088/images/profiles/${foto}`);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const eventName = (e) => {
    if (name === "") {
      setName(nombre);
    } else {
      setName(e.target.value);
    }
  };

  const eventEmail = (e) => {
    setUserEmail(e.target.value);
  };
  const eventPass = (e) => {
    setUserPassword(e.target.value);
  };

  const eventRPass = (e) => {
    setRPassword(e.target.value);
  };

  const eventValidarPass = (e) => {
    if (rpassword !== "" && rpassword !== userPassword) {
      setErrorMsg("Las contraseñas no coinciden");
    } else {
      setErrorMsg("");
    }
  };

  const eventValidarRPass = (e) => {
    if (rpassword === "" || rpassword !== userPassword) {
      setErrorMsg("Las contraseñas no coinciden");
    } else {
      setErrorMsg("");
    }
  };

  const eventValidarEmail = (e) => {
    if (!expr.test(email)) {
      setErrorMsg("El email es invalido");
    } else {
      setErrorMsg("");
    }
  };

  const newFile = async (e) => {
    e.preventDefault();
    let data = new FormData();

    // data.append("userid", id);
    data.append("image", file);

    const uploadFile = await fetch(
      "http://localhost:8088/api/v1/users/upload",

      {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const response = await uploadFile.json();
    setProfileImage(response.url);
    // console.log("Respuesta", response, response.url);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    let dataUserUpdate = {
      ...dataUser,
    };

    if (name) {
      dataUserUpdate = {
        ...dataUserUpdate,
        nombre: name,
      };
    }

    if (userPassword) {
      if (userPassword === rpassword) {
        dataUserUpdate = {
          ...dataUserUpdate,
          password: userPassword,
          repeatPassword: rpassword,
        };
      }
    }
    console.log("data:", dataUserUpdate);

    const uploadDataUser = await fetch(
      `http://localhost:8088/api/v1/users/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(dataUserUpdate),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const responseData = await uploadDataUser.json();
    const { nombre, foto } = responseData;
    setName(nombre);
    if (foto !== "undefined") {
      setProfileImage(`http://localhost:8088/images/profiles/${foto}`);
    }
    setUserPassword("");
    setRPassword("");
    console.log("Respuesta update", responseData);
  };

  const homepage = !token ? (
    <Redirect to="login" />
  ) : (
    <div>
      {profileImage && (
        <div>
          <img src={profileImage} alt="imagen" width="150px"></img>
        </div>
      )}
      {errorMsg && <span style={{ backgroundColor: "red" }}>{errorMsg}</span>}
      {okMsg && <span style={{ backgroundColor: "pink" }}>{okMsg}</span>}

      <form onSubmit={newFile}>
        <div>
          <label>Seleccionar un archivo</label>
          <input type="file" onChange={onFileChange} />
        </div>
        <button type="submit">Subir</button>
      </form>

      <form onSubmit={updateUser}>
        <fieldset>
          <legend>Datos Personales</legend>
          <label htmlFor="name">Nombre: </label>
          <input
            type="text"
            value={name}
            onChange={eventName}
            name="name"
            id="name"
            required
          />
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            value={userEmail}
            onChange={eventEmail}
            onBlur={eventValidarEmail}
            name="email"
            id="email"
            required
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            value={userPassword}
            onChange={eventPass}
            onKeyUp={eventValidarPass}
            name="pass"
            id="pass"
          />
          <label htmlFor="password">Repetir Password: </label>
          <input
            type="password"
            value={rpassword}
            onChange={eventRPass}
            onKeyUp={eventValidarRPass}
            name="rpass"
            id="rpass"
          />
          <input type="submit" value="Guardar Cambios" />
        </fieldset>
      </form>
    </div>
  );
  return homepage;
};
