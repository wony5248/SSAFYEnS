import React from "react";
import SpeakerBtn from "../../components/Speaker";
import MannerBtn from "../../components/mannerbutton";
import Rightsidecontainer from "./styles";
import Sensorbtn from "../../components/Sensorbutton"
import Date from "../../components/Clock"
import Sensor from "../../components/Sensor"
import styled from "styled-components";
import AddBoxIcon from '@material-ui/icons/AddBox';
const Datediv = styled.div`
  width: auto;
  height: 25%;
  align-items: center;
  align-content: center;
  margin: 0px;
  border: 1px solid #a3cca3;
`;
const Addbtn = styled.button`
  width: 100%;
  height: 13%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  font-size: 20px;
  margin: 0px;
  border: 1px solid #a3cca3;
  &:hover {
    background-color: #a3cca3;
    color: white;
  }
`;
function Rightsidebar() {
  return (
    <Rightsidecontainer>
      <Datediv>{Date()}</Datediv>
      <Sensorbtn btnName= {Sensor()}></Sensorbtn>
      <MannerBtn btnName="매너모드"></MannerBtn>
      <SpeakerBtn btnName="음성비서"></SpeakerBtn>
      <Addbtn><AddBoxIcon></AddBoxIcon>일정 추가</Addbtn>
    </Rightsidecontainer>
  );
}

export default Rightsidebar;
