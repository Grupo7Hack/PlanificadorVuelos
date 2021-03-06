import { useEffect, useState } from "react";

export const useRemotePlaces = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const loadplaces = async () => {
      const response = await fetch(
        "http://localhost:8088/api/v1/flights/places"
      );
      if (response.status === 200) {
        const json = await response.json();
        setPlaces(json);
      }
    };
    loadplaces();
  }, []);

  return [places, setPlaces];
};
