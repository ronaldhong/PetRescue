import React from "react";
import withRoot from "../withRoot";
import Splash from "./Splash";

const App = () => {
  return (
    <div>
      Pet Rescue
      <Splash/>
    </div>
  )
  
};

export default withRoot(App);
