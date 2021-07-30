import React from "react";

import Leftsidebar from "../container/Leftsidebar";
import Rightsidebar from "../container/Rightsidebar";
import Center from "../container/Center";
import Mainlayout from "./styles";

function Layout(props) {
  const { pages } = props;
  return (
    <Mainlayout>
      <Leftsidebar></Leftsidebar>
      <Center pages={pages}></Center>
      <Rightsidebar></Rightsidebar>
    </Mainlayout>
  );
}

export default Layout;
