import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import styled1 from "styled-components";
import axios from "axios";
import moment from "moment";

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
  border : 1px solid #a3cca3;
  flex-wrap: nowrap;
  color: #a3cca3;
  background-color: white;
  margin: 0px;
  font-size: 20px;
  padding-left:12px;
  padding-right:12px;
  overflow: auto;
`;
const Changeend = styled1.div`
  display: flex;
  justify-content: space-between;
  width: auto;
  align-items: center;
  height: 10%;
  color: white;
  background-color: #a3cca3;
  border-radius: 4px;
  margin: 12px 0px;
  padding: 4px;
  padding-right: 3.5%;
  padding-left: 3.5%;
`;
const Btndiv = styled1.div`
  display: flex;
  justify-content: flex-end;
  width: auto;
  align-items: center;
  height: 10%;
  border-radius: 4px;
  margin: 12px 0px;
  padding: 4px;
  padding-left: 3.5%;
`;
const Addbtn = styled1.button`
    background-color: #a3cca3;
    color: white;
    border: none;
    border-radius: 8px;
    height:100%;
    width: 100px;
    &:hover{
        background-color: #69a569;
    }
`
const Changeendtext = styled1.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
`;

const Changecalendarlayout = () => {
  const [date, setDate] = useState("");
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [deadline, setDeadline] = useState("");
  const [optionarr, setOptionarr] = useState([]);
  const [notitime, setNotitime] = useState("");
  const [isfinish, setIsfinish] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [week, setWeek] = useState("");
  const [point, setPoint] = useState(0);
  const [userid, setUserid] = useState("");
  const [manageid, setManageid] = useState("");
  const [istrue, setIstrue] = useState(false);

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
  const Confirm = async () => {
    if (window.confirm("정말 완료하시겠 습니까?")) {

      //   await axios
      //     .post(`http://127.0.0.1:4500/test/`, {
      //       date : "",
      //       started_at,
      //       finished_at,
      //       deadline_at,
      //       notification,
      //       is_finished,
      //       month,
      //       year,
      //       week,
      //       point,
      //       user_id
      //     })
      //     .then(({ data }) => {
      //       console.log(data.data);
      //       // setItemList(data.data);
      //       // console.log(data.data);
      //       setStarttime(moment(data.data.started_at).format("YYYYMMDD HHmm"));
      //       setManageid(data.data.id);
      //     })
      //     .catch((e) => {});
      //   window.location.replace(`/Today`);
    } else {
      //   console.log("변화 없음");
    }
  };
  useEffect(() => {
    async function loadCalendar() {
      await axios
        .get(`http://127.0.0.1:4500/test}`)
        .then(({ data }) => {
          console.log(data.data);
          // setItemList(data.data);
          // console.log(data.data);
          setDeadline(moment(data.data.deadline_at).format("YYYYMMDD HHmm"));
          setManageid(data.data.id);
        })
        .catch((e) => {});
    }
    loadCalendar();
    const rendering = () => {
      const result = [];
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
  return (
    <Changecalcon>
      <Changeend>
        <Changeendtext>일정 시작 시간</Changeendtext>
        <Changeselect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={endtime}
          onChange={handlestartChange}
        >
          {optionarr.map((item) => (
            <Changeoption value={item[0] + item[1] + item[3] + item[4]}>
              {item}
            </Changeoption>
          ))}
        </Changeselect>
      </Changeend>
      <Changeend>
        <Changeendtext>일정 종료 시간</Changeendtext>
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
      <Changeend>
        <Changeendtext>일정 목표 시간</Changeendtext>
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
      <Changeend>
        <Changeendtext>일정 알림 시간</Changeendtext>
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
      <Changeend>
        <Changeendtext>일정 완료 여부</Changeendtext>
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
      <Changeend>
        <Changeendtext>일정 제목</Changeendtext>
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
      <Changeend>
        <Changeendtext>일정 내용</Changeendtext>
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
      <Btndiv><Addbtn onClick = {() => Confirm()}>추가하기</Addbtn></Btndiv>
    </Changecalcon>
  );
};

const Create = () => {
  
  return <Layout pages={Changecalendarlayout()}></Layout>;
};

export default Create;
