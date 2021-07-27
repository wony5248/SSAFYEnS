import React, { useState, useEffect } from "react";
import moment from "moment";
import Sensorbtn from "./styles";
import axios from "axios";

const Sensor = () => {
  const [temp, setTemp] = useState("");
  const [humid, setHumid] = useState("");
  const [noise, setNoise] = useState("");
  const [light, setLight] = useState("");
  async function loadSensor() {
    const result = await axios
      .get("http://127.0.0.1:3000/test/sensor")
      .then(({ data }) => {
        setTemp(data.temp);
        setNoise(data.noise);
        setHumid(data.humid);
        setLight(data.light);
      })
      .catch((e) => {
        console.error(e);
      });
  }
  useEffect(() => {
    loadSensor();
    const interval = setInterval(() => {
      loadSensor();
    }, 10000);
  }, []);
  return (
    <div>
      <Sensorbtn>온도: {temp}℃</Sensorbtn>
      <Sensorbtn>습도: {humid}％</Sensorbtn>
      <Sensorbtn>소음: {noise}dB</Sensorbtn>
      <Sensorbtn>조도: {light}lx</Sensorbtn>
    </div>
  );
};
export default Sensor;
