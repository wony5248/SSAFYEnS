import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import { Link } from "react-router-dom";
import axios from "axios";
import Stopwatch from "./Stopwatch";
import Timer from "./Timer";

const Todaylayout = () => {
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
    <div>
      <Stopwatch />

      <hr className="line" />

      <Timer />
    </div>
  );
};

const Today = () => {
  return <Layout pages={Todaylayout()}></Layout>;
};

export default Today;
