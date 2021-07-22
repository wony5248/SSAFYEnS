import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../layout";
const Today = () => {
  return (
    <Layout
      pages={
        <div>
          <div>Today</div>
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
      }
    ></Layout>
  );
};

export default Today;
