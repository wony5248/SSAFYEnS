import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Progress from "./pages/Progress/";
import Rating from "./pages/Rating/";
import Timer from "./pages/Timer/";
import Today from "./pages/Today/";
import Change from "./pages/Change/";
import axios from "axios";
import Changecalendar from "./pages/Changecalendar";
import Create from "./pages/Create";
import Streaming from "./pages/Streaming";
import { UserContextProvider } from "./context";
import moment from "moment";
import { useState } from "react";
// const theme = createTheme({
//   typography: {
//     fontFamily: ['Noto Sans KR'].join(','),
//     button: {
//       fontFamily: 'Noto Sans KR',
//     },
//     body1: {
//       fontWeight: 500,
//     },
//   },
//   overrides: {
//     MuiCssBaseline: {
//       '@global': {
//         body: {
//           backgroundColor: 'white',
//           height: "100%"
//         },
//       },
//     },
//   },
// });

function App() {
  useEffect(() => {
    async function loadCalendar() {
      const arr = [];
      await axios
        .get(
          `http://127.0.0.1:4500/schedule/getdaily/${moment().format(
            "YYYYMMDD"
          )}`
        )
        .then(({ data }) => {
          // console.log(data);
          for (let i = 0; i < data.length; i++) {
            if (
              data[i].notificationtime &&
              Number(moment(data[i].notificationtime).format("HH")) ===
                Number(moment().format("HH")) &&
              Number(moment(data[i].notificationtime).format("mm")) ===
                Number(moment().format("mm"))
            ) {
              arr.push({
                title: data[i].title,
                context: data[i].context,
                started_at: moment(data[i].started_at).format("YYYYMMDD HHmm"),
                finished_at: moment(data[i].finished_at).format(
                  "YYYYMMDD HHmm"
                ),
                notificationtime: moment(data[i].notificationtime).format(
                  "YYYYMMDD HHmm"
                ),
              });
              console.log(arr);
            }
          }
          axios.post(`http://127.0.0.1:4500/sensor/notification`, {
            arr,
          });
        })
        .catch((e) => {});
    }

    loadCalendar();
    setInterval(() => {
      loadCalendar();
    }, 60000);
  }, []);
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Progress} />
          <Route exact path="/Progress" component={Progress} />
          <Route exact path="/Rating/:id" component={Rating} />
          <Route exact path="/Create" component={Create} />
          <Route exact path="/Timer" component={Timer} />
          <Route exact path="/Today" component={Today} />
          <Route exact path="/Streaming" component={Streaming} />
          <Route exact path="/Change/:id" component={Changecalendar} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
