import React, { useState, useEffect } from "react";

const ChocolateParams = () => {
  const [continentsData, setContinentsData] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    fetch('https://demo0090151.mockable.io/countries')
      .then((response) => response.json())
      .then((data) => setContinentsData(data.data));
  }, []);

  useEffect(() => {
    if (selectedContinent) {
      const continentData = continentsData.find(item => Object.keys(item)[0] === selectedContinent);
      setCountries(continentData ? continentData[selectedContinent] : []);
    } else {
      setCountries([]);
    }
  }, [selectedContinent, continentsData]);

  const handleContinentChange = (event) => {
    setSelectedContinent(event.target.value);
    setSelectedCountry('');
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div>
      <label>
        <select value={selectedContinent} onChange={handleContinentChange}>
          <option value="">Select...</option>
          {continentsData.map((continentObj, index) => {
            const continent = Object.keys(continentObj)[0];
            return (
              <option key={index} value={continent}>
                {continent}
              </option>
            );
          })}
        </select>
      </label>

      <br />

      <label>
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select...</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default ChocolateParams;