import React from "react";
import { Route, Redirect } from "react-router-dom";

import EditProfile from "../profile/EditProfile";

export default function AuthRoute(props) {
  if (props.auth.isLoggedIn) {
    return (
        <EditProfile
        auth = {props.auth} 
        userProfile={props.userProfile}
        setUserProfile={props.setUserProfile}/>
    );
  } else {
    return (
        <Redirect to="/" />
    );
  }
}