import React from "react";
import Clock from "react-live-clock";
import Datediv from "./styles";
import Logo from "../../assets/logo_transparent.png"
import styled1 from "styled-components";
import { styled } from "@material-ui/styles";
const Logodiv = styled1.div`
  font-size: 22px;
  width: 100%;
`;

const Clockdiv = styled(Clock)({
  fontSize: "14px",
  width: "100%",
});
const Date = () => {
  return (
    <Datediv>
      <Logodiv>
        <Clockdiv format={"YYYY.MM.DD"} ticking={true} timezone={"Asia/Seoul"} />
      </Logodiv>
      <Logodiv>
        <Clockdiv format={"HH시MM분SS초"} ticking={true} timezone={"Asia/Seoul"} />
      </Logodiv>
    </Datediv>
  );
};
export default Date;
