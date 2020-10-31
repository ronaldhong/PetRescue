import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { GoogleLogin} from "react-google-login"
// import Typography from "@material-ui/core/Typography";

const Login = ({ classes }) => {
  
  const onSuccess = googleUser => {
    const idToken = googleUser.getAuthResponse().id_token
    console.log(idToken)
  };

  const onFailure = event => {
    console.log(event)
  };

  return <GoogleLogin 
  clientId = "255153756598-e7sdbojre69tn70o9bvhfhkufm19dhqr.apps.googleusercontent.com" 
  onSuccess= {onSuccess}
  onFailure= {onFailure}
  isSignedIn = {true}
  />;
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
