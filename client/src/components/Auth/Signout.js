import React, {useContext} from "react";
import Context from "../../context"
import { withStyles } from "@material-ui/core/styles";
import {GoogleLogout} from "react-google-login"
import { Button } from "@material-ui/core";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";



const Signout = ({ classes }) => {
  const {dispatch} = useContext(Context)

  const onClick =  () => {
    // dispatch({type: "LOGOUT_USER", payload: false})
  };

  const onSignout = () => {
    dispatch({type: "LOGOUT_USER"})
  }

  // return <Button onClick = {onClick}>Signout</Button>;
  return (
    <GoogleLogout
      onLogoutSuccess = {onSignout}
      buttonText= "Signout"
      render = {({onClick})=>(
        <span className = {classes.root} onClick = {onClick}> 
          <Typography
          variant = "body1"
          className = {classes.buttonText}
          >
            Signout
          </Typography>
          <ExitToApp
          className = {classes.buttonIcon}
          />

        </span>
    )} />
  )
};

const styles = {
  root: {
    cursor: "pointer",
    display: "flex"
  },
  buttonText: {
    color: "orange"
  },
  buttonIcon: {
    marginLeft: "5px",
    color: "orange"
  }
};

export default withStyles(styles)(Signout);
