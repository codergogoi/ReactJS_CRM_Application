import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// Icons
import EmployeeIcon from '@material-ui/icons/SupervisorAccount';
import AddOffersIcon from '@material-ui/icons/CardGiftcard';
import Table from './TrackUserTable';
import Alert from '../Common/AlertWithData';

import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import Select from 'react-select';
 
 
//App Classes
import CardDiv from '../Common/CardDiv';

import { connect } from 'react-redux';
import { GetUsers, GetTrackDetails, DismissAlert } from '../../store/actions/TrackingActions';

import Map from './GMap';

 

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
	dateView:{
		position: 'absolute',
		marginTop: 10,
		marginLeft: 550,
		zIndex: 100,
		width: 320,
		height: 50,
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: '#FFF',
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
});

  

class TrackManager extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			currentOffer: '',
			value: 0,
			isAddNew: false,
			showAlert: false,
			isEdit: false,
			inputValue: '',
		  	selectedItem: '',
		  	single: '',
			popper: '',
			users: [],
			current_lat: 10.0188428,
			current_lng: 76.3059224,
			selectedUser: null,
			locations: [],
			from: '2019-09-05',
			to: '2020-12-01'
		};
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

	onTapBack() {
		this.setState({ isAddNew: false, isEdit: false });
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
		const { from, to, id } = this.state;
		this.props.GetTrackDetails({ from, to , id})

	}


	handleTextChanges = (event) => {

		if (event.target.id === 'from') {
			this.setState({ from: event.target.value });
		}else if (event.target.id === 'to') {
			this.setState({ to: event.target.value });
		} 
	};


	displyaDateView = () =>{

		const {classes } = this.props; 

		return (
			<div className={classes.dateView}>

				<TextField
					id="from"
					label="From Date"
					type="date"
					defaultValue="2019-09-05"
					onChange={this.handleTextChanges.bind(this)}
					className={classes.textField}
					InputLabelProps={{
					shrink: true,
					}}
				/>

				<TextField
					id="to"
					label="To Date"
					type="date"
					defaultValue="2019-09-05"
					className={classes.textField}
					onChange={this.handleTextChanges.bind(this)}
					InputLabelProps={{
					shrink: true,
					}}
				/>

				<button onClick={this.trackThisUser.bind(this)}> Search </button>

			</div>
		);
	}


	render() {
		const { classes, users, details, isFound } = this.props;
		const {  isAddNew, showAlert, title, msg, current_lat, current_lng, selectedUser, locations } = this.state;
			
		const center = {
			lat: current_lat,
			lng: current_lng,
		}

		return (
				<div>
					
					<Alert
						open={isFound}
						onCancel={this.onOkay.bind(this)}
						onOkay={this.onOkay.bind(this)}
						title={"Last Visited Places"}
						locations={details}
						msg={""}
					/>

					<CardDiv title={'Track Live Users'}>
						<div className={classes.mapContainer}>
							<view className={classes.searchView}>
								<Select
										value={selectedUser}
										onChange={this.handleUserChange}
										options={users}
								/>
							</view>

							{this.displyaDateView()}

							<Map 
								isTracking={true}
								center = {center}
								current_lat={current_lat} 
								current_lng={current_lng}
								currentPlace = {""}
								markers={ locations.length > 0 ? locations : [{latitide: current_lat, longitude: current_lng}] }
								 />

						</div>
						
					</CardDiv>
				</div>
			);
 	}

	//ALERT
	onDismiss = () => {
		this.props.DismissAlert();
	};

	onOkay = () => {
		this.props.DismissAlert();
 	};

}

TrackManager.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapToProps = (state) => ({
	users: state.trackingReducer.users,
	details: state.trackingReducer.details,
	isFound: state.trackingReducer.isFound
});

export default connect(mapToProps, { GetUsers, GetTrackDetails, DismissAlert })(withStyles(styles)(TrackManager));
