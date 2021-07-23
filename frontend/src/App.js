import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from './pages/main';
import Plan from './pages/plan';
const App = () =>{
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = "/" component={Main}/>
        <Route exact path = "/plan" component={Plan}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
