import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import { Link } from "react-router-dom";
import axios from "axios";
import Stopwatch from "./Stopwatch";
import Timer from "./Timer";
import styled from "styled-components";
const Timercon = styled.div`
  border-radius: 4px;
  width: auto;
  height: 100%;
  color: #121212;
  font-size: 40px;
`;

const Timerlayout = () => {
  const [loading, setLoading] = useState(false);
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    async function loadItem() {
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
    loadItem();
  }, []);

  return (
    <Timercon>
      <Stopwatch />
      <div><hr className="line" /></div>
      <Timer />
    </Timercon>
  );
};

const Today = () => {
  return <Layout pages={Timerlayout()}></Layout>;
};

export default Today;
