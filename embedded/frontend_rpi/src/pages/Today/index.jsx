import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import axios from "axios";
import styled from "styled-components";
import moment from "moment";
import { useUserContext } from "../../context";
import "moment/locale/ko";

const Todaycontainer = styled.div`
  overflow: auto;
  width: auto;
  height: 97.2%;
  color: #a3cca3;
  padding-top: 14px;
  padding-right: 12px;
  padding-left: 12px;
  padding-bot: 14px;
  margin: 0px;
  padding-bottom: 1%;
`;
const Todaytitle = styled.div`
  display: flex-row;
  font-size: 20px;
  flex-wrap: no-wrap;
  border-radius: 4px;
  justify-content: space-around;
  width: auto;
  color: white;
  height: 20%;
  background-color: ${(props) => (props.isdark === true ? "gray" : "#a3cca3")};
  margin-bottom: 14px;
  padding: 0px;
`;
const Todaytitlenamecon = styled.div`
  width: auto;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 16px;
  padding-top: 4px;
`;
const Todaygoal = styled.div`
  width: auto;
  height: 20%;
  display: flex;
  align-items: center;
  margin: 0px 16px;
  padding-top: 4px;
`;

const Todaytitlename = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  padding-top: 4px;
`;

const Todaytitletime = styled.div`
  width: auto;
  height: 100%;
  padding-top: 4px;
`;

const Todaychangecon = styled.div`
  width: auto;
  height: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 16px;
`;

const Todaychangebtn = styled.button`
  width: 78px;
  height: 60%;
  border-radius: 8px;
  border: 0px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) =>
    props.isdark === true ? "#424242" : "#69a569"};
  color: white;
  justify-content: center;
  padding: 4px;
`;
const Changechangebtn = styled.button`
  width: 78px;
  height: 60%;
  border-radius: 8px;
  border: 0px;
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  background-color: ${(props) =>
    props.isdark === true ? "#424242" : "#69a569"};
  padding: 4px;
`;
const Nodiv = styled.div`
  color: ${(props) => (props.isdark ? "white" : "#121212")};
`;
const Todaylayout = () => {
  const [itemList, setItemList] = useState([]);
  const { isdarked } = useUserContext();
  const Delete = async (props) => {
    const id = props;
    console.log(id);
    if (window.confirm("정말 삭제하시겠 습니까?")) {
      await axios
        .delete(`http://127.0.0.1:4500/schedule/${id}`)
        .then(({ data }) => {})
        .catch((e) => {});
      window.location.replace(`/Today`);
    } else {
    }
  };
  useEffect(() => {
    async function loadCalendar() {
      await axios
        .get(
          `http://127.0.0.1:4500/schedule/getdaily/${moment().format(
            "YYYYMMDD"
          )}`
        )
        .then(({ data }) => {
          console.log(data)
          setItemList(data);
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
          {itemList.map((item) => (
            <Todaytitle isdark={isdarked}>
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
                  <Todaytitlename style={{ width: "500px" }}>
                    {item.context}
                  </Todaytitlename>
                  <div style={{display:"flex", height:"100%", alignItems:"center", width:"250px",justifyContent:"space-between"}}>
                  <Changechangebtn
                    isdark={isdarked}
                    onClick={() => Delete(item.schedule_id)}
                  >
                    삭제
                  </Changechangebtn>
                  <Todaytitlename style={{fontSize:"20px", display:"flex", alignItems:"center"}}>완료된 일정입니다.</Todaytitlename>
                  </div>
                </Todaychangecon>
              ) : (
                <Todaychangecon>
                  <Todaytitlename>{item.context}</Todaytitlename>
                  <div style={{display:"flex", height:"100%", alignItems:"center", width:"250px",justifyContent:"space-between"}}>
                    <Changechangebtn
                      isdark={isdarked}
                      onClick={() => Delete(item.schedule_id)}
                    >
                      삭제
                    </Changechangebtn>
                    <Changechangebtn
                      isdark={isdarked}
                      onClick={() =>
                        window.location.replace(`/Change/${item.schedule_id}`)
                      }
                    >
                      변경
                    </Changechangebtn>
                    <Todaychangebtn
                      isdark={isdarked}
                      onClick={() =>
                        window.location.replace(`/Rating/${item.schedule_id}`)
                      }
                    >
                      완료
                    </Todaychangebtn>
                  </div>
                </Todaychangecon>
              )}
            </Todaytitle>
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
          등록된 오늘 일정이 없습니다.
        </Nodiv>
      )}
    </Todaycontainer>
  );
};

const Today = () => {
  return <Layout pages={Todaylayout()}></Layout>;
};

export default Today;
