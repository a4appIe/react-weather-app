import React from "react";
import { Loading } from "./Loading";
import Main from "./Main";

const Weather = () => {
  return (
    <div
      className={` w-[25%] bg-orange-50 rounded-2xl shadow-xl flex items-center justify-center`}
    >
      <Main />
    </div>
  );
};

export default Weather;
