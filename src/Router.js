import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import UpdateForm from "./UpdateForm";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/update" component={UpdateForm} />
    </Switch>
  </BrowserRouter>
);

export default Router;
