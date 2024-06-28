import React, { useState, useEffect, useMemo } from "react";
import { fetchData } from "../../public/api";
import { Loading } from "./Loading";

const Main = () => {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("Delhi");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDataFromApi = async () => {
    try {
      setLoading(true);
      const fetchedData = await fetchData(city);
      setData(fetchedData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
    e.target.value = "";
  };

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      fetchDataFromApi();
    }, 1000); // Debounce time (adjust as needed)

    return () => clearTimeout(delayTimer);
  }, [city]);

  const backgroundImageUrl = useMemo(() => {
    if (data?.weather && data.weather[0].main === "Rain") {
      return "../../src/assets/rainy.jpg";
    } else if (data?.weather && data.weather[0].main === "Mist") {
      return "../../src/assets/mist.jpg";
    } else {
      return "../../src/assets/sunny.jpg";
    }
  }, [data]);

  return (
    <div
      className="h-full w-full bg-center bg-scroll bg-cover rounded-2xl shadow-xl px-10 py-3"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      <div className="flex items-center justify-between rounded-3xl h-fit outline-none border-none mt-10 gap-3">
        <input
          type="text"
          className="px-5 py-3 rounded-full w-[80%] border border-gray-400"
          placeholder="City?"
          value={city}
          onChange={handleInputChange}
        />
        <button
          className="bg-orange-600 hover:bg-orange-500 px-5 py-3 rounded-3xl text-white"
          onClick={fetchDataFromApi}
        >
          Search
        </button>
      </div>
      <div className="py-10 flex flex-col">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="h-20 w-full flex items-center justify-center text-7xl text-gray-800 font-semibold">
              {(Math.round((data?.main?.temp - 273.15) * 100) / 100).toFixed(2)}
              &deg;
            </div>
            <div className="flex flex-wrap items-center justify-center mt-8 gap-4">
              <WeatherInfo
                icon="fi-rs-snow-blowing"
                value={`${data?.wind?.speed} km/H`}
                label="Wind"
              />
              <WeatherInfo
                icon="fi-ss-humidity"
                value={`${data?.main?.humidity}%`}
                label="Humidity"
              />
              <WeatherInfo
                icon="fi-br-tire-pressure-warning"
                value={`${data?.main?.pressure} Millibar`}
                label="Pressure"
              />
              <WeatherInfo
                icon="fi-rs-eye"
                value={`${data?.visibility / 1000} km`}
                label="Visibility"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const WeatherInfo = ({ icon, value, label }) => (
  <div className="h-40 w-40 bg-transparent backdrop-blur-md border border-black rounded-2xl outline-1 flex items-center justify-center flex-col gap-1 text-lg">
    <i className={`fi mt-1 font-semibold ${icon}`}></i>
    {value}
    <p className="font-mono font-extralight text-xs underline text-slate-900">
      {label}
    </p>
  </div>
);

export default Main;
