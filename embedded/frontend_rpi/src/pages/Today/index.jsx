import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import axios from "axios";
import styled from "styled-components";
import moment from "moment";

const Todaycontainer = styled.div`
  overflow: auto;
  width: auto;
  height: 97.1%;
  color: #a3cca3;
  background-color: white;
  border: 1px solid #a3cca3;
  margin: 0px;
  padding-top: 1%;
  padding-right: 12px;
  padding-left: 12px;
  padding-bottom: 1%;
`;
const Todaytitle = styled.div`
  display: flex-row;
  font-size: 20px;
  flex-wrap: no-wrap;
  border-radius: 4px;
  justify-content: space-around;
  width: auto;
  height: 20%;
  color: #a3cca3;
  background-color: #a3cca3;
  margin-bottom: 14px;
  padding: 0px;
`;
const Todaytitlenamecon = styled.div`
  width: auto;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: #a3cca3;
  margin: 0px 16px;
  padding-top: 4px;
`;
const Todaygoal = styled.div`
  width: auto;
  height: 20%;
  display: flex;
  align-items: center;
  color: white;
  background-color: #a3cca3;
  margin: 0px 16px;
  padding-top: 4px;
`;

const Todaytitlename = styled.div`
  width: auto;
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  background-color: #a3cca3;
  padding-top: 4px;
`;

const Todaytitletime = styled.div`
  width: auto;
  height: 100%;
  color: white;
  background-color: #a3cca3;
  padding-top: 4px;
`;

const Todaychangecon = styled.div`
  width: auto;
  height: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: #a3cca3;
  margin: 0px 16px;
`;

const Todaychangebtn = styled.button`
  width: 78px;
  height: 60%;
  border-radius: 8px;
  border: 0px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #69a569;
  padding: 4px;
`;

const Todaylayout = () => {
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    async function loadCalendar() {
      console.log(moment().format("YYYYMMDD"));
      await axios
        .get(
          `http://127.0.0.1:4500/schedule/getdaily/${moment().format("YYYYMMDD")}`
        )
        .then(({ data }) => {
          console.log(data);
          setItemList(data.data);
          // console.log(data.data);
          console.log(itemList);
        })
        .catch((e) => {});
    }
    loadCalendar();
    setInterval(() => {
      loadCalendar();
    }, 60000);
  }, []);

  return (
    <Todaycontainer>
      {itemList.length !== 0 ? (
        <div style={{ height: "100%" }}>
          {itemList.sort(function(a, b) {return Number(moment(a.started_at).format("HHmm")) - Number(moment(b.started_at).format("HHmm"))}).map((item) => (
            <Todaytitle>
              <Todaytitlenamecon>
                <Todaytitlename>일정 제목</Todaytitlename>
                <Todaytitletime>
                  {moment(item.started_at).format("HH:mm")} ~{" "}
                  {moment(item.finished_at).format("HH:mm")}
                </Todaytitletime>
              </Todaytitlenamecon>
              <Todaygoal>{item.title}</Todaygoal>
              
                {item.is_finished ? (
                  <Todaychangecon>
                    <Todaytitlename style={{width:"500px"}}>{item.context}</Todaytitlename>
                    <Todaytitlename>
                      이미 완료된 일정입니다.
                    </Todaytitlename>
                  </Todaychangecon>
                ) : (
                  <Todaychangecon>
                    <Todaytitlename>{item.context}</Todaytitlename>
                    <Todaychangebtn
                      onClick={() =>
                        window.location.replace(`/Rating/${item.id}`)
                      }
                    >
                      완료
                    </Todaychangebtn>
                  </Todaychangecon>
                )}
            </Todaytitle>
          ))}
        </div>
      ) : (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "40px",
            color: "#121212",
          }}
        >
          등록된 오늘 일정이 없습니다.
        </div>
      )}
    </Todaycontainer>
  );
};

const Today = () => {
  return <Layout pages={Todaylayout()}></Layout>;
};

export default Today;
