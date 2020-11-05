import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
// import ExitToApp from "@material-ui/icons/ExitToApp";
// import Typography from "@material-ui/core/Typography";



const Signout = ({ classes }) => {


  const onClick =  () => {
    // dispatch({type: "LOGOUT_USER", payload: false})
  };

  // return <Button onClick = {onClick}>Signout</Button>;
  return <div>SIGNOUT</div>
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
