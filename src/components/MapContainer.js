import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchPlaces } from "../actions/placesActions";
import Autocomplete from "./Autocomplete";
import { Search } from  "@material-ui/icons"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Grid, IconButton, List, ListItem, ListItemText, Popover, withStyles } from "@material-ui/core";
import { compose } from "recompose";

const styles = () => ({
  search :{
    marginLeft : 'auto',
    marginRight:'auto',
    height: '80px'
  },
  nowrap : {
    flexWrap : 'nowrap'
  }
})
const MapContainer = ({classes, searchResults}) => {
  const dispatch = useDispatch();
  const [popOver, setPopOver] = React.useState(null);

  const [center, setCenter] = useState({
    lat: -35.397,
    lng: 150.644,
  });
  const [marker, setMarker] = useState({ lat: -35.397, lng: 150.644 });
  const [popValue,setPopValue] = useState('');

  const onPlaceChanged = (place) => {
    if(!place || !place.geometry || !place.geometry.location) return null
    setCenter({ lat: place.geometry.location.lat, lng: place.geometry.location.lng });
    setMarker({ lat: place.geometry.location.lat, lng: place.geometry.location.lng });
  };

  useEffect(()=>{
    dispatch(fetchPlaces());
  },[])

  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const handleOpen = (event) => {
    setPopOver(event.currentTarget);
  }

  const handleClose = () => {
    setPopOver(null);
  }

  const open = Boolean(popOver);
  const id = open ? 'simple-popover' : undefined;

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
      <Grid container className={classes.nowrap}>
        <Autocomplete onPlaceSelected={onPlaceChanged} popValue = {popValue} />
        <IconButton onClick={handleOpen}>
            <Search fontSize="large" />
        </IconButton> 
      </Grid>
      <Popover
        id={id}
        open={open}
        anchorEl={popOver}
        onClose={handleClose}
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
        }}>
        <List>
            {
              searchResults.length === 0 ? <ListItem>
                <ListItemText primary={"No data found"}></ListItemText>
                  </ListItem> :
                  searchResults.map((item) => {
                    return <ListItem button onClick={() => {
                        setPopValue(item)
                       }}>
                        <ListItemText primary={item} />
                    </ListItem>
                })
            }
        </List>
        {/* <Button onClick={onClearHistory} className={classes.clearHistory}>Clear</Button> */}
       </Popover>
        <GoogleMap mapContainerStyle={mapStyles} zoom={7} center={center}>
        <Marker position={marker} />
      </GoogleMap>
    </LoadScript>
  );
};

const mapStateToProps = (state) => {
  return {
    searchResults : state.placeReducer.searchResults
  }
}

export default compose(withStyles(styles), connect(mapStateToProps, null))
(MapContainer);
