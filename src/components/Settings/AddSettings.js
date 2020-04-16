import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CardBoard from '../Common/CardBoard';


// Icons
import BackIcon from '@material-ui/icons/ArrowBack';

// App Classes
import Alert from '../Common/Alert';

import { NewRegion, EditRegion, DismissAlert, GetPolicies, NewDesignation, EditDesignation, NewPolicy, EditPolicy } from '../../store/actions/SettingsActions';
import { connect } from 'react-redux';

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

class AddSettings extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			region_id: '',
			region_name: '',
			region_manager: '', 
			login_email: '',
			login_password: '',
			region_name: '',
			description: '',
			emp_id: '12',
			designation: '', 
			description: '',
			policy_id: '',
			policy: '',
			portal_access: false,
			app_access: false,
			track_user: false,
			add_user: false,
			view_user: false,
			add_task: false,
			view_task: false,
			reports: false,
		};
	}


	componentWillMount(){

		if(this.props.type === 'DESIGNATION'){
			this.props.GetPolicies('');
		}

		if(this.props.isEdit){
			const  {id,region,region_desc} = this.props.current_item;
			if(this.props.type === 'REGION'){
				this.setState({
					region_id: id,
					region_name: region,
					description: region_desc,
				});
			}else if(this.props.type === 'DESIGNATION'){
				//Edit Data {"id":"3","policy":"Portal Access Policy","designation":"Operation Head","description":"Operation Head","created":"2019-06-26","created_by":" "}
				const {id,policy,policy_id,designation,description} = this.props.current_item;
				this.setState({
					emp_id: id,
					designation: designation, 
					description: description,
					policy_id: policy_id,
					policy: policy,
				})
			}else if(this.props.type === 'POLICY'){
				//Edit Data {"id":"2","policy":"Some Policy","portal_access":true,"app_access":true,"track_user":true,"add_user":true,"view_user":true,"add_task":true,"view_task":true,"reports":false}
				const{id,policy,portal_access,app_access,track_user,add_user,view_user,add_task,view_task,reports} = this.props.current_item;

				this.setState({
					policy_id: id,
					policy: policy,
					portal_access: portal_access,
					app_access: app_access,
					track_user: track_user,
					add_user: add_user,
					view_user: view_user,
					add_task: add_task,
					view_task: view_task,
					reports: reports,
				});

			}

		}

	}

	//ALERT
	onDismiss = () => {
		this.setState({ showAlert: false });
		this.props.DismissAlert();
	};

	onOkay = () => {
		this.setState((state) => ({
			region_name: '',
			description: '',
			emp_id: '12',
		}));
		
		this.props.DismissAlert();
	};

	onTapBack = () => {
		this.props.onTapBack();
	};

	onTapAddNewRegion() {
 
		const { region_id, region_manager, login_email, login_password } = this.state;

		if(this.props.isEdit){
			this.props.EditRegion({  region_id, region_manager, login_email, login_password  });
		}else{
			this.props.NewRegion({  region_id, region_manager, login_email, login_password  });
		}
		
	}

	onTapAddNewDesignation() {
		const {  description,
        emp_id, designation,policy_id } = this.state;

		if(this.props.isEdit){
			this.props.EditDesignation({ designation,
				description,policy_id,
				emp_id  });
		}else{
			this.props.NewDesignation({ designation,
            description,policy_id,
			emp_id  });
		}
	}

	onTapAddNewPolicy() {

		const { policy_id ,policy,
		portal_access,
		app_access,
		track_user,
		add_user,
		view_user,
		add_task,
		view_task,
		reports,
		emp_id} = this.state;

		if(this.props.isEdit){
			this.props.EditPolicy({ 
				policy_id,
				policy,
				portal_access,
				app_access,
				track_user,
				add_user,
				view_user,
				add_task,
				view_task,
				reports });
		}else{
			this.props.NewPolicy({ policy,
				portal_access,
				app_access,
				track_user,
				add_user,
				view_user,
				add_task,
				view_task,
				reports, emp_id });
		}

	}

	handleTextChanges = (event) => {

		const value = event.target.value;
		this.setState({
			[event.target.name] : value
		});
	};

	handlePolicyChanges = (event) => {
		this.setState({
			policy_id: event.target.value
		});
	}

	onChangePortalAccess = () =>{
		const value = this.state.portal_access !== true ? true : false;
		this.setState({
			portal_access: value
		});
	}

	onChangeAppAccess = () =>{
		const value = this.state.app_access !== true ? true : false;
		this.setState({
			app_access: value
		});
	}

	onChangeTrackUser = () =>{
		const value = this.state.track_user !== true ? true : false;
		this.setState({
			track_user: value
		});
	}

	onChangeAddUser = () =>{
		const value = this.state.add_user !== true ? true : false;
		this.setState({
			add_user: value
		});
	}

	onChangeViewUser = () =>{
		const value = this.state.view_user !== true ? true : false;
		this.setState({
			view_user: value
		});
	}

	onChangeAddTask = () =>{
		const value = this.state.add_task !== true ? true : false;
		this.setState({
			add_task: value
		});
	}

	onChangeViewTask = () =>{
		const value = this.state.view_task !== true ? true : false;
		this.setState({
			view_task: value
		});
	}

	onChangeReports = () =>{
		const value = this.state.reports !== true ? true : false;
		this.setState({
			reports: value
		});
	}
	


	


	//Add Region
	addNewRegionUI = () => {
		const { classes } = this.props;
		const { region_name,
		region_id, region_manager, login_email, login_password } = this.state;
		

		return(<view className={classes.formControl}>
				<view className={classes.textFields}>
				
					<TextField
							name="region_name"
							label="Region Name"
							style={{width: 180,  marginTop: 0, marginRight: 20}}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={region_name}
						/>
							
				</view>

				<view className={classes.textFields}>
				
					<TextField
							name="region_id"
							label="Region ID"
							style={{width: 180,  marginTop: 0, marginRight: 20}}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={region_id}
						/>
							
				</view>

				<view className={classes.textFields}>
				
					<TextField
							name="region_manager"
							label="Region Manager Name"
							style={{width: 180,  marginTop: 0, marginRight: 20}}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={region_manager}
						/>
							
				</view>

				<view className={classes.textFields}>
				
					<TextField
							name="login_email"
							label="Login Email ID"
							style={{width: 180,  marginTop: 0, marginRight: 20}}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={login_email}
						/>
							
				</view>

				<view className={classes.textFields}>
				
					<TextField
							name="login_password"
							label="Login Password"
							style={{width: 180,  marginTop: 0, marginRight: 20}}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={login_password}
						/>
							
				</view>

				<view className={classes.textFields}>
							<Button
								variant="contained"
								color="primary"
								onClick={this.onTapAddNewRegion.bind(this)}
								className={classes.button}
							>
								Add Region Manager
							</Button>
			
				</view>	

	</view>);

 
	};

	//Add Designation
	addNewDesignationUI = () => {
		const { classes, policies } = this.props;
		const { designation, description
         } = this.state;


			return(<view className={classes.formControl}>
				<view className={classes.textFields}>
						<TextField
							name="designation"
							label="Designation"
							style={{width: 180,  marginTop: 0, marginRight: 20}}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={designation}
						/>
							
				</view>

				<view className={classes.textFields}>

						<TextField
							name="description"
							label="Description"
							style={{ width: '100%',marginTop: 0}}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={description}
						/>
						
				
				</view>

				<view className={classes.textFields}>
					<NativeSelect
							style={{width: 200, height: 48, marginTop: 0, marginRight: 20}}
							required="true"
							onChange={this.handlePolicyChanges.bind(this)}
						>
								<option value="" disabled selected>
									Select Policy
								</option>
								{policies !== undefined && policies.map( (item) => {
									return (<option value={item.id}>{item.policy}</option>);
								})}		

						</NativeSelect>
				</view>

				<view className={classes.textFields}>
						<Button
							variant="contained"
							color="primary"
							onClick={this.onTapAddNewDesignation.bind(this)}
							className={classes.button}
						>
							Add Designation
						</Button>
				</view>	

			</view>);

		 
	};

	//Add Settings UI
	addNewPolicyUI = () => {
		
			const { classes } = this.props;
			const { policy,
				portal_access,
				app_access,
				track_user,
				add_user,
				view_user,
				add_task,
				view_task,
				reports,
				description
			} = this.state;
		 

			return(<view className={classes.formControl}>
				<view className={classes.textFields}>

					<TextField
						name="policy"
						label="Policy Title"
						style={{width: 320,  marginTop: 0, marginRight: 20}}
						type="text"
						required="true"
						margin="normal"
						onChange={this.handleTextChanges.bind(this)}
						value={policy}
					/>
							
				</view>


				<view className={classes.textFields}>
							<FormControlLabel
								control={
									<Switch checked={this.state.portal_access} onChange={ () =>
										this.setState({
											portal_access: !this.state.portal_access
										})
									} value={this.state.portal_access} />
								}
								label="Portal Access"
							/>

							<FormControlLabel
								control={
									<Switch checked={this.state.app_access} onChange={ () =>
										this.setState({
											app_access: !this.state.app_access
										})
									} value={this.state.app_access} />
								}
								label="App Access"
							/>

							<FormControlLabel
								control={
									<Switch checked={this.state.track_user} onChange={ () =>
										this.setState({
											track_user: !this.state.track_user
										})
									} value={this.state.track_user} />
								}
								label="Track User"
							/>


						</view>

						<view className={classes.textFields}>

							<FormControlLabel
								control={
									<Switch checked={this.state.add_user} onChange={ () =>
										this.setState({
											add_user: !this.state.add_user
										})
									} value={this.state.add_user} />
								}
								label="Add User"
							/>

							<FormControlLabel
								control={
									<Switch checked={this.state.view_user} onChange={ () =>
										this.setState({
											view_user: !this.state.view_user
										})
									} value={this.state.view_user} />
								}
								label="View User"
							/>

							<FormControlLabel
								control={
									<Switch checked={this.state.delete_user} onChange={() => {
										this.setState({
											delete_user: !this.state.delete_user
										})
									}} value={this.state.delete_user} />
								}
								label="Delete User"
							/>
							
							<FormControlLabel
								control={
									<Switch checked={this.state.add_task} onChange={ () =>
										this.setState({
											add_task: !this.state.add_task
										})
									} value={this.state.add_task} />
								}
								label="Add Task Access"
							/>
						</view>

						<view className={classes.textFields}>

							<FormControlLabel
								control={
									<Switch checked={this.state.view_task} onChange={ () =>
										this.setState({
											view_task: !this.state.view_task
										})										
									} value={this.state.view_task} />
								}
								label="View Task Access"
							/>

							<FormControlLabel
								control={
									<Switch checked={this.state.reports} onChange={ () =>
										this.setState({
											reports: !this.state.reports
										})
									} value={this.state.reports} />
								}
								label="Report Access"
							/>

				</view>

				<view className={classes.textFields}>
							<Button
								variant="contained"
								color="primary"
								onClick={this.onTapAddNewPolicy.bind(this)}
								className={classes.button}
							>
								Add Policy
							</Button>
			
				</view>	

			</view>);

		 }; 

	onOkayForError = () =>{
		this.setState({ showAlert: false });
	}
 

	render() {

		const { classes, type } = this.props;
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
						{type === "REGION" && this.addNewRegionUI()}
						{type === "DESIGNATION" && this.addNewDesignationUI()}
						{type === "POLICY" && this.addNewPolicyUI()}
						</CardBoard>
					</Grid>
					<Grid item xs={3}>
					</Grid>
					 
				</Grid>

			</div>
		);

	}
}

AddSettings.propTypes = {
	classes: PropTypes.object
};

const mapStateToProps = (state) => ({
	isAdded: state.settingsReducer.isAdded,
	policies: state.settingsReducer.policies
});

export default connect(mapStateToProps, { NewRegion, EditRegion, DismissAlert, GetPolicies, NewDesignation,EditDesignation, NewPolicy, EditPolicy }) (withStyles(styles)(AddSettings));
