
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 

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
    mapsize:{
        width: '100%',
        height: '800px'
        
    }

};
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;

 
const MapMarker = (props) => {
    return (
        <div style={styles.marker} onClick={props.onClickMarker}>
            <div style={styles.name}>{props.text}</div>
            <img style={styles.img} src={`${process.env.PUBLIC_URL}/loc.png`} />
        </div>
    );
}

 
class GMap extends Component {
  static defaultProps = {
    center: {
      lat: 10.0222465,
      lng: 76.3028131
      
    },
    zoom: 15
  };

  
  onTapMarker = (person) =>{

    alert('Yes working');

  }
  
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={styles.mapsize}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCRBXIKw3NRIxdR50jnMg2tvK5_YL-flgQ'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <MapMarker
            lat={10.0222465}
            lng={76.3028131}
            onClick={this.onTapMarker}
            text={"Sales Person"}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default GMap;

