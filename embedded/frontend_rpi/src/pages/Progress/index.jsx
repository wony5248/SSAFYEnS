import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import Progresscontainer from "./styles";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";

const Progresstitle = styled.div`
  display: flex-row;
  border-radius: 4px;
  flex-wrap: no-wrap;
  justify-content: space-around;
  width: auto;
  height: 30%;
  color: #a3cca3;
  background-color: #a3cca3;
  // margin: 14px 12px;
  padding: 0px;
`;
const Progresstitlenamecon = styled.div`
  width: auto;
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: #a3cca3;
  margin: 0px 16px;
  padding-top: 4px;
`;
const Progressgoal = styled.div`
  width: auto;
  height: 30%;
  color: white;
  display: flex;
  align-items: center;
  margin: 0px 16px;
  font-size: 20px;
  padding-top: 4px;
`;

const Progresstitlename = styled.div`
  width: auto;
  height: 30%;
  color: white;
  font-size: 20px;
  padding-top: 4px;
`;

const Progresstitletime = styled.div`
  width: auto;
  height: auto;
  color: white;
  font-size: 20px;
  padding-top: 4px;
`;

const Progresscontentcon = styled.div`
  display: flex-row;
  border-radius: 4px;
  flex-wrap: nowrap;
  width: auto;
  height: 63%;
  color: #a3cca3;
  background-color: #a3cca3;
  margin-top: 14px;
  padding: 14px 14px;
`;

const Progresscontenttitle = styled.div`
  width: auto;
  height: 10%;
  color: white;
  display:flex;
  align-items: center;
  background-color: #a3cca3;
  padding: 0px;
  margin-bottom: 14px;
  font-size: 20px;
`;

const Progresscontent = styled.div`
  overflow: auto;
  font-size: 20px;
  width: auto;
  height: 76%;
  color: #a3cca3;
  background-color: white;
  padding: 4px;
`;
const Fulldiv = styled.div`
  height: 100%;
`;

const Completebtn = styled.button`
  border: none;
  color: white;
  border-radius: 8px;
  background-color: #69a569;
  padding: 4px;
  height: 70%;
  width: 10%;
`;

const Btndiv = styled.div`
  height: 10%;
  margin-top: 1%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const Progresslayout = () => {
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [content, setContent] = useState("");
  const [istrue, setIstrue] = useState(true);
  useEffect(() => {
    async function loadCalendar() {
      await axios
        .get("http://127.0.0.1:4500/test/schedule")
        .then(({ data }) => {
          console.log(data.data.title)
          setStarttime(moment(data.data.started_at).format("HH:mm"))
          setEndtime(moment(data.data.finished_at).format("HH:mm"))
          setTitle(data.data.title);
          setContent(data.data.context);
          setGoal(moment(data.data.deadline_at).format("HH:mm"));
          // console.log(moment())
          // console.log(data.Item)
          // for (let i = 0; i < data.Item.length; i++) {
          //   // console.log(
          //   //   Number(data.Item[i].StartTime[0] + data.Item[i].StartTime[1])
          //   // );
          //   const startTime = Number(
          //     data.Item[i].StartTime[0] + data.Item[i].StartTime[1]
          //   );
          //   const startMin = Number(
          //     data.Item[i].StartTime[5] + data.Item[i].StartTime[6]
          //   );
          //   const endTime = Number(
          //     data.Item[i].EndTime[0] + data.Item[i].EndTime[1]
          //   );
          //   const endMin = Number(
          //     data.Item[i].EndTime[5] + data.Item[i].EndTime[6]
          //   );
          //   const currentTime = Number(moment().format("H"));
          //   // console.log(startTime);
          //   // console.log(currentTime);
          //   // console.log(endTime)
          //   const currentMin = Number(moment().format("mm"));
          //   // console.log(startMin);
          //   // console.log(currentMin);
          //   // console.log(endMin)
          //   if (startTime < currentTime && currentTime < endTime) {
          //     // console.log(data.Item[i].StartTime);
          //     setStarttime(data.Item[i].StartTime);
          //     setEndtime(data.Item[i].EndTime);
          //     setGoal(data.Item[i].Goal);
          //     setTitle(data.Item[i].Title);
          //     setContent(data.Item[i].Content);
          //     setIstrue(true);
          //   } else if (currentTime === endTime && currentMin <= endMin) {
          //     setStarttime(data.Item[i].StartTime);
          //     setEndtime(data.Item[i].EndTime);
          //     setGoal(data.Item[i].Goal);
          //     setTitle(data.Item[i].Title);
          //     setContent(data.Item[i].Content);
          //     setIstrue(true);
          //   } else if (currentTime === startTime && startMin <= currentMin) {
          //     setStarttime(data.Item[i].StartTime);
          //     setEndtime(data.Item[i].EndTime);
          //     setGoal(data.Item[i].Goal);
          //     setTitle(data.Item[i].Title);
          //     setContent(data.Item[i].Content);
          //     setIstrue(true);
          //   }
          // }
          // console.log(
          //   data.Item[0].StartTime[0] +
          //     data.Item[0].StartTime[1] +
          //     data.Item[0].StartTime[5] +
          //     data.Item[0].StartTime[6]
          // );
        })
        .catch((e) => {
          console.error(e);
        });

      // console.log(Number(moment().format("H")));
      // console.log(Number(moment().format("mm")));
    }
    loadCalendar();
    setInterval(() => {
      loadCalendar();
    }, 60000);
  }, []);
  return (
    <Progresscontainer>
      {istrue ? (
        <Fulldiv>
          <Progresstitle>
            <Progresstitlenamecon>
              <Progresstitlename>일정 제목: {title}</Progresstitlename>
              <Progresstitletime>
                {starttime} ~ {endtime}
              </Progresstitletime>
            </Progresstitlenamecon>
            <Progressgoal>일정 목표</Progressgoal>
            <Progressgoal>{goal}</Progressgoal>
          </Progresstitle>
          <Progresscontentcon>
            <Progresscontenttitle>일정 내용</Progresscontenttitle>
            <Progresscontent>{content}</Progresscontent>
            <Btndiv><Completebtn onClick={() => window.location.replace(`/Rating/${starttime}`)}>완료</Completebtn></Btndiv>
          </Progresscontentcon>
        </Fulldiv>
      ) : (
        <Fulldiv>현재 일정이 없습니다.</Fulldiv>
      )}
    </Progresscontainer>
  );
};
const Progress = () => {
  return <Layout pages={Progresslayout()}></Layout>;
};

export default Progress;
