import React from "react";

import MannerBtn from "../../components/mannerbutton";
import Rightsidecontainer from "./styles";
import Sensorbtn from "../../components/Sensorbutton"
import Date from "../../components/Clock"
import Sensor from "../../components/Sensor"
import styled from "styled-components";
const Datediv = styled.div`
  width: auto;
  height: 40%;


  align-items: center;
  align-content: center;
  margin: 0px;
  border: 1px solid #a3cca3;
`;

function Rightsidebar() {
  return (
    <Rightsidecontainer>
      <Datediv>{Date()}</Datediv>
      <Sensorbtn btnName= {Sensor()}></Sensorbtn>
      <MannerBtn btnName="매너모드"></MannerBtn>
    </Rightsidecontainer>
  );
}

export default Rightsidebar;
