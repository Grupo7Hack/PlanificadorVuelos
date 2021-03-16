import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import { useLocalStorage } from "../hooks/useLocalStorage";
import "../css/Profile.css";

export const Profile = () => {
  const [token, setToken] = useContext(AuthContext);

  const [profileImage, setProfileImage] = useLocalStorage("imgProfile");
  const [inputname, setInputName] = useLocalStorage("name");
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

  const [name, setName] = useState(nombre);
  if (userEmail === "") setUserEmail(email);
  if (profileImage === "") {
    setProfileImage(`http://localhost:8088/images/profiles/${foto}`);
  }
  if (foto === "") {
    setProfileImage(`http://localhost:8088/images/profiles/user.png`);
  }

  const onFileChange = (e) => {
    setOkMsg("");
    setFile(e.target.files[0]);
  };

  const eventName = (e) => {
    setOkMsg("");
    setName(e.target.value);
    setInputName(e.target.value);
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
  };

  const updateUser = async (e) => {
    e.preventDefault();
    let dataUserUpdate = {
      ...dataUser,
    };

    if (inputname) {
      dataUserUpdate = {
        ...dataUserUpdate,
        nombre: inputname,
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
    setInputName(nombre);
    if (foto !== "undefined") {
      setProfileImage(`http://localhost:8088/images/profiles/${foto}`);
    }
    setUserPassword("");
    setRPassword("");
    setOkMsg("Actualizado con exito");
    console.log("Respuesta update", responseData);
  };

  const homepage = !token ? (
    <Redirect to="login" />
  ) : (
    <div className="contenido-princ">
      {profileImage && (
        <div>
          <img src={profileImage} alt="imagen" className="profileImage"></img>
        </div>
      )}
      {errorMsg && <span style={{ backgroundColor: "red" }}>{errorMsg}</span>}
      {okMsg && <span style={{ backgroundColor: "pink" }}>{okMsg}</span>}

      <form onSubmit={newFile}>
        <div>
          <input type="file" onChange={onFileChange} className="fileInput" />
          <button type="submit">Actualizar</button>
        </div>
      </form>

      <form onSubmit={updateUser}>
        <fieldset className="userInfo">
          <legend>Datos Personales</legend>
          <div className="userName">
            <label htmlFor="name">Nombre: </label>
            <input
              type="text"
              value={name}
              onChange={eventName}
              name="name"
              id="name"
              required
            />
          </div>
          <div className="userEmail">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              value={userEmail}
              onChange={eventEmail}
              onBlur={eventValidarEmail}
              name="email"
              id="email"
              disabled
            />
          </div>
          <div className="userPass">
            <label htmlFor="password">Contraseña: </label>
            <input
              type="password"
              value={userPassword}
              onChange={eventPass}
              onKeyUp={eventValidarPass}
              name="pass"
              id="pass"
            />
          </div>
          <div className="userRPass">
            <label htmlFor="password">Repetir contraseña: </label>
            <input
              type="password"
              value={rpassword}
              onChange={eventRPass}
              onKeyUp={eventValidarRPass}
              name="rpass"
              id="rpass"
            />
          </div>
        </fieldset>
        <input type="submit" value="Guardar" className="submitButton" />
      </form>
    </div>
  );
  return homepage;
};
