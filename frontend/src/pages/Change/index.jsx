import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../layout";
import styled from "styled-components";

const Changecontainer = styled.div`
  overflow: auto;
  width: auto;
  height: 310px;
  color: #a3cca3;
  background-color: white;
  margin: 0px;
  padding-top: 14px;
  padding-right: 12px;
  padding-left: 12px;
  padding-bot: 14px;
`;
const Changetitle = styled.div`
  display: flex-row;
  flex-wrap: no-wrap;
  justify-content: space-around;
  border-radius: 4px;
  width: auto;
  height: 88px;
  color: #a3cca3;
  background-color: #a3cca3;
  margin-bottom: 14px;
  padding: 0px;
`;
const Changetitlenamecon = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: space-between;
  color: white;
  background-color: #a3cca3;
  margin: 0px 16px;
  padding-top: 4px;
`;
const Changegoal = styled.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
  margin: 0px 16px;
  padding-top: 4px;
`;

const Changetitlename = styled.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
  padding-top: 4px;
`;

const Changetitletime = styled.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
  padding-top: 4px;
`;

const Changechangecon = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: space-between;
  color: white;
  background-color: #a3cca3;
  margin: 0px 16px;
`;

const Changecontenttitle = styled.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
  padding: 0px;
  margin-bottom: 14px;
`;

const Changechangebtn = styled.button`
  width: 78px;
  height: auto;
  border-radius: 8px;
  border: 0px;
  color: white;
  background-color: #69a569;
  padding: 4px;
`;

const Changelayout = () => {
  return (
    <Changecontainer>
      <Changetitle>
        <Changetitlenamecon>
          <Changetitlename>일정 제목</Changetitlename>
          <Changetitletime>00:00 ~ 02:00</Changetitletime>
        </Changetitlenamecon>
        <Changegoal>리액트 부시기</Changegoal>
        <Changechangecon>
          <Changetitlename>일정 설명</Changetitlename>
          <Changechangebtn
            onClick={() => window.location.replace(`/Changecalendar`)}
          >
            변경
          </Changechangebtn>
        </Changechangecon>
      </Changetitle>
      <Changetitle>
        <Changetitlenamecon>
          <Changetitlename>일정 제목</Changetitlename>
          <Changetitletime>00:00 ~ 02:00</Changetitletime>
        </Changetitlenamecon>
        <Changegoal>리액트 부시기</Changegoal>
        <Changechangecon>
          <Changetitlename>일정 설명</Changetitlename>
          <Changechangebtn
            onClick={() => window.location.replace(`/Changecalendar`)}
          >
            변경
          </Changechangebtn>
        </Changechangecon>
      </Changetitle>
      <Changetitle>
        <Changetitlenamecon>
          <Changetitlename>일정 제목</Changetitlename>
          <Changetitletime>00:00 ~ 02:00</Changetitletime>
        </Changetitlenamecon>
        <Changegoal>리액트 부시기</Changegoal>
        <Changechangecon>
          <Changetitlename>일정 설명</Changetitlename>
          <Changechangebtn
            onClick={() => window.location.replace(`/Changecalendar`)}
          >
            변경
          </Changechangebtn>
        </Changechangecon>
      </Changetitle>
      <Changetitle>
        <Changetitlenamecon>
          <Changetitlename>일정 제목</Changetitlename>
          <Changetitletime>00:00 ~ 02:00</Changetitletime>
        </Changetitlenamecon>
        <Changegoal>리액트 부시기</Changegoal>
        <Changechangecon>
          <Changetitlename>일정 설명</Changetitlename>
          <Changechangebtn
            onClick={() => window.location.replace(`/Changecalendar`)}
          >
            변경
          </Changechangebtn>
        </Changechangecon>
      </Changetitle>
      <Changetitle>
        <Changetitlenamecon>
          <Changetitlename>일정 제목</Changetitlename>
          <Changetitletime>00:00 ~ 02:00</Changetitletime>
        </Changetitlenamecon>
        <Changegoal>리액트 부시기</Changegoal>
        <Changechangecon>
          <Changetitlename>일정 설명</Changetitlename>
          <Changechangebtn
            onClick={() => window.location.replace(`/Changecalendar`)}
          >
            변경
          </Changechangebtn>
        </Changechangecon>
      </Changetitle>
    </Changecontainer>
  );
};

const Change = () => {
  return <Layout pages={Changelayout()}></Layout>;
};

export default Change;
