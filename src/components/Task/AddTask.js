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

import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 

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
});

class AddTask extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
				value: 0,
				task_id: '',
				group_id: '',
				title: '',
				client_id: '',
				company_address: '',
				contact_person_name: '',
				company_phone: '',
				task_description: '',
				employee_id: '',
				employee_code: '',
				task_priority: "0",
				location: '',
				meeting_date: new Date(),
				start_date: new Date(),
				end_date: new Date(),
				pp_date: '',
				employee_name: '',
				employee_designation: '',
				client_name: '',
				client_address: '',
				task_status: '',
				remarks: '',
				assign_lat: '1',
				assign_lng: '1',
				selectedOption: null,
				selectedCity: null,
				city_id: '',
				selectedRepresentative: null,
				available_clients: null,
				current_clients: null,
				isReset: false,
				grouped: false,
		};
	}

	componentWillMount(){

		this.props.GetTaskCity('');

		if(this.props.isEdit){
			const {
				id,title,assigned_emp,emp_id,client_name,client_id,client_address,contact_person, company_phone,description,remarks, group_id, grouped,
				deadline,
				priority
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
				task_priority: priority,
				meeting_date: new Date(deadline),
				employee_name: assigned_emp,
				client_name: client_name,
				client_address: client_address,
				remarks: remarks,
				group_id: group_id,
				grouped: grouped
			})
			
		}

	}
	
	handleChange = selectedOption => {
		this.setState({ selectedOption });

		const { id } = selectedOption;

		const { clients } = this.props;
		let client = clients.find(u => u.id === id);

		this.setState({
			client_id: client.id,
			client_address: client.primary_address,
			company_phone: client.phone,
			contact_person_name: client.contact_person,
			assign_lat: client.lat,
			assign_lng: client.lng,
			employee_id: client.emp_id,
			employee_name: client.emp_name,
			employee_code: client.emp_id
		});
	  };

	  handleCityChange = selectedCity => {
		
		this.props.keepLoading();
		
		const { id, label } = selectedCity;
		this.setState({ selectedCity, city_id: id, current_clients: null, available_clients: null });
		if(this.state.value > 0){
			this.props.GetGroupTaskClients({id: id})
		}else{
			this.props.GetTaskUtility({id : id});
		}
	  };

 
	  handleTabChange = (event, value) => {
		this.setState({ value });
	  };

	  handleChangeRepresentative = selectedRepresentative => {

		this.setState({ available_clients: null });

		const available_clients =  selectedRepresentative.clients;
		const employee_id = selectedRepresentative.emp_id;

		this.setState({ selectedRepresentative,available_clients, employee_id});

	  };

	  handleMultipleSelect = multipleSelect => {

		this.setState({current_clients: multipleSelect});

	  };

	  handleCheckChange = name => event => {
		this.setState({ [name]: event.target.checked });
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

		this.props.onTapBack();
	};

	onOkay = () => {
		this.setState((state) => ({
			title: '',
			client_id: '',
			company_address: '',
			contact_person_name: '',
			company_phone: '',
			task_description: '',
			task_priority: 0,
			location: '',
			pp_date: '',
			employee_name: '',
			employee_designation: '',
			client_name: '',
			client_address: '',
			task_status: '',
			remarks: '',
			assign_lat: '1',
			assign_lng: '1',
			showAlert: false,
			available_clients: null,
			current_clients: null ,
			selectedRepresentative: null 

		}));
		
		this.props.DismissAlert();
 		this.props.onTapBack();
	};

	onTapBack = () => {
		this.props.onTapBack();
	};

	onTapAddNewTask() {

		const { 
			task_id,
			title,
			client_id,
			task_description,
			employee_id,
			task_priority,
			meeting_date,
			city_id,
			grouped,
			group_id
		 } = this.state;
 
		 if(this.props.isEdit){
			 if(grouped){
				this.props.UpdateGroupTask({
					title,
					group_id,
					task_description,
					task_priority,
					meeting_date,
				});
			 }else{
				this.props.UpdateTask({ 
					task_id,
					title,
					client_id,
					city_id,
					task_description,
					employee_id,
					task_priority,
					meeting_date,
					});
			 }
			
		 }else{
			this.props.NewTask({ 
				title,
				client_id,
				city_id,
				task_description,
				employee_id,
				task_priority,
				meeting_date,
			 });
		 }
		
	}

	onTapAddNewGroupTask() {

		const { 
			title,
			task_description,
			employee_id,
			task_priority,
			start_date,
			end_date,
			current_clients
		 } = this.state;
 
		this.props.NewGroupTask({ 
			title,
			task_description,
			employee_id,
			task_priority,
			start_date,
			end_date,
			current_clients
			});
 		
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
		}else if (event.target.id === 'start_date') {
			this.setState({ start_date: event.target.value });
		}else if (event.target.id === 'end_date') {
			this.setState({ end_date: event.target.value });
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

	} 
 
	
	onHandlePriority = (event) => {
		this.setState({
			task_priority: event.target.value
		});
	}
	
	onOkayForError = () =>{
		this.setState({ showAlert: false });
	}



	handleMeetingDateChange = date => {
		this.setState({
			meeting_date: date
		});
	};


	handleStartGroupDateChange = date => {
		this.setState({
			start_date: date
		});
	};


	handleEndGroupDateChange = date => {
		this.setState({
			end_date: date
		});
	};




	displayTextContent = () => {

		const { classes, employee, clients, cities } = this.props;

		const { selectedOption, selectedCity, employee_id, employee_name , employee_code } = this.state;

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

				 

		const assigned_emp = employee_id !== null ? `${employee_code} ${employee_name}` : "Not Available for This Client"
 
		return(<view className={classes.formControl}>

						{this.props.isEdit !== true && (
								<view className={classes.selectCityView}>
									<view className={classes.miniSelection}>
										<Select
												value={selectedCity}
												onMenuOpen={() => {
													this.setState({selectedOption: null, selectedCity: null});  
												}}
												onChange={this.handleCityChange}
												options={cities}
										/>
									</view>
									{selectedCity !== null &&  <view className={classes.clientSelection}>
										<Select
											value={selectedOption}
											onChange={this.handleChange}
											options={clients}
										/>
									</view>}
									
								</view>
						)}

						<view className={classes.textFields}>

							<TextField
								id="client_address"
								label="Company Address"
								disabled
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
								disabled
								style={{width: 180,  marginTop: 0, marginRight: 20}}
								type="text"
								required="true"
								margin="normal"
								onChange={this.handleTextChanges.bind(this)}
								value={company_phone}
							/>

							<TextField
								id="contact_person_name"
								disabled
								label="Contact Person"
								style={{width: 220, marginTop: 0, marginRight: 20}}
								type="text"
								required="true"
								margin="normal"
								onChange={this.handleTextChanges.bind(this)}
								value={contact_person_name}
							/>

							<TextField
								id="title"
								disabled
								label="Representative Assigned"
								style={{ width: 240,marginTop: 0}}
								rows="2"
								type="text"
								required="true"
								margin="normal"
								value={assigned_emp}
							/>

						
					</view>	

					 

					<view className={classes.textFields}>

						<TextField
								id="title"
								label="Task Title"
								disabled = {employee_id == null}
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
							disabled = {employee_id == null}
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

							<div>
								<div className={classes.dateText}>
									Meeting Date
								</div>
								<DatePicker
									className={classes.dateInput}
									selected={meeting_date}
									onChange={this.handleMeetingDateChange}
								/>
							</div>
  
							<FormLabel component="legend">Priority</FormLabel>
							<RadioGroup
								aria-label="priority"
								name="priority"
								className={classes.group}
								value={this.state.task_priority}
								onChange={this.onHandlePriority.bind(this)}
							>
							<FormControlLabel value="0" control={<Radio selected />} label="Low" />
							<FormControlLabel value="1" control={<Radio />} label="Medium" />
							<FormControlLabel value="2" control={<Radio />} label="High" />
							<FormControlLabel value="3" control={<Radio />} label="Urgent" />
									
							</RadioGroup>
 
					</view>
					
					<view className={classes.textFields}>
						<Button
							variant="contained"
							color="primary"
							disabled = {employee_id == null}
							onClick={this.onTapAddNewTask.bind(this)}
							className={classes.button}
						>

							{this.props.isEdit ? 'Edit Task' : 'Add Task'}

						</Button>
					</view>

			</view>);

	}


	groupTaskAddUI = () => {

		const { classes, employee, clients, cities, group_clients } = this.props;

		const { selectedOption, selectedCity, employee_id, employee_name ,isReset, employee_code,selectedRepresentative, available_clients, start_date, end_date } = this.state;

		// console.log(available_clients);

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

		const assigned_emp = employee_id !== null ? `${employee_code} ${employee_name}` : "Not Available for This Client"
 
		return(<view className={classes.formControl}>


						<view className={classes.selectCityView}>
							<div className={classes.miniSelection}>
								<Select
									
									value={selectedCity}
									onChange={this.handleCityChange}
									onMenuOpen={() => {
										this.setState({selectedRepresentative: null});  
									}}
									
									options={cities}
								/>
							</div>
							{group_clients !== null && 
								<div className={classes.miniSelection}>
									<Select
										
										value={selectedRepresentative}
										onChange={this.handleChangeRepresentative}
										onMenuOpen={() => {
											this.setState({available_clients: null, current_clients: null});  
										}}
										options={group_clients}
									/>
								</div>
							}
							
						</view>
						 
						{available_clients !== null && (
								<view className={classes.clientView}>

								<Select
									closeMenuOnSelect={false}
									defaultValue={[]}
									onChange={this.handleMultipleSelect}
									isMulti
									options={available_clients}
								/>
	
							</view>	
						)}
						
 
					<view className={classes.textFields}>

						<TextField
								id="title"
								label="Task Title"
								disabled = {employee_id == null}
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
							disabled = {employee_id == null}
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

							<div>
								<div className={classes.dateText}>
									Start Date
								</div>
								<DatePicker
									className={classes.dateInput}
									selected={start_date}
									onChange={this.handleStartGroupDateChange}
								/>
							</div>

							<div>
								<div className={classes.dateText}>
									End Date
								</div>
								<DatePicker
									className={classes.dateInput}
									selected={end_date}
									onChange={this.handleEndGroupDateChange}
								/>
							</div>

							 
							<NativeSelect
								disabled = {employee_id == null}
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

					 
					</view>
					
					<view className={classes.textFields}>
						<Button
							variant="contained"
							color="primary"
							disabled = {employee_id == null}
							onClick={this.onTapAddNewGroupTask.bind(this)}
							className={classes.button}
						>
							Add Task
						</Button>
					</view>


			</view>);
	}


	render() {
		const { classes } = this.props;
		const { showAlert, title, msg , value } = this.state;

		return (
			<div>
				
				 
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

				{this.props.isEdit !== true ? (
						<div>
								<Tabs
								value={value}
								onChange={this.handleTabChange}
								scrollable
								scrollButtons="on"
								indicatorColor="secondary"
								textColor="secondary"
								>
								<Tab label="Add Task" icon={<EmployeeIcon />} />
								<Tab label="Add Group Task" icon={<EmployeeIcon />} />
								</Tabs>

								{value === 0 && (
								<TabContainer>
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
								</TabContainer>
								)}
								{value === 1 && ( 
								<TabContainer>
									<Grid container spacing={24}>
										<Grid item xs={3}>
										</Grid>
										<Grid item xs={6}>
											<CardBoard>
												{this.groupTaskAddUI()}
											</CardBoard>
										</Grid>
										<Grid item xs={3}>
										</Grid>
									</Grid>
								</TabContainer>
								)}
						</div>
				) : (
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
				)}
 
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
 }) (withStyles(styles)(AddTask));