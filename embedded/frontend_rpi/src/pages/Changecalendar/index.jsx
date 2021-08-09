import React, { useState, useEffect, useContext } from "react";
import Layout from "../../layout";
import styled1 from "styled-components";
import { styled } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import axios from "axios";
import moment from "moment";
import { Context } from "../../context";
const Changeselect = styled1.select`
  width: 15%;
  border: 0px;
  font-size: 36px;
  margin-left: 12px;
  height: 50%;
  display: flex;
  align-items: center;
`;
const Changeoption = styled1.option`
  width: 100%;
  height: 100%;
`;
const Changecalcon = styled1.div`
  width: auto;
  height: 99.8%;
  display: flex-row;
  flex-wrap: nowrap;
  margin: 0px;
  font-size: 20px;
  padding-left:12px;
  padding-right:12px;
  overflow: auto;
`;
const Changestart = styled1.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  width: auto;
  height: 10%;
  color: white;
  background-color: ${props => props.isdark ? "gray" : "#a3cca3"};
  margin: 12px 0px;
  padding: 4px;
  padding-right: 3.5%;
  padding-left: 3.5%;
`;
const Changeend = styled1.div`
  display: flex;
  justify-content: space-between;
  width: auto;
  align-items: center;
  height: 10%;
  color: white;
  background-color: ${props => props.isdark ? "gray" : "#a3cca3"};
  border-radius: 4px;
  margin: 12px 0px;
  padding: 4px;
  padding-right: 3.5%;
  padding-left: 3.5%;
`;
const Changestarttext = styled1.div`
  width: auto;
  text-align: center;
`;
const Changeendtext = styled1.div`
  width: auto;
  height: auto;
`;

const Changetitle = styled1.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  width: auto;
  height: 10%;
  color: white;
  padding:4px;
  padding-right: 12px;
  background-color: ${props => props.isdark ? "gray" : "#a3cca3"};
`;
const Changetitletext = styled1.div`
  width: auto;
  height: auto;
  margin-left: 3.5%;
  display: flex;
  align-items: center;
`;
const Changebtn = styled1.button`
  width: 78px;
  height: 100%;
  border-radius:8px;
  border:0px;
  color: white;
  margin-right: 0.5%;
  background-color: ${props => props.isdark ? "darkgray" : "#69a569"};
  padding: 4px;
`;

const ChangeContent = styled1.div`
  display: flex-row;
  justify-content: space-between;
  border-radius: 4px;
  width: auto;
  height: 60%;
  color: white;
  padding:4px;
  background-color: ${props => props.isdark ? "gray" : "#a3cca3"};
  margin-top:12px;
`;
const ChangeContentheader = styled1.div`
  display: flex;
  margin-top: 1%;
  justify-content: space-between;
  width: auto;
  height: 8%;
  padding:4px;
  margin-right: 2%;
`;
const Changecontentinput1 = styled1.textarea`
    background-color: ${props => props.isdark ? "#c9c9c9" : "white"};
    border-radius: 4px;
    height: 80%;
    width: 92%;
    font-size: 20px;
    margin-left: 4%;
    margin-right: 4%;
    margin-bottom: 8px;
    margin-top: 1.5%;
    padding: 4px;
    border: 0px;
    overflow: auto;
    outline: none;
`;
const Changetitleinput = styled1.textarea`
    background-color : ${props => props.isdark ? "#c9c9c9" : "white"};
    height: 48.8%;
    width: 30%;
    padding-top: 1.3%;
    font-size: 20px;
    padding-left: 8px;
    vertical-align: middle;
    color: black;
    margin-right: 2.5%;
`


