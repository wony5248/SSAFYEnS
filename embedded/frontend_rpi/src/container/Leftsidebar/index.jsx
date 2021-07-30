import React from "react";
import Leftsidecontainer from "./styles";
import styled from 'styled-components';

const Leftsidebtn = styled.button`
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: center;
  padding: 0 15px;
  display: flex;
  align-items: center;
  text-align: center;
  margin: 0px;
  color: #121212;
  background-color: white;
  font-size: 20px;
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
			<Leftsidebtn onClick = {() => window.location.replace (`/Progress`)}>진행중인 일정</Leftsidebtn>
			<Leftsidebtn onClick = {() => window.location.replace (`/Today`)}>오늘 일정</Leftsidebtn>
			<Leftsidebtn onClick = {() => window.location.replace (`/Change`)}>일정 변경</Leftsidebtn>
			<Leftsidebtn onClick = {() => window.location.replace (`/Timer`)}>타이머/ 스탑워치</Leftsidebtn>
		</Leftsidecontainer>
	);
}

export default Leftsidebar;
