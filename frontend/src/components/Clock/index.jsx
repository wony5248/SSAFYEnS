import React from "react";
import Clock from "react-live-clock";
import Datediv from "./styles";
import Logo from "../../assets/logo_transparent.png"
import styled from "styled-components";
const Logodiv = styled.div`
  background: url(${Logo});
  // background-size: cover;
  height: 60px;
  overflow:hidden;
`;
const Date = () => {
  return (
    <Datediv>
      <Logodiv></Logodiv>
      <div>
        <Clock format={"YYYY.MM.DD"} ticking={true} timezone={"Asia/Seoul"} />
      </div>
      <div style = {{width: "110px"}}>
        <Clock format={"HH시mm분ss초"} ticking={true} timezone={"Asia/Seoul"} />
      </div>
    </Datediv>
  );
};
export default Date;
