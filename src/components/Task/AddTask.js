import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// Icons
import BackIcon from '@material-ui/icons/ArrowBack';

// App Classes
import Alert from '../Common/Alert';

import { NewTask, DismissAlert, GetTaskUtility } from '../../store/actions/TaskActions';
import { connect } from 'react-redux';
import { NativeSelect } from '@material-ui/core';
import { AsyncSeriesWaterfallHook } from 'tapable';

// CSS Module
const styles = (theme) => ({
	root: {
		width: '90%'
	},
	groupForm: {
		width: '100%',
		flexDirection: 'column'
	},
	formContent: {
		width: '45%',
		backgroundColor: '#66ffcc',
		display: 'flex'
	},
	button: {
		marginTop: theme.spacing.unit * 5,
		marginRight: theme.spacing.unit
	},

	input: {
		display: 'none'
	},
	actionsContainer: {
		marginTop: 30,
		marginBottom: theme.spacing.unit * 2
	},
	resetContainer: {
		padding: theme.spacing.unit * 3
	},
	formControl: {
		width: '50%',
		backgroundColor: '#663354',
		display: 'flex',
		margin: theme.spacing.unit
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 300
	},
	formInputs: {
		width: '90%',
		backgroundColor: '#FF3322',
		flexDirection: 'row'
	},
	groupInputs: {
		width: '90%',
		backgroundColor: '#dd6655'
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2,
		marginLeft: 10
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	},
	btnRightA: {
		position: 'absolute',
		top: theme.spacing.unit * 20,
		right: theme.spacing.unit * 10
	}
});

