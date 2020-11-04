import React, {useContext} from "react";
import { withStyles } from "@material-ui/core/styles";
import { GoogleLogin} from "react-google-login"
import { GraphQLClient} from "graphql-request"
import Context from "../../context"
import { Typography } from "@material-ui/core";
import { ME_QUERY } from "../../graphql/queries"
// import Typography from "@material-ui/core/Typography";

const Login = ({ classes }) => {

  const {dispatch} = useContext(Context)

  const onSuccess = async googleUser => {
    try{
      const idToken = googleUser.getAuthResponse().id_token;
      const client = new GraphQLClient("http://localhost:4000/graphql", {
        headers: { authorization: idToken }
      });
      const {me} = await client.request(ME_QUERY)
      dispatch({type: "LOGIN_USER", payload: me})
    }catch(err){
      onFailure(err)
    }
  };

  const onFailure = err => {
    console.log("Error Login In")
  };

  return (
    <div>
      <div className = {classes.root}>
        <Typography
          component = "h1"
          variant = "h3"
          gutterBottom
          noWrap
          style ={{color: "rgb(66, 133, 244)"}}
        >
          Welcome to PetRescue
        </Typography>
        <GoogleLogin 
          clientId = "255153756598-e7sdbojre69tn70o9bvhfhkufm19dhqr.apps.googleusercontent.com" 
          onSuccess= {onSuccess}
          onFailure= {onFailure}
          isSignedIn = {true}
          theme = "dark"
        />
      </div>
      <div className = {classes.footer}>
          <Typography
            component = "h6"
            variant = "h6"
            gutterBottom
            noWrap
            style ={{color: "rgb(66, 133, 244)"}}>
            * Design and Develop by <a href = "https://www.linkedin.com/in/ronald-hong-201484102/">Ronald Hong</a>
          </Typography>
      </div>
    </div>
    
  )
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  footer: {
    position: "fixed",
    left: 0,
    bottom: 0,
    textAlign: "center",
    width: "100vw"
    // justifyContent: "center",
    // flexDirection: "column",
    // alignItems: "center"
  }
};

export default withStyles(styles)(Login);
