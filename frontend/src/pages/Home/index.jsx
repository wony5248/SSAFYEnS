import React from "react";

import Layout from "../../layout";
import Homelayout from "./Home";
const HOME = () => {
  return (
    <Layout
      pages={Homelayout()}
    ></Layout>
  );
};

export default HOME;
