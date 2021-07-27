import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Todaycontainer = styled.div`
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
const Todaytitle = styled.div`
  display: flex-row;
  flex-wrap: no-wrap;
  border-radius: 4px;
  justify-content: space-around;
  width: auto;
  height: 88px;
  color: #a3cca3;
  background-color: #a3cca3;
  margin-bottom: 14px;
  padding: 0px;
`;
const Todaytitlenamecon = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: space-between;
  color: white;
  background-color: #a3cca3;
  margin: 0px 16px;
  padding-top: 4px;
`;
const Todaygoal = styled.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
  margin: 0px 16px;
  padding-top: 4px;
`;

const Todaytitlename = styled.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
  padding-top: 4px;
`;

const Todaytitletime = styled.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
  padding-top: 4px;
`;

const Todaychangecon = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: space-between;
  color: white;
  background-color: #a3cca3;
  margin: 0px 16px;
`;

const Todaycontenttitle = styled.div`
  width: auto;
  height: auto;
  color: white;
  background-color: #a3cca3;
  padding: 0px;
  margin-bottom: 14px;
`;

const Todaychangebtn = styled.button`
  width: 78px;
  height: auto;
  border-radius: 8px;
  border: 0px;
  color: white;
  background-color: #69a569;
  padding: 4px;
`;
{/* <ul>
{itemList.map((item) => (
  <li key = {item.Title}>
      {item.Content}
  </li>
))}
</ul> */}
const Todaylayout = () => {
  const [loading, setLoading] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  useEffect(() => {
    async function loadItem() {
      const result = await axios
        .get("./today.json")
        .then(({ data }) => {
          setLoading(true);
          setItemList(data.Item);
          console.log(data.Item);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
    }
    loadItem();
  }, []);

  return (
    <Todaycontainer>
      <Todaytitle>
        <Todaytitlenamecon>
          <Todaytitlename>일정 제목</Todaytitlename>
          <Todaytitletime>00:00 ~ 02:00</Todaytitletime>
        </Todaytitlenamecon>
        <Todaygoal>리액트 부시기</Todaygoal>
        <Todaychangecon>
          <Todaytitlename>일정 설명</Todaytitlename>
          <Todaychangebtn onClick={() => window.location.replace(`/Rating`)}>
            완료
          </Todaychangebtn>
        </Todaychangecon>
      </Todaytitle>
      <Todaytitle>
        <Todaytitlenamecon>
          <Todaytitlename>일정 제목</Todaytitlename>
          <Todaytitletime>00:00 ~ 02:00</Todaytitletime>
        </Todaytitlenamecon>
        <Todaygoal>리액트 부시기</Todaygoal>
        <Todaychangecon>
          <Todaytitlename>일정 설명</Todaytitlename>
          <Todaychangebtn onClick={() => window.location.replace(`/Rating`)}>
            완료
          </Todaychangebtn>
        </Todaychangecon>
      </Todaytitle>
      <Todaytitle>
        <Todaytitlenamecon>
          <Todaytitlename>일정 제목</Todaytitlename>
          <Todaytitletime>00:00 ~ 02:00</Todaytitletime>
        </Todaytitlenamecon>
        <Todaygoal>리액트 부시기</Todaygoal>
        <Todaychangecon>
          <Todaytitlename>일정 설명</Todaytitlename>
          <Todaychangebtn onClick={() => window.location.replace(`/Rating`)}>
            완료
          </Todaychangebtn>
        </Todaychangecon>
      </Todaytitle>
      <Todaytitle>
        <Todaytitlenamecon>
          <Todaytitlename>일정 제목</Todaytitlename>
          <Todaytitletime>00:00 ~ 02:00</Todaytitletime>
        </Todaytitlenamecon>
        <Todaygoal>리액트 부시기</Todaygoal>
        <Todaychangecon>
          <Todaytitlename>일정 설명</Todaytitlename>
          <Todaychangebtn onClick={() => window.location.replace(`/Rating`)}>
            완료
          </Todaychangebtn>
        </Todaychangecon>
      </Todaytitle>
      <Todaytitle>
        <Todaytitlenamecon>
          <Todaytitlename>일정 제목</Todaytitlename>
          <Todaytitletime>00:00 ~ 02:00</Todaytitletime>
        </Todaytitlenamecon>
        <Todaygoal>리액트 부시기</Todaygoal>
        <Todaychangecon>
          <Todaytitlename>일정 설명</Todaytitlename>
          <Todaychangebtn onClick={() => window.location.replace(`/Rating`)}>
            완료
          </Todaychangebtn>
        </Todaychangecon>
      </Todaytitle>
    </Todaycontainer>
  );
};

const Today = () => {
  return <Layout pages={Todaylayout()}></Layout>;
};

export default Today;
