import React, { useState } from "react";
import Select from "react-select";
import { useRemotePlaces } from "../hooks/useRemotePlaces";
import "../css/ReactSelect.css";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const ReactSelectOrigin = () => {
  const [, setDestination] = useLocalStorage("origen");
  const [places] = useRemotePlaces();

  const keysToKeep = ["nombre", "codigo_iata"];

  const redux = (array) =>
    array.map((o) =>
      keysToKeep.reduce((acc, curr) => {
        acc[curr] = o[curr];
        return acc;
      }, {})
    );

  const reduxedPlaces = redux(places);

  const placesForSelect = reduxedPlaces.map(
    ({ nombre: label, codigo_iata: value }) => ({
      label,
      value,
    })
  );

  const handleChange = (selectedOption) => {
    setDestination({ selectedOption });
  };

  return (
    <Select
      options={placesForSelect}
      placeholder={
        <div className="select-placeholder-text">
          Seleccione aeropuerto de origen...
        </div>
      }
      onChange={handleChange}
    />
  );
};
