import { React, useState, useEffect } from "react";
import { fetchData } from "../../public/api";
import { Loading } from "./Loading";
import Main from "./Main";

const Weather = () => {
  const [data, setData] = useState(null);
  const city = "delhi";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //   const fetchDataFromApi = async () => {
  //     try {
  //       const fetchedData = await fetchData(city);
  //       setData(fetchedData);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error);
  //       setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchDataFromApi();
  //   }, []);

  //   console.log(data);

  return (
    <div className="h-[70%] w-[30%] bg-orange-200 rounded-2xl shadow-xl">
      {loading ? <Loading /> : <Main name={data.name} />}
    </div>
  );
};

export default Weather;
