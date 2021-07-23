import React from "react";
import Layout from "../../layout";

import { Link } from "react-router-dom";
const Ratinglayout = () => {
  return (
        <div>
          <div>Rating</div>
          <Link to="/">Home</Link>
          <br></br>
          <Link to="/Progress">Progress</Link>
          <br></br>
          <Link to="/Change">Change</Link>
          <br></br>
          <Link to="/Rating">Rating</Link>
          <br></br>
          <Link to="/Timer">Timer</Link>
          <br></br>
          <Link to="/Today">Today</Link>
        </div>
  );
};
const Rating = () => {
  return (
    <Layout
      pages={Ratinglayout()}
    ></Layout>
  );
};

export default Rating;
