import React, { useState } from "react";
import { ReactSelectOrigin } from "../components/ReactSelectOrigin";
import { ReactSelectDestination } from "../components/ReactSelectDestination";
import { useLocalStorage } from "../hooks/useLocalStorage";
import "../css/Homepage.css";
import adultImg from "../img/adult.png";
import kidImg from "../img/kid.png";
import babyImg from "../img/baby.png";

export const Homepage = ({ origen, destino }) => {
  let initialDatePickers = (
    <div className="datesContainer">
      <input
        type="date"
        min="2021-03-09"
        max="2022-03-09"
        name="trip-start"
        required="required"
        onChange={outboundDateHandler}
      ></input>
      <input
        type="date"
        min="2021-03-09"
        max="2022-03-09"
        name="trip-end"
        onChange={inboundDateHandler}
      ></input>
    </div>
  );

  const [token] = useLocalStorage("accessToken");

  const [roundTrip, setRoundTrip] = useState(initialDatePickers);
  const [origin] = origen;
  const [destination] = destino;
  const [originFR, setOriginFR] = useState({});
  const [destinationFR, setDestinationFR] = useState({});
  const [category, setCategory] = useState("Economy");
  const [outboundDate, setOutboundDate] = useState("");
  const [inboundDate, setInboundDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [maxStops, setMaxStops] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [maxDuration, setMaxDuration] = useState(300);
  const [searchResults, setSearchResults] = useState();
  const [selectedOutboundFlight, setSelectedOutboundFlight] = useState();
  const [selectedInboundFlight, setSelectedInboundFlight] = useState();
  const [okMsg, setOkMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  let arrangedResultsData = [];

  const handleSearch = (e) => {
    e.preventDefault();

    const inboundDateChecked = inboundDate ? inboundDate : 0;

    setErrorMsg("");
    setOkMsg("");

    setSelectedOutboundFlight();
    setSelectedInboundFlight();

    setOriginFR(origin);
    setDestinationFR(destination);

    const iataOrigin = origin.selectedOption.value;
    const iataDestination = destination.selectedOption.value;

    const url = `http://localhost:8088/api/v1/flights/${category}/${iataOrigin}/${iataDestination}/${outboundDate}/${inboundDateChecked}/${adults}/${children}/${infants}/${maxStops}`;
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

  function outboundDateHandler(e) {
    setOutboundDate(e.target.value);
  }

  function inboundDateHandler(e) {
    setInboundDate(e.target.value);
  }

  function handleRadioButton0(e) {
    setMaxStops(e.target.value);
  }

  function handleRadioButton1(e) {
    setMaxStops(e.target.value);
  }

  function handleRadioButton2(e) {
    setMaxStops(e.target.value);
  }

  function handlePriceFilter(e) {
    setMaxPrice(e.target.value);
  }

  function handleDurationFilter(e) {
    setMaxDuration(e.target.value);
  }

  const roundTripHandler = (e) => {
    if (e.target.value === "Ida y vuelta") {
      setRoundTrip(initialDatePickers);
    } else {
      let datePickers = (
        <div className="datesContainer">
          <input
            type="date"
            min="2021-03-09"
            max="2022-03-09"
            name="trip-start"
            required="required"
            onChange={outboundDateHandler}
          ></input>
        </div>
      );
      setInboundDate("");
      setRoundTrip(datePickers);
    }
  };

  const numberOfPassengersOptions = [];

  for (let i = 1; i < 9; i++) {
    numberOfPassengersOptions.push(<option key={i}>{i}</option>);
  }

  let searchForm = (
    <div className="searchForm">
      <form onSubmit={handleSearch} className="search-form">
        <div className="roundTripAndClassContainer">
          <select className="roundTrip" onChange={roundTripHandler}>
            <option>Ida y vuelta</option>
            <option>Solo ida</option>
          </select>
          <select className="class" onChange={categoryHandler}>
            <option value="Economy">Turista</option>
            <option value="PremiumEconomy">Turista Premium</option>
            <option>Business</option>
            <option value="First">Primera</option>
          </select>
        </div>
        <div className="placesAndDatesContainer">
          <div className="placesContainer">
            <ReactSelectOrigin origen={origen}></ReactSelectOrigin>
            <ReactSelectDestination destino={destino}></ReactSelectDestination>
          </div>
          {roundTrip}
        </div>
        <div className="passengersAndScales">
          <div className="passengers">
            <div className="passenger-count">
              <select onChange={numberOfAdultsHandler}>
                {numberOfPassengersOptions}
              </select>
              <img
                src={adultImg}
                alt="Adult"
                className="passengerImg"
                width="45px"
                height="45px"
              />
            </div>
            <div className="passenger-count">
              <select onChange={numberOfChildrenHandler}>
                <option key="0">0</option>
                {numberOfPassengersOptions}
              </select>
              <img
                src={kidImg}
                alt="Kid"
                className="passengerImg"
                width="45px"
                height="45px"
              />
            </div>
            <div className="passenger-count">
              <select onChange={numberOfInfantsHandler}>
                <option key="0">0</option>
                {numberOfPassengersOptions}
              </select>
              <img
                src={babyImg}
                alt="baby"
                className="passengerImg"
                width="45px"
                height="45px"
              />
            </div>
          </div>
          <div className="priceDurationAndScales">
            <div className="scales">
              <label>Escalas:</label>
              <div className="scales-info">
                <input
                  type="radio"
                  id="scales0"
                  name="contact"
                  value="0"
                  defaultChecked="true"
                  onChange={handleRadioButton0}
                ></input>
                <label htmlFor="scales0">0</label>
              </div>
              <div className="scales-info">
                <input
                  type="radio"
                  id="scales1"
                  name="contact"
                  value="1"
                  onChange={handleRadioButton1}
                ></input>
                <label htmlFor="scales1">1</label>
              </div>
              <div className="scales-info">
                <input
                  type="radio"
                  id="scales2"
                  name="contact"
                  value="2"
                  onChange={handleRadioButton2}
                ></input>
                <label htmlFor="scales2">2+</label>
              </div>
            </div>
            <div className="priceFilter">
              Precio máximo:{" "}
              <select value={maxPrice} onChange={handlePriceFilter}>
                <option value="100">100€</option>
                <option value="200">200€</option>
                <option value="300">300€</option>
                <option value="500">500€</option>
                <option value="1000">1.000€</option>
                <option value="2000">2.000€</option>
                <option value="100000">{">"}2.000€</option>
              </select>
            </div>
            <div className="durationFilter">
              Duración máxima:{" "}
              <select value={maxDuration} onChange={handleDurationFilter}>
                <option value="60">1 hora</option>
                <option value="120">2 horas</option>
                <option value="180">3 horas</option>
                <option value="300">5 horas</option>
                <option value="600">10 horas</option>
                <option value="1200">20 horas</option>
                <option value="100000">{">"}20 horas</option>
              </select>
            </div>
          </div>
        </div>
        <button type="submit" className="searchButton">
          Buscar
        </button>
      </form>
    </div>
  );

  const makeReservation = async (outb, inb) => {
    const url = "http://localhost:8088/api/v1/reservation/";

    const data = {
      origen: originFR.selectedOption.label,
      destino: destinationFR.selectedOption.label,
      fechaIda: outb[1].Departure,
      fechaVuelta: inb ? inb[1].Departure : "",
      escalasIda: outb[1].Stops.length,
      escalasVuelta: inb ? inb[1].Stops.length : 0,
      precio: outb.Price + (inb ? inb.Price : 0),
      numAdultos: adults,
      numNinos: children,
      numBebes: infants,
      aerolineaIda: outb.AirlineName,
      aerolineaVuelta: inb ? inb.AirlineName : "",
    };

    const saveReservation = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    // const result = saveReservation.json();
    if (saveReservation.status === 201) {
      setErrorMsg("");
      setOkMsg(
        `Reserva realizada con éxito, se han enviado los datos de la misma a su correo electrónico.`
      );
      // setSelectedOutboundFlight();
      // setSelectedInboundFlight();
    } else {
      setOkMsg("");
      setErrorMsg("Error al realizar la reserva");
    }
  };

  const flightSelectionHandler = async (e) => {
    e.preventDefault();
    let inboundOrOutbound = selectedOutboundFlight ? "Inbound" : "Outbound";

    if (inboundOrOutbound === "Inbound") {
      const numberOfButton = e.target.id;
      const inboundFlightToSelect = arrangedResultsData[numberOfButton];
      setSelectedInboundFlight(inboundFlightToSelect);
      if (token) {
        makeReservation(selectedOutboundFlight, inboundFlightToSelect);
      } else {
        window.prompt(
          "Por favor regístrese o inicie sesión para efectúar una reserva."
        );
      }
    } else {
      if (inboundDate) {
        const numberOfButton = e.target.id;
        const outboundFlightToSelect = arrangedResultsData[numberOfButton];
        setSelectedOutboundFlight(outboundFlightToSelect);
      } else {
        if (token) {
          const numberOfButton = e.target.id;
          const outboundFlightToSelect = arrangedResultsData[numberOfButton];
          setSelectedOutboundFlight(outboundFlightToSelect);
          makeReservation(outboundFlightToSelect);
        } else {
          window.prompt(
            "Por favor regístrese o inicie sesión para efectúar una reserva."
          );
        }
      }
    }
  };

  if (searchResults) {
    const airlines = { ...searchResults.Carriers };
    const prices = { ...searchResults.Itineraries };
    const arrangedResults = { ...searchResults.Legs };

    const airlinesMap = new Map(Object.entries(airlines));
    const pricesMap = new Map(Object.entries(prices));
    const arrangedResultsMap = new Map(Object.entries(arrangedResults));

    let airlinesData = [];
    let pricesData = [];

    for (let airline of airlinesMap) {
      airlinesData.push(airline[1]);
    }

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
        return (
          price.OutboundLegId === resultId || price.InboundLegId === resultId
        );
      });
      if (foundPrice) {
        arrangedResult.Price = foundPrice.PricingOptions[0].Price;
        arrangedResultsData.push(arrangedResult);
      }
    }

    if (pricesData.length < 1) {
      return (
        <div className="all-container">
          <span style={{ backgroundColor: "red" }}>
            No existen vuelos, modifique los filtros.
          </span>
          {searchForm}
        </div>
      );
    } else {
      let inboundOrOutbound = selectedOutboundFlight ? "Inbound" : "Outbound";
      let typeOfFlight = selectedOutboundFlight ? "vuelta" : "ida";
      return (
        <div className="all-container">
          {errorMsg && (
            <span style={{ backgroundColor: "red" }}>{errorMsg}</span>
          )}
          {okMsg && <span style={{ backgroundColor: "pink" }}>{okMsg}</span>}
          {searchForm}
          <div className="search-results">
            <div>
              {selectedOutboundFlight && (
                <div
                  key={selectedOutboundFlight}
                  className="individual-result-Outbound"
                >
                  <div className="logo-Outbound-container">
                    <img
                      src={selectedOutboundFlight.AirlineImageUrl}
                      max-width="10px"
                      alt="Airline Logo"
                      className="airline-logo-Outbound"
                    ></img>
                    {/* <div>{selectedOutboundFlight.AirlineName}</div> */}
                  </div>
                  <div className="round-Outbound-container">
                    <div className="info-selec">Vuelo de ida seleccionado</div>
                    <div className="departure-Outbound">
                      {origin.selectedOption.value}:{" "}
                      {new Date(
                        Date.parse(selectedOutboundFlight[1].Departure)
                      ).toLocaleString()}
                    </div>
                    <div className="arrival-Outbound">
                      {destination.selectedOption.value}:{" "}
                      {new Date(
                        Date.parse(selectedOutboundFlight[1].Arrival)
                      ).toLocaleString()}
                    </div>
                    <div className="scalesAndPriceContainer">
                      <div className="escalas-Outbound">
                        Escalas: {selectedOutboundFlight[1].Stops.length}
                      </div>
                      <div className="precio-Outbound">
                        Precio: {selectedOutboundFlight.Price}€
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {arrangedResultsData.map((result, index) => {
              if (
                result[1].Directionality === inboundOrOutbound &&
                result.Price < maxPrice &&
                result[1].Duration < maxDuration
              ) {
                let departureDate = Date.parse(result[1].Departure);
                let arrangedDepartureDate = new Date(departureDate);
                let arrivalDate = Date.parse(result[1].Arrival);
                let arrangedArrivalDate = new Date(arrivalDate);
                let originAirport =
                  inboundOrOutbound === "Outbound" ? originFR : destinationFR;
                let destinationAirport =
                  inboundOrOutbound === "Inbound" ? originFR : destinationFR;

                return (
                  <div
                    key={index}
                    className={`individual-result-${inboundOrOutbound}`}
                  >
                    <div className={`logo-${inboundOrOutbound}-container`}>
                      <img
                        src={result.AirlineImageUrl}
                        max-width="10px"
                        alt="Airline Logo"
                        className={`airline-logo-${inboundOrOutbound}`}
                      ></img>
                      {/* <div>{result.AirlineName}</div> */}
                    </div>
                    <div className={`round-${inboundOrOutbound}-container`}>
                      <div className={`departure-${inboundOrOutbound}`}>
                        {originAirport.selectedOption.value}:{" "}
                        {arrangedDepartureDate.toLocaleString()}
                      </div>
                      <div className={`arrival-${inboundOrOutbound}`}>
                        {destinationAirport.selectedOption.value}:{" "}
                        {arrangedArrivalDate.toLocaleString()}
                      </div>
                      <div className="scalesAndPriceContainer">
                        <div className={`escalas-${inboundOrOutbound}`}>
                          Escalas: {result[1].Stops.length}
                        </div>
                        <div className={`precio-${inboundOrOutbound}`}>
                          Precio: {result.Price}€
                        </div>
                      </div>
                      <button
                        onClick={flightSelectionHandler}
                        id={index}
                        className={`btn-select-${inboundOrOutbound}`}
                      >
                        Seleccionar vuelo de {typeOfFlight}
                      </button>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      );
    }
  }

  return <div className="all-container">{searchForm}</div>;
};
