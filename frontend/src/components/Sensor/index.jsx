import React from "react";

import Sensorbtn from "./styles";

const abs = () => {
  return <div>hello</div>
}

const Sensor = () => {
  return (
    <div>
      <Sensorbtn>온도:{abs()}</Sensorbtn>
      <Sensorbtn>습도:</Sensorbtn>
      <Sensorbtn>소음:</Sensorbtn>
      <Sensorbtn>조도:</Sensorbtn>
    </div>
  );
};
export default Sensor;
