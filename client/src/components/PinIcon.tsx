import React from "react";
import PlaceTwoTone from "@material-ui/icons/PlaceTwoTone";

export default ({size, color, onClick}:any) => (
    <PlaceTwoTone onClick = {onClick} style={{fontSize: size, color}}/>
);
