import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CardBoard from '../Common/CardBoard';
import chroma from 'chroma-js';

import Select from 'react-select';

// App Classes
import Alert from '../Common/Alert';
import CardDiv from '../Common/CardDiv';
import EmployeeIcon from '@material-ui/icons/SupervisorAccount';


import { NewTask, DismissAlert, GetTaskUtility, UpdateTask, GetTaskCity, GetTaskLocation, GetGroupTaskClients, keepLoading , NewGroupTask, UpdateGroupTask} from '../../store/actions/TaskActions';
import { connect } from 'react-redux';
import { NativeSelect } from '@material-ui/core';
import { AsyncSeriesWaterfallHook } from 'tapable';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

//New Import 
import { Doughnut, Bar } from 'react-chartjs-2';





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
	visualReport: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: 10
	}
});

class ProgressReport extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
				 
		};
	}
 

	onTapBack = () => {
		this.props.onTapBack();
	};
 
 
	onDisplayBarChart = (task) => {
		
		const { emp, ratio } = task;


		const myData = {
			labels: emp,
			datasets: [
			{
				label: 'This Month Progress',
				backgroundColor: '#53A575',
				hoverBackgroundColor: 'rgba(255,99,132,0.4)',
				hoverBorderColor: 'rgba(255,99,132,1)',
				data: ratio
			}
			]
		};

		 

		return <Bar
			type="bar"
			data={myData}
			width={100}
			height={50}
			options={{ maintainAspectRatio: true , scales: {
				yAxes: [{
				  ticks: {
					beginAtZero: true
				  }
				}]
			  }}}
		/>
	}

	onDisplayDoughnut = (ratio) => {

		const { pending, completed,inprogress,followup} = ratio;
 
		const completionProgress = {
			labels: [
				'Pending',
				'Work In Progress',
				'Completed',
				'Followup'
			],
			datasets: [{
				data: [pending,inprogress,completed,followup],
				backgroundColor: [
				'#D35A5A',
				'#DEC942',
				'#7EC058',
				'#636BA9'
				],
				hoverBackgroundColor: '#51D6D2'
			}]
		};

		return <Doughnut data={completionProgress} />


	}



	render() {
		const { classes, ratio, task } = this.props;
		const { showAlert, title, msg , value } = this.state;

		return (
			<div className={classes.visualReport}>
				<Grid container className={classes.root} spacing={16}>
                        <Grid item xs={6}>
							{this.onDisplayDoughnut(ratio)}
                        </Grid>
                        <Grid item xs={6}>
							{this.onDisplayBarChart(task)}
                        </Grid>
                    </Grid>
 
			</div>
		);
	}
}

ProgressReport.propTypes = {
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
 }) (withStyles(styles)(ProgressReport));