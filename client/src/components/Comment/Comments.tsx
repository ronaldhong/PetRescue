import React from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import Avatar from "@material-ui/core/Avatar";
// import Typography from "@material-ui/core/Typography";


type CommentsProp = {
  classes: any,
  theme: any
}

// const Comments = ({ classes }:CommentsProp) => <div>Comments</div>;
const Comments = (props:any) => <div>Comments</div>;

const styles = ( theme: any) => createStyles({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
});

export default withStyles(styles)(Comments);
