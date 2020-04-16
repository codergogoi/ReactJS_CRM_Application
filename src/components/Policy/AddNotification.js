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
import Grid from '@material-ui/core/Grid';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Avatar } from '@material-ui/core';
import classNames from 'classnames';

// Icons
import AddEmployeeIcon from '@material-ui/icons/PersonAdd';
import BackIcon from '@material-ui/icons/ArrowBack';
import EditPhoto from '@material-ui/icons/AddAPhoto';
import UpploadIcon from '@material-ui/icons/FileUpload';
import { connect} from 'react-redux';
import { NewNotification, DismissAlert } from '../../actions/NotificationActions';

//App Classes
import axios from 'axios';
import Alert from '../Common/Alert';

const styles = (theme) => ({
	root: {
		// width: '90%'
	},
	groupForm: {
		// width: '100%',
		flexDirection: 'column'
	},
	formContent: {
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
		backgroundColor: '#663354',
		margin: theme.spacing.unit
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 400
	},

	selectionField: {
		marginTop: theme.spacing.unit * 5,
		marginLeft: 10
	},

	formInputs: {
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
		top: theme.spacing.unit * 13,
		right: theme.spacing.unit * 10
	},
	btnRightB: {
		position: 'absolute',
		bottom: theme.spacing.unit * -20,
		right: theme.spacing.unit * 5
	},
	avatar: {
		marginTop: 10,
		marginBottom: 10,
		width: 300,
		height: 160,
		borderRadius: 0
	}
});

function getSteps() {
	return [ 'Notification Details', 'Delivery Status' ];
}

