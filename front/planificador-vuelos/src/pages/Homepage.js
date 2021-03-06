import React, { useState } from "react";
import { ReactSelectOrigin } from "../components/ReactSelectOrigin";
import { ReactSelectDestination } from "../components/ReactSelectDestination";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const Homepage = () => {
  const [origin] = useLocalStorage("origen");
  const [destination] = useLocalStorage("destino");
  const [category, setCategory] = useState("Economy");
  const [outboundDate, setOutboundDate] = useState("");
  const [inboundDate, setInboundDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [maxStops, setMaxStops] = useState(0);
  const [searchResults, setSearchResults] = useState();

  const handleSearch = (e) => {
    e.preventDefault();

    const iataOrigin = origin.selectedOption.value;
    const iataDestination = destination.selectedOption.value;

    const url = `http://localhost:8088/api/v1/flights/${category}/${iataOrigin}/${iataDestination}/${outboundDate}/${adults}/${children}/${infants}/${maxStops}`;
    fetch(url, {
      method: "POST",
    })
      .then((response) => {
        return response.json();
      })
      .then((flights) => {
        setSearchResults({ ...flights.body });
      });
  };

  const maxStopsHandler = (e) => {
    setMaxStops(e.target.value);
  };

  const numberOfAdultsHandler = (e) => {
    setAdults(e.target.value);
  };

  const numberOfChildrenHandler = (e) => {
    setChildren(e.target.value);
  };

  const numberOfInfantsHandler = (e) => {
    setInfants(e.target.value);
  };

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const outboundDateHandler = (e) => {
    setOutboundDate(e.target.value);
  };

  const inboundDateHandler = (e) => {
    setInboundDate(e.target.value);
  };

  const numberOfPassengersOptions = [];

  for (let i = 1; i < 9; i++) {
    numberOfPassengersOptions.push(<option key={i}>{i}</option>);
  }

  if (searchResults) {
    const airlines = { ...searchResults.Carriers };
    const prices = { ...searchResults.Itineraries };
    const arrangedResults = { ...searchResults.Legs };

    const airlinesMap = new Map(Object.entries(airlines));
    const pricesMap = new Map(Object.entries(prices));
    const arrangedResultsMap = new Map(Object.entries(arrangedResults));

    let airlinesData = [];
    let pricesData = [];
    let arrangedResultsData = [];

    for (let airline of airlinesMap) {
      airlinesData.push(airline[1]);
    }
    console.log(airlinesData);

    for (let price of pricesMap) {
      pricesData.push(price[1]);
    }

    for (let arrangedResult of arrangedResultsMap) {
      let airlineId = arrangedResult[1].FlightNumbers[0].CarrierId;
      let resultId = arrangedResult[1].Id;

      let foundAirline = airlinesData.find(
        (airline) => airline.Id === airlineId
      );
      arrangedResult.AirlineName = foundAirline.Name;
      arrangedResult.AirlineImageUrl = foundAirline.ImageUrl;

      let foundPrice = pricesData.find((price) => {
        return price.OutboundLegId === resultId;
      });
      arrangedResult.Price = foundPrice.PricingOptions[0].Price;

      arrangedResultsData.push(arrangedResult);
    }

    if (pricesData.length < 1) {
      return (
        <div>
          <form onSubmit={handleSearch}>
            {/* handle onChange del select para ocultar el input de fecha de vuelta */}
            <select>
              <option>Ida y vuelta</option>
              <option>Solo ida</option>
            </select>
            <br></br>
            <br></br>
            <label>
              Seleccione el máximo de escalas a realizar (0 para buscar
              únicamente vuelos directos).
            </label>
            <br></br>
            <select onChange={maxStopsHandler}>
              <option>0</option>
              <option>1</option>
              <option value="">2 o más</option>
            </select>
            <br></br>
            <br></br>
            <label>Seleccione el número de pasajeros...</label>
            <br></br>
            <label>Adultos:</label>
            <br></br>
            <select onChange={numberOfAdultsHandler}>
              {numberOfPassengersOptions}
            </select>
            <br></br>
            <br></br>
            <label>Niños (de 2 a 12 años):</label>
            <br></br>
            <select onChange={numberOfChildrenHandler}>
              <option key="0">0</option>
              {numberOfPassengersOptions}
            </select>
            <br></br>
            <br></br>
            <label>Bebés:</label>
            <br></br>
            <select onChange={numberOfInfantsHandler}>
              <option key="0">0</option>
              {numberOfPassengersOptions}
            </select>
            <br></br>
            <br></br>
            <label>Seleccione la clase de los asientos.</label>
            <br></br>
            <select onChange={categoryHandler}>
              <option value="Economy">Turista</option>
              <option value="PremiumEconomy">Turista Premium</option>
              <option>Business</option>
              <option value="First">Primera</option>
            </select>
            <br></br>
            <br></br>
            <ReactSelectOrigin></ReactSelectOrigin>
            <ReactSelectDestination></ReactSelectDestination>
            <br></br>
            <label>Seleccione la fecha de ida.</label>
            <br></br>
            <input
              type="date"
              required="required"
              onChange={outboundDateHandler}
            ></input>
            <br></br>
            <br></br>
            <label>Seleccione la fecha de vuelta.</label>
            <br></br>
            <input type="date" onChange={inboundDateHandler}></input>
            <br></br>
            <br></br>
            <button type="submit">Buscar</button>
          </form>
          <br></br>
          <div>No existen vuelos, modifique los filtros.</div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            {arrangedResultsData.map((result) => {
              return (
                <div>
                  <img
                    src={result.AirlineImageUrl}
                    max-width="10px"
                    alt="Airline Logo"
                  ></img>
                  <div>{result.AirlineName}</div>
                  <div>Salida: {result[1].Departure.toLocaleString()}</div>
                  <div>Llegada: {result[1].Arrival.toLocaleString()}</div>
                  <div>Duración (en minutos): {result[1].Duration}</div>
                  <div>Escalas: {result[1].Stops.length}</div>
                  <div>{result.Price}€</div>
                  <br></br>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        {/* handle onChange del select para ocultar el input de fecha de vuelta */}
        <select>
          <option>Ida y vuelta</option>
          <option>Solo ida</option>
        </select>
        <br></br>
        <br></br>
        <label>
          Seleccione el máximo de escalas a realizar (0 para buscar únicamente
          vuelos directos).
        </label>
        <br></br>
        <select onChange={maxStopsHandler}>
          <option>0</option>
          <option>1</option>
          <option value="2">2 o más</option>
        </select>
        <br></br>
        <br></br>
        <label>Seleccione el número de pasajeros...</label>
        <br></br>
        <label>Adultos:</label>
        <br></br>
        <select onChange={numberOfAdultsHandler}>
          {numberOfPassengersOptions}
        </select>
        <br></br>
        <br></br>
        <label>Niños (de 2 a 12 años):</label>
        <br></br>
        <select onChange={numberOfChildrenHandler}>
          <option key="0">0</option>
          {numberOfPassengersOptions}
        </select>
        <br></br>
        <br></br>
        <label>Bebés:</label>
        <br></br>
        <select onChange={numberOfInfantsHandler}>
          <option key="0">0</option>
          {numberOfPassengersOptions}
        </select>
        <br></br>
        <br></br>
        <label>Seleccione la clase de los asientos.</label>
        <br></br>
        <select onChange={categoryHandler}>
          <option value="Economy">Turista</option>
          <option value="PremiumEconomy">Turista Premium</option>
          <option>Business</option>
          <option value="First">Primera</option>
        </select>
        <br></br>
        <br></br>
        <ReactSelectOrigin></ReactSelectOrigin>
        <ReactSelectDestination></ReactSelectDestination>
        <br></br>
        <label>Seleccione la fecha de ida.</label>
        <br></br>
        <input
          type="date"
          required="required"
          onChange={outboundDateHandler}
        ></input>
        <br></br>
        <br></br>
        <label>Seleccione la fecha de vuelta.</label>
        <br></br>
        <input type="date" onChange={inboundDateHandler}></input>
        <br></br>
        <br></br>
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
};
