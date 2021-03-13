import React, { useEffect, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AuthContext } from "../App";

export const useImageUser = (data) => {
  const [profileImage, setProfileImage] = useLocalStorage("imgProfile");
  const [token, setToken] = useContext(AuthContext);

  useEffect(() => {
    const dataImage = async () => {
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
      console.log("Respuesta", response, response.url);
      setProfileImage(response.url);
    };
    dataImage();
  }, []);
  return [profileImage];
};
