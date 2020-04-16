import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '../Common/AlertWithData';
 
import SearchIcon from '@material-ui/icons/Search';

import Select from 'react-select';
import { MAPKEY } from '../../store/actions/AppConst';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

import Fab from '@material-ui/core/Fab';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

//App Classes
import CardDiv from '../Common/CardDiv';

import { connect } from 'react-redux';
import { GetUsers, GetTrackDetails, DismissAlert } from '../../store/actions/TrackingActions';
import moment from 'moment';
import { isArray } from 'util';

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		width: '100%'
	},
	
	bar: {
		backgroundColor: '#1a237e'
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	},
	btnRightA: {
		position: 'absolute',
		top: theme.spacing.unit * 20,
		right: theme.spacing.unit * 10
	},
	container: {
		position: 'relative',
		width: 300,
	  },
	  searchView:{
		position: 'absolute',
		marginTop: 10,
		marginLeft: 200,
		zIndex: 100,
		width: 320,
		flexDirection: 'row',
		padding: 5,
		borderRadius: 10,
	},
	
	  suggestionsContainerOpen: {
		position: 'absolute',
		zIndex: 1,
		marginTop: theme.spacing.unit,
		left: 0,
		right: 0,
	  },
	  suggestion: {
		display: 'block',
	  },
	  suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none',
	  },
	  divider: {
		height: theme.spacing.unit * 2,
	  },
	  mapContainer:{
		  width: '100%',
		  height: 800,
		  display: 'flex',
	  },
	  selectView: {
		paddingTop: 20,
		width: 400,
		marginLeft: 10
	},
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
      
  },
  dateView:{
	position: 'absolute',
	marginTop: 10,
	marginLeft: 550,
	zIndex: 100,
	width: 260,
	display: 'flex',
	flexDirection: 'row',
	backgroundColor: '#FFF',
	padding: 2,
	paddingLeft: 5,
	borderRadius: 8,
	alignItems: 'center'
},
  dateInput: {
	  display:'flex',
	  width: 80,
	  borderRadius: 15,
	  backgroundColor: '#FAC286',
	  marginRight:10,
	  marginLeft: 10,
	  borderWidth: 0,
	  textAlign: 'center',
	  fontSize: 15,
	  color: '#FFF'
  },
  dateText:{
		fontSize: 10,
		color: '#979797',
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center'
  },
  
margin: {
	margin: theme.spacing.unit,
	marginLeft: 10
  },


});

  

