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
import MyPage from './pages/mypage'
import Groupinfo from './pages/groupinfo';
import DailyEvaluate from './pages/dailyevaluate';
import ModifyUserInfo from './pages/modifyuserinfo';
import CheckPw from './pages/checkpasswd';
import Average from './pages/average';


const App = () =>{

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = "/" component={Main}/>
        <Route exact path = "/plan" component={Plan}/>
        <Route exact path = "/planlist/:date" component={PlanList}/>
        <Route exact path = "/planmodify/:date/:id" component={PlanModify}/>
        <Route exact path = "/login" component={LogIn}/>
        <Route exact path = "/signup" component={Signup}/>
        <Route exact path = "/group/:id/manage" component = {Groupmanage}/>
        <Route exact path = "/group/:id" component = {Groupinfo}/>
        <Route exact path = "/group" component={Group}/>
        <Route exact path = "/find" component={Find}/>
        <Route exact path = "/mypage" component={MyPage}/>
        <Route exact path = "/dailyevaluate" component={DailyEvaluate}/>
        <Route exact path = "/modifyuserinfo/:id" component={ModifyUserInfo}/>
        <Route exact path = "/checkpassword/:id" component={CheckPw}/>
        <Route exact path = "/average" component={Average}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
