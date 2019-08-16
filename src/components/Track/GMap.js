
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';


// export class MapContainer extends React.Component {}
 




const styles = {
	
    marker: {
        width: 120,
        height: 80,
        textAlign: 'center'

    },
    img:{
        width: 28,
        height: 36,
        margin: '0',
    },
    name:{
        width: '100%',
        borderRadius: 10,
        padding: 5,
        fontSize: 12,
        margin: '0',
        backgroundColor: '#c14436',
    },
    mapSizeSmall:{
        width: '40%',
        height: '60%'
    },
    mapSizeBig:{
      width: '90%',
      height: 790
      
  }

};
  
class GMap extends Component {

 
  constructor(props){
    super(props);

    this.state = {
      locations: [{
        lat(){ return props.current_lat},
        lng(){ return props.current_lng}
      }],
      lat: props.current_lat,
      lng: props.current_lng ,
      current_place: '',
      showingInfoWindow: false,
      activeMarker: null,
    }
 
  }

  displayMarkers = (places) => {
    return places.map((store, index) => {
      return <Marker key={index} id={index} position={{
       lat: store.latitude,
       lng: store.longitude
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }


  mapClicked = (mapProps, map, clickEvent)  => {
    
    if(this.props.isTracking){

      return;
    }


    const location = clickEvent.latLng;

    this.setState({
      locations: [location]
    })

    map.panTo(location);
    const latitude = location.lat();
    const longitude = location.lng();
    this.props.onChangeLocation({latitude, longitude});
      
  }


  onTapMarker = (props, marker, e) => {
    
    this.setState({
        current_place: props,
        activeMarker: marker,
        showingInfoWindow: true
      });

  }

  componentWillReceiveProps(nextProps) {

    this.setState({
      lat: nextProps.current_lat,
      lng: nextProps.current_lng ,
    });
    if(this.props.isTracking){

      this.setState({
        locations: [{
          lat(){ return nextProps.current_lat},
          lng(){ return nextProps.current_lng}
        }],
      })
     
    }
      

  }
 
  render() {
    
    const { locations} = this.state;
    
    const { isTracking } = this.props;

    return (
        <Map
          className={"map"}
          google={this.props.google}
          zoom={18}
          style={ isTracking === true ? styles.mapSizeBig : styles.mapSizeSmall}
          onClick={this.mapClicked}
          center={{ lat: this.state.lat, lng: this.state.lng}}
        >
          
          {locations !== undefined && locations.map((location, i) => {
            return (
              <Marker
                key={i}
                position={{ lat: location.lat(), lng: location.lng() }}
              />
            );
          })}

        </Map>
    );
  }

 
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCRBXIKw3NRIxdR50jnMg2tvK5_YL-flgQ'
})(GMap)


// export default GMap;

