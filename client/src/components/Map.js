import React, {useState, useEffect, useContext} from "react";
import { withStyles } from "@material-ui/core/styles";
import ReactMapGL, {NavigationControl, Marker} from "react-map-gl"
import PinIncon from "./PinIcon"
import Context from "../context"
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";


//https://docs.mapbox.com/mapbox-gl-js/example/

const INITIAL_VIEWPORT = {
  latitude: 29.7604,
  longitude: -95.358,
  zoom: 13

};

const Map = ({ classes }) => {
  const {state, dispatch} = useContext(Context)
  const [viewPort, setViewPort]  = useState(INITIAL_VIEWPORT)
  const [userPosition, setUserPosition] = useState(null)

  useEffect(()=>{
    getUserPosition()
  }, [])



  const getUserPosition = () =>{
    if ("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition(position => {
        const {latitude, longitude} = position.coords;
        setViewPort({...viewPort, latitude, longitude})
        setUserPosition({latitude, longitude})
      })
    }
  }

  const handleMapClick = ({lngLat, leftButton}) => {
    if (!leftButton) return
    if (!state.draft){
      dispatch({type: "CREATE_DRAFT"})
    }
    const [longitude, latitude] = lngLat
    dispatch({type:"UPDATE_DRAFT_LOCATION", payload:{longitude, latitude} })
  }

  return( 
  <div className = {classes.root}>
    <ReactMapGL 
    mapboxApiAccessToken = "pk.eyJ1Ijoicm9uaG9uZzkxOSIsImEiOiJja2g5eDI5ZTUweGFiMnNrOGsyamhjeHdpIn0.hCdpJkNuIt3fGLyZaM6KhA"
    width = "100vw"
    height = "calc(100vh - 128px)"
    mapStyle = "mapbox://styles/mapbox/streets-v9"
    onViewportChange = {viewPort => setViewPort(viewPort)}
    onClick = {handleMapClick}
    {...viewPort}
    >
      {/** Zooming navigator**/}
      <div className = {classes.navigationControl}>
        <NavigationControl 
        onViewportChange = {viewPort => setViewPort(viewPort)}
        />
      </div>
      {/** End  **/}

      {/** Pin for userLocation**/}
      {userPosition && (
        <Marker
          latitude = {userPosition.latitude}
          longitude = {userPosition.longitude}
          offsetLeft = {-19}
          offsetTop = {-37}
        >
          <PinIncon size = {40} color = "blue"/>
        </Marker>
      )}
      {/** End **/}

      {/**  Draft Pin**/}
      {
        state.draft &&(
          <Marker
          latitude = {state.draft.latitude}
          longitude = {state.draft.longitude}
          offsetLeft = {-19}
          offsetTop = {-37}
        >
          <PinIncon size = {40} color = "red"/>
        </Marker>
        )
      }
      {/** End **/}

    </ReactMapGL>
  </div>
  );
};

const styles = {
  root: {
    display: "flex"
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em"
  },
  styleControl:{
    position: "absolute",
    top: 0,
    left: "15px",
    margin: "1em"
  },
  deleteIcon: {
    color: "red"
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover"
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
};

export default withStyles(styles)(Map);
