import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Main from './pages/main';
import Plan from './pages/plan';
import PlanList from './pages/planlist';
import PlanModify from './pages/planmodify';
import LogIn from './pages/login';
import Signup from './pages/signup';
import Group from "./pages/group"
import Find from './pages/find';
import Groupmanage from './pages/groupmanage'
const App = () =>{
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = "/" component={Main}/>
        <Route exact path = "/plan" component={Plan}/>
        <Route exact path = "/planlist" component={PlanList}/>
        <Route exact path = "/planmodify" component={PlanModify}/>
        <Route exact path = "/login" component={LogIn}/>
        <Route exact path = "/signup" component={Signup}/>
        <Route exact path = "/group/:id/manage" component = {Groupmanage}/>
        <Route exact path = "/group" component={Group}/>
        <Route exact path = "/find" component={Find}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
