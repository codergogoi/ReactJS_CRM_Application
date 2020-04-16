import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardBoard from '../Common/CardBoard';

import { NewTask, DismissAlert, GetTaskUtility, UpdateTask, GetTaskCity, GetTaskLocation, GetGroupTaskClients, keepLoading , NewGroupTask, UpdateGroupTask} from '../../store/actions/TaskActions';
import { connect } from 'react-redux';
import { CardMedia } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { BASE_URL, MAPKEY } from '../../store/actions/AppConst';

import Geocode from "react-geocode";

 
import moment from 'moment';
 

//Tab Container
function TabContainer(props) {
	return (
	  <Typography component="div" style={{ padding: 8 * 3 }}>
		{props.children}
	  </Typography>
	);
  }
  
  TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
  };

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
	selectView: {
		paddingTop: 20,
		width: 400,
		marginLeft: 10
	},
	selectCityView: {
		display: 'flex',
		flexDirection: 'row',
		paddingTop: 20,
		width: '100%',
		marginLeft: 10,
		marginBottom: 20,
	},
	miniSelection:{
		paddingTop: 20,
		width: 220,
		marginRight: 10
	},
	clientSelection:{
		paddingTop: 20,
		width: 320,
		marginRight: 10
	},
	clientView:{
		paddingTop: 10,
		marginLeft: 10,
		marginRight: 10
	},
	mapContent:{
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
		height: 500,
		padding: 5,
	}, 
	group:{
		display: 'flex',
		flexDirection: 'column',
		width: 300,
    },
    
    formContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'left',
        padding: '5px',
        width: '100%'
    },
    
    title: {
        display: 'flex',
        width: '200px',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#838383',
        alignItems: 'center'
    },
    contentText: {
        display: 'flex',
        fontSize: 15,
        color: '#333333',
        alignItems: 'center'
	},
	attachmentImage: {
		display:'flex',
		width: 300,
		margin: 5,
		borderRadius: 10,
	}
});

class ViewTaskDetails extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			closed_address: 'Latitude and Longitude not found!'
		}

		Geocode.setApiKey(MAPKEY);
 
		// set response language. Defaults to english.
		Geocode.setLanguage("en");
		
		// set response region. Its optional.
		// A Geocoding request with region=es (Spain) will return the Spanish city.
		Geocode.setRegion("es");

	}

	onCodeToAddress = (lat, lng) => {

		Geocode.fromLatLng(lat, lng).then(
		  response => {
			const address = response.results[0].formatted_address;
			this.setState({closed_address: address});
		  },
		  error => {
			console.error(error);
		  }
		);
	
	  }
	  
	onTapBack = () => {
		this.props.onTapBack();
	};
     
    
    formComponent = (title, content) => {

        const { classes } = this.props;

        return (
            <div className={classes.formContainer}>
                <div className={classes.title}>{title}</div>
                <div className={classes.contentText} >{content}</div>
            </div>
        );

	}
	

	onDisplayAttachment = (id)  => {
 
		const { classes} = this.props;
		return(
			<div>
				<a href={`${BASE_URL+'uploads/task_proof_'+id+'.jpg'}`} target="_blank" download>
					<img alt="Attachment not Available!" className={classes.attachmentImage} src={`${BASE_URL+'uploads/task_proof_'+id+'.jpg'}`}/>
				 </a>
			</div>
		);

	}


	render() {

        const { classes } = this.props;
		const {id, title,description,deadline, assigned_emp, client_name, client_address,company_phone, contact_person, closed_lat, closed_lng } = this.props.current_task;
		
		if(closed_lat !== null && closed_lng !== null){
			this.onCodeToAddress(closed_lat, closed_lng);
		}

		return (
			<div>
                <CardBoard>
                    <Grid container className={classes.root} spacing={16}>
                        <Grid item xs={7}>
                            {this.formComponent("Task Title", title)}
                            {this.formComponent("Task Description", description)}
                            {this.formComponent("Client Name", client_name)}
                            {this.formComponent("Client Address", client_address)}
                            {this.formComponent("Content Person", contact_person)}
                            {this.formComponent("Contact Number", company_phone)}
                            {this.formComponent("Assigned Employee", assigned_emp)}   
							{this.formComponent("Task Date", moment(deadline).format('Do MMM YYYY'))}
							{this.formComponent("Task Closed At", this.state.closed_address)}   
                        </Grid>
                        <Grid item xs={5}>
                             {this.onDisplayAttachment(id)}
                        </Grid>
                    </Grid>

                </CardBoard>
			</div>
		);
	}
}

ViewTaskDetails.propTypes = {
	classes: PropTypes.object
};

const mapStateToProps = (state) => ({
	isAdded: state.taskReducer.isAdded,
	employee : state.taskReducer.utilities.employee,
	clients: state.taskReducer.utilities.clients,
	cities: state.taskReducer.cities,
	group_clients: state.taskReducer.group_clients
});

export default connect(mapStateToProps, { 
	NewTask, 
	DismissAlert, 
	GetTaskUtility, 
	UpdateTask,
	GetTaskCity, 
	GetTaskLocation, 
	GetGroupTaskClients, 
	keepLoading,
	NewGroupTask,
	UpdateGroupTask
 }) (withStyles(styles)(ViewTaskDetails));