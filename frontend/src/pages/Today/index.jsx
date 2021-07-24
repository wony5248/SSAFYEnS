import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import { Link } from "react-router-dom";
import axios from "axios";

const loadItem = () => {
  const [loading, setLoading] = useState(false);
  const [itemList, setItemList] = useState([]);
  axios
    .get("./today.json")
    .then(({ data }) => {
      setLoading(true);
      setItemList(data.Item);
      console.log(data.Item);
      return data.Item
    })
    .catch((e) => {
      console.error(e);
      setLoading(false);
    });
  
};

const Todaylayout = () => {
  // useEffect(() => {
  //   console.log("hook0");
  // }, []);

  const loadData = loadItem();
  return (
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
      <button>일정 추가</button>
    </div>
  );
};

const Today = () => {
  return <Layout pages={Todaylayout()}></Layout>;
};

export default Today;
