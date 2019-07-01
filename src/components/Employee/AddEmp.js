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

// Icons
import BackIcon from '@material-ui/icons/ArrowBack';

// App Classes
import Alert from '../Common/Alert';

import { connect} from 'react-redux';
import { GetAttributes , NewEmp, DismissAlert } from '../../store/actions/EmployeeActions';

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
		marginTop: theme.spacing.unit,
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

class AddEmp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			first_name: '',
			middle_name: '',
			last_name: '',
			emp_id: '',
			mobile: '',
			region: '',
			designation: '',
			email: '',
			status: true
		};
	}

	componentWillMount(){
		this.props.GetAttributes('');
	}

	//ALERT
	onDismiss = () => {
		this.setState({ showAlert: false });
		this.props.DismissAlert();
		this.onClearUserInfo();
	};

	onOkay = () => {
		this.setState({ showAlert: false });
		if (this.state.isDone) {
			this.props.onTapBack();
		}
		this.props.DismissAlert();
		this.onClearUserInfo();
	};

	onTapBack = () => {
		this.props.onTapBack();
	};

	onClearUserInfo = () => {
		this.setState({
			title: '',
			first_name: '',
			middle_name: '',
			last_name: '',
			emp_id: '',
			mobile: '',
			region: '',
			designation: '',
			email: '',
		});
	}

	onChangeStatus = () => {
		const value = this.state.status !== true ? true : false;
		this.setState({
			status: value
		});
	};

	onTapAddNewEmp() {

		const { title,
		first_name,
		middle_name,
		last_name,
		emp_id,
		mobile,
		region,
		designation,
		email} = this.state;

		this.props.NewEmp({ title,
			first_name,
			middle_name,
			last_name,
			emp_id,
			mobile,
			region,
			designation,
			email })
		
	}

	handleTextChanges = (event) => {
		 if (event.target.id === 'first_name') {
			this.setState({ first_name: event.target.value });
		} else if (event.target.id === 'middle_name') {
			this.setState({ middle_name: event.target.value });
		} else if (event.target.id === 'last_name') {
			this.setState({ last_name: event.target.value });
		} else if (event.target.id === 'emp_id') {
			this.setState({ emp_id: event.target.value });
		}else if (event.target.id === 'mobile') {
			this.setState({ mobile: event.target.value });
		}else if (event.target.id === 'email') {
			this.setState({ email: event.target.value });
		}   
	};

	//Handle Selections
	handleTitleSelection = (event) => {
		this.setState({
			title: event.target.value
		})
	}

	handleDesignation = (event) => {
		this.setState({
			designation: event.target.value
		});
	}

	handleRegion = (event) => {
		this.setState({
			region: event.target.value
		});
	}


	//Add Bank
	addEmployeeUI = () => {
		const { classes, designations, regions } = this.props;
		
		const { first_name,middle_name,last_name,emp_id,mobile,email } = this.state;

		return (
			<Grid container spacing={24}>
				<Grid item xs={6}>
					<FormControl>
						<NativeSelect
								className={classes.selectEmpty}
								required="true"
								onChange={this.handleTitleSelection.bind(this)}
							>
								<option value="" disabled selected>
									Select Title
								</option>
								<option value="Mr">Mr</option>
								<option value="Mrs">Mrs</option>
								<option value="Miss">Miss</option>
							</NativeSelect>
						<TextField
							id="first_name"
							label="First Name"
							className={classes.textField}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={first_name}
						/>

						<TextField
							id="middle_name"
							label="Middle Name"
							className={classes.textField}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={middle_name}
						/>
						 
						<TextField
							id="last_name"
							label="Last Name"
							className={classes.textField}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={last_name}
						/>
						
						<TextField
							id="emp_id"
							label="Employee ID"
							className={classes.textField}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={emp_id}
						/>


						<TextField
							id="mobile"
							label="Mobile Number"
							className={classes.textField}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={mobile}
						/>


						<TextField
							id="email"
							label="Email ID"
							className={classes.textField}
							type="email"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={email}
						/>

						<NativeSelect
							className={classes.selectEmpty}
							required="true"
							onChange={this.handleDesignation.bind(this)}
						>
							<option value="" disabled selected>
								Select Designation
							</option>
							{designations !== undefined && designations.map( (item) => {
								return (<option value={item.id}>{item.designation}</option>);
							})}

						</NativeSelect>

						<NativeSelect
							className={classes.selectEmpty}
							required="true"
							onChange={this.handleRegion.bind(this)}
						>
							<option value="" disabled selected>
								Select Region
							</option>
							{regions !== undefined && regions.map( (item) => {
								return (<option value={item.id}>{item.region}</option>);
							})}
						</NativeSelect>

						<Button
							variant="contained"
							color="primary"
							onClick={this.onTapAddNewEmp.bind(this)}
							className={classes.button}
						>
							Add Employee
						</Button>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<FormControl />
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
					title={"Add New Employee"}
					msg={"Employee Added Successfully!"}
				/>


				<Alert
					open={showAlert}
					onCancel={this.onOkay.bind(this)}
					onOkay={this.onOkay.bind(this)}
					title={title}
					msg={msg}
				/>
				{this.addEmployeeUI()}
			</div>
		);
	}
}

AddEmp.propTypes = {
	classes: PropTypes.object
};

const mapStateToProps = (state) => ({
	isAdded: state.employeeReducer.isAdded,
	regions: state.employeeReducer.attributes.regions,
	designations: state.employeeReducer.attributes.designations
});

export default connect(mapStateToProps, { GetAttributes, NewEmp, DismissAlert }) (withStyles(styles)(AddEmp));
