import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Home from './pages/Home/';
import Progress from './pages/Progress/';
import Rating from './pages/Rating/';
import Timer from './pages/Timer/';
import Today from './pages/Today/';
import Change from './pages/Change/';
import Changecalendar from './pages/Changecalendar'
import Create from './pages/Create'
import {UserContextProvider} from "./context"
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
            <Route exact path="/Change" component={Change} />
            <Route exact path="/Change/:id" component={Changecalendar} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
        </UserContextProvider>
  );
}

export default App;