const Changecalendarlayout = (props) => {
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [optionarr, setOptionarr] = useState([]);
  const [deadline, setDeadline] = useState("");
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [manageid, setManageid] = useState("");
  const [isfinished, setIsfinished] = useState(false);
  const [point, setPoint] = useState(0);
  const { id } = props;

  const handlestartChange = (event) => {
    setStarttime(event.target.value);
    console.log(event.target.value);
    console.log(
      `${moment().format("YYYYMMDD")} ` +
        `${
          event.target.value[0] +
          event.target.value[1] +
          event.target.value[2] +
          event.target.value[3]
        }`
    );
  };
  const handleendChange = (event) => {
    setEndtime(event.target.value);
    console.log(event.target.value);
    console.log(
      `${moment().format("YYYYMMDD")} ` +
        `${
          event.target.value[0] +
          event.target.value[1] +
          event.target.value[2] +
          event.target.value[3]
        }`
    );
  };
  const handleContext = (e) => {
    setContext(e.target.value);
    console.log(e.target.value);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const Change = async () => {
    const starthour = Number(`${starttime[9]}${starttime[10]}`);
    const startmin = Number(`${starttime[11]}${starttime[12]}`);
    const endhour = Number(`${endtime[9]}${endtime[10]}`);
    const endmin = Number(`${endtime[11]}${endtime[12]}`);
    console.log(context);
    if (starthour <= endhour && startmin <= endmin) {
      if (window.confirm("정말 완료하시겠 습니까?")) {
        await axios
          .put(`http://127.0.0.1:4500/schedule/${id}`, {
            started_at: `${moment().format("YYYYMMDD")} ${
              starttime[0] + starttime[1] + starttime[2] + starttime[3]
            }`,
            finished_at: `${moment().format("YYYYMMDD")} ${
              endtime[0] + endtime[1] + endtime[2] + endtime[3]
            }`,
            deadline_at: deadline,
            notification: moment().format("YYYYMMDD HHmm"),
            title: title,
            context: context,
            point: point,
            is_finished: isfinished,
          })
          .then(({ data }) => {
            console.log(data.data);
            // setItemList(data.data);
            // console.log(data.data);
            setManageid(data.data.id);
          })
          .catch((e) => {});
        window.location.replace(`/Change`);
      } else {
        console.log("변화 없음");
      }
    }
    else {
      window.alert("일정 시작시간이 일정종료 시간보다 빠르게 설정해 주십시오.")
    }
  };
  useEffect(() => {
    async function loadCalendar() {
      await axios
        .get(`http://127.0.0.1:4500/schedule/${id}`)
        .then(({ data }) => {
          console.log(data.data);
          // setItemList(data.data);
          // console.log(data.data);
          setDeadline(moment(data.data.deadline_at).format("YYYYMMDD HHmm"));
          setManageid(data.data.id);
          setTitle(data.data.title);
          setContext(data.data.context);
          setIsfinished(data.data.is_finished);
          setPoint(data.data.point);
        })
        .catch((e) => {});
    }
    loadCalendar();
    const rendering = () => {
      const result = [];
      result.push("시간");
      for (let i = 0; i < 24; i++) {
        if (i < 10) {
          result.push(`0${i}:00`);
          result.push(`0${i}:30`);
        } else {
          result.push(`${i}:00`);
          result.push(`${i}:30`);
        }
      }
      setOptionarr(result);
      console.log(result);
    };

    rendering();
  }, []);
  const {
    state: { isDark },
  } = useContext(Context);
  return (
    <Changecalcon>
      <Changestart isdark = {isDark}>
        <Changestarttext>변경할 시작 시간</Changestarttext>
        <Changeselect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={starttime}
          onChange={handlestartChange}
        >
          {optionarr.map((item) => (
            <Changeoption value={item[0] + item[1] + item[3] + item[4]}>
              {item}
            </Changeoption>
          ))}
        </Changeselect>
      </Changestart>
      <Changeend isdark = {isDark}>
        <Changeendtext>변경할 종료 시간</Changeendtext>
        <Changeselect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={endtime}
          onChange={handleendChange}
        >
          {optionarr.map((item) => (
            <Changeoption value={item[0] + item[1] + item[3] + item[4]}>
              {item}
            </Changeoption>
          ))}
        </Changeselect>
      </Changeend>
      <Changetitle isdark = {isDark}>
        <Changetitletext>일정 제목</Changetitletext>
        <Changetitleinput
          isdark = {isDark}
          value={title}
          onChange={handleTitle}
        ></Changetitleinput>
      </Changetitle>
      <ChangeContent isdark = {isDark}>
        <ChangeContentheader>
          <Changetitletext>일정 내용</Changetitletext>
          <Changebtn isdark = {isDark} onClick={() => Change()}>변경</Changebtn>
        </ChangeContentheader>
        <Changecontentinput1
          isdark = {isDark}
          multiline
          rows={4}
          value={context}
          onChange={handleContext}
          variant="outlined"
        ></Changecontentinput1>
      </ChangeContent>
    </Changecalcon>
  );
};
const Changecalendar = ({ match }) => {
  const { id } = match.params;
  return <Layout pages={Changecalendarlayout({ id })}></Layout>;
};

export default Changecalendar;
