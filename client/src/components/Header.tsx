import React, {useContext} from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import Map from "@material-ui/icons/Map";
import Typography from "@material-ui/core/Typography";
import Context from "../context"
import SignOut from "./Auth/Signout"
var Paw = require('../assets/paw.png');


type HeaderProps = {
  classes: any
};

const Header = ({ classes }:HeaderProps) => {
  const {state} = useContext(Context);
  const {currentUser} = state;
  const nameShort = currentUser.name ? currentUser.name.split(" ")[0] : "User"
  return (
    <div className = {classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/*Title / Logo */}
          <div className = {classes.grow}>
            <img className={classes.picture} src= {Paw}/>
            <Typography
            component = "h1"
            variant = "h6"
            color = "inherit"
            noWrap
            >
              PetRescue
            </Typography>
          </div>
          {currentUser && (
            <div className = {classes.grow}>
              <img 
              className = {classes.picture}
              src={currentUser.picture} 
              alt={currentUser.name}
              />
              <Typography
              variant = "h5"
              color = "inherit"
              noWrap
              className = {classes.wordCap}
              >
                {nameShort}
              </Typography>
            </div>
          )}
          <SignOut/>   
        </Toolbar>
      </AppBar>
    </div>)
};

const styles = (theme:any) => createStyles({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center"
  },
  icon: {
    marginRight: theme.spacing.unit,
    color: "green",
    fontSize: 45
  },
  mobile: {
    display: "none"
  },
  picture: {
    height: "50px",
    borderRadius: "90%",
    marginRight: theme.spacing.unit * 2
  },
  wordCap:{
   "textTransform": "capitalize"
  }
});

export default withStyles(styles)(Header);
