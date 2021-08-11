import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import { Link } from "react-router-dom";
import styled1 from "styled-components";
import axios from "axios";
import moment from "moment";
import { useUserContext } from "../../context";
import 'moment/locale/ko';

const Changeselect = styled1.div`
  width: auto;
  height: 24px;
  color: white;
  border: 0px;
  margin-left: 12px;
  background-color: ${props => props.isdark ? "#c9c9c9" : "white"};
  height: 50%;
  display: flex;
  align-items: center;
`;
const Changeoption = styled1.option`
  width: 100%;
  height: 100%;
  background-color: ${props => props.isdark ? "#c9c9c9" : "white"};
`;

const Changecalcon = styled1.div`
  width: auto;
  height: 98.8%;
  display: flex-row;
  flex-wrap: nowrap;
  margin: 0px;
  padding-left:12px;
  padding-right:12px;
  overflow: auto;
`;
const Changestart = styled1.div`
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  width: auto;
  height: auto;
  color: white;
  background-color: ${(props) => (props.isdark === true ? "gray" : "#a3cca3")};
  margin: 12px 0px;
  padding: 4px;
`;
const Changeend = styled1.div`
  display: flex;
  justify-content: space-between;
  width: auto;
  height: auto;
  color: white;
  background-color: ${(props) => (props.isdark === true ? "gray" : "#a3cca3")};
  border-radius: 4px;
  margin: 12px 0px;
  padding: 4px;
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
  border-radius: 4px;
  width: auto;
  height: auto;
  color: white;
  padding:4px;
  padding-right: 12px;
  background-color: ${(props) => (props.isdark === true ? "gray" : "#a3cca3")};
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
  height: auto;
  border-radius:8px;
  border:0px;
  color: white;
  cursor: pointer;
  margin-right: 0.5%;
  background-color: ${(props) =>
    props.isdark === true ? "#424242" : "#69a569"};
  padding: 4px;
`;
const Plusbtn = styled1.button`
  width: 24px;
  height: 24px;
  border-radius:8px;
  border:0px;
  background-color: #a3cca3;
  color: white;
  margin-right : 4px;
  padding-ringt: 4px;
`;
const Minusbtn = styled1.button`
  width: 24px;
  height: 24px;
  border-radius:8px;
  font-size: 24px;
  border:0px;
  background-color: #a3cca3;
  color: white;
`;
const ChangeContent = styled1.div`
  display: flex-row;
  justify-content: space-between;
  border-radius: 4px;
  width: auto;
  height: auto;
  color: white;
  padding:4px;
  background-color: ${(props) => (props.isdark === true ? "gray" : "#a3cca3")};
  margin-top:12px;
`;
const ChangeContentheader = styled1.div`
  display: flex;
  justify-content: space-between;
  width: auto;
  height: 8%;
  padding:4px;
  margin-right: 2%;
`;
const Changecontentinput1 = styled1.textarea`
    background-color: ${(props) =>
      props.isdark === true ? "#c9c9c9" : "white"};
    border-radius: 4px;
    height: 108px;
    font-size: 12px;
    margin-left: 8px;
    margin-bottom: 8px;
    margin-top: 4px;
    padding: 4px;
    width: 304px;
    border: 0px;
    overflow: auto;
    outline: none;
`;
const Changetitleinput = styled1.textarea`
    background-color : ${(props) =>
      props.isdark === true ? "#c9c9c9" : "white"};
    height: 48.8%;
    width: 30%;
    padding-top: 1.3%;
    font-size: 20px;
    padding-left: 8px;
    vertical-align: middle;
    color: black;
    margin-right: 2.5%;
`;

const Changecalendarlayout = (props) => {
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [optionarr, setOptionarr] = useState([]);
  const [deadline, setDeadline] = useState("");
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [isfinished, setIsfinished] = useState(false);
  const [point, setPoint] = useState(0);
  const { id } = props;

  const handlestartChange = (event) => {
    setStarttime(event.target.value);
  };
  const handleendChange = (event) => {
    setEndtime(event.target.value);
  };
  const handleContext = (e) => {
    setContext(e.target.value);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const Change = async () => {
    const starthour = Number(`${starttime[0]}${starttime[1]}`);
    const startmin = Number(`${starttime[2]}${starttime[3]}`);
    const endhour = Number(`${endtime[0]}${endtime[1]}`);
    const endmin = Number(`${endtime[2]}${endtime[3]}`);
    if (starthour < endhour) {
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
          })
          .catch((e) => {});
        window.location.replace(`/Change`);
      } else {
        // console.log("변화 없음");
      }
    } else if (starthour === endhour && startmin <= endmin) {
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
          })
          .catch((e) => {});
        window.location.replace(`/Change`);
      } else {
        // console.log("변화 없음");
      }
    } else {
      window.alert("일정 시작시간이 일정종료 시간보다 빠르게 설정해 주십시오.");
    }
  };
  useEffect(() => {
    async function loadCalendar() {
      await axios
        .get(`http://127.0.0.1:4500/schedule/${id}`)
        .then(({ data }) => {
          setDeadline(moment(data.deadline_at).format("YYYYMMDD HHmm"));
          setTitle(data.title);
          setContext(data.context);
          setIsfinished(data.is_finished);
          setPoint(data.point);
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
    };

    rendering();
  }, []);
  const { isdarked } = useUserContext();
  return (
    <Changecalcon>
      <Changestart isdark={isdarked}>
        <Changestarttext>변경할 시작 시간</Changestarttext>
        <Changeselect
          isdark={isdarked}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={starttime}
          onChange={handlestartChange}
        >
          {optionarr.map((item) => (
            <Changeoption isdark = {isdarked} value={item[0] + item[1] + item[3] + item[4]}>
              {item}
            </Changeoption>
          ))}
        </Changeselect>
      </Changestart>
      <Changeend isdark={isdarked}>
        <Changeendtext>변경할 종료 시간</Changeendtext>
        <Changeselect
          isdark={isdarked}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={endtime}
          onChange={handleendChange}
        >
          {optionarr.map((item) => (
            <Changeoption isdark = {isdarked} value={item[0] + item[1] + item[3] + item[4]}>
              {item}
            </Changeoption>
          ))}
        </Changeselect>
      </Changeend>
      <Changetitle isdark={isdarked}>
        <Changetitletext>일정 제목</Changetitletext>
        <Changetitleinput
          isdark={isdarked}
          value={title}
          onChange={handleTitle}
        ></Changetitleinput>
      </Changetitle>
      <ChangeContent isdark={isdarked}>
        <ChangeContentheader>
          <Changetitletext>일정 내용</Changetitletext>
          <Changebtn isdark={isdarked} onClick={() => Change()}>
            변경
          </Changebtn>
        </ChangeContentheader>
        <Changecontentinput1
          isdark={isdarked}
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
const Changecalendar = () => {
  return <Layout pages={Changecalendarlayout()}></Layout>;
};

export default Changecalendar;
