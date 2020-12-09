import React, {useState, useEffect, useContext} from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import ReactMapGL, {NavigationControl, Marker, Popup} from "react-map-gl"
import {GET_PINS} from "../graphql/queries"
import {DELETE_PIN_MUTATION} from "../graphql/mutations"
import {useClient} from "../client"
import differenceInMinute from "date-fns/difference_in_minutes"
import PinIncon from "./PinIcon"
import Context from "../context"
import Blog from "./Blog"
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogContent, DialogContentText } from "@material-ui/core";


//https://docs.mapbox.com/mapbox-gl-js/example/


const INITIAL_VIEWPORT = {
  latitude: 29.7604,
  longitude: -95.358,
  zoom: 13

};

const Map = ({ classes }) => {
  const client = useClient()
  const {state, dispatch} = useContext(Context)
  const [viewPort, setViewPort]  = useState(INITIAL_VIEWPORT)
  const [userPosition, setUserPosition] = useState(null)
  const [popup, setPopup] = useState(null)
  const [showDiscardMessage, setShowDiscardMessage] = useState(false)
  const {viewDevice} =  state;
  const {draft} = state;
  const {pins} = state;

  useEffect(()=>{
    getUserPosition()
  }, [])

  useEffect(()=>{
    getPins()
  }, [pins.length])

  const getPins = async ()=> {
    const {getPins}  = await client.request(GET_PINS)
    dispatch({type:"GET_PINS", payload: getPins})
  }


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
    setPopup(null)
    dispatch({type: "SET_PIN", payload: null})
    dispatch({type:"UPDATE_DRAFT_LOCATION", payload:{longitude, latitude} })
  }

  const handleSelectPin = (pin) => {
    setPopup(pin)
    dispatch({type:"SET_PIN", payload: pin})
  }

  const highlightNewPon = pin =>{
    const color = differenceInMinute(Date.now(),Number(pin.createdAt)) <= 15? "limegreen" : "darkblue"
    return color
  }

  const deleteSelectPin = async () =>{
    const variable = {pinId: state.currentPin._id}
    const {deletePin} = await client.request(DELETE_PIN_MUTATION, variable)
    dispatch({type: "DELETE_PIN", payload: {deletePin}})
    setPopup(null)
    setShowDiscardMessage(false)
  }

  const isAuthUser = () => state.currentUser._id === popup.author._id

  return( 
  <div className = {classes.root}>
    <ReactMapGL 
    mapboxApiAccessToken = "pk.eyJ1Ijoicm9uaG9uZzkxOSIsImEiOiJja2g5eDI5ZTUweGFiMnNrOGsyamhjeHdpIn0.hCdpJkNuIt3fGLyZaM6KhA"
    // width =  {viewDevice === "desktop" ? "50vw" : "100vw"}
    width = "100vw"
    height = "calc(100vh - 64px)"
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
          <PinIncon size = {40} color = "orange"/>
        </Marker>
      )}
      {/** End **/}

      {/** Pin for PinList**/}
      { 
        state.pins.map((pin:any)=> (
          <Marker
          key={pin._id}
          latitude = {pin['latitude']}
          longitude = {pin['longitude']}
          offsetLeft = {-19}
          offsetTop = {-37}
          className = {classes.pinIcon}
        >
          <PinIncon style = {{"cursor":"pointer"}} onClick = {()=>handleSelectPin(pin)} size = {40} color = {highlightNewPon(pin)} className = {classes.pinIcon}/>
        </Marker>
        ))
      }
      {/** End **/}

      {/**  Draft Pin**/}
      {
        state.draft &&(
          <Marker
          latitude = {draft.latitude}
          longitude = {draft.longitude}
          offsetLeft = {-19}
          offsetTop = {-37}
        >
          <PinIncon size = {40} color = "red"/>
        </Marker>
        )
      }
      {/** End **/}
      {
        state.draft &&(
          <div className= {classes.sidebarStyle}>
            <div>Longitude: {draft.longitude.toFixed(4)} | Latitude: {draft.latitude.toFixed(4)}</div>
          </div>
        )
      }

      {popup && (
        <Popup
        anchor = "top"
        latitude = {popup.latitude}
        longitude = {popup.longitude}
        closeOnClick = {false}
        onClose = {()=>setPopup(null)}
        >
          <img
          className = {classes.popupImage}
          src = {popup.image}
          alt = {popup.title}
          />
          <div className = {classes.popupTab}>
            <Typography>
               {popup.latitude.toFixed(6)} , {popup.longitude.toFixed(6)}
            </Typography>
            {isAuthUser() && (
              <Button>
                <DeleteIcon onClick = {()=> setShowDiscardMessage(true)} className = {classes.deleteIcon} />
              </Button>
            )}
          </div>    
        </Popup>
      )}

      <Dialog
          open={showDiscardMessage}
          onClose={() => setShowDiscardMessage(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete Marker</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this marker?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDiscardMessage(false)} color="primary" autoFocus>
              Close
            </Button>
            <Button onClick={() => deleteSelectPin()} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

    </ReactMapGL>
    <Blog/>
  </div>
  );
};

const styles = createStyles({
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
  },
  sidebarStyle: {
    display: "inline-block",
    position: "absolute",
    top: 0,
    left: "50px",
    margin: "12px",
    backgroundColor: "#404040",
    color: "#ffffff",
    zIndex: 1,
    padding: "6px",
    fontWeight: "bold",
    },
    pinIcon:{
      '&:hover': {
        opacity: .6
       }
    }
});

export default withStyles(styles)(Map);
