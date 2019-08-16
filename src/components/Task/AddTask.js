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

// Icons
import BackIcon from '@material-ui/icons/ArrowBack';

// App Classes
import Alert from '../Common/Alert';

import { NewTask, DismissAlert, GetTaskUtility, UpdateTask } from '../../store/actions/TaskActions';
import { connect } from 'react-redux';
import { NativeSelect } from '@material-ui/core';
import { AsyncSeriesWaterfallHook } from 'tapable';

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

class AddTask extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
				task_id: '',
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

		if(this.props.isEdit){
			const {
				id,title,appointment_date, assigned_emp,emp_id,client_name,client_id,client_address,contact_person, company_phone,description,remarks,assign_lat,assign_lng
			} = this.props.current_task;

			this.setState({
				task_id: id,
				title: title,
				client_id: client_id,
				company_address: client_address,
				contact_person_name: contact_person,
				company_phone: company_phone,
				task_description: description,
				employee_id: emp_id,
				task_priority: 0,
				meeting_date: appointment_date,
				employee_name: assigned_emp,
				client_name: client_name,
				client_address: client_address,
				remarks: remarks,
				assign_lat: assign_lat,
				assign_lng: assign_lng,
			})
		}


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
			task_id,
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
 
		 if(this.props.isEdit){
			this.props.UpdateTask({ 
				task_id,
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
				assign_lng, });
		 }else{
			this.props.NewTask({ 
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
				assign_lng, });
		 }
		
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
			assign_lat: client.lat,
			assign_lng: client.lng
		});

		console.log('Selected Data '+ JSON.stringify(client));

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
	
	onOkayForError = () =>{
		this.setState({ showAlert: false });
	}



	displayTextContent = () => {

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


		return(<view className={classes.formControl}>
					<view className={classes.textFields}>
						<NativeSelect
							style={{width: 220, height: 48, marginTop: 0, marginRight: 20}}
							required="true"
							onChange={this.onHandleClient.bind(this)}
						>
							<option value="" disabled selected>
								Select Client Name
							</option>
							{clients !== undefined && clients.map( (item) => {
								return (<option value={item.id}>{item.name}</option>);
							})}

						</NativeSelect>
						</view>

						<view className={classes.textFields}>

							<TextField
								id="client_address"
								label="Company Address"
								style={{ width: '100%',marginTop: 0}}
								rows="2"
								type="text"
								required="true"
								margin="normal"
								onChange={this.handleTextChanges.bind(this)}
								value={client_address}
							/>
						
						</view>

						<view className={classes.textFields}>
							<TextField
								id="company_phone"
								label="Company Phone"
								style={{width: 180,  marginTop: 0, marginRight: 20}}
								type="text"
								required="true"
								margin="normal"
								onChange={this.handleTextChanges.bind(this)}
								value={company_phone}
							/>

							<TextField
								id="contact_person_name"
								label="Contact Person"
								style={{width: 220, marginTop: 0, marginRight: 20}}
								type="text"
								required="true"
								margin="normal"
								onChange={this.handleTextChanges.bind(this)}
								value={contact_person_name}
							/>

						
					</view>	

					<view className={classes.textFields}>

						<TextField
								id="title"
								label="Task Title"
								style={{ width: '100%',marginTop: 0}}
								rows="2"
								type="text"
								required="true"
								margin="normal"
								onChange={this.handleTextChanges.bind(this)}
								value={title}
							/>
						</view>	
					
					<view className={classes.textFields}>
						<TextField
							id="task_description"
							label="Description"
							style={{ width: '100%',marginTop: 0}}
							rows="4"
							type="text"
							multiline
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={task_description}
						/> 
						
					</view>

					<view className={classes.textFields}>
							<TextField
								id="remarks"
								label="Remarks"
								style={{ width: '100%',marginTop: 0}}
								rows="2"
								type="text"
								multiline
								required="true"
								margin="normal"
								onChange={this.handleTextChanges.bind(this)}
								value={remarks}
							/> 
					</view>


					<view className={classes.textFields}>
							<TextField
								id="meeting_date"
								label="Meeting Date"
								style={{width: 160,  marginTop: 0, marginRight: 20}}
								type="date"
								required="true"
								margin="normal"
								onChange={this.handleTextChanges.bind(this)}
								value={meeting_date}
							/>
							<NativeSelect
								style={{width: 200,height: 48,  marginTop: 0, marginRight: 20}}
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

						<NativeSelect
								style={{width: 200,height: 48 , marginTop: 0, marginRight: 20}}
								required="true"
							onChange={this.onHandleEmployee.bind(this)}
						>
							<option value="" disabled selected>
								Assign To
							</option>
							{employee !== undefined && employee.map( (item) => {
								return (<option value={item.id}>{item.name+' ['+ item.emp_id+']'}</option>);
							})}

						</NativeSelect>

					</view>
					
					<view className={classes.textFields}>
						<Button
							variant="contained"
							color="primary"
							onClick={this.onTapAddNewTask.bind(this)}
							className={classes.button}
						>
							Add Task
						</Button>
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
					title={"Add New Task"}
					msg={"Task Added Successfully!"}
				/>


				<Alert
					open={showAlert}
					onCancel={this.onOkayForError.bind(this)}
					onOkay={this.onOkayForError.bind(this)}
					title={title}
					msg={msg}
				/>
				
				<Grid container spacing={24}>
					<Grid item xs={3}>
					</Grid>

					<Grid item xs={6}>
						<CardBoard>
							{this.displayTextContent()}
						</CardBoard>
					</Grid>
					<Grid item xs={3}>
					</Grid>
					 
				</Grid>

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

export default connect(mapStateToProps, { NewTask, DismissAlert, GetTaskUtility, UpdateTask }) (withStyles(styles)(AddTask));