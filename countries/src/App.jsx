import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import { getAllCountries } from "../services/countriesServices";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchCountry, setSearchCountry] = useState("");

  const LazyCountriesList = React.lazy(() =>
    import("../components/countriesList")
  );

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const result = await getAllCountries();

        setCountries(result);
        console.log(result);
      } catch (err) {
        setError(
          `Failed to load countries, please try again. Details: ${err.message}`
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Something went wrong please try again later.</p>;

  return (
    <>
      <h1>Country Information</h1>
      <div className="input-container">
        <input
          className="search-input"
          type="search"
          placeholder="Search country by name..."
          value={searchCountry}
          onChange={(e) => setSearchCountry(e.target.value)}
        />
        <span>&#x1F50D;</span>
      </div>
      <Suspense fallback={loading}>
        {searchCountry.trim() !== "" && (
          <LazyCountriesList countries={filteredCountries} />
        )}
      </Suspense>
    </>
  );
}

export default App;
