import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../layout";
import styled from "styled-components";
import axios from "axios"

const Changecontainer = styled.div`
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
const Changetitle = styled.div`
  display: flex-row;
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
const Changetitlenamecon = styled.div`
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
const Changegoal = styled.div`
  width: auto;
  height: 20%;
  display: flex;
  align-items: center;
  color: white;
  background-color: #a3cca3;
  margin: 0px 16px;
  padding-top: 4px;
`;

const Changetitlename = styled.div`
  width: auto;
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  background-color: #a3cca3;
  padding-top: 4px;
`;

const Changetitletime = styled.div`
  width: auto;
  height: 100%;
  color: white;
  background-color: #a3cca3;
  padding-top: 4px;
`;

const Changechangecon = styled.div`
  width: auto;
  height: 40%;
  display: flex;
  justify-content: space-between;
  align-items:center;
  color: white;
  background-color: #a3cca3;
  margin: 0px 16px;
`;

const Changecontenttitle = styled.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
  padding: 0px;
  margin-bottom: 14px;
`;

const Changechangebtn = styled.button`
  width: 78px;
  height: 60%;
  border-radius: 8px;
  border: 0px;
  color: white;
  display: flex;
  align-items:center;
  justify-content: center;
  background-color: #69a569;
  padding: 4px;
`;

const Changelayout = () => {
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
    <Changecontainer>
      {itemList.map((item) => (
        <Changetitle>
        <Changetitlenamecon>
          <Changetitlename>{item.Title}</Changetitlename>
          <Changetitletime>{item.StartTime} ~ {item.EndTime}</Changetitletime>
        </Changetitlenamecon>
        <Changegoal>{item.Goal}</Changegoal>
        <Changechangecon>
          <Changetitlename>{item.Content}</Changetitlename>
          <Changechangebtn
            onClick={() => window.location.replace(`/Changecalendar`)}
          >
            변경
          </Changechangebtn>
        </Changechangecon>
      </Changetitle>
      ))}
    </Changecontainer>
  );
};

const Change = () => {
  return <Layout pages={Changelayout()}></Layout>;
};

export default Change;
