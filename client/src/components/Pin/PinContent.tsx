import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
// import AccessTime from "@material-ui/icons/AccessTime";
// import Face from "@material-ui/icons/Face";

type PinContentProps = {
  classes: any
}
const PinContent = (props:any) => {
  return <div>PinContent</div>;
};

const styles = (theme:any) => createStyles({
  root: {
    padding: "1em 0.5em",
    textAlign: "center",
    width: "100%"
  },
  icon: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  text: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default withStyles(styles)(PinContent);
