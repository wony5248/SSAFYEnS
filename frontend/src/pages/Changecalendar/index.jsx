import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import { Link } from "react-router-dom";
import styled1 from "styled-components";
import { makeStyles, styled } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import { Icon } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Changeselect = styled1.div`
  width: auto;
  height: 24px;
  color: white;
  border: 0px;
  margin-left: 12px;
`;

const Changecalcon = styled1.div`
  width: auto;
  height: 310px;
  display: flex-row;
  flex-wrap: nowrap;
  color: #a3cca3;
  background-color: white;
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
  text-align: center;
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
const Timebox = styled1.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Changetitleinput = styled(Input)({
  backgroundColor: "white",
  height: "25px",
  fontSize: "12px",
  paddingLeft: "8px",
});

const Changecalendarlayout = () => {
  const classes = useStyles();
  const [starttime, setStarttime] = useState(0);
  const [endtime, setEndtime] = useState(0);
  const [click, setClick] = useState(0);
  const [optionarr, setOptionarr] = useState([]);
  const Clickplus = () => {
    setClick(click+1)
    console.log("click:" + click)
    if (click % 2 === 0){
      setStarttime(parseInt((click+1) / 2))
      console.log("starttime:" + starttime)
    } 
    if (click === 48){
      setClick(0)
    }
  }
  
  const Clickminus = () => {
    setClick(click - 1)
    console.log("click:" + click)
    if (click % 2 === 0){
      setStarttime(parseInt(click / 2))
    }
    if (click === -1){
      setClick(47)
    }
    console.log("starttime:" + starttime)
  }
  return (
    <Changecalcon>
      <Changestart>
        <Changestarttext>변경할 시작 시간</Changestarttext>
        {(click % 2) === 0 ? (
          <Timebox>
            <Minusbtn onClick = {() => Clickminus()}><RemoveIcon></RemoveIcon></Minusbtn>
            <Changeselect>{starttime} : 00</Changeselect>
            <Plusbtn onClick = {() => Clickplus()}><AddIcon></AddIcon></Plusbtn>
          </Timebox>
        ) : (
          <Timebox>
          <Minusbtn onClick = {() => Clickminus()}><RemoveIcon></RemoveIcon></Minusbtn>
          <Changeselect>{starttime} : 30</Changeselect>
          <Plusbtn onClick = {() => Clickplus()}><AddIcon></AddIcon></Plusbtn>
        </Timebox>
        )}
      </Changestart>
      <Changeend>
        <Changeendtext>변경할 종료 시간</Changeendtext>
        {endtime < 10 ? (
          <Timebox>
            <Minusbtn><RemoveIcon></RemoveIcon></Minusbtn>
            <Changeselect>0{endtime} : 00</Changeselect>
            <Plusbtn><AddIcon></AddIcon></Plusbtn>
          </Timebox>
        ) : (
          <Changeselect>{endtime} : 00</Changeselect>
        )}
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
