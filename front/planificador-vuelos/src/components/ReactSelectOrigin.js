import React from "react";
import Select from "react-select";
import { useRemotePlaces } from "../hooks/useRemotePlaces";
import "../css/ReactSelect.css";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const ReactSelectOrigin = () => {
  const [, setDestination] = useLocalStorage("origen");
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
      placeholder={<div className="select-placeholder-text">Origen...</div>}
      onChange={handleChange}
      className="origin"
    />
  );
};
