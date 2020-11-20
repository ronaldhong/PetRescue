import React, { useContext, useEffect } from "react";
import withRoot from "../withRoot";
import Header from "../components/Header";
import Map from "../components/Map";
import Context from "../context";

const viewDevice = window.innerWidth <1000 ? "mobile":"desktop"
const App = () => {
  const {state, dispatch} = useContext(Context)
  // useEffect(()=>{
  //   dispatch({type: "UPDATE_VIEW_DEVICE", payload: viewDevice})
  // }, [])
  // console.log(state)

  return (
    <>
      <Header/>
      <Map />
    </>
  )
};

export default withRoot(App);
