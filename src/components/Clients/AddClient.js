import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CardBoard from '../Common/CardBoard';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import Map from '../Track/GMap';

// Icons
import BackIcon from '@material-ui/icons/ArrowBack';

// App Classes
import Alert from '../Common/Alert';

import { connect} from 'react-redux';
import { GetRegions , NewClient, DismissAlert, UpdateClient } from '../../store/actions/ClientActions';

// CSS Module
const styles = (theme) => ({
	root: {
		display: 'flex',
		width: '90%'
	},
	formControl: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignContent: 'flex-start',
		
	},
	textFields:{
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
		padding: 10,
		paddingBottom: 5,
		paddingTop: 5,
		marginBottom: 20,
	},
	mapContent:{
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
		height: 500,
		padding: 5,
	},
	 
});

class AddClient extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			client_id: '',
			client_name: '',
			region: '',
			title: '',
			first_name: '',
			middle_name: '',
			last_name: '',
			address: '',
			area: '',
			city: '',
			state: '',
			country: '',
			pin: '',
			mobile: '',
			email: '',
			current_lat: 10.0222465,
			current_lng: 76.3028131,
			latitide: 0,
			longitude: 0
		};
	}

	componentWillMount(){
		this.props.GetRegions('');

		if(this.props.isEdit){
			
			console.log(`Current Client is ${JSON.stringify(this.props.current_client)}`);
			
			const { id,client_name,title,first_name,middle_name,last_name,address, region_id,area,city,state,country,pin,email,mobile, lat, lng} = this.props.current_client;

			this.setState({
				client_id: id,
				client_name: client_name,
				region: region_id,
				title: title,
				first_name: first_name,
				middle_name: middle_name,
				last_name: last_name,
				address: address,
				area: area,
				city: city,
				state: state,
				country: country,
				pin: pin,
				mobile: mobile,
				email: email,
				current_lat: lat,
				current_lng: lng,
				latitude: lat,
				longitude: lng
			});
		}

	}

	//ALERT
	onDismiss = () => {
		this.setState({ showAlert: false, client_name: '',
		region: '',
		title: '',
		first_name: '',
		middle_name: '',
		last_name: '',
		address: '',
		area: '',
		city: '',
		state: '',
		country: '',
		pin: '',
		mobile: '',
		email: '', });
		this.props.DismissAlert();
	};

	onOkay = () => {
		this.setState({ showAlert: false , client_name: '',
		region: '',
		title: '',
		first_name: '',
		middle_name: '',
		last_name: '',
		address: '',
		area: '',
		city: '',
		state: '',
		country: '',
		pin: '',
		mobile: '',
		email: '',
		currentPlace: 'Mumbai'
	}); 
		this.props.DismissAlert();
	};

	onOkayForError = () =>{
		this.setState({ showAlert: false });
	}

	onTapBack = () => {
		this.props.onTapBack();
	};
 
	onChangeStatus = () => {
		const value = this.state.status !== true ? true : false;
		this.setState({
			status: value
		});
	};

	onTapAddNewEmp() {

		const { client_id ,client_name, region,title, first_name, middle_name, last_name, address, area, city, state, country, pin, mobile, email, latitude, longitude } = this.state;

		if (client_name  === '') {
			this.onShowAlert('Client Name');
			return;
		}else if (title  === '') {
			this.onShowAlert('Title');
			return;
		}else if (first_name  === '') {
			this.onShowAlert('First Name');
			return;
		}else if (last_name  === '') {
			this.onShowAlert('Last Name');
			return;
		}else if (region  === '') {
			this.onShowAlert('Region');
			return;
		}else if (address  === '') {
			this.onShowAlert('Address');
			return;
		}else if (area  === '') {
			this.onShowAlert('Area Name');
			return;
		}else if (city  === '') {
			this.onShowAlert('City Name');
			return;
		}else if (state  === '') {
			this.onShowAlert('State');
			return;
		}else if (country  === '') {
			this.onShowAlert('Country');
			return;
		}else if (pin  === '') {
			this.onShowAlert('Pin Code');
			return;
		}else if (mobile  === '') {
			this.onShowAlert('Mobile Number');
			return;
		}else if (email  === '') {
			this.onShowAlert('Email ID');
			return;
		}  

		if(this.props.isEdit){
			this.props.UpdateClient({ client_id ,client_name, region,title, first_name, middle_name, last_name, address, area, city, state, country, pin, mobile, email, latitude, longitude });
		}else{
			this.props.NewClient({ client_name, region,title, first_name, middle_name, last_name, address, area, city, state, country, pin, mobile, email, latitude, longitude });
		}
		
	}


	onShowAlert = (msg) => {

		this.setState({ title: 'Please Enter Mandatory Fields!', msg: 'Please Enter '+ msg, showAlert: true});

	}


	handleTextChanges = (event) => {
		if (event.target.id === 'client_name') {
			this.setState({ client_name: event.target.value });
		}else if (event.target.id === 'title') {
			this.setState({ title: event.target.value });
		}else if (event.target.id === 'first_name') {
			this.setState({ first_name: event.target.value });
		} else if (event.target.id === 'middle_name') {
			this.setState({ middle_name: event.target.value });
		} else if (event.target.id === 'last_name') {
			this.setState({ last_name: event.target.value });
		} else if (event.target.id === 'address') {
			this.setState({ address: event.target.value });
		} else if (event.target.id === 'area') {
			this.setState({ area: event.target.value });
		}else if (event.target.id === 'city') {
			this.setState({ city: event.target.value });
		} else if (event.target.id === 'state') {
			this.setState({ state: event.target.value });
		} else if (event.target.id === 'country') {
			this.setState({ country: event.target.value });
		} else if (event.target.id === 'pin') {
			this.setState({ pin: event.target.value });
		}else if (event.target.id === 'mobile') {
			this.setState({ mobile: event.target.value });
		}else if (event.target.id === 'email') {
			this.setState({ email: event.target.value });
		}   
	};

	//Handle Selections
	handleTitleSelection = (event) => {
		this.setState({
			title: event.target.value
		})
	}

	handleRegion = (event) => {
		this.setState({
			region: event.target.value
		});
	}

	onSelectedPlace = (place) => {

		console.log('Place:'+ JSON.stringify(place))
		geocodeByAddress(place.description)
		.then(results => getLatLng(results[0]))
		.then(({ lat, lng }) => this.setState({current_lat: lat, current_lng: lng, latitude:lat, longitude: lng})
		);

	}


	onChangeLocation = (place) => {

		this.setState({
			latitude: place.latitude,
			longitude: place.longitude,
		});
	}

	//Add Bank
	mapContent = () => {
		const { current_lat, current_lng, currentPlace } = this.state;


		const center = {
			lat: current_lat,
			lng: current_lng,
		}
		const { classes, regions } = this.props;

		return(<view className={classes.formControl}>
						<view className={classes.textFields}>
							<GooglePlacesAutocomplete
								onSelect={this.onSelectedPlace.bind(this)}
							/>
						</view>
						<view className={classes.mapContent}>
							<Map 
								center = {center}
								current_lat={current_lat} 
								current_lng={current_lng}
								currentPlace = {currentPlace}
								markers={[{latitide: current_lat, longitude: current_lng}]}
								onChangeLocation={this.onChangeLocation}
								 />
						</view>
						<view className={classes.textFields}>
							<Button
								variant="contained"
								color="primary"
								onClick={this.onTapAddNewEmp.bind(this)}
								className={classes.button}
							>
								Add Client
							</Button>
						</view>
				</view>);

	};


	textContent = () =>{

		const { client_name, first_name, middle_name,
			last_name,address, area, city, state, country, pin, mobile, email } = this.state;

		const { classes, regions } = this.props;

		return(<view className={classes.formControl}>
						<view className={classes.textFields}>
							
								<TextField
									id="client_name"
									label="Client Name"
									style={{ width: 240, marginTop: 0, marginRight: 10}}
									type="text"
									required="true"
									margin="normal"
									onChange={this.handleTextChanges.bind(this)}
									value={client_name}
								/>
							</view>

							<view className={classes.textFields}>
								<NativeSelect
									style={{width: 80, height: 48, marginTop: 0, marginRight: 20}}
									required="true"
									onChange={this.handleTitleSelection.bind(this)}
								>
									<option value="" disabled selected>
										Title
									</option>
									<option value="Mr">Mr</option>
									<option value="Mrs">Mrs</option>
									<option value="Miss">Miss</option>
								</NativeSelect>

								<TextField
									id="first_name"
									label="First Name"
									style={{width: 200, marginTop: 0, marginRight: 20}}
									type="text"
									required="true"
									margin="normal"
									onChange={this.handleTextChanges.bind(this)}
									value={first_name}
								/>

								<TextField
									id="middle_name"
									label="Middle Name"
									style={{width: 120, marginTop: 0, marginRight: 20}}
									type="text"
									required="true"
									margin="normal"
									onChange={this.handleTextChanges.bind(this)}
									value={middle_name}
								/>
								
								<TextField
									id="last_name"
									label="Last Name"
									style={{width: 200, marginTop: 0, marginRight: 20}}
									type="text"
									required="true"
									margin="normal"
									onChange={this.handleTextChanges.bind(this)}
									value={last_name}
								/> 
							 
						</view>
						<view className={classes.textFields}>
							<NativeSelect
								style={{ width: 120, height: 48, marginTop: 0, marginRight: 20 }}
								required="true"
								onChange={this.handleRegion.bind(this)}
							>
								<option value="" disabled selected>
									Region
								</option>
								{regions !== undefined && regions.map( (item) => {
									return (<option value={item.id}>{item.region}</option>);
								})}
							</NativeSelect>
							</view>
							<view className={classes.textFields}>

							<TextField
								id="address"
								label="Address"
								style={{ width: '100%',marginTop: 0}}
								rows="4"
								type="text"
								multiline="true"
								required="true"
								margin="normal"
								onChange={this.handleTextChanges.bind(this)}
								value={address}
							/> 

						</view>
						<view className={classes.textFields}>
							<TextField
								id="area"
								label="Area"
								style={{width: 200, marginTop: 0, marginRight: 20}}
								type="text"
								required="true"
								margin="normal"
								onChange={this.handleTextChanges.bind(this)}
								value={area}
							/> 

							<TextField
								id="city"
								label="City"
								style={{width: 160, marginTop: 0, marginRight: 20}}
								type="text"
								required="true"
								margin="normal"
								onChange={this.handleTextChanges.bind(this)}
								value={city}
							/> 

							<TextField
								id="state"
								label="State"
								style={{width: 180, marginTop: 0, marginRight: 20}}
								type="text"
								required="true"
								margin="normal"
								onChange={this.handleTextChanges.bind(this)}
								value={state}
							/> 
							<TextField
								id="country"
								label="Country"
								style={{width: 120, marginTop: 0, marginRight: 20}}
								type="text"
								required="true"
								margin="normal"
								onChange={this.handleTextChanges.bind(this)}
								value={country}
							/> 
						</view>

						<view className={classes.textFields}>

							<TextField
								id="pin"
								label="pin"
								style={{width: 100, marginTop: 0, marginRight: 20}}
								type="text"
								required="true"
								margin="normal"
								onChange={this.handleTextChanges.bind(this)}
								value={pin}
							/> 
							<TextField
								id="mobile"
								label="Mobile Number"
								style={{width: 160, marginTop: 0, marginRight: 20}}
								type="text"
								required="true"
								margin="normal"
								onChange={this.handleTextChanges.bind(this)}
								value={mobile}
							/>

							<TextField
								id="email"
								label="Email ID"
								style={{width: 230, marginTop: 0, marginRight: 20}}
								type="email"
								required="true"
								margin="normal"
								onChange={this.handleTextChanges.bind(this)}
								value={email}
							/>
							
						</view>
 
			</view>);
	}
	

	render() {
		const { classes } = this.props;
		const { showAlert, title, msg } = this.state;

		return (
			<div className={classes.root}>
				 
				<Alert
					open={this.props.isAdded}
					onCancel={this.onOkay.bind(this)}
					onOkay={this.onOkay.bind(this)}
					title={"Add New Client"}
					msg={"Client Added Successfully!"}
				/>


				<Alert
					open={showAlert}
					onCancel={this.onOkayForError.bind(this)}
					onOkay={this.onOkayForError.bind(this)}
					title={title}
					msg={msg}
				/>
				
				<Grid container spacing={24}>
				 
					<Grid item xs={6}>
						<CardBoard>
							{this.textContent()}
						</CardBoard>
					</Grid>
					<Grid item xs={6}>
						<CardBoard>
							{this.mapContent()}
						</CardBoard>
					</Grid>
					 
				</Grid>

			</div>
		);
	}
}

AddClient.propTypes = {
	classes: PropTypes.object
};

const mapStateToProps = (state) => ({
	isAdded: state.clientReducer.isAdded,
	regions: state.clientReducer.regions,
});

export default connect(mapStateToProps, { NewClient, GetRegions, DismissAlert, UpdateClient }) (withStyles(styles)(AddClient));
