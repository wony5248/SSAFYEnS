import React from "react";
import Layout from "../../layout";
import Todaylayout from "./Today";
const Today = () => {
  return (
    <Layout
      pages={Todaylayout()}
    ></Layout>
  );
};

export default Today;
