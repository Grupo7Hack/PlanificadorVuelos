import React from "react";
import Select from "react-select";
import { useRemotePlaces } from "../hooks/useRemotePlaces";
import "../css/ReactSelect.css";

export const ReactSelectDestination = ({ destino }) => {
  const [, setDestination] = destino;
  const [places] = useRemotePlaces();

  const keysToKeep = ["Name", "Id"];

  const airports = [].concat.apply([], places);

  const redux = (array) =>
    array.map((o) =>
      keysToKeep.reduce((acc, curr) => {
        acc[curr] = o[curr];
        return acc;
      }, {})
    );

  const reduxedPlaces = redux(airports);

  const placesForSelect = reduxedPlaces.map(({ Name: label, Id: value }) => ({
    label,
    value,
  }));

  const handleChange = (selectedOption) => {
    setDestination({ selectedOption });
  };

  return (
    <Select
      options={placesForSelect}
      placeholder={<div className="select-placeholder-text">Destino...</div>}
      onChange={handleChange}
      className="destination"
    />
  );
};
