import React from "react";

import Sensorbtn from "./styles";
const Sensor = () => {
  return (
    <div>
      <Sensorbtn>온도</Sensorbtn>
      <Sensorbtn>습도</Sensorbtn>
      <Sensorbtn>소음</Sensorbtn>
      <Sensorbtn>조도</Sensorbtn>
    </div>
  );
};
export default Sensor;
