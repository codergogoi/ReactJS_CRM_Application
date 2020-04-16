import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import moment from 'moment';
import Chip from '@material-ui/core/Chip';

import Geocode from "react-geocode";

import CheckInIcon from '@material-ui/icons/ArrowForward'
import CheckOutIcon from '@material-ui/icons/ArrowBack'


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import { MAPKEY } from '../../store/actions/AppConst';

 
const styles = (theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 2,
		boxShadow: 'none',
		backgroundColor: theme.palette.background.paper,
		position: 'relative',
		overflow: 'auto',
		maxHeight: 600,
	},
	 
	  listSection: {
		backgroundColor: 'inherit',
	  },
	  ul: {
		backgroundColor: 'inherit',
		padding: 0,
	  },
	  calHeader:{
		  display: 'flex',
		  
		  marginTop: 5,
		  marginBottom: 5
	  },
	  identicalMark:{
		  display: 'flex',
		  backgroundColor: '#F1A570',
		  width: '100%',
		  height: '5px'
		},
	  attendee: {
		  display: 'flex',
		  flexDirection: 'column',
		  paddingLeft: 100,
		  width: '90%'
	  },
	  attendanceTable:{
		color: '#9A9A9A',
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-around'
	  },
	  empName: {
		  display: 'flex',
		  width: '200px',
		  
	  },
	  chipBasic: {
		margin: theme.spacing.unit,
		fontSize: 20,
		fontWeight: 'bold',
		color: '#0E8367',
	  },
	  chipRed: {
		margin: theme.spacing.unit,
		backgroundColor: '#D36760',
	  },
	  chipGreen: {
		margin: theme.spacing.unit,
		backgroundColor: '#74AD75',
	  },
	checkIn:{
		color: '#74AD75'
	},
	checkOut:{
		color: '#D36760'
	}
});

class AttendanceTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			
		};

		Geocode.setApiKey(MAPKEY);
 
		// set response language. Defaults to english.
		Geocode.setLanguage("en");
		
		// set response region. Its optional.
		// A Geocoding request with region=es (Spain) will return the Spanish city.
		Geocode.setRegion("es");

	}

	onCodeToAddress = (lat, lng, i, prefix) => {
		
		this.setState({[`${prefix}_${i}`]: 'Punch Out Not Done'});

		Geocode.fromLatLng(lat, lng).then(
		  response => {
			const address = response.results[0].formatted_address;
			this.setState({[`${prefix}_${i}`]: address});
		  },
		  error => {
			console.error(error);
		  }
		);
	
	  }

 


	onTapViewLocation = (emp) => {
		this.props.onTapViewLocation(emp);
	}


	render() {
		const { classes, data } = this.props;

		return (<List className={classes.root} subheader={<li />}>
					{data.map((n) => (
						<li key={`${moment(n.date).format('Do MMM YYYY')}`} className={classes.listSection}>
						<ul className={classes.ul}>
							<ListSubheader className={classes.calHeader}>
							<Chip label={`${moment(n.date).format('Do MMM - ddd')}`} className={classes.chipBasic} />

							</ListSubheader>
								
								<div className={classes.attendee}>

									{n.emp !== null && 	<div className={classes.identicalMark}></div>}
									
									{n.emp !== null &&  n.emp.map((item) => (
										<div>
											{ this.state[`in_${item.id}`] === undefined && this.onCodeToAddress(item.checkin_lat,item.checkin_lng, item.id,"in")}
											{ this.state[`out_${item.id}`] === undefined && this.onCodeToAddress(item.checkout_lat,item.checkout_lng, item.id,"out")}
										<Divider />	
										<ListItem key={`${n.date}-${item.id}`}>
											<div className={classes.attendanceTable}>
												<ListItemText className={classes.empName} primary={`${item.name}`} />
												<CheckInIcon className={classes.checkIn}/>
												<ListItemText primary={`${moment(item.check_in).format('h:mm a')} @ ${this.state[`in_${item.id}`]}` } />
												<CheckOutIcon className={classes.checkOut}/>
												{this.state[`out_${item.id}`] === 'Punch Out Not Done' ?
													<ListItemText primary={`${this.state[`out_${item.id}`]}`} />
													:
													<ListItemText primary={`${moment(item.check_out).format('h:mm a')} @ ${this.state[`out_${item.id}`]}`} />
												}
												{item.hrs > 0 && 
													item.hrs < 8 ? 
													<Chip label={`${item.hrs} Hours`} className={classes.chipRed} />
													 :
													 <Chip label={`${item.hrs} Hours`} className={classes.chipGreen} />
													}												
											</div>
										</ListItem>
										</div>
										
									))}
								</div>
							<Divider />	
						</ul>
						</li>
					))}
				</List>);
		 
	}
}

AttendanceTable.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AttendanceTable);
