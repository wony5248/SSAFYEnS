import React from "react";

import ButtonBases from "../../components/Rightbutton";
import Rightsidecontainer from "./styles";


function Rightsidebar() {
  return (
    <Rightsidecontainer>
      <ButtonBases btnName="2020-07-22"></ButtonBases>
      <ButtonBases btnName="오후 2:06"></ButtonBases>
      <ButtonBases btnName="센서값"></ButtonBases>
      <ButtonBases btnName="매너모드 / 다크모드"></ButtonBases>
    </Rightsidecontainer>
  );
}

export default Rightsidebar;
