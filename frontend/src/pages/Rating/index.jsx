import React from "react";
import Layout from "../../layout";
import styled1 from "styled-components";
import { Link } from "react-router-dom";

const Starttime = styled1.div`
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
  margin: 12px 0px;
  padding: 4px;
  padding-left:16px;
  padding-right:16px;
`;
const Endtime = styled1.div`
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
  margin: 12px 0px;
  padding: 4px;
  padding-left:16px;
  padding-right:16px;
`;
const Ratingcon = styled1.div`
  width: auto;
  height: 310px;
  display: flex-row;
  flex-wrap: nowrap;
  color: #a3cca3;
  background-color: white;
  margin: 0px;
  padding-left:12px;
  padding-right:12px;
  overflow: auto;
`;

const Changestarttext = styled1.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
`;

const Changeendtext = styled1.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
`;
const Ratinglayout = () => {
  return (
    <Ratingcon>
      <Starttime>
        <Changestarttext>일정 시작 시간</Changestarttext>
        <Changestarttext>00 : 00</Changestarttext>
      </Starttime>
      <Endtime>
        <Changeendtext>일정 종료 시간</Changeendtext>
        <Changeendtext>01 : 00</Changeendtext>
      </Endtime>
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
    </Ratingcon>
  );
};
const Rating = () => {
  return <Layout pages={Ratinglayout()}></Layout>;
};

export default Rating;
