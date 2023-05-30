import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [displayCountries, setDisplayCountries] = useState([]);
  const [displayOneCountry, setDisplayOneCountry] = useState(null);
  const [weatherInformation, setWeatherInformation] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);
  useEffect(() => {
    if (displayOneCountry) {
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${displayOneCountry.capitalInfo.latlng[0]}&lon=${displayOneCountry.capitalInfo.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`;
      axios.get(apiURL).then((res) => {
        setWeatherInformation(res.data);
      });
    }
  }, [displayOneCountry]);

  const handleChange = (event) => {
    setValue(event.target.value.toLowerCase());
  };
  const handleSearch = (event) => {
    event.preventDefault();
    const list = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value)
    );
    setDisplayCountries(list);
    if (list.length === 1) {
      setDisplayOneCountry(list[0]);
    } else {
      setDisplayOneCountry(null);
    }
  };

  const handleShowCountry = (country) => {
    setDisplayOneCountry(country);
  };

  let countryList = null;
  if (displayOneCountry) {
    countryList = (
      <div>
        <h2>{displayOneCountry.name.common}</h2>
        <div>capital {displayOneCountry.capital}</div>
        <div>area {displayOneCountry.area}</div>
        <h3>language:</h3>
        <ul>
          {Object.values(displayOneCountry.languages).map((la) => (
            <li key={la}>{la}</li>
          ))}
        </ul>
        <img
          src={displayOneCountry.flags.png}
          alt={displayOneCountry.flags.alt}
        />
        {!!weatherInformation && (
          <>
            <h3>Weather in {displayOneCountry.capital}</h3>
            <div>temperature {weatherInformation.main.temp} Celcius</div>
            <img
              src={`https://openweathermap.org/img/wn/${weatherInformation.weather[0].icon}@2x.png`}
              alt="weather description"
            />
            <div>wind {weatherInformation.wind.speed} m/s</div>
          </>
        )}
      </div>
    );
  } else if (displayCountries.length > 10) {
    countryList = "Too many natches, specify another filter";
  } else if (displayCountries.length > 1) {
    countryList = displayCountries.map((country) => (
      <div key={country.flag}>
        {country.name.common}{" "}
        <button onClick={() => handleShowCountry(country)}>show</button>
      </div>
    ));
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        find countries: <input value={value} onChange={handleChange} />
      </form>
      {countryList}
    </div>
  );
};

export default App;
