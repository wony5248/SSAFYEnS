import React from "react";

import Sensorbtn from "./styles";

const temp = () => {
  return <div>temp</div>
}
const humid = () => {
  return <div>humid</div>
}
const noise = () => {
  return <div>noise</div>
}
const light = () => {
  return <div>light</div>
}

const Sensor = () => {
  return (
    <div>
      <Sensorbtn>온도:{temp()}</Sensorbtn>
      <Sensorbtn>습도:{humid()}</Sensorbtn>
      <Sensorbtn>소음:{noise()}</Sensorbtn>
      <Sensorbtn>조도:{light()}</Sensorbtn>
    </div>
  );
};
export default Sensor;