class AddNotification extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: 0,
			msg_title: '',
			title: '',
			content: '',
			terms_n_conditions: '',
			promocode: '',
			validity: '2019/01/01',
			img_url: '',
			section: '',
			country: 'INR',
			activeStep: 0,
			selectedFile: null,
			previewImage: '',
			currentNotification: this.props.currentNotification,
			clone: this.props.clone
		};
	}

	componentWillMount() {
		const { currentNotification, clone } = this.state;

		if (clone === true) {
			this.setState({
				title: currentNotification.title,
				content: currentNotification.desc,
				terms_n_conditions: currentNotification.tnc,
				promocode: currentNotification.promo,
				validity: currentNotification.validity,
				img_url: '',
				section: currentNotification.section,
				country: 'INR'
			});
		}

		console.log(JSON.stringify(this.state.currentNotification));
	}

	handleNext = () => {
		const { activeStep } = this.state;

		if (activeStep === 0) {
			this.onTapNext();
		} else {
			this.handleReset();
		}
	};

	// RESET
	handleReset = () => {
		this.setState({
			activeStep: 0
		});
	};

	onTapBack = () => {
		this.props.onTapBack();
	};

	// Post data to Server
	onSendNotification = () => {
		const { title, content, terms_n_conditions, promocode, validity, img_url, section, country } = this.state;

		if (title.length < 1) {
			this.setState({
				showAlert: true,
				msg: 'Please Provide Title',
				title: 'All Fields are Mandatory!'
			});
			return;
		}

		if (content.length < 1) {
			this.setState({
				showAlert: true,
				msg: 'Please Provide Notification Content',
				title: 'All Fields are Mandatory!'
			});
			return;
		}

		this.props.NewNotification({ title, content, terms_n_conditions, promocode, validity, img_url, section, country});

	};

	onPostUpload = () => {
		this.setState((state) => ({
			activeStep: state.activeStep + 1
		}));
	};

	handleTextChanges = (event) => {
		if (event.target.id === 'title') {
			this.setState({ title: event.target.value });
		} else if (event.target.id === 'content') {
			this.setState({ content: event.target.value });
		} else if (event.target.id === 'promocode') {
			this.setState({ promocode: event.target.value });
		} else if (event.target.id === 'validity') {
			this.setState({ validity: event.target.value });
		} else if (event.target.id === 'section') {
			this.setState({ section: event.target.value });
		} else if (event.target.id === 'terms-n-conditions') {
			this.setState({ terms_n_conditions: event.target.value });
		}
	};

	fileChangedHandler = (event) => {
		if (event.target.files.length > 0) {
			this.setState({
				selectedFile: event.target.files[0],
				previewImage: URL.createObjectURL(event.target.files[0])
			});
		}
	};

	uploadPic = () => {
		this.refs.profilePicUpload.click();
	};

	sendFile = () => {
		const { emp_id } = this.state;
	};

	//Add Notification
	addNotificationUI = () => {
		const { classes } = this.props;
		const {
			title,
			content,
			terms_n_conditions,
			promocode,
			validity,
			img_url,
			section,
			previewImage,
			selectedFile
		} = this.state;

		return (
			<Grid container spacing={24}>
				<Grid item xs={6}>
					<FormControl>
						<TextField
							id="title"
							label="Notification Title"
							className={classes.textField}
							type="text"
							required="true"
							autoComplete="Notification Title"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={title}
						/>
						<TextField
							id="content"
							label="Notification Content"
							type="text"
							required="true"
							multiline
							rows="3"
							className={classes.textField}
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={content}
						/>

						<TextField
							id="promocode"
							label="Promo Code"
							className={classes.textField}
							type="text"
							autoComplete="Promo Code"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={promocode}
						/>

						<TextField
							id="validity"
							label="Validity"
							className={classes.selectionField}
							type="date"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={validity}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<FormControl>
						<TextField
							id="terms-n-conditions"
							label="Terms and Conditions"
							className={classes.textField}
							type="text"
							multiline
							rows="2"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={terms_n_conditions}
						/>

						<NativeSelect
							label="Section"
							required="true"
							className={classes.selectionField}
							id="section"
							onChange={this.handleTextChanges.bind(this)}
							value={section}
						>
							<option value="" disabled selected>
								Select Section
							</option>
							<option value="flight">Flight</option>
							<option value="holidays">Holidays</option>
							<option value="visa">Visa</option>
						</NativeSelect>

						<Button
							onClick={this.uploadPic.bind(this)}
							variant="fab"
							color="secondary"
							aria-label="add"
							className={classes.btnRightB}
						>
							<EditPhoto />
						</Button>
						{selectedFile === null ? (
							''
						) : (
							<Avatar alt="no Pic" src={previewImage} className={classNames(classes.avatar)} />
						)}
						<input
							type="file"
							ref="profilePicUpload"
							onChange={this.fileChangedHandler}
							style={{ display: 'none' }}
						/>
						
					</FormControl>

					<Button
							variant="extendedFab"
							color="secondary"
							className={classes.button}
							onClick={this.onSendNotification.bind(this)}
						>
							Send Notification <AddEmployeeIcon className={classes.rightIcon} />
					</Button>
				</Grid>
			</Grid>
		);
	};

	render() {
		const { classes } = this.props;
		const steps = getSteps();
		const { activeStep, showAlert, msg_title, msg } = this.state;

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
						title="Notification Added"
						msg="Successfully Added Notification!"
					/>
				<Alert
					open={showAlert}
					onCancel={this.onOkay.bind(this)}
					onOkay={this.onOkay.bind(this)}
					title={msg_title}
					msg={msg}
				/>
				{this.addNotificationUI()}
			</div>
		);
	}

	//ALERT
	onDismiss = () => {
		this.setState({ showAlert: false });
		this.props.DismissAlert();
	};

	onOkay = () => {
		this.setState({ showAlert: false });
		this.props.DismissAlert();
		this.props.onTapBack();
		
	};

}

AddNotification.propTypes = {
	classes: PropTypes.object
};

const mapStateToProps = (state) => ({
	isAdded : state.notificationReducer.isAdded
});

export default  connect( mapStateToProps, { NewNotification, DismissAlert  })(withStyles(styles)(AddNotification));
