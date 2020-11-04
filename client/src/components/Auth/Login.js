import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { GoogleLogin} from "react-google-login"
import { GraphQLClient} from "graphql-request"
// import Typography from "@material-ui/core/Typography";

const ME_QUERY = `
  {
    me{
      _id
      name
      email
      picture
    }
  }
`

const Login = ({ classes }) => {
  const onSuccess = async googleUser => {
    const idToken = googleUser.getAuthResponse().id_token;
    const client = new GraphQLClient("http://localhost:4000/graphql", {
      headers: { authorization: idToken }
    });
    // client.request(ME_QUERY).then((data) => console.log("data",data))
    const data = await client.request(ME_QUERY)
    console.log("data", {data})
  };

  const onFailure = event => {
    console.log("event fail")
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
