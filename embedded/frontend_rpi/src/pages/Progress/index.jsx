import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import { useUserContext } from "../../context";
import "moment/locale/ko";

const Progresscontainer = styled.div`
  overflow: auto;
  display: flex-row;
  padding-top: 14px;
  padding-right: 12px;
  padding-left: 12px;
  padding-bot: 14px;
  flex-wrap: nowrap;
  width: auto;
  height: 98.7%;
  margin: 0px;
  font-size: 24px;
`;
const Progresstitle = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  flex-wrap: no-wrap;
  justify-content: flex-start;
  width: auto;
  height: 30%;
  color: white;
  background-color: ${(props) => (props.isdark === true ? "gray" : "#a3cca3")};
  padding: 0px;
`;
const Progresstitlenamecon = styled.div`
  width: auto;
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 16px;
  padding-top: 4px;
`;
const Progressdeadline = styled.div`
  width: auto;
  height: 30%;
  display: flex;
  align-items: center;
  margin: 0px 16px;
  padding-top: 4px;
`;

const Progresstitlename = styled.div`
  width: auto;
  height: 30%;
  padding-top: 4px;
`;

const Progresstitletime = styled.div`
  width: auto;
  height: auto;
  padding-top: 4px;
`;

const Progresscontentcon = styled.div`
  border-radius: 4px;
  flex-wrap: nowrap;
  width: auto;
  height: 63%;
  color: white;
  background-color: ${(props) => (props.isdark === true ? "gray" : "#a3cca3")};
  margin-top: 14px;
  padding: 14px 28px;
`;

const Progresscontenttitle = styled.div`
  width: auto;
  height: 10%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  margin-bottom: 14px;
`;

const Progresscontent = styled.div`
  overflow: auto;
  width: auto;
  height: 66%;
  color: #121212;
  background-color: ${(props) => (props.isdark === true ? "#c9c9c9" : "white")};
  padding: 16px;
`;
const Fulldiv = styled.div`
  height: 100%;
`;

const Completebtn = styled.button`
  border: none;
  color: white;
  border-radius: 8px;
  background-color: ${(props) =>
    props.isdark === true ? "#424242" : "#69a569"};
  padding: 4px;
  height: 70%;
  width: 10%;
  cursor: pointer;
`;

const Btndiv = styled.div`
  height: 15%;
  margin-top: 1%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const Nodiv = styled.div`
  color: ${(props) => (props.isdark ? "white" : "#121212")};
`;
const Progresslayout = () => {
  const [istrue, setIstrue] = useState(false);
  const [calarr, setCalarr] = useState([]);
  const arr = [];
  useEffect(() => {
    async function loadCalendar() {
      await axios
        .get(
          `http://127.0.0.1:4500/schedule/getdaily/${moment().format(
            "YYYYMMDD"
          )}`
        )
        .then(({ data }) => {

          for (let i = 0; i < data.length; i++) {
            const startTime = Number(moment(data[i].started_at).format("HH"));
            const startMin = Number(moment(data[i].started_at).format("mm"));
            const endTime = Number(moment(data[i].finished_at).format("HH"));
            const endMin = Number(moment(data[i].finished_at).format("mm"));
            const currentTime = Number(moment().format("HH"));

            const currentMin = Number(moment().format("mm"));

            if (
              startTime < currentTime &&
              currentTime < endTime &&
              data[i].is_finished === false
            ) {
              arr.push(data[i]);
              setIstrue(true);
            } else if (
              currentTime === endTime &&
              currentMin <= endMin &&
              data[i].is_finished === false
            ) {
              arr.push(data[i]);
              setIstrue(true);
            } else if (
              currentTime === startTime &&
              startMin <= currentMin &&
              data[i].is_finished === false
            ) {
              arr.push(data[i]);
              setIstrue(true);
            }
          }
          setCalarr(arr);
        })
        .catch((e) => {
          console.error(e);
        });
    }
    loadCalendar();
    console.log("asdfas")
  }, []);
  const { isdarked } = useUserContext();
  return (
    <Progresscontainer isdark={isdarked}>
      {istrue ? (
        <div style={{height:"100%"}}>
          {calarr.map((item) => (
            <Fulldiv>
              <Progresstitle isdark={isdarked}>
                <Progresstitlenamecon>
                  <Progresstitlename>{item.title}</Progresstitlename>
                  <Progresstitletime>
                    {moment(item.started_at).format("HH:mm")} ~ {moment(item.finished_at).format("HH:mm")}
                  </Progresstitletime>
                </Progresstitlenamecon>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "30%",
                  }}
                >
                  <Progressdeadline>등록 알람</Progressdeadline>
                  <Progressdeadline>{moment(item.notification).format("HH:mm")}</Progressdeadline>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "30%",
                  }}
                >
                  <Progressdeadline>일정 데드라인</Progressdeadline>
                  <Progressdeadline>{moment(item.deadline_at).format("YYYY.MM.DD HH:mm")}</Progressdeadline>
                </div>
              </Progresstitle>
              <Progresscontentcon isdark={isdarked}>
                <Progresscontenttitle>일정 내용</Progresscontenttitle>
                <Progresscontent isdark={isdarked}>{item.context}</Progresscontent>
                <Btndiv>
                  <Completebtn
                    isdark={isdarked}
                    onClick={() => window.location.replace(`/Rating/${item.id}`)}
                  >
                    완료
                  </Completebtn>
                </Btndiv>
              </Progresscontentcon>
            </Fulldiv>
          ))}
        </div>
      ) : (
        <Nodiv
          isdark={isdarked}
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "40px",
          }}
        >
          현재 일정이 없습니다.
        </Nodiv>
      )}
    </Progresscontainer>
  );
};
const Progress = () => {
  return <Layout pages={Progresslayout()}></Layout>;
};

export default Progress;
