import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// Icons
import BackIcon from '@material-ui/icons/ArrowBack';

// App Classes
import Alert from '../Common/Alert';

import { connect } from 'react-redux';
import { NewUser , DismissAlert } from '../../store/actions/UserActions';


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

class AddUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			isAdmin: true,
			currency: 'INR'
		};
	}

	onChangeAdmin = () => {
		const value = this.state.isAdmin !== true ? true : false;
		this.setState({
			isAdmin: value
		});
	};

	//ALERT
	onDismiss = () => {
		this.setState({ showAlert: false });
		this.props.DismissAlert();

	};

	onOkay = () => {
		this.setState((state) => ({
			showAlert: false,
			email: '',
			password: '',
			isAdmin: true
		}));
		if (this.state.isDone) {
			this.props.onTapBack();
		}
		this.props.DismissAlert();

	};

	onTapBack = () => {
		this.props.onTapBack();
	};

	onTapAddNewUser() {
		const { email, password, isAdmin, currency } = this.state;

		if (email.length < 1) {
			this.setState({
				showAlert: true,
				msg: 'Please provide Email ID',
				title: 'Email ID is Empty!'
			});
			return;
		}

		this.props.NewUser({ email, password, isAdmin, currency });
	}

	handleTextChanges = (event) => {
		if (event.target.id === 'email') {
			this.setState({ email: event.target.value });
		} else if (event.target.id === 'password') {
			this.setState({ password: event.target.value });
		}else if (event.target.id === 'currency') {
			this.setState({ currency: event.target.value });
		}
	};

	handleCurrencyChange = event => {
		this.setState({ currency: event.target.value });
	};

	/*
	 $email_id = mysqli_real_escape_string($this->getConn(),$data['email']);
        $title = mysqli_real_escape_string($this->getConn(),$data['title']);
        $first_name = mysqli_real_escape_string($this->getConn(),$data['first_name']);
        $middle_name = (mysqli_real_escape_string($this->getConn(),$data['middle_name']) != null) ? mysqli_real_escape_string($this->getConn(),$data['middle_name']) : "";
        $last_name = mysqli_real_escape_string($this->getConn(),$data['last_name']);
        $emp_id = mysqli_real_escape_string($this->getConn(),$data['emp_id']);
        $mobile = mysqli_real_escape_string($this->getConn(),$data['mobile']);
        $region = mysqli_real_escape_string($this->getConn(),$data['region']);
		$designation = mysqli_real_escape_string($this->getConn(),$data['designation']);
		
	*/

	registerUserUI = () => {
		const { classes } = this.props;
		const { email, password, isAdmin, currency } = this.state;

		return (
			<Grid container spacing={24}>
				<Grid item xs={6}>
					<FormControl>
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

						<TextField
							id="password"
							label="Password"
							className={classes.textField}
							type="password"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={password}
						/>

							<RadioGroup
								aria-label="currency"
								name="currency"
								className={classes.group}
								value={currency}
								onChange={this.handleCurrencyChange}
							>
							<FormControlLabel value="INR" control={<Radio />} label="INR" />
							<FormControlLabel value="AED" control={<Radio />} label="AED" />
							<FormControlLabel value="KWD" control={<Radio />} label="KWD" />
							 
						</RadioGroup>

						<FormControlLabel
							control={
								<Switch checked={isAdmin} onChange={this.onChangeAdmin.bind(this)} value={isAdmin} />
							}
							label="is Admin User?"
						/>

						<Button
							variant="contained"
							color="primary"
							onClick={this.onTapAddNewUser.bind(this)}
							className={classes.button}
						>
							Add User
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
					title= "Added Successfully"
					msg="User Added Successfully!"
				/>

				<Alert
					open={showAlert}
					onCancel={this.onOkay.bind(this)}
					onOkay={this.onOkay.bind(this)}
					title={title}
					msg={msg}
				/>

				{this.registerUserUI()}
			</div>
		);
	}
}

AddUser.propTypes = {
	classes: PropTypes.object
};

const mapStateToProps = (state) => ({
	isAdded: state.userReducer.isAdded
});

export default  connect(mapStateToProps, { NewUser , DismissAlert }) (withStyles(styles)(AddUser));
