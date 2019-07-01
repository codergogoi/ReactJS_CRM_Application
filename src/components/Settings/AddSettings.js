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

// Icons
import BackIcon from '@material-ui/icons/ArrowBack';

// App Classes
import Alert from '../Common/Alert';

import { NewRegion, DismissAlert, GetPolicies, NewDesignation, NewPolicy  } from '../../store/actions/SettingsActions';
import { connect } from 'react-redux';

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

class AddSettings extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
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
		const {  description,
        emp_id, designation } = this.state;

		this.props.NewRegion({ designation,
				description,
				emp_id  });
	}

	onTapAddNewDesignation() {
		const { description,
        emp_id, designation,policy_id } = this.state;

		this.props.NewDesignation({ designation,
            description,policy_id,
			emp_id  });
	}

	onTapAddNewPolicy() {
		const { policy,
		portal_access,
		app_access,
		track_user,
		add_user,
		view_user,
		add_task,
		view_task,
		reports,
		emp_id} = this.state;

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

	handleTextChanges = (event) => {
		if (event.target.id === 'region_name') {
			this.setState({ region_name: event.target.value });
		}else if (event.target.id === 'description') {
			this.setState({ description: event.target.value });
        }else if (event.target.id === 'designation') {
			this.setState({ designation: event.target.value });
        }else if (event.target.id === 'policy') {
			this.setState({ policy: event.target.value });
        }
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
        description } = this.state;

		return (
			<Grid container spacing={24}>
				<Grid item xs={6}>
					<FormControl>
						<TextField
							id="region_name"
							label="Region Name"
							className={classes.textField}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={region_name}
						/>

						<TextField
							id="description"
							label="Region Description"
							className={classes.textField}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={description}
						/>
						
						<Button
							variant="contained"
							color="primary"
							onClick={this.onTapAddNewRegion.bind(this)}
							className={classes.button}
						>
							Add Region
						</Button>
					</FormControl>
				</Grid>
			</Grid>
		);
	};

	//Add Designation
	addNewDesignationUI = () => {
		const { classes, policies } = this.props;
		const { designation, description
         } = this.state;

		return (
			<Grid container spacing={24}>
				<Grid item xs={6}>
					<FormControl>
						<TextField
							id="designation"
							label="Designation"
							className={classes.textField}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={designation}
						/>

						<TextField
							id="description"
							label="Description"
							className={classes.textField}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={description}
						/>

						<NativeSelect
							className={classes.selectEmpty}
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
						
						<Button
							variant="contained"
							color="primary"
							onClick={this.onTapAddNewDesignation.bind(this)}
							className={classes.button}
						>
							Add Designation
						</Button>
					</FormControl>
				</Grid>
			</Grid>
		);
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
         } = this.state;

		return (
			<Grid container spacing={24}>
				<Grid item xs={6}>
					<FormControl>
						<TextField
							id="policy"
							label="Policy Title"
							className={classes.textField}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={policy}
						/>

						<FormControlLabel
							control={
								<Switch checked={portal_access} onChange={this.onChangePortalAccess.bind(this)} value={portal_access} />
							}
							label="Portal Access"
						/>

						<FormControlLabel
							control={
								<Switch checked={app_access} onChange={this.onChangeAppAccess.bind(this)} value={app_access} />
							}
							label="App Access"
						/>

						<FormControlLabel
							control={
								<Switch checked={track_user} onChange={this.onChangeTrackUser.bind(this)} value={track_user} />
							}
							label="Track User Access"
						/>

						<FormControlLabel
							control={
								<Switch checked={add_user} onChange={this.onChangeAddUser.bind(this)} value={add_user} />
							}
							label="Add User Access"
						/>

						<FormControlLabel
							control={
								<Switch checked={view_user} onChange={this.onChangeViewUser.bind(this)} value={view_user} />
							}
							label="View User Access"
						/>
						
						<FormControlLabel
							control={
								<Switch checked={add_task} onChange={this.onChangeAddTask.bind(this)} value={add_task} />
							}
							label="Add Task Access"
						/>

						<FormControlLabel
							control={
								<Switch checked={view_task} onChange={this.onChangeViewTask.bind(this)} value={view_task} />
							}
							label="View Task Access"
						/>

						<FormControlLabel
							control={
								<Switch checked={reports} onChange={this.onChangeReports.bind(this)} value={reports} />
							}
							label="Report Access"
						/>

						<Button
							variant="contained"
							color="primary"
							onClick={this.onTapAddNewPolicy.bind(this)}
							className={classes.button}
						>
							Add Policy
						</Button>
					</FormControl>
				</Grid>
			</Grid>
		);
	};



	render() {
		const { classes, type } = this.props;
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
					title={"Add New Region"}
					msg={"Successfully Added Region"}
				/>

				<Alert
					open={showAlert}
					onCancel={this.onOkay.bind(this)}
					onOkay={this.onOkay.bind(this)}
					title={title}
					msg={msg}
				/>
                {type === "REGION" && this.addNewRegionUI()}
                {type === "DESIGNATION" && this.addNewDesignationUI()}
                {type === "POLICY" && this.addNewPolicyUI()}

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

export default connect(mapStateToProps, { NewRegion, DismissAlert, GetPolicies, NewDesignation, NewPolicy }) (withStyles(styles)(AddSettings));
