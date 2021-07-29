import React from "react";
import Leftsidecontainer from "./styles";
import styled from 'styled-components';

const Leftsidebtn = styled.button`
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: center;
  color: #A3CCA3;
  background-color: white;
  padding: 0 15px;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 12px;
  margin: 0px;
  border: 1px solid #A3CCA3;
  cursor: pointer;
  &:active {
    background-color: #a3cca3;
    color: white;
  }
 
 
`;


function Leftsidebar() {
	return (
		<Leftsidecontainer>
			<Leftsidebtn btnName="진행중인 일정" onClick = {() => window.location.replace (`/Progress`)}>진행중인 일정</Leftsidebtn>
			<Leftsidebtn btnName="오늘 일정" onClick = {() => window.location.replace (`/Today`)}>오늘 일정</Leftsidebtn>
			<Leftsidebtn btnName="일정 변경" onClick = {() => window.location.replace (`/Change`)}>일정 변경</Leftsidebtn>
			<Leftsidebtn btnName="타이머/ 스탑워치" onClick = {() => window.location.replace (`/Timer`)}>타이머/ 스탑워치</Leftsidebtn>
		</Leftsidecontainer>
	);
}

export default Leftsidebar;
