import React from "react";
import Layout from "../../layout";
import { Link } from "react-router-dom";
import Progresscontainer from "./styles";
import styled from "styled-components";

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
  return (
    <Progresscontainer>
      <Progresstitle>
        <Progresstitlenamecon>
          <Progresstitlename>일정 제목</Progresstitlename>
          <Progresstitletime>00:00 ~ 02:00</Progresstitletime>
        </Progresstitlenamecon>
        <Progressgoal>리액트 부시기</Progressgoal>
        <Progressgoal>일렉트론 부시기</Progressgoal>
      </Progresstitle>
      <Progresscontentcon>
        <Progresscontenttitle>일정 내용</Progresscontenttitle>
        <Progresscontent>
          나는 오늘 라면을 먹었다. 내일은 무엇을 먹을까?
        </Progresscontent>
      </Progresscontentcon>
    </Progresscontainer>
  );
};
const Progress = () => {
  return <Layout pages={Progresslayout()}></Layout>;
};

export default Progress;
