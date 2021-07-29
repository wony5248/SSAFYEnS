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
const theme = createTheme({
  typography: {
    fontFamily: ['Noto Sans KR'].join(','),
    button: {
      fontFamily: 'Noto Sans KR',
    },
    body1: {
      fontWeight: 500,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: 'white',
          height: "100%"
        },
      },
    },
  },
});


function App() {
  return (
    <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Progress" component={Progress} />
            <Route exact path="/Rating/:time" component={Rating} />
            <Route exact path="/Timer" component={Timer} />
            <Route exact path="/Today" component={Today} />
            <Route exact path="/Change" component={Change} />
            <Route exact path="/Changecalendar" component={Changecalendar} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
  );
}

export default App;
