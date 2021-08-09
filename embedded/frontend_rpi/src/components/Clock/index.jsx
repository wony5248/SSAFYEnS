import React, {useContext} from "react";
import Clock from "react-live-clock";
import Datediv from "./styles";
import Logo from "../../assets/ssafyenslogo.png";
import styled1 from "styled-components";
import { styled } from "@material-ui/styles";
import { Context } from "../../context";
const Logodiv = styled1.div`
  width: 100%;
`;
const Clockdiv = styled(Clock)({
  width: "100%",
  fontSize: "30px",
});
const Date = () => {
  const {
    state:{
      isDark
    }
  } = useContext(Context)
  return (
    <Datediv isdark = {isDark}>
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
    </Datediv>
  );
};
export default Date;
