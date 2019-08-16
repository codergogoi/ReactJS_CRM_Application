import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Icons
import EmployeeIcon from '@material-ui/icons/SupervisorAccount';
import AddOffersIcon from '@material-ui/icons/CardGiftcard';
import Table from './TrackUserTable';
import Alert from '../Common/Alert';

import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';

 
//App Classes
import CardDiv from '../Common/CardDiv';

import { connect } from 'react-redux';
import { GetUsers } from '../../store/actions/TrackingActions';

import Map from './GMap';


const suggestions = [
	{ label: '' }
  ];
  

  function renderInputComponent(inputProps) {
	const { classes, inputRef = () => {}, ref, ...other } = inputProps;
  
	return (
	  <TextField
		fullWidth
		InputProps={{
		  inputRef: node => {
			ref(node);
			inputRef(node);
		  },
		  classes: {
			input: classes.input,
		  },
		}}
		{...other}
	  />
	);
  }
  
  function renderSuggestion(suggestion, { query, isHighlighted }) {
	const matches = match(suggestion.label, query);
	const parts = parse(suggestion.label, matches);
  
	return (
	  <MenuItem selected={isHighlighted} component="div">
		<div>
		  {parts.map((part, index) =>
			part.highlight ? (
			  <span key={String(index)} style={{ fontWeight: 500 }}>
				{part.text}
			  </span>
			) : (
			  <strong key={String(index)} style={{ fontWeight: 300 }}>
				{part.text}
			  </strong>
			),
		  )}
		</div>
	  </MenuItem>
	);
  }
  
  function getSuggestions(value) {
	const inputValue = deburr(value.trim()).toLowerCase();
	const inputLength = inputValue.length;
	let count = 0;
  
	return inputLength === 0
	  ? []
	  : suggestions.filter(suggestion => {
		  const keep =
			count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;
  
		  if (keep) {
			count += 1;
		  }
  
		  return keep;
		});
  }
  
  function getSuggestionValue(suggestion) {
	return suggestion.label;
  }



function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired
};

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
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: '#FFF',
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
	  }
});

  

class TrackManager extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			currentOffer: '',
			value: 0,
			isAddNew: false,
			isEdit: false,
			inputValue: '',
		  	selectedItem: '',
		  	single: '',
			popper: '',
			users: [],
			current_lat: 10.0188428,
			current_lng: 76.3059224
		};
	}

	handleSuggestionsFetchRequested = ({ value }) => {
		this.setState({
		  users: getSuggestions(value),
		});
	  };
	
	  handleSuggestionsClearRequested = () => {
		this.setState({
		  users: [],
		});
	  };
	
	  handleChange = name => (event, { newValue }) => {

		

		let index = this.props.users.findIndex((x) => x.label === newValue);
		let selectedUser = this.props.users[index];

		if(selectedUser !== undefined){
			this.setState({
				current_lat: selectedUser.lat,
				current_lng: selectedUser.lng
			});

		}

		this.setState({
			single: newValue,
		});
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

	onSelectUser = (event) => {

		// let { selectedItem } = this.state;	
		// let index = this.props.subCategories.findIndex((x) => x.name === item);
		// let selectedCategory = this.props.subCategories[index];

		// this.setState({
		//   inputValue: selectedCategory.id,
		//   selectedItem: item,
		// });

	}

 

	onDisplaySearchView = () => {

		const { classes } = this.props;

		const autosuggestProps = {
		renderInputComponent,
		suggestions: this.props.users,
		onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
		onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
		getSuggestionValue,
		renderSuggestion,
		};

		return (
			<div className={classes.searchView}>
					
					<Autosuggest
						{...autosuggestProps}
						inputProps={{
							classes,
							placeholder: 'Search Employee',
							value: this.state.single,
							onChange: this.handleChange('single'),
						}}
						theme={{
							container: classes.container,
							suggestionsContainerOpen: classes.suggestionsContainerOpen,
							suggestionsList: classes.suggestionsList,
							suggestion: classes.suggestion,
						}}
						renderSuggestionsContainer={options => (
							<Paper {...options.containerProps} square>
							{options.children}
							</Paper>
						)}
						/>
						<SearchIcon />
			</div>
		);
	}


	displyaDateView = () =>{

		const {classes } = this.props; 

		return (
			<div className={classes.dateView}>

				<TextField
					id="date"
					label="From Date"
					type="date"
					defaultValue="2017-05-24"
					className={classes.textField}
					InputLabelProps={{
					shrink: true,
					}}
				/>

				<TextField
					id="date"
					label="To Date"
					type="date"
					defaultValue="2017-05-24"
					className={classes.textField}
					InputLabelProps={{
					shrink: true,
					}}
				/>

			</div>
		);
	}


	render() {
		const { classes, users } = this.props;
		const {  isAddNew, showAlert, title, msg, current_lat, current_lng } = this.state;
			
		const center = {
			lat: current_lat,
			lng: current_lng,
		}

		return (
				<div>
					<Alert
						open={showAlert}
						onCancel={this.onDismiss.bind(this)}
						onOkay={this.onOkay.bind(this)}
						title={title}
						msg={msg}
					/>

					<CardDiv title={'Track Live Users'}>
						<div className={classes.mapContainer}>
							{this.onDisplaySearchView()}
							{this.displyaDateView()}

							<Map 
								isTracking={true}
								center = {center}
								current_lat={current_lat} 
								current_lng={current_lng}
								currentPlace = {""}
								markers={[{latitide: current_lat, longitude: current_lng}]}
								 />

						</div>
						
					</CardDiv>
				</div>
			);
 	}

	//ALERT
	onDismiss = () => {
		this.setState({ showAlert: false });
	};

	onOkay = () => {
		this.setState({ showAlert: false });
		this.onExecuteDeleteCommand();
	};

}

TrackManager.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapToProps = (state) => ({
	users: state.trackingReducer.users
});

export default connect(mapToProps, { GetUsers })(withStyles(styles)(TrackManager));
