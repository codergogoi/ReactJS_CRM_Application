
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

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
      current_emp: 'Loading...',
      last_visited: 'Loading...',
      showingInfoWindow: false,
      activeMarker: null,
      bounds: []
    }
 
  }
  

  mapClicked = (mapProps, map, clickEvent)  => {
    
    if(this.props.isTracking){

      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
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
    

    console.log(props.title);
    

    this.setState({
        current_emp: props.title,
        last_visited: props.name,
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
        locations: nextProps.markers
      })
     
    }

  }
 
 

  render() {
        
    const { isTracking, markers } = this.props;
 
    
    return (
        <Map
          className={"map"}
          google={this.props.google}
          zoom={14}
          style={ isTracking === true ? styles.mapSizeBig : styles.mapSizeSmall}
          onClick={this.mapClicked}
          center={{ lat: this.state.lat, lng: this.state.lng}}
        >

        {markers.map((loc, i) => {

            let latitude = loc.latitude;
            let longitude = loc.longitude;

            return (
              <Marker
              key={i}
              title={loc.name}
              name={loc.visited}
              position={{lat: latitude, lng: longitude}} 
              onClick={this.onTapMarker.bind(this)}
              />
            );

        })}

      <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h2>{this.state.current_emp}</h2>
              <h3>{this.state.last_visited}</h3>
            </div>
        </InfoWindow>

        </Map>
    );
  }

 
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDOsCY0VM3PTppPhHBqhrqXRX-JUaexPbs'
})(GMap)


// export default GMap;

