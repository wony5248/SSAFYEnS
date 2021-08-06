import React, { useState, useEffect } from "react";
import Sensorbtn from "./styles";
import axios from "axios";
import styled  from "styled-components";
import {Thermometer} from "react-feather"
import OpacityIcon from '@material-ui/icons/Opacity';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';

const Fulldiv = styled.div`
  height: 100%;
  width: 100%;
  font-size: 24px;
`;

const Sensor = () => {
  const [temp, setTemp] = useState("");
  const [humid, setHumid] = useState("");
  const [noise, setNoise] = useState("");
  const [light, setLight] = useState("");
  async function loadSensor() {
    await axios
      .get("http://127.0.0.1:4500/test/sensor")
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
    setInterval(() => {
      loadSensor();
    }, 60000);
  }, []);
  return (
    <Fulldiv>
      <Sensorbtn><Thermometer></Thermometer>온도: {temp}℃</Sensorbtn>
      <Sensorbtn><OpacityIcon></OpacityIcon>습도: {humid}％</Sensorbtn>
      <Sensorbtn><SettingsVoiceIcon></SettingsVoiceIcon>소음: {noise}dB</Sensorbtn>
      <Sensorbtn><WbIncandescentIcon></WbIncandescentIcon>조도: {light}lx</Sensorbtn>
    </Fulldiv>
  );
};
export default Sensor;
