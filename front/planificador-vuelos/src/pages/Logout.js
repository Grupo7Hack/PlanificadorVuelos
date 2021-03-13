import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";

export const Logout = () => {
  const [token, setToken] = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");

  const logoutUser = async () => {
    const userLogout = await fetch(
      "http://localhost:8088/api/v1/users/logout",
      {
        method: "POST",
      }
    );
    // const token = await userLogout.json();
    localStorage.setItem("accessToken", JSON.stringify(""));
    setToken("");
  };
  logoutUser();
  const redirect = <Redirect to="/" />;

  return redirect;
};
