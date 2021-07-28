import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import { Link } from "react-router-dom";
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
  height: 88px;
  color: #a3cca3;
  background-color: #a3cca3;
  // margin: 14px 12px;
  padding: 0px;
`;
const Progresstitlenamecon = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: space-between;
  color: white;
  background-color: #a3cca3;
  margin: 0px 16px;
  padding-top: 4px;
`;
const Progressgoal = styled.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
  margin: 0px 16px;
  padding-top: 4px;
`;

const Progresstitlename = styled.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
  padding-top: 4px;
`;

const Progresstitletime = styled.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
  padding-top: 4px;
`;

const Progresscontentcon = styled.div`
  display: flex-row;
  border-radius: 4px;
  flex-wrap: nowrap;
  width: auto;
  height: auto;
  color: #a3cca3;
  background-color: #a3cca3;
  margin-top: 14px;
  padding: 14px 14px;
`;

const Progresscontenttitle = styled.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
  padding: 0px;
  margin-bottom: 14px;
`;

const Progresscontent = styled.div`
  overflow: auto;
  width: auto;
  height: 125px;
  color: #a3cca3;
  background-color: white;
  padding: 4px;
`;

const Progresslayout = () => {
  const [loading, setLoading] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [content, setContent] = useState("");
  const [istrue, setIstrue] = useState(false);
  useEffect(() => {
    async function loadCalendar() {
      const result = await axios
        .get("./today.json")
        .then(({ data }) => {
          setLoading(true);
          setItemList(data.Item);
          // console.log(data.Item)
          for (let i = 0; i < data.Item.length; i++) {
            // console.log(
            //   Number(data.Item[i].StartTime[0] + data.Item[i].StartTime[1])
            // );
            const startTime = Number(
              data.Item[i].StartTime[0] + data.Item[i].StartTime[1]
            );
            const startMin = Number(
              data.Item[i].StartTime[5] + data.Item[i].StartTime[6]
            );
            const endTime = Number(
              data.Item[i].EndTime[0] + data.Item[i].EndTime[1]
            );
            const endMin = Number(
              data.Item[i].EndTime[5] + data.Item[i].EndTime[6]
            );
            const currentTime = Number(moment().format("H"));
            console.log(startTime);
            console.log(currentTime);
            // console.log(endTime)
            const currentMin = Number(moment().format("mm"));
            console.log(startMin);
            console.log(currentMin);
            // console.log(endMin)
            if (startTime < currentTime && currentTime < endTime) {
              console.log(data.Item[i].StartTime);
              setStarttime(data.Item[i].StartTime);
              setEndtime(data.Item[i].EndTime);
              setGoal(data.Item[i].Goal);
              setTitle(data.Item[i].Title);
              setContent(data.Item[i].Content);
              setIstrue(true);
            } else if (currentTime == endTime && currentMin <= endMin) {
              setStarttime(data.Item[i].StartTime);
              setEndtime(data.Item[i].EndTime);
              setGoal(data.Item[i].Goal);
              setTitle(data.Item[i].Title);
              setContent(data.Item[i].Content);
              setIstrue(true);
            } else if (currentTime == startTime && startMin <= currentMin) {
              setStarttime(data.Item[i].StartTime);
              setEndtime(data.Item[i].EndTime);
              setGoal(data.Item[i].Goal);
              setTitle(data.Item[i].Title);
              setContent(data.Item[i].Content);
              setIstrue(true);
            }
          }
          // console.log(
          //   data.Item[0].StartTime[0] +
          //     data.Item[0].StartTime[1] +
          //     data.Item[0].StartTime[5] +
          //     data.Item[0].StartTime[6]
          // );
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });

      // console.log(Number(moment().format("H")));
      // console.log(Number(moment().format("mm")));
    }
    loadCalendar();
    const interval = setInterval(() => {
      loadCalendar();
    }, 10000);
  }, []);
  return (
    <Progresscontainer>
      {istrue ? (
        <div>
          <Progresstitle>
            <Progresstitlenamecon>
              <Progresstitlename>{title}</Progresstitlename>
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
          </Progresscontentcon>
        </div>
      ) : (
        <div>현재 일정이 없습니다.</div>
      )}
    </Progresscontainer>
  );
};
const Progress = () => {
  return <Layout pages={Progresslayout()}></Layout>;
};

export default Progress;
