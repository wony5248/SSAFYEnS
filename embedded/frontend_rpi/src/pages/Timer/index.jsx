import React from "react";
import Layout from "../../layout";
import Stopwatch from "./Stopwatch";
import Timer from "./Timer";
import styled from "styled-components";
import { useUserContext } from "../../context";
const Timercon = styled.div`
  border-radius: 4px;
  width: auto;
  height: 99.8%;
  color: #121212;
  font-size: 40px;
`;

const Timerlayout = () => {
  // const [loading, setLoading] = useState(false);
  // const [itemList, setItemList] = useState([]);
  // useEffect(() => {
  //   async function loadItem() {
  //     const result = await axios
  //       .get("./today.json")
  //       .then(({ data }) => {
  //         setLoading(true);
  //         setItemList(data.Item);
  //         console.log(data.Item);
  //       })
  //       .catch((e) => {
  //         console.error(e);
  //         setLoading(false);
  //       });
  //   }
  //   loadItem();
  // }, []);
  const { isdarked } = useUserContext();
  return (
    <Timercon>
      <Stopwatch isdark = {isdarked}/>
      <div><hr className="line" /></div>
      <Timer isdark = {isdarked} />
    </Timercon>
  );
};

const Today = () => {
  return <Layout pages={Timerlayout()}></Layout>;
};

export default Today;
