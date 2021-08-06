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
const Changeselect2 = styled1.select`
  width: 25%;
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
  height: 12%;
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
  const [notitime, setNotitime] = useState("");
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [istrue, setIstrue] = useState(false);
  const [startarr, setStartarr] = useState([]);

  const [titlearr, setTitlearr] = useState([]);
  const [contextarr, setContextarr] = useState([])


  const handlestartChange = (event) => {
    setStarttime(event.target.value);
    console.log(event.target.value);
    
  };
  const handleendChange = (event) => {
    setEndtime(event.target.value);
    console.log(event.target.value);
      
  };
  const handledeadChange = (event) => {
    setDeadline(event.target.value);
    console.log(event.target.value);
    
  };
  const handlenotiChange = (event) => {
    setNotitime(event.target.value);
    console.log(event.target.value);
      
  };
  const handletitleChange = (event) => {
    setTitle(event.target.value);
    console.log(event.target.value);
      
  };
  const handlecontextChange = (event) => {
    setContext(event.target.value);
    console.log(event.target.value);
      
  };
  const Confirm = async () => {
    if (window.confirm("정말 완료하시겠 습니까?")) {

        await axios
          .post(`http://127.0.0.1:4500/test/schedule`, {
            date : `${moment().format("YYYYMMDD")}`,
            started_at  : `${moment().format("YYYYMMDD")} ${
              starttime[0] + starttime[1] + starttime[2] + starttime[3]
            }`,
            finished_at : `${moment().format("YYYYMMDD")} ${
              endtime[0] + endtime[1] + endtime[2] + endtime[3]
            }`,
            deadline_at : `${moment().format("YYYYMMDD")} ${
              deadline[0] + deadline[1] + deadline[2] + deadline[3]
            }`,
            notification : `${moment().format("YYYYMMDD")} ${
              notitime[0] + notitime[1] + notitime[2] + notitime[3]
            }`,
            is_finished : false,
            month : `${moment().format("MM")}`,
            year : `${moment().format("YYYY")}`,
            week : "1",
            point : 0,
            user_id : "wony5248",
            title : title,
            context: context,
          })
          .then(({ data }) => {
            console.log(data.data);
            // setItemList(data.data);
            // console.log(data.data);
            setStarttime(moment(data.data.started_at).format("YYYYMMDD HHmm"));
          })
          .catch((e) => {});
        window.location.replace(`/Today`);
    } else {
        console.log("변화 없음");
    }
  };
  useEffect(() => {
    setContextarr(["식사 하기", "공부 하기", "영화 보기", "휴식 하기", "운동 하기", "수면 하기", "여가 생활 즐기기", "미팅 하기"])
    setTitlearr(["식사", "공부", "영화", "휴식", "운동", "수면", "여가", "미팅"])
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
      setStartarr(result);
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
          value={starttime}
          onChange={handlestartChange}
        >
          {startarr.map((item) => (
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
          {startarr.map((item) => (
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
          value={deadline}
          onChange={handledeadChange}
        >
          {startarr.map((item) => (
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
          value={notitime}
          onChange={handlenotiChange}
        >
          {startarr.map((item) => (
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
          value={title}
          onChange={handletitleChange}
        >
          {titlearr.map((item) => (
            <Changeoption value={item}>
              {item}
            </Changeoption>
          ))}
        </Changeselect>
      </Changeend>
      <Changeend>
        <Changeendtext>일정 내용</Changeendtext>
        <Changeselect2
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={context}
          onChange={handlecontextChange}
        >
          {contextarr.map((item) => (
            <Changeoption value={item}>
              {item}
            </Changeoption>
          ))}
        </Changeselect2>
      </Changeend>
      <Btndiv><Addbtn onClick = {() => Confirm()}>추가하기</Addbtn></Btndiv>
    </Changecalcon>
  );
};

const Create = () => {
  
  return <Layout pages={Changecalendarlayout()}></Layout>;
};

export default Create;