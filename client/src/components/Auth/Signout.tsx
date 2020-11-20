import React, {useContext} from "react";
import Context from "../../context"
import { withStyles } from "@material-ui/core/styles";
import {GoogleLogout} from "react-google-login"
import { Button, createStyles } from "@material-ui/core";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";

type SignoutProp = {
  classes: {
    root: string,
    buttonText: string,
    buttonIcon: string
  }
}


const Signout = ({ classes } : SignoutProp) => {
  const {dispatch} = useContext(Context)

  const onClick =  () => {
    // dispatch({type: "LOGOUT_USER", payload: false})
  };

  const onSignout = () => {
    dispatch({type: "LOGOUT_USER"})
  }

  return (
    <GoogleLogout
      onLogoutSuccess = {onSignout}
      buttonText= "Signout"
      render = {({onClick}:any)=>(
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

const styles = createStyles({
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
});

export default withStyles(styles)(Signout);
