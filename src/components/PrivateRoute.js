import React from "react";
import { Route } from "react-router-dom";

const PrivateRoute = (props) => {
  return (
    <Route path={props.path} exact={props.exact} component={props.component} />
  );
};

export default PrivateRoute;
