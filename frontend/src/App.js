import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from './pages/main';
import Plan from './pages/plan';
import PlanList from './pages/planlist';
const App = () =>{
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = "/" component={Main}/>
        <Route exact path = "/plan" component={Plan}/>
        <Route exact path = "/planlist" component={PlanList}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
