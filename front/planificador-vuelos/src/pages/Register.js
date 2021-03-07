import React, { useState, useContext } from "react";
// import { AuthContext } from "../../App";
// import { useLocalStorage } from "../useLocalStorage";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");
  // const [token, setToken] = useContext(AuthContext);
  // const [token, setToken] = useLocalStorage("accessToken", "");
  const [errorMsg, setErrorMsg] = useState("");
  const [okMsg, setOkMsg] = useState("");
  const expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  const eventName = (e) => {
    setName(e.target.value);
  };

  const eventEmail = (e) => {
    setEmail(e.target.value);
  };
  const eventPass = (e) => {
    setPassword(e.target.value);
  };

  const eventRPass = (e) => {
    setRPassword(e.target.value);
  };

  const eventValidarPass = (e) => {
    if (rpassword !== "" && rpassword !== password) {
      setErrorMsg("Las contraseñas no coinciden");
    } else {
      setErrorMsg("");
    }
  };

  const eventValidarRPass = (e) => {
    if (rpassword === "" || rpassword !== password) {
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

  const registerUser = async (e) => {
    e.preventDefault();
    if (password !== rpassword) {
      setErrorMsg("Las contraseñas no coinciden, verifique antes de guardar");
    } else if (!expr.test(email)) {
      setErrorMsg("El email es invalido");
    } else {
      const newUser = {
        name: name,
        email: email,
        password: password,
        repeatPassword: rpassword,
      };
      const url = "http://localhost:8088/api/v1/users/register";
      const saveUser = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const token = await saveUser.json();
      if (saveUser.status === 201) {
        // setToken(token.accessToken);
        setOkMsg(
          `Usuario registrado con exito, activa tu cuenta con el codigo de verificación que fue enviado a ${email}`
        );
        setName("");
        setEmail("");
        setPassword("");
        setRPassword("");
        setErrorMsg("");
      } else {
        setErrorMsg("Error al registrar el usuario");
        setErrorMsg(token.error);
        // setName("");
        // setEmail("");
        setPassword("");
        setRPassword("");
      }
    }
  };
  return (
    <div id="principal" className="cont_ppal">
      {errorMsg && <span style={{ backgroundColor: "red" }}>{errorMsg}</span>}
      {okMsg && <span style={{ backgroundColor: "pink" }}>{okMsg}</span>}
      <form onSubmit={registerUser}>
        <fieldset>
          <legend>Registro</legend>
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
            value={email}
            onChange={eventEmail}
            onBlur={eventValidarEmail}
            name="email"
            id="email"
            required
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            value={password}
            onChange={eventPass}
            onKeyUp={eventValidarPass}
            name="pass"
            id="pass"
            required
          />
          <label htmlFor="password">Repetir Password: </label>
          <input
            type="password"
            value={rpassword}
            onChange={eventRPass}
            onKeyUp={eventValidarRPass}
            name="rpass"
            id="rpass"
            required
          />
          <input type="submit" value="Registrar" />
        </fieldset>
      </form>
    </div>
  );
};
