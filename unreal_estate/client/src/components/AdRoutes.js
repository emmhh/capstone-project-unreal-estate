import React from "react";
import { Route, Switch } from "react-router-dom";
import AdModule from './AdModule';
export default () =>
  <Switch>
    <Route path="/ad" exact component={AdModule}/>
  </Switch>;