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
import createImg from "../../images/create.png";
import monitoringImg from "../../images/monitoring.png";
import creatingImg from "../../images/creating.png";
import botImg from "../../images/bot.jpg"
import progressImg from "../../images/progress.png";
import todayImg from "../../images/today.png";
import stopwatchImg from "../../images/stopwatch.png";
import { Carousel } from "react-carousel-minimal";
import darkmodeImg from "../../images/darkmode.png"


const MainSession = () => {
  const data = [
    {
      image: createImg,
      caption: "Create",
    },
    {
      image: creatingImg,
      caption: "Creating",
    },
    {
      image: todayImg,
      caption: "Today",
    },
    {
      image: progressImg,
      caption: "Progress",
    },
    {
      image: stopwatchImg,
      caption: "Stopwatch",
    },
    {
      image: monitoringImg,
      caption: "Monitoring",
    },
  ];
  const captionStyle = {
    fontSize: "3em",
    fontWeight: "bold",
  };
  return (
    <Wrapper
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        marginBottom: "0px",
      }}
    >
      <div>
        <div
          style={{
            width: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Carousel
            data={data}
            time={5000}
            width="100%"
            height="600px"
            captionStyle={captionStyle}
            radius="10px"
            captionPosition="top"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="white"
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
      <Divider style={{ backgroundColor: "#a3cca3" }}></Divider>
      {/* main */}
      <div
        style={{
          padding: "0 0px",
          width: "100%",
          alignItems: "center",
          marginBottom: "80px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "150px",
          }}
        >
          <Typography
            variant="overline"
            display="block"
            style={{ fontSize: 70, fontWeight: "bold" }}
          >
            스마트한 일정관리의 시작.
          </Typography>
          <Typography
            variant="caption"
            style={{
              fontSize: 60,
              marginTop: "-60px",
              marginBottom: "60px",
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              zIndex: 2,
            }}
          >
            SSAFYEnS
          </Typography>
          <div
            style={{
              width: "36%",
              backgroundColor: "#A3CCA3",
              height: "30px",
              marginTop: "-110px",
              opacity: "1",
              display: "flex",
              marginLeft: "290px",
            }}
          ></div>
        </div>
      </div>
      <div
        style={{
          width: "84%",
          height: "2500px",
          display: "flex",
          marginBottom: "15px",
          marginLeft: "11.5%",
          marginRight: "6%",
        }}
      >
        <div
          style={{
            width: "50%",
            height: "100%",
            marginBottom: "15px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              width: "70%",
              height: "20%",
              marginBottom: "40px",
            }}
          >
            <Typography
              variant="overline"
              display="block"
              style={{
                fontSize: 40,
                fontWeight: "bold",
              }}
            >
              Progressing Schedule
            </Typography>
            <Typography
              variant="overline"
              display="block"
              style={{
                fontSize: 18,
                color: "#a3cca3",
                marginBottom: "12px",
              }}
            >
              현재 진행 중인 일정 확인
            </Typography>
            <Typography
              variant="overline"
              display="block"
              style={{
                fontSize: 18,
                color: "black",
                lineHeight: 1.5,
                paddingRight: "80px",
              }}
            >
              일정 진행 중에 일정 정보를 알고 싶다면 SSAFYEnS를 추천합니다.
              환경정보, 일정 정보까지 일정에 대한 모든 정보를 전하는
              SSAFYEnS에는 '일정에 대한 정보'가 가득합니다.
            </Typography>
          </div>
          <div
            style={{
              width: "70%",
              height: "20%",
              marginBottom: "40px",
            }}
          ><img src={todayImg} alt="schedule management" width="100%" height="100%"></img></div>
          <div
            style={{
              width: "70%",
              height: "20%",
              marginBottom: "40px",
            }}
          >
            <Typography
              variant="overline"
              display="block"
              style={{
                fontSize: 40,
                fontWeight: "bold",
              }}
            >
              Scheduling Bot
            </Typography>
            <Typography
              variant="overline"
              display="block"
              style={{
                fontSize: 18,
                color: "#a3cca3",
                marginBottom: "12px",
              }}
            >
              등록도 수정도 싸피엔스 하나로 편리하게
            </Typography>
            <Typography
              variant="overline"
              display="block"
              style={{
                fontSize: 18,
                color: "black",
                lineHeight: 1.5,
                paddingRight: "80px",
              }}
            >
              일정 등록, 수정, 삭제, 완료 모두 음성으로 간편하게 해결하자!
              싸피엔스 하나만 있으면 끝! 일상속 모든 일정 관리가 음성으로 관리가
              가능합니다.
            </Typography>
          </div>
          <div
            style={{
              width: "70%",
              height: "20%",
              marginBottom: "40px",
            }}
          ><img src={monitoringImg} alt="schedule monitoring" width="100%" height="100%"></img></div>
          <div
            style={{
              width: "70%",
              height: "20%",
              marginBottom: "40px",
            }}
          ><Typography
          variant="overline"
          display="block"
          style={{
            fontSize: 40,
            fontWeight: "bold",
          }}
        >
          Schedule Environment
        </Typography>
        <Typography
          variant="overline"
          display="block"
          style={{
            fontSize: 18,
            color: "#a3cca3",
            marginBottom: "12px",
          }}
        >
          사람을 생각하는 다정한 싸피엔스
        </Typography>
        <Typography
          variant="overline"
          display="block"
          style={{
            fontSize: 18,
            color: "black",
            lineHeight: 1.5,
            paddingRight: "80px",
          }}
        >
          일정을 진행하는 동안 조도, 소음, 온도, 습도를 실시간으로 측정하여 공부환경 정보를 제공해줍니다. "다정한 싸피엔스"가 최적의 공부환경을 찾는것을 도와줍니다.
        </Typography></div>
        </div>
        <div
          style={{
            width: "50%",
            height: "100%",
            borderLeft: "1px dotted #a3cca3",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              width: "70%",
              height: "20%",
              marginBottom: "40px",
            }}
          ><img src={progressImg} alt="progressing schedule" width="100%" height="100%"></img></div>
          <div
            style={{
              width: "70%",
              height: "20%",
              marginBottom: "40px",
            }}
          >
            <Typography
              variant="overline"
              display="block"
              style={{
                fontSize: 40,
                fontWeight: "bold",
              }}
            >
              Schedule Management
            </Typography>
            <Typography
              variant="overline"
              display="block"
              style={{
                fontSize: 18,
                color: "#a3cca3",
                marginBottom: "12px",
              }}
            >
              간편하게 관리하는 일정
            </Typography>
            <Typography
              variant="overline"
              display="block"
              style={{
                fontSize: 18,
                color: "black",
                lineHeight: 1.5,
                paddingRight: "80px",
              }}
            >
              바빠서 일정관리를 하기 어려울때, 일정 관리가 제대로 되지 않을때,
              일정 관련 고민과 불안에 대해 싸피엔스로 부담없이 일정을 관리할 수
              있습니다.
            </Typography>
          </div>
          <div
            style={{
              width: "70%",
              height: "20%",
              marginBottom: "40px",
            }}
          ><img src={botImg} alt="schedule bot" width="100%" height="100%"></img></div>
          <div
            style={{
              width: "70%",
              height: "20%",
              marginBottom: "40px",
            }}
          >
            <Typography
              variant="overline"
              display="block"
              style={{
                fontSize: 40,
                fontWeight: "bold",
              }}
            >
              Schedule Monitoring
            </Typography>
            <Typography
              variant="overline"
              display="block"
              style={{
                fontSize: 18,
                color: "#a3cca3",
                marginBottom: "12px",
              }}
            >
              하다, 보다, 관찰하다.
            </Typography>
            <Typography
              variant="overline"
              display="block"
              style={{
                fontSize: 18,
                color: "black",
                lineHeight: 1.5,
                paddingRight: "80px",
              }}
            >
              일정 진행 중에 일정을 진행하는 자신의 모습을 언제나 모니터링 할 수 있습니다. 관찰은 물론 유해물품 감지, 알림 기능까지 갖추고 있어 일정을 집중하여 진행하실 수 있습니다.
            </Typography>
          </div>
          <div
            style={{
              width: "70%",
              height: "20%",
              marginBottom: "40px",
            }}
          ><img src={darkmodeImg} alt="schedule environment" width="100%" height="100%"></img></div>
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