class TrackManager extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startDate: new Date(),
			endDate: new Date(),
			id: '',
			currentOffer: '',
			value: 0,
			isViewMore: false,
			isAddNew: false,
			showAlert: false,
			isEdit: false,
			inputValue: '',
		  	selectedItem: '',
		  	single: '',
			popper: '',
			users: [],
			current_lat: 20.5937,
			current_lng: 78.9629,
			selectedUser: null,
			locations: [],
			from: '2019-09-05',
			to: '2020-12-01',
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
			bounds: [],
			isMapClicked: false,
		};
	}

	//MAP




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

	 
	  }
	
	
	  onTapMarker = (props, marker, e) => {
		
		const { name } = props;

		if(isArray(name)){
			this.setState({
				current_emp: name,
				activeMarker: marker,
				last_visited: name,
				showingInfoWindow: true,
		  });
		}else{
			this.setState({
				current_emp: name.label,
				activeMarker: marker,
				last_visited: name.visited,
				showingInfoWindow: true,
		  });
		}
		
	
	  }
	 
	handleUserChange = selectedUser => {
		
		const { lat, lng, locations, id } = selectedUser;

		this.setState({ selectedUser, locations: locations , id: id});
 	
		if(lat !== undefined && lng !== undefined){
			this.setState({
				current_lat: lat,
				current_lng: lng
			});
		}

	  };

	componentWillMount() {
		this.props.GetUsers('');
	}
 
	onTapAddNew() {
		this.setState({ isAddNew: true });
	}

	componentWillReceiveProps(){
		this.setState({ isAddNew: false, isEdit: false, isViewMore: false });
	}


	onTapBack() {
		this.setState({ isAddNew: false, isEdit: false, isViewMore: true });
	}

	onCloneClick(offer) {
		this.setState({ isAddNew: true, isEdit: true, currentOffer: offer });
	}

	onCloneNotification(offer) {
		this.setState({
			currentOffer: offer,
			isEdit: true,
			isAddNew: true
		});
	}

	onDeleteOffer(offer) {
		const { id } = offer;
		this.setState({
			id: id,
			showAlert: true,
			msg: 'Are you sure to delete the selected User?',
			title: 'Delete Confirmation!'
		});
	}

	onExecuteDeleteCommand() {
		const { id } = this.state;
		this.props.RemoveOffers({ id });
	}

	trackThisUser = () => {
		this.setState({
			isFind:true
		})
		const { startDate, endDate, id } = this.state;
		this.props.GetTrackDetails({ startDate, endDate, id})

	}


	handleStartDateChange = date => {
		this.setState({
		  startDate: date
		});
	  };

	handleEndDateChange = date => {
	this.setState({
		endDate: date
	});
	};
 
	displyaDateView = () =>{

		const {classes } = this.props; 

		return (
			<div className={classes.dateView}>
				
					<div>
						<div className={classes.dateText}>
							From Date
						</div>
						<DatePicker
							className={classes.dateInput}
							selected={this.state.startDate}
							onChange={this.handleStartDateChange}
						/>
					</div>

					<div>
						<div className={classes.dateText}>
							To Date
						</div>
						<DatePicker
							className={classes.dateInput}
							selected={this.state.endDate}
							onChange={this.handleEndDateChange}
						/>
					</div>
					
					<Fab size="small" color="secondary"  aria-label="Add" className={classes.fab} onClick={this.trackThisUser.bind(this)}>
						<SearchIcon />
					</Fab>

			</div>
		);
	}
 
	

	getValidLocations = (user, specifiedUser) => {

		let markers = [];

		if(user === undefined || user === null) return;

		let locations = user;

		if(!specifiedUser){

			locations = user.filter((user) => {
				return user.lat !== 0 && user.lng !== 0
			})

			if(locations.length > 0){

				{ locations.map((lat,lng, label, i) => {

					markers.push(
						<Marker
						key={i}
						title={label}
						name={label}
						position={{lat: lat, lng: lng}} 
						onClick={this.onTapMarker.bind(this)}
						/>
					);

				})}
			}

		}else{

			if(locations.length > 0){

				{ locations.map((loc, i) => {

					let latitude = loc.latitude;
					let longitude = loc.longitude;

					markers.push(
						<Marker
						key={i}
						title={loc.name}
						name={loc.visited}
						position={{lat: latitude, lng: longitude}} 
						onClick={this.onTapMarker.bind(this)}
						/>
					);

				})}
			}

		}
		 

		
		return [...markers];

	}

	render() {
		const { classes, users, details, isFound } = this.props;
		const {  isViewMore, showAlert, title, msg, current_lat, current_lng, selectedUser, locations, isFind } = this.state;


			
		const center = {
			lat: current_lat,
			lng: current_lng,
		}

		if(details !== undefined &&  details.length > 0 && isViewMore){

			const NewCenter = {
				lat: details[0].latitude,
				lng: details[0].longitude,
			}

			return (
				<div>
					
					<CardDiv title={'User Statistics'}>
						<div className={classes.mapContainer}>

							  
							{<Map
									className={"newmap"}
									google={this.props.google}
									zoom={15}
									style={  styles.mapSizeBig }
									onClick={this.mapClicked}
									initialCenter={NewCenter}
									center={NewCenter}
									>
										
									{ details.map((item, i) => {

										return <Marker
											key={i}
											title={item}
											name={item}
											position={{lat: item.latitude, lng: item.longitude}} 
											onClick={this.onTapMarker.bind(this)}
										/>
										
									})}


									<InfoWindow
										marker={this.state.activeMarker}
										visible={this.state.showingInfoWindow}>
											<div>
											<h2>{this.state.current_emp}</h2>
											<h3>{this.state.last_visited}</h3>
											</div>
									</InfoWindow>
									
									 

								</Map> }

						</div>
						
					</CardDiv>
				</div>
			);

		}else{

			return (
				<div>
					
					{isFind && details !== undefined &&  details.length > 0 && <Alert
						open={isFound}
						onViewOnMap={this.onViewOnMap.bind(this)}
						onOkay={this.onOkay.bind(this)}
						title={"Last Visited Places"}
						locations={details}
						msg={""}
					/>}
					
					<CardDiv title={'User Statistics'}>
						<div className={classes.mapContainer}>
							<view className={classes.searchView}>
								<Select
									value={selectedUser}
									onChange={this.handleUserChange}
									options={users}
								/>
							</view>

							{selectedUser !== null && this.displyaDateView()}

							{<Map
									className={"map"}
									google={this.props.google}
									zoom={5}
									style={  styles.mapSizeBig }
									onClick={this.mapClicked}
									center={{ lat: current_lat, lng: current_lng}}
									>
										
									{this.getValidLocations(users, false)}

									{/* {selectedUser !== null ? this.getValidLocations(this.state.locations, true) : this.getValidLocations(users, false)} */}
									  

									<InfoWindow
										marker={this.state.activeMarker}
										visible={this.state.showingInfoWindow}>
											<div>
												<h2> Multiple Users Found!</h2>
												{isArray(this.state.current_emp) ? 
												(
													<div>
														{this.state.current_emp.map(emp => {
															return (
																<div>
																	<h3>{emp.label}</h3>
																</div>
															)
														})}
													</div>
												) 
												:
												(<div>
													<h2>{this.state.current_emp}</h2>
													<h3>{this.state.last_visited}</h3>
												</div>
												)}
											
											</div>
									</InfoWindow>

								</Map> }

						</div>
						
					</CardDiv>
				</div>
			);

		}


		
 	}

	//ALERT
	onDismiss = () => {
		this.setState({
			isFind: false
		})
		this.props.DismissAlert();
	};

	onOkay = () => {
		this.setState({
			isFind: false
		})
		 this.props.DismissAlert();
	 };
	 
	onViewOnMap = () => {
		this.setState({
			isViewMore: true,
			isFind: false
		})
	}

}

TrackManager.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapToProps = (state) => ({
	users: state.trackingReducer.users,
	details: state.trackingReducer.details,
	isFound: state.trackingReducer.isFound
});

const WrappedContainer = GoogleApiWrapper({
	apiKey: MAPKEY
 })(TrackManager);


export default connect(mapToProps, { GetUsers, GetTrackDetails, DismissAlert })(withStyles(styles)(WrappedContainer));
