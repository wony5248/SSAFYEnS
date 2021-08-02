import React from "react";
import Clock from "react-live-clock";
import Datediv from "./styles";
import Logo from "../../assets/ssafyenslogo.png";
import styled1 from "styled-components";
import { styled } from "@material-ui/styles";
const Logodiv = styled1.div`
  width: 100%;
`;
const Logobtn = styled1.button`
  width: 100%;
  border : none;
  background-color: white;
`;
const Clockdiv = styled(Clock)({
  width: "100%",
  fontSize: "30px",
});
const Date = () => {
  return (
    <Datediv>
      <Logobtn>
        <img src={Logo} alt = "logo" width="100%" height="100%" />
      </Logobtn>
      <div>
        <Logodiv>
          <Clockdiv
            format={"YYYY.MM.DD"}
            ticking={true}
            timezone={"Asia/Seoul"}
          />
        </Logodiv>
        <Logodiv>
          <Clockdiv
            format={"HH시mm분ss초"}
            ticking={true}
            timezone={"Asia/Seoul"}
          />
        </Logodiv>
      </div>
    </Datediv>
  );
};
export default Date;
