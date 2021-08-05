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
const Progressdeadline_at = styled.div`
  width: auto;
  height: 30%;
  color: white;
  display: flex;
  align-items: center;
  margin: 0px 16px;
  padding-top: 4px;
`;

const Progresstitlename = styled.div`
  width: auto;
  height: 30%;
  color: white;
  padding-top: 4px;
`;

const Progresstitletime = styled.div`
  width: auto;
  height: auto;
  color: white;
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
`;

const Progresscontent = styled.div`
  overflow: auto;
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
        .post("http://127.0.0.1:4500/test/getdaily", {"date" : `${moment().format("YYYYMMDD")}`})
        .then(({ data }) => {
          console.log(data.data)
          console.log(moment(data.data[0].started_at).format("HH:mm"))
          console.log(moment(data.data[0].finished_at).format("HH:mm"))
          console.log(data.data[0].title);
          console.log(data.data[0].context);
          console.log(moment(data.data[0].deadline_at).format("HH:mm"));
          for (let i = 0; i < data.data.length; i++) {
            // console.log(
            //   Number(data.data[i].started_at[0] + data.data[i].started_at[1])
            // );
            const startTime = Number(
              moment(data.data[i].started_at).format("HH")
            );
            const startMin = Number(
              moment(data.data[i].started_at).format("mm")
            );
            const endTime = Number(
              moment(data.data[i].finished_at).format("HH")
            );
            const endMin = Number(
              moment(data.data[i].finished_at).format("mm")
            );
            const currentTime = Number(moment().format("H"));
            // console.log(started_at);
            // console.log(currentTime);
            // console.log(finished_at)
            const currentMin = Number(moment().format("mm"));
            // console.log(startMin);
            // console.log(currentMin);
            // console.log(endMin)
            if (startTime < currentTime && currentTime < endTime) {
              // console.log(data.data[i].started_at);
              setStarttime(`${moment(data.data[i].started_at).format("HH : mm")}`);
              setEndtime(`${moment(data.data[i].finished_at).format("HH : mm")}`);
              setGoal(`${moment(data.data[i].deadline_at).format("YYYY.MM.DD HH : mm")}`);
              setTitle(data.data[i].title);
              setContent(data.data[i].context);
              setIstrue(true);
            } else if (currentTime === endTime && currentMin <= endMin) {
              setStarttime(`${moment(data.data[i].started_at).format("HH : mm")}`);
              setEndtime(`${moment(data.data[i].finished_at).format("HH : mm")}`);
              setGoal(`${moment(data.data[i].deadline_at).format("YYYY.MM.DD HH : mm")}`);
              setTitle(data.data[i].title);
              setContent(data.data[i].context);
              setIstrue(true);
            } else if (currentTime === startTime && startMin <= currentMin) {
              setStarttime(`${moment(data.data[i].started_at).format("HH : mm")}`);
              setEndtime(`${moment(data.data[i].finished_at).format("HH : mm")}`);
              setGoal(`${moment(data.data[i].deadline_at).format("YYYY.MM.DD HH : mm")}`);
              setTitle(data.data[i].title);
              setContent(data.data[i].context);
              setIstrue(true);
            }
          }
          console.log(
            data.data[0].started_at[0] +
              data.data[0].started_at[1] +
              data.data[0].started_at[5] +
              data.data[0].started_at[6]
          );
        })
        .catch((e) => {
          console.error(e);
        });

      // console.log(Number(moment().format("H")));
      // console.log(Number(moment().format("mm")));
    }
    loadCalendar();
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
            <Progressdeadline_at>일정 데드라인</Progressdeadline_at>
            <Progressdeadline_at>{goal}</Progressdeadline_at>
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
