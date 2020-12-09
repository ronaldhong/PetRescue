import React, { useContext } from "react";
import context from "../context"
import NoContent from "./Pin/NoContent"
import CreatePin from "./Pin/CreatePin"
import PinContent from "./Pin/PinContent"
import { withStyles, createStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

type BlogProp = {
  classes: {
    root: string,
    rootMobile: string
  }
}

const Blog = ({ classes }:BlogProp) => {
  const { state } = useContext(context);
  const { draft, currentPin } = state;
  let BlogContent;
  if (!draft && !currentPin){
    BlogContent = NoContent;
  }else if (draft && !currentPin){
    BlogContent = CreatePin;
  }else{
    BlogContent = PinContent
  }

  return (
    <Paper className={classes.root}>
      <BlogContent />
    </Paper>
  )
};

const styles = createStyles({
  root: {
    minWidth: 350,
    maxWidth: 400,
    maxHeight: "calc(100vh - 64px)",
    overflowY: "scroll",
    display: "flex",
    justifyContent: "center"
  },
  rootMobile: {
    maxWidth: "100%",
    maxHeight: 300,
    overflowX: "hidden",
    overflowY: "scroll"
  }
});

export default withStyles(styles)(Blog);