class AddTask extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			client_id: '',
				company_address: '',
				contact_person_name: '',
				company_phone: '',
				task_description: '',
				employee_id: '',
				task_priority: 0,
				location: '',
				meeting_date: '',
				pp_date: '',
				employee_name: '',
				employee_designation: '',
				client_name: '',
				client_address: '',
				task_status: '',
				remarks: '',
				assign_lat: '1',
				assign_lng: '1',
			 
		};
	}


	componentWillMount(){
		this.props.GetTaskUtility('');
	}

	onChangeAndroid = () => {
		const value = this.state.android !== true ? true : false;
		this.setState({
			android: value
		});
	};

	onChangeiOS = () => {
		const value = this.state.ios !== true ? true : false;
		this.setState({
			ios: value
		});
	};

	onChangeMsite = () => {
		const value = this.state.msite !== true ? true : false;
		this.setState({
			msite: value
		});
	};

	//ALERT
	onDismiss = () => {
		this.setState({
				title: '',
				client_id: '',
				company_address: '',
				contact_person_name: '',
				company_phone: '',
				task_description: '',
				employee_id: '',
				task_priority: 0,
				location: '',
				meeting_date: '',
				pp_date: '',
				employee_name: '',
				employee_designation: '',
				client_name: '',
				client_address: '',
				task_status: '',
				remarks: '',
				assign_lat: '1',
				assign_lng: '1',
				showAlert: false
		});
		this.props.DismissAlert();
	};

	onOkay = () => {
		this.setState((state) => ({
			title: '',
			client_id: '',
			company_address: '',
			contact_person_name: '',
			company_phone: '',
			task_description: '',
			employee_id: '',
			task_priority: 0,
			location: '',
			meeting_date: '',
			pp_date: '',
			employee_name: '',
			employee_designation: '',
			client_name: '',
			client_address: '',
			task_status: '',
			remarks: '',
			assign_lat: '1',
			assign_lng: '1',
			showAlert: false
		}));
		
		this.props.DismissAlert();
	};

	onTapBack = () => {
		this.props.onTapBack();
	};

	onTapAddNewTask() {

		const { 
			title,
			client_id,
			contact_person_name,
			company_phone,
			task_description,
			employee_id,
			task_priority,
			location,
			meeting_date,
			client_address,
			remarks,
			assign_lat,
			assign_lng,
		 } = this.state;
 
		this.props.NewTask({ title,
			client_id,
			contact_person_name,
			company_phone,
			task_description,
			employee_id,
			task_priority,
			location,
			meeting_date,
			client_address,
			remarks,
			assign_lat,
			assign_lng, });
	}

	handleTextChanges = (event) => {

		if (event.target.id === 'title') {
			this.setState({ title: event.target.value });
		}else if (event.target.id === 'contact_person_name') {
			this.setState({ contact_person_name: event.target.value });
		}else if (event.target.id === 'company_phone') {
			this.setState({ company_phone: event.target.value });
		}else if (event.target.id === 'task_description') {
			this.setState({ task_description: event.target.value });
		}else if (event.target.id === 'location') {
			this.setState({ location: event.target.value });
		}else if (event.target.id === 'meeting_date') {
			this.setState({ meeting_date: event.target.value });
		}else if (event.target.id === 'client_address') {
			this.setState({ client_address: event.target.value });
		}else if (event.target.id === 'remarks') {
			this.setState({ remarks: event.target.value });
		}
		
	};

	onHandleClient = (event) => {
		const { clients } = this.props;
		let client = clients.find(u => u.id === event.target.value);

		this.setState({
			client_id: client.id,
			client_address: client.address,
			company_phone: client.contact_number,

		});
	}

	onHandleEmployee = (event) => {

		const { employee } = this.props;
		let user = employee.find(u => u.id === event.target.value);
		this.setState({
			employee_id: user.id,
			employee_designation: user.designation
		});
	}
	
	onHandlePriority = (event) => {
		this.setState({
			task_priority: event.target.value
		});
	}
	
	//Add Partner
	addNewTaskUI = () => {
		const { classes, employee, clients } = this.props;
		const { title,
				contact_person_name,
				company_phone,
				task_description,
				location,
				meeting_date,
				employee_designation,
				client_address,
				remarks,
				} = this.state;

		return (
			<Grid container spacing={24}>
				<Grid item xs={6}>
					<FormControl>
						<TextField
							id="title"
							label="Task Title"
							className={classes.textField}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={title}
						/>

						<TextField
							id="task_description"
							label="Description"
							className={classes.textField}
							type="text"
							multiline
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={task_description}
						/> 

						<TextField
							id="meeting_date"
							label="Meeting Date"
							className={classes.textField}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={meeting_date}
						/>

						

						<NativeSelect
							className={classes.selectEmpty}
							required="true"
							onChange={this.onHandleClient.bind(this)}
						>
							<option value="" disabled selected>
								Select Client
							</option>
							{clients !== undefined && clients.map( (item) => {
								return (<option value={item.id}>{item.name}</option>);
							})}

						</NativeSelect>
						

						<TextField
							id="client_address"
							label="Company Address"
							className={classes.textField}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={client_address}
						/>

						<TextField
							id="company_phone"
							label="Company Phone"
							className={classes.textField}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={company_phone}
						/>

						<TextField
							id="contact_person_name"
							label="Contact Person"
							className={classes.textField}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={contact_person_name}
						/>
 
 						<TextField
							id="location"
							label="location"
							className={classes.textField}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={location}
						/> 

						<NativeSelect
							className={classes.selectEmpty}
							required="true"
							onChange={this.onHandleEmployee.bind(this)}
						>
							<option value="" disabled selected>
								Select Assign To
							</option>
							{employee !== undefined && employee.map( (item) => {
								
								return (<option value={item.id}>{item.name+' ['+ item.emp_id+']'}</option>);
							})}

						</NativeSelect>

						<TextField
							id="designation"
							disabled
							className={classes.textField}
							type="text"
							value={employee_designation}
						/> 
						<NativeSelect
							className={classes.selectEmpty}
							required="true"
							onChange={this.onHandlePriority.bind(this)}
						>
							<option value="" disabled selected>
								Select Priority
							</option>
							<option value="0">Low</option>
							<option value="1">Medium</option>
							<option value="2">High</option>
							<option value="3">Urgent</option>

						</NativeSelect>

						<TextField
							id="remarks"
							label="Remarks"
							className={classes.textField}
							type="text"
							multiline
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={remarks}
						/> 
 

						<Button
							variant="contained"
							color="primary"
							onClick={this.onTapAddNewTask.bind(this)}
							className={classes.button}
						>
							Add Task
						</Button>
					</FormControl>
				</Grid>
			</Grid>
		);
	};

	render() {
		const { classes } = this.props;
		const { showAlert, title, msg } = this.state;

		return (
			<div className={classes.root}>
				<Button
					variant="extendedFab"
					color="secondary"
					className={classes.btnRightA}
					onClick={this.onTapBack.bind(this)}
				>
					Back <BackIcon className={classes.rightIcon} />
				</Button>

				<Alert
					open={this.props.isAdded}
					onCancel={this.onOkay.bind(this)}
					onOkay={this.onOkay.bind(this)}
					title={"Add New Task"}
					msg={"Successfully Added Task"}
				/>

				<Alert
					open={showAlert}
					onCancel={this.onOkay.bind(this)}
					onOkay={this.onOkay.bind(this)}
					title={title}
					msg={msg}
				/>

				{this.addNewTaskUI()}
			</div>
		);
	}
}

AddTask.propTypes = {
	classes: PropTypes.object
};

const mapStateToProps = (state) => ({
	isAdded: state.taskReducer.isAdded,
	employee : state.taskReducer.utilities.employee,
	clients: state.taskReducer.utilities.clients
});

export default connect(mapStateToProps, { NewTask, DismissAlert, GetTaskUtility }) (withStyles(styles)(AddTask));
