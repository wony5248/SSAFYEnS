import React from "react";
import Layout from "../../layout";
import { Link } from "react-router-dom";

const Progresslayout = () => {
  return (
    <div>
      <div>Progress</div>
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
const Progress = () => {
  return <Layout pages={Progresslayout()}></Layout>;
};

export default Progress;
