import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import styled1 from "styled-components";
import {styled } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";


const Changeselect = styled1.select`
  width: 80px;
  height: auto;
  color: white;
  background-color: #69a569;
  border: 0px;
`;

const Changecalcon = styled1.div`
  width: auto;
  height: 310px;
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
  background-color: #a3cca3;
  margin: 12px 0px;
  padding: 4px;
`;
const Changeend = styled1.div`
  display: flex;
  justify-content: space-between;
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
  border-radius: 4px;
  margin: 12px 0px;
  padding: 4px;
`;
const Changestarttext = styled1.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
`;
const Changeendtext = styled1.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
`;

const Changetitle = styled1.div`
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  width: auto;
  height: auto;
  color: white;
  padding:4px;
  background-color: #a3cca3;
`;
const Changetitletext = styled1.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
  font-size: 16px;
`;
const Changebtn = styled1.button`
  width: 78px;
  height: auto;
  border-radius:8px;
  border:0px;
  color: white;
  background-color: #69a569;
  padding: 4px;
`;
const ChangeContent = styled1.div`
  display: flex-row;
  justify-content: space-between;
  border-radius: 4px;
  width: auto;
  height: auto;
  color: white;
  padding:4px;
  background-color: #a3cca3;
  margin-top:12px;
`;
const ChangeContentheader = styled1.div`
  display: flex;
  justify-content: space-between;
  width: auto;
  height: auto;
  color: white;
  padding:4px;
  background-color: #a3cca3;
`;
const Changecontentinput1 = styled1.textarea`
    background-color: white;
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
const Changetitleinput = styled(Input)({
  backgroundColor: "white",
  height: "25px",
  fontSize: "12px",
  paddingLeft: "8px",
});

const Changecalendarlayout = () => {
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [optionarr, setOptionarr] = useState([]);
  const handlestartChange = (event) => {
    setStarttime(event.target.value);
    console.log(event.target.value);
  };
  const handleendChange = (event) => {
    setEndtime(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
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
      <Changestart>
        <Changestarttext>변경할 시작 시간</Changestarttext>
        <Changeselect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={starttime}
          onChange={handlestartChange}
        >
          {optionarr.map((item) => (
            <option value={item[0]+item[1]+item[3]+item[4]}>{item}</option>
            
          ))}
        </Changeselect>
      </Changestart>
      <Changeend>
        <Changeendtext>변경할 종료 시간</Changeendtext>
        <Changeselect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={endtime}
          onChange={handleendChange}
        >
          {optionarr.map((item) => (
            <option value={item[0]+item[1]+item[3]+item[4]}>{item}</option>
          ))}
        </Changeselect>
      </Changeend>
      <Changetitle>
        <Changetitletext>일정 제목</Changetitletext>
        <Changetitleinput placeholder="변경할 일정 제목"></Changetitleinput>
      </Changetitle>
      <ChangeContent>
        <ChangeContentheader>
          <Changetitletext>일정 내용</Changetitletext>
          <Changebtn>변경</Changebtn>
        </ChangeContentheader>
        <Changecontentinput1
          multiline
          rows={4}
          placeholder="변경할 일정 내용"
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
