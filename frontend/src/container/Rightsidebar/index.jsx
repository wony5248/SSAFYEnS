import React from "react";

import MannerBtn from "../../components/mannerbutton";
import Rightsidecontainer from "./styles";
import Datebtn from "../../components/Datebutton"
import Sensorbtn from "../../components/Sensorbutton"
import Date from "../../components/Clock"
import Sensor from "../../components/Sensor"
function Rightsidebar() {
  return (
    <Rightsidecontainer>
      <Datebtn btnName= {Date()}></Datebtn>
      <Sensorbtn btnName= {Sensor()}></Sensorbtn>
      <MannerBtn btnName="매너모드"></MannerBtn>
    </Rightsidecontainer>
  );
}

export default Rightsidebar;
