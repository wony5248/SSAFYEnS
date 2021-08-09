import React, { useState, useContext } from "react";
import SpeakerBtn from "../../components/Dark";
import MannerBtn from "../../components/mannerbutton";
import Rightsidecontainer from "./styles";
import Sensorbtn from "../../components/Sensorbutton";
import Date from "../../components/Clock";
import Sensor from "../../components/Sensor";
import styled from "styled-components";
import AddBoxIcon from "@material-ui/icons/AddBox";
import axios from "axios";
import moment from "moment";
import { Context } from "../../context";
const Datediv = styled.div`
  width: auto;
  height: 20%;
  align-items: center;
  align-content: center;
  margin: 0px;
  border: ${(props) => (props.isdark ? "1px solid gray" : "1px solid #a3cca3")};
`;
const Addbtn = styled.button`
  width: 100%;
  height: 13%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.isdark ? "white" : "#424242")};
  background-color: ${(props) => (props.isdark ? "#424242" : "white")};
  font-size: 20px;
  margin: 0px;
  border: ${(props) => (props.isdark ? "1px solid gray" : "1px solid #a3cca3")};
  &:hover {
    background-color: ${(props) => (props.isdark ? "gray" : "#a3cca3")};
    color: white;
  }
`;
function Rightsidebar() {
  const {
    state: { isDark },
  } = useContext(Context);
  const Confirm = () => {
    if (window.confirm("일정을 생성하시겠습니까?")) {
      window.location.replace(`/Create`);
    } else {
      console.log("변화 없음");
    }
  };
  return (
    <Rightsidecontainer isdark={isDark}>
      <Datediv isdark = {isDark}>{Date()}</Datediv>
      <Sensorbtn isdark = {isDark} btnName={Sensor()}></Sensorbtn>
      <MannerBtn isdark = {isDark} btnName="매너모드"></MannerBtn>
      <SpeakerBtn isdark = {isDark} btnName="다크모드"></SpeakerBtn>
      <Addbtn isdark={isDark} onClick={() => Confirm()}>
        <AddBoxIcon></AddBoxIcon>일정 추가
      </Addbtn>
    </Rightsidecontainer>
  );
}

export default Rightsidebar;
