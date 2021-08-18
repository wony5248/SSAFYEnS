import React from "react";
import {
  Grid,
  Typography,
  Paper,
  CardContent,
  Divider,
  CardActions,
  Button,
  colors,
} from "@material-ui/core";
import Wrapper from "./styles";
import AlarmImg from "../../images/alarm.png";
import GraphImg from "../../images/graph.png";
import GroupImg from "../../images/group.png";
import ScheduleImg from "../../images/schedule.png";
import TimeImg from "../../images/time.png";
import ListImg from "../../images/list.png";
import IoTImg from "../../images/embedded.png";
import createImg from "../../images/create.png"
import monitoringImg from "../../images/monitoring.png"
import creatingImg from "../../images/creating.png"
import progressImg from "../../images/progress.png"
import todayImg from "../../images/today.png"
import stopwatchImg from "../../images/stopwatch.png"
import { Carousel } from 'react-carousel-minimal';

const MainSession = () => {
    const data = [
        {
          image: createImg,
          caption: "Create"
        },
        {
          image: creatingImg,
          caption: "Creating"
        },
        {
          image: todayImg,
          caption: "Today"
        },
        {
          image: progressImg,
          caption: "Progress"
        },
        {
          image: stopwatchImg,
          caption: "Stopwatch"
        },
        {
          image: monitoringImg,
          caption: "Monitoring"
        },
        
      ];
      const captionStyle = {
        fontSize: '3em',
        fontWeight: 'bold',
      }
  return (
    <Wrapper
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        marginBottom: "0px",
      }}
    >
      {/* main */}
      <div>
      <div>
        <div style={{
          padding: "0 20px" ,width:"100%"
        }}>
          <Carousel
            data={data}
            time={10000}
            width="100%"
            height="600px"
            captionStyle={captionStyle}
            radius="10px"
            captionPosition="top"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="fill"
            style={{
              textAlign: "center",
              maxWidth: "1200px",
              maxHeight: "800px",
              margin: "80px auto",
            }}
          />
        </div>
      </div>
    </div>
      {/* 설명 */}
      {/* 기능 간략 소개 */}
      <Divider style={{ backgroundColor: "#a3cca3" }}></Divider>
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          backgroundColor: "#a3cca3",
          color: "white",
          padding: "80px 0",
        }}
      >
        <div style={{ marginBottom: "40px" }}>
          <Grid
            container
            direciton="column"
            justifyContent="center"
            alignItems="center"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="caption"
                display="flex"
                style={{
                  fontSize: 40,
                  fontWeight: "bold",
                }}
              >
                SSAFYEnS
              </Typography>
              <Typography
                variant="overline"
                display="block"
                style={{ fontSize: 20, fontWeight: "bold" }}
              >
                일정을 실천하고 싶은 당신을 위해, 혼자서 일정 관리가 힘든 당신을
                위해
              </Typography>
            </div>
          </Grid>
          {/* <Typography
            variant="overline"
            display="block"
            style={{ fontSize: 40, fontWeight: "bold", paddingLeft:"150px"}}
          >
            SERVICE
          </Typography> */}
        </div>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <div>
            <Paper
              elevation={0}
              style={{
                width: "250px",
                backgroundColor: "#a3cca3",
                color: "white",
              }}
            >
              <CardContent>
                <img src={ListImg} width="150px" />
              </CardContent>
              <CardContent>
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  style={{ fontSize: 20, fontWeight: "bold" }}
                >
                  Schedule
                </Typography>
              </CardContent>
              <Divider style={{ width: "200px" }} />
              <CardContent>
                <Typography variant="body2" display="block" gutterBottom>
                  하루 일정을
                </Typography>
                <Typography variant="body2" display="block" gutterBottom>
                  쉽게 등록하고 실천해봐요
                </Typography>
              </CardContent>
            </Paper>
          </div>
          <div>
            <Paper
              elevation={0}
              style={{
                width: "250px",
                backgroundColor: "#a3cca3",
                color: "white",
              }}
            >
              <CardContent>
                <img src={AlarmImg} width="150px" />
              </CardContent>
              <CardContent>
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  style={{ fontSize: 20, fontWeight: "bold" }}
                >
                  alarm
                </Typography>
              </CardContent>
              <Divider style={{ width: "200px" }} />
              <CardContent>
                <Typography variant="body2" display="block" gutterBottom>
                  일정을 잊지 않도록
                </Typography>
                <Typography variant="body2" display="block" gutterBottom>
                  알림을 드려요
                </Typography>
              </CardContent>
            </Paper>
          </div>
          <div>
            <Paper
              elevation={0}
              style={{
                width: "250px",
                backgroundColor: "#a3cca3",
                color: "white",
              }}
            >
              <CardContent>
                <img src={TimeImg} width="150px" />
              </CardContent>
              <CardContent>
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  style={{ fontSize: 20, fontWeight: "bold" }}
                >
                  timer
                </Typography>
              </CardContent>
              <Divider style={{ width: "200px" }} />
              <CardContent>
                <Typography variant="body2" display="block" gutterBottom>
                  스톱워치와 타이머도
                </Typography>
                <Typography variant="body2" display="block" gutterBottom>
                  사용할 수 있어요
                </Typography>
              </CardContent>
            </Paper>
          </div>
          <div>
            <Paper
              elevation={0}
              style={{
                width: "250px",
                backgroundColor: "#a3cca3",
                color: "white",
              }}
            >
              <CardContent>
                <img src={GroupImg} width="150px" />
              </CardContent>
              <CardContent>
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  style={{ fontSize: 20, fontWeight: "bold" }}
                >
                  group
                </Typography>
              </CardContent>
              <Divider style={{ width: "200px" }} />
              <CardContent>
                <Typography variant="body2" display="block" gutterBottom>
                  목적이 맞는
                </Typography>
                <Typography variant="body2" display="block" gutterBottom>
                  사람들과 함께 해봐요
                </Typography>
              </CardContent>
            </Paper>
          </div>
          <div>
            <Paper
              elevation={0}
              style={{
                width: "250px",
                backgroundColor: "#a3cca3",
                color: "white",
              }}
            >
              <CardContent>
                <img src={GraphImg} width="150px" />
              </CardContent>
              <CardContent>
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  style={{ fontSize: 20, fontWeight: "bold" }}
                >
                  graph
                </Typography>
              </CardContent>
              <Divider style={{ width: "200px" }} />
              <CardContent>
                <Typography variant="body2" display="block" gutterBottom>
                  나의 일정 성취를
                </Typography>
                <Typography variant="body2" display="block" gutterBottom>
                  그래프로 확인할 수 있어요
                </Typography>
              </CardContent>
            </Paper>
          </div>
        </Grid>
      </div>
      <Divider style={{ backgroundColor: "#a3cca3" }}></Divider>
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div style={{ marginLeft: "150px", marginTop: "50px" }}>
          <Typography
            variant="overline"
            display="block"
            style={{ fontSize: 40, fontWeight: "bold", color: "#a3cca3" }}
          >
            SSAFYEnS START
          </Typography>
        </div>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <div>
            <Paper elevation={0} style={{ width: "250px" }}>
              <CardContent>
                <img src={IoTImg} width="150px" />
              </CardContent>
              <CardContent>
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  style={{ fontSize: 20, fontWeight: "bold" }}
                >
                  IoT
                </Typography>
              </CardContent>
              <Divider style={{ width: "200px" }} />
              <CardContent>
                <Typography variant="body2" display="block" gutterBottom>
                  IoT 기기를 이용하여
                </Typography>
                <Typography variant="body2" display="block" gutterBottom>
                  일정 관리를 해보세요
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="medium">HOW TO USE</Button>
              </CardActions>
            </Paper>
          </div>
          <div>
            <Paper elevation={0} style={{ width: "250px" }}>
              <CardContent>
                <img src={ScheduleImg} width="150px" />
              </CardContent>
              <CardContent>
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  style={{ fontSize: 20, fontWeight: "bold" }}
                >
                  Web
                </Typography>
              </CardContent>
              <Divider style={{ width: "200px" }} />
              <CardContent>
                <Typography variant="body2" display="block" gutterBottom>
                  웹 페이지에서
                </Typography>
                <Typography variant="body2" display="block" gutterBottom>
                  일정 관리를 해보세요
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="medium">HOW TO USE</Button>
              </CardActions>
            </Paper>
          </div>
        </Grid>
      </div>
    </Wrapper>
  );
};

export default MainSession;
