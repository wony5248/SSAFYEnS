import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import { Link } from "react-router-dom";
import axios from "axios";



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
      <ul>
        {itemList.map((item) => (
          <li key = {item.Title}>
              {item.Content}
          </li>
        ))}
      </ul>
      <div>Today</div>
      <Link to="/">Home</Link>
      <br></br>
      <Link to="/Progress">Progress</Link>a
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
