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

import Geocode from "react-geocode";


import { connect} from 'react-redux';
import { GetAttributes , NewEmp, UpdateEmp ,DismissAlert } from '../../store/actions/EmployeeActions';

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

class ViewTrackingDetails extends React.Component {
	constructor(props) {
		super(props);
         
        this.state = {
			address: '',
        }

        Geocode.setApiKey("AIzaSyCRBXIKw3NRIxdR50jnMg2tvK5_YL-flgQ");
 
        // set response language. Defaults to english.
        Geocode.setLanguage("en");
        
        // set response region. Its optional.
        // A Geocoding request with region=es (Spain) will return the Spanish city.
        Geocode.setRegion("es");
        
        // Enable or disable logs. Its optional.
        Geocode.enableDebug();
	}

	componentWillMount(){
         
        Geocode.fromLatLng("10.02111683", "76.30763529").then(
            response => {
              const address = response.results[0].formatted_address;
              this.setState({address: address});
              console.log(address);
            },
            error => {
              console.error(error);
            }
          );
	}

	 

	onTapBack = () => {
		this.props.onTapBack();
	};

	 


	render() {
		const { classes } = this.props;
 
		return (
			<div className={classes.root}>
				 
				<Grid container spacing={24}>
					<Grid item xs={3}>
					</Grid>

					<Grid item xs={6}>
						<CardBoard>
							Tracking Address Details : {this.state.address} 
						</CardBoard>
					</Grid>
					<Grid item xs={3}>
					</Grid>
					 
				</Grid>

			</div>
		);
	}
}

ViewTrackingDetails.propTypes = {
	classes: PropTypes.object
};

const mapStateToProps = (state) => ({
	isAdded: state.employeeReducer.isAdded,
});

export default connect(mapStateToProps, { GetAttributes, NewEmp, DismissAlert, UpdateEmp }) (withStyles(styles)(ViewTrackingDetails));
