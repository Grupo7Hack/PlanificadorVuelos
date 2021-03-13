import React, { useEffect, useState } from "react";

export const useLocalStorage = (key, valorInicial = "") => {
  const value = window.localStorage.getItem(key)
    ? JSON.parse(window.localStorage.getItem(key))
    : valorInicial;

  const [valueLocal, setValueLocal] = useState(value);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(valueLocal));
  }, [valueLocal]);
  return [valueLocal, setValueLocal];
};
