import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Wrapper from "./styles";
import { Grid, Button, Box, withStyles } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import moment from "moment";
import { scheduleAPI } from "../../../utils/axios";

const PlanList = () => {
  const location = useLocation();
  const [query, setQuery] = useState("react");
  const [data, setData] = useState([]);
  const select = false;
  const deleteSelected = false;

  const StyledRating = withStyles({
    iconFilled: {
      color: "#A3CCA3",
    },
  })(Rating);

  let today = moment(location.pathname.split("/")[2]).format("YYYY-MM-DD");

  useEffect(() => {
    let completed = false;

    async function getMonthlySchedule() {
      const result = await scheduleAPI.getMonthly(today);
      setData(result.data);
    }
    getMonthlySchedule();
    return () => {
      completed = true;
    };
  }, [query]);

  const planListArr = () => {
    let result = [];

    for (let i = 0; i < data.length; i++) {
      if (
        moment(today).format("MM-DD") ===
        moment(data[i].started_at).format("MM-DD")
      ) {
        result = result.concat(
          <Grid
            Contatiner
            style={{
              borderBottom: "1px solid #A3CCA3",
              width: "100%",
              height: "150px",
            }}
          >
            {/* title */}
            <div style={{ display: "flex", margin: "10px" }}>
              <div style={{ fontWeight: "bold", marginRight: "10px" }}>
                {data[i].title}
                {/* 프로젝트 발표 */}
              </div>
              {data[i].is_finished ? (
                <div
                  style={{
                    background: "#A3CCA3",
                    borderRadius: 45,
                    width: "45px",
                    textAlign: "center",
                    color: "#ffffff",
                  }}
                >
                  완료
                </div>
              ) : null}
            </div>
            {/* body */}
            <Grid
              item
              style={{
                margin: "10px",
                height: "50px",
                marginTop: "20px",
                marginBottom: "-10px",
              }}
            >
              <div>
                {moment(data[i].started_at).format("HH")} :{" "}
                {moment(data[i].started_at).format("mm")} 시작{" "}
                {moment(data[i].finished_at).format("HH")} :{" "}
                {moment(data[i].finished_at).format("mm")} 마감
              </div>
            </Grid>
            {/* footer */}
            <div
              style={{
                margin: "10px",
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {data[i].is_finished ? (
                <div style={{ display: "flex" }}>
                  <div style={{ marginTop: "6px", marginRight: "10px" }}>
                    평점
                  </div>
                  <div style={{ marginTop: "-2px" }}>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                      <StyledRating
                        name="read-only"
                        value={data[i].point / 20}
                        readOnly
                      />
                    </Box>
                  </div>
                </div>
              ) : (
                <div> </div>
              )}
              <div>
                <Button
                  style={{
                    background: "#A3CCA3",
                    color: "#ffffff",
                    height: "40px",
                    marginRight: "20px",
                  }}
                  onClick={() =>
                    select
                      ? null
                      : window.location.replace(
                          `/planmodify/${moment(today).format("YYYYMMDD")}/${
                            data[i].schedule_id
                          }`
                        )
                  }
                >
                  수정
                </Button>
                <Button
                  style={{
                    background: "#A3CCA3",
                    color: "#ffffff",
                    height: "40px",
                    marginRight: "30px",
                  }}
                  onClick={() =>
                    deleteSelected ? null : deletePlan(data[i].schedule_id)
                  }
                >
                  삭제
                </Button>
              </div>
            </div>
          </Grid>
        );
      }
    }
    return result;
  };

  const deletePlan = async (id) => {
    let result = window.confirm("삭제하시겠습니까?");
    if (result) {
      try {
        await scheduleAPI.deleteSchedule(id);
        alert("삭제되었습니다.");
        window.location.reload();
      } catch (e) {
        console.log(e);
        alert("삭제에 실패했습니다.");
      }
    } else {
      alert("취소되었습니다.");
    }
  };

  return (
    <Wrapper>
      {/* header */}
      <Grid container justifyContent="center">
        <Grid container justifyContent="center">
          <Grid
            item
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "50%",
            }}
          >
            <div
              style={{ width: "130px", display: "flex", alignItems: "center" }}
            >
              <button
                onClick = {() => window.location.href = "/plan"}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#a3cca3",
                  border: "none",
                  color: "white",
                  borderRadius: "16px",
                  height: "100%",
                  width: "100%",
                  fontSize: "16px",
                }}
              >
                뒤로 가기
              </button>
            </div>
            <div
              style={{
                background: "#A3CCA3",
                width: "130px",
                height: "30px",
                textAlign: "center",
                paddingTop: "5px",
                borderRadius: 45,
                color: "#ffffff",
                fontWeight: "bold",
              }}
            >
              {moment(today).format("MM월 DD일")}
            </div>
            <div style={{ width: "130px" }}></div>
          </Grid>
        </Grid>
      </Grid>
      {/* body */}
      <div style={{ overflow: "auto" }}>
        <Grid
          container
          justifyContent="center"
          style={{ width: "100%", height: "50px" }}
        ></Grid>
        <Grid container justifyContent="center">
          <Grid
            Container
            style={{
              borderTop: "1px solid #A3CCA3",
              borderLeft: "1px solid #A3CCA3",
              borderRight: "1px solid #A3CCA3",
              width: "50%",
            }}
          >
            {planListArr()}
          </Grid>
        </Grid>
      </div>
    </Wrapper>
  );
};

export default PlanList;
