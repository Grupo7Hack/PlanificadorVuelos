import React, { useState } from "react";
import { useRemotePlaces } from "../hooks/useRemotePlaces";

export const Homepage = ({ render }) => {
  const [places] = useRemotePlaces();
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();

  const originHandler = (event) => {
    setOrigin(event.target.value);
    let placesArray = places.map((place) => place.nombre.toLowerCase());
    let coincidences = placesArray.filter(
      (place) => place.indexOf(event.target.value.toLowerCase()) >= 0
    );
    console.log(coincidences);
  };

  const destinationHandler = (event) => {
    setDestination(event.target.value);
    let placesArray = places.map((place) => place.nombre.toLowerCase());
    let coincidences = placesArray.filter(
      (place) => place.indexOf(event.target.value.toLowerCase()) >= 0
    );
    console.log(coincidences);
  };

  const handleSearch = () => {
    const url = `http://localhost:8088/api/v1/flights/TFN-sky/JFK-sky/anytime`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((flights) => {
        console.log(flights);
      });
  };

  return (
    <div>
      <select>
        <option>Ida y vuelta</option>
        <option>Solo ida</option>
      </select>
      <ul>
        <li>
          <label>Adultos</label>
          <div>
            <div>
              <button>
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    focusable="false"
                  >
                    <path d="M20 13H4v-2h16v2z"></path>
                  </svg>
                </span>
              </button>
              <span>
                <span>1</span>
                {/* <span>Adultos</span> */}
              </span>
              <button>
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    focusable="false"
                  >
                    <path d="M20 13h-7v7h-2v-7H4v-2h7V4h2v7h7v2z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </li>
        <li>
          <label>Niños (de 2 a 12 años)</label>
          <div>
            <div>
              <button>
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    focusable="false"
                  >
                    <path d="M20 13H4v-2h16v2z"></path>
                  </svg>
                </span>
              </button>
              <span>
                <span>0</span>
                {/* <span>Niños</span> */}
              </span>
              <button>
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    focusable="false"
                  >
                    <path d="M20 13h-7v7h-2v-7H4v-2h7V4h2v7h7v2z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </li>
        <li>
          <label>Bebés</label>
          <div>
            <div>
              <button>
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    focusable="false"
                  >
                    <path d="M20 13H4v-2h16v2z"></path>
                  </svg>
                </span>
              </button>
              <span>
                <span>0</span>
                {/* <span>Bebés</span> */}
              </span>
              <button>
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    focusable="false"
                  >
                    <path d="M20 13h-7v7h-2v-7H4v-2h7V4h2v7h7v2z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </li>
      </ul>
      <select>
        <option>Turista</option>
        <option>Business</option>
        <option>Primera</option>
      </select>
      <input
        type="text"
        name="origin"
        placeholder="Origen"
        onChange={originHandler}
      ></input>
      <input
        type="text"
        name="destination"
        placeholder="Destino"
        onChange={destinationHandler}
      ></input>
      <input type="date"></input>
      <input type="date"></input>
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};
