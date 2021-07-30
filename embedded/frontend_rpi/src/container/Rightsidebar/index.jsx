import React from "react";

import MannerBtn from "../../components/mannerbutton";
import Rightsidecontainer from "./styles";
import Sensorbtn from "../../components/Sensorbutton"
import Date from "../../components/Clock"
import Sensor from "../../components/Sensor"
import styled from "styled-components";
import Manner from "../../components/mannerbutton"
const Datebtn = styled.div`
  width: auto;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  align-content: center;
  margin: 0px;
  border: 1px solid #a3cca3;
`;

function Rightsidebar() {
  return (
    <Rightsidecontainer>
      <Datebtn>{Date()}</Datebtn>
      <Sensorbtn btnName= {Sensor()}></Sensorbtn>
      <MannerBtn btnName="매너모드"></MannerBtn>
    </Rightsidecontainer>
  );
}

export default Rightsidebar;
