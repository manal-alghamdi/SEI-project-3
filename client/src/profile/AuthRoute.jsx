import React from "react";
import { Route, Redirect } from "react-router-dom";
import ToReadBook from "../profile/ToReadBook";

export default function AuthRoute(props) {
  if (props.auth.isLoggedIn) {
    return (
      <ToReadBook auth = {props.auth} user={props.user} setAuth={props.setAuth} />
    );
  } else {
    return (
        <Redirect to="/" />
    );
  }
}
