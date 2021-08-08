import React, { useEffect, useState } from "react";
import Layout from "../../layout";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
const Changecontainer = styled.div`
  overflow: auto;
  width: auto;
  height: 97.9%;
  color: #a3cca3;
  background-color: white;
  border: 1px solid #a3cca3;
  margin: 0px;
  padding-top: 14px;
  padding-right: 12px;
  padding-left: 12px;
  padding-bot: 14px;
  font-size: 20px;
`;
const Changetitle = styled.div`
  display: flex-row;
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
const Changetitlenamecon = styled.div`
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
const Changegoal = styled.div`
  width: auto;
  height: 20%;
  display: flex;
  align-items: center;
  color: white;
  background-color: #a3cca3;
  margin: 0px 16px;
  padding-top: 4px;
`;

const Changetitlename = styled.div`
  width: 500px;
  height: 100%;
  overflow: auto;
  color: white;
  display: flex;
  align-items: center;
  background-color: #a3cca3;
  padding-top: 4px;
`;

const Changetitletime = styled.div`
  width: auto;
  height: 100%;
  color: white;
  background-color: #a3cca3;
  padding-top: 4px;
`;

const Changechangecon = styled.div`
  width: auto;
  height: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: #a3cca3;
  margin: 0px 16px;
`;

const Changechangebtn = styled.button`
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

const Changelayout = () => {
  const [itemList, setItemList] = useState([]);
  const [isnoti, setIsnoti] = useState(0);
  const Delete = async (props) => {
    const id = props;
    console.log(id);
    if (window.confirm("정말 삭제하시겠 습니까?")) {
      await axios
        .delete(`http://127.0.0.1:4500/schedule/${id}`)
        .then(({ data }) => {
          console.log(data.data);
        })
        .catch((e) => {});
      window.location.replace(`/Change`);
    } else {
      console.log("변화 없음");
    }
  };
  useEffect(() => {

    async function loadCalendar() {
      console.log(moment().format("YYYYMMDD"));
      await axios
        .get(
          `http://127.0.0.1:4500/schedule/getdaily/${moment().format(
            "YYYYMMDD"
          )}`
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
    <Changecontainer>
      {itemList.length !== 0 ? (
        <div style={{ height: "100%" }}>
          {" "}
          {itemList.sort(function(a, b) {return Number(moment(a.started_at).format("HHmm")) - Number(moment(b.started_at).format("HHmm"))}).map((item) => (
            <Changetitle>
              <Changetitlenamecon>
                <Changetitlename>일정 제목</Changetitlename>
                <Changetitletime>
                  {moment(item.started_at).format("HH:mm")} ~
                  {moment(item.finished_at).format("HH:mm")}
                </Changetitletime>
              </Changetitlenamecon>
              <Changegoal>{item.title}</Changegoal>
              <Changechangecon>
                <Changetitlename>{item.context}</Changetitlename>
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    alignItems: "center",
                    width: "180px",
                    justifyContent: "space-between",
                  }}
                >
                  <Changechangebtn onClick={() => Delete(item.id)}>
                    삭제
                  </Changechangebtn>
                  <Changechangebtn
                    onClick={() =>
                      window.location.replace(`/Change/${item.id}`)
                    }
                  >
                    변경
                  </Changechangebtn>
                </div>
              </Changechangecon>
            </Changetitle>
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
    </Changecontainer>
  );
};

const Change = () => {
  return <Layout pages={Changelayout()}></Layout>;
};

export default Change;
