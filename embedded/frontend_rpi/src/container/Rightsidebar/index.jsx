import React, { useState } from "react";
import SpeakerBtn from "../../components/Speaker";
import MannerBtn from "../../components/mannerbutton";
import Rightsidecontainer from "./styles";
import Sensorbtn from "../../components/Sensorbutton";
import Date from "../../components/Clock";
import Sensor from "../../components/Sensor";
import styled from "styled-components";
import AddBoxIcon from "@material-ui/icons/AddBox";
import axios from "axios";
import moment from "moment";
const Datediv = styled.div`
  width: auto;
  height: 25%;
  align-items: center;
  align-content: center;
  margin: 0px;
  border: 1px solid #a3cca3;
`;
const Addbtn = styled.button`
  width: 100%;
  height: 13%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  font-size: 20px;
  margin: 0px;
  border: 1px solid #a3cca3;
  &:hover {
    background-color: #a3cca3;
    color: white;
  }
`;
function Rightsidebar() {
  // const [date, setDate] = useState("");
  // const [starttime, setStarttime] = useState("");
  // const [endtime, setEndtime] = useState("");
  // const [deadline, setDeadline] = useState("");
  // const [notitime, setNotitime] = useState("");
  // const [isfinish, setIsfinish] = useState(false);
  // const [month, setMonth] = useState("");
  // const [year, setYear] = useState("");
  // const [week, setWeek] = useState("");
  // const [point, setPoint] = useState(0);
  // const [userid, setUserid] = useState("");
  // const [manageid, setManageid] = useState("");
  // const [istrue, setIstrue] = useState(false);
  // const Confirm = async () => {
  //   if (window.confirm("정말 완료하시겠 습니까?")) {
  //     await axios
  //       .post(`http://127.0.0.1:4500/test/`, {
  //         date : "",
  //         started_at,
  //         finished_at,
  //         deadline_at,
  //         notification,
  //         is_finished,
  //         month,
  //         year,
  //         week,
  //         point,
  //         user_id
  //       })
  //       .then(({ data }) => {
  //         console.log(data.data);
  //         // setItemList(data.data);
  //         // console.log(data.data);
  //         setStarttime(moment(data.data.started_at).format("YYYYMMDD HHmm"));
  //         setManageid(data.data.id);
  //       })
  //       .catch((e) => {});
  //     window.location.replace(`/Today`);
  //   } else {
  //     console.log("변화 없음");
  //   }
  // };

  const Confirm = () => {
    if (window.confirm("일정을 생성하시겠습니까?")){
          window.location.replace(`/Create`);
        } else {
          console.log("변화 없음");
        }
  }
  return (
    <Rightsidecontainer>
      <Datediv>{Date()}</Datediv>
      <Sensorbtn btnName={Sensor()}></Sensorbtn>
      <MannerBtn btnName="매너모드"></MannerBtn>
      <SpeakerBtn btnName="음성비서"></SpeakerBtn>
      <Addbtn onClick = {() => Confirm()}>
        <AddBoxIcon ></AddBoxIcon>일정 추가
      </Addbtn>
    </Rightsidecontainer>
  );
}

export default Rightsidebar;
