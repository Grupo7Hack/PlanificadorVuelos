import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import { useLocalStorage } from "../hooks/useLocalStorage";
import "../css/Login.css";

export const Profile = () => {
  const [token] = useContext(AuthContext);

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

  const [userReservations, setUserReservations] = useState("");

  const [name, setName] = useState(nombre);
  if (userEmail === "") setUserEmail(email);
  if (profileImage === "") {
    setProfileImage(`http://localhost:8088/images/profiles/${foto}`);
  }
  // if (foto === "") {
  //   setProfileImage(`http://localhost:8088/images/profiles/user.png`);
  // }
  let counter = 0;
  if (userReservations === "" && counter < 2) {
    console.log(counter, userReservations);
    getReservations();
    counter++;
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

  async function getReservations() {
    const result = [];
    const response = await fetch(
      `http://localhost:8088/api/v1/reservation/${id}`
    )
      .then((response) => {
        return response.json();
      })
      .then((reservations) => {
        for (const reservation of Object.values(reservations)) {
          result.push(reservation);
        }
      });
    console.log(result);
    setUserReservations(result);
  }

  const homepage = !token ? (
    <Redirect to="login" />
  ) : (
    <div id="principal" className="cont_ppal">
      {userReservations && (
        <div>
          <ul className="reservation-results-list">
            {userReservations.map((d) => (
              <li key={d.id} className="reservation-result">
                <h2>
                  Reserva fecha{" "}
                  {new Date(Date.parse(d.fecha_reserva)).toLocaleString()}
                </h2>
                <h3>VUELO IDA:</h3>
                <p>
                  De {d.origen} a {d.destino}
                </p>
                <p>{new Date(Date.parse(d.fecha_inicio)).toLocaleString()}</p>
                <details>
                  <summary>Más información</summary>
                  <ul>
                    <li>Aerolínea: {d.aerolinea_ida}</li>
                    <li>Escalas: {d.escalas_ida}</li>
                    <li>{d.num_adultos} Adulto(s)</li>
                    <li>{d.num_ninos} Niño(s)</li>
                    <li>{d.num_bebes} Bebe(s)</li>
                  </ul>
                </details>
                <h3>VUELO VUELTA</h3>
                <p>
                  De {d.destino} a {d.origen}
                </p>
                <p>{new Date(Date.parse(d.fecha_fin)).toLocaleString()}</p>
                <details>
                  <summary>Más información</summary>
                  <ul>
                    <li>Aerolínea: {d.aerolinea_vuelta}</li>
                    <li>Escalas: {d.escalas_vuelta}</li>
                    <li>{d.num_adultos} Adulto(s)</li>
                    <li>{d.num_ninos} Niño(s)</li>
                    <li>{d.num_bebes} Bebe(s)</li>
                  </ul>
                </details>
                <h5>Precio: {d.precio}€</h5>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="forms-container">
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

        <form onSubmit={updateUser} className="user-data-form">
          <fieldset className="userInfo">
            <div className="userEmail">
              <input
                type="email"
                value={userEmail}
                onChange={eventEmail}
                onBlur={eventValidarEmail}
                placeholder="Email"
                autoComplete="off"
                name="email"
                id="email"
                disabled
              />
            </div>
            <div className="userName">
              <input
                type="text"
                value={name}
                onChange={eventName}
                placeholder="Nombre"
                autoComplete="off"
                name="name"
                id="name"
                required
              />
            </div>
            <div className="userPass">
              <input
                type="password"
                value={userPassword}
                onChange={eventPass}
                onKeyUp={eventValidarPass}
                placeholder="Contraseña"
                name="pass"
                id="pass"
              />
            </div>
            <div className="userRPass">
              <input
                type="password"
                value={rpassword}
                onChange={eventRPass}
                onKeyUp={eventValidarRPass}
                placeholder="Repetir contraseña"
                name="rpass"
                id="rpass"
              />
            </div>
          </fieldset>
          <input type="submit" value="Guardar" className="logInButton" />
        </form>
      </div>
    </div>
  );
  return homepage;
};
