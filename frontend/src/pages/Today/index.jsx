import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import { Link } from "react-router-dom";
import axios from "axios";
const Todaylayout = () => {
  const { loading, setLoading } = useState(0);
  const { itemList, setItemList } = useState([]);

  // const loadItem = async () => {
  //   axios
  //     .get("./today.json")
  //     .then(({ data }) => {
  //       setLoading(1);
  //       setItemList(itemList => data);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //       setLoading(loading);
  //     });
  // };
  // useEffect(() => {
  //   loadItem();
  // });

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
