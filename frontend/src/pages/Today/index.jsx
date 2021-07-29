import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Todaycontainer = styled.div`
  overflow: auto;
  width: auto;
  height: 98.2%;
  color: #a3cca3;
  background-color: white;
  border: 1px solid #a3cca3;
  margin: 0px;
  padding-top: 14px;
  padding-right: 12px;
  padding-left: 12px;
  padding-bot: 14px;
`;
const Todaytitle = styled.div`
  display: flex-row;
  font-size: 20px;
  flex-wrap: no-wrap;
  border-radius: 4px;
  justify-content: space-around;
  width: auto;
  height: 20%;
  color: #a3cca3;
  background-color: #a3cca3;
  margin-bottom: 14px;
  padding: 0px;
`;
const Todaytitlenamecon = styled.div`
  width: auto;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: #a3cca3;
  margin: 0px 16px;
  padding-top: 4px;
`;
const Todaygoal = styled.div`
  width: auto;
  height: 20%;
  display: flex;
  align-items: center;
  color: white;
  background-color: #a3cca3;
  margin: 0px 16px;
  padding-top: 4px;
`;

const Todaytitlename = styled.div`
  width: auto;
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  background-color: #a3cca3;
  padding-top: 4px;
`;

const Todaytitletime = styled.div`
  width: auto;
  height: 100%;
  color: white;
  background-color: #a3cca3;
  padding-top: 4px;
`;

const Todaychangecon = styled.div`
  width: auto;
  height: 40%;
  display: flex;
  justify-content: space-between;
  align-items:center;
  color: white;
  background-color: #a3cca3;
  margin: 0px 16px;
`;

const Todaycontenttitle = styled.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
  padding: 0px;
  margin-bottom: 14px;
`;

const Todaychangebtn = styled.button`
  width: 78px;
  height: 60%;
  border-radius: 8px;
  border: 0px;
  color: white;
  display:flex;
  align-items:center;
  justify-content: center;
  background-color: #69a569;
  padding: 4px;
`;
{/* <ul>
{itemList.map((item) => (
  <li key = {item.Title}>
      {item.Content}
  </li>
))}
</ul> */}
const Todaylayout = () => {
  const [loading, setLoading] = useState(false);
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    async function loadCalendar() {
      const result = await axios
        .get("./today.json")
        .then(({ data }) => {
          setLoading(true);
          setItemList(data.Item);
          console.log(data.Item);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
    }
    loadCalendar();
    const interval = setInterval(() => {
      loadCalendar();
    }, 10000);
  }, []);

  return (
    <Todaycontainer>
      {itemList.map((item) => (
        <Todaytitle>
        <Todaytitlenamecon>
          <Todaytitlename>{item.Title}</Todaytitlename>
          <Todaytitletime>{item.StartTime} ~ {item.EndTime}</Todaytitletime>
        </Todaytitlenamecon>
        <Todaygoal>{item.Goal}</Todaygoal>
        <Todaychangecon>
          <Todaytitlename>{item.Content}</Todaytitlename>
          <Todaychangebtn onClick={() => window.location.replace(`/Rating/${item.StartTime}`)}>
            완료
          </Todaychangebtn>
        </Todaychangecon>
      </Todaytitle>
      ))}
    </Todaycontainer>
  );
};

const Today = () => {
  return <Layout pages={Todaylayout()}></Layout>;
};

export default Today;
