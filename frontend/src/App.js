import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Main from './pages/main';
import Plan from './pages/plan';
import PlanList from './pages/planlist';
import PlanModify from './pages/planmodify';
import LogIn from './pages/login';

const App = () =>{
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = "/" component={Main}/>
        <Route exact path = "/plan" component={Plan}/>
        <Route exact path = "/planlist" component={PlanList}/>
        <Route exact path = "/planmodify" component={PlanModify}/>
        <Route exact path = "/login" component={LogIn}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
