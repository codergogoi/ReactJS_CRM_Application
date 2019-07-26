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
import CardBoard from '../Common/CardBoard';

// Icons
import BackIcon from '@material-ui/icons/ArrowBack';

// App Classes
import Alert from '../Common/Alert';

import { connect} from 'react-redux';
import { GetRegions , NewClient, DismissAlert } from '../../store/actions/ClientActions';

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
		width: '100%',
		display: 'flex',
		borderColor: 'blue',
		borderWidth: 2,
		minHeight: 50,
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
	},
	textContent: {
		backgroundColor: 'blue',
		height: 600
	},
	locationContent:{
		backgroundColor: 'green',
		height: 600
	}
});

class AddClient extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			client_name: '',
			region: '',
			title: '',
			first_name: '',
			middle_name: '',
			last_name: '',
			address: '',
			area: '',
			city: '',
			state: '',
			country: '',
			pin: '',
			mobile: '',
			email: '',
		};
	}

	componentWillMount(){
		this.props.GetRegions('');
	}

	//ALERT
	onDismiss = () => {
		this.setState({ showAlert: false, client_name: '',
		region: '',
		title: '',
		first_name: '',
		middle_name: '',
		last_name: '',
		address: '',
		area: '',
		city: '',
		state: '',
		country: '',
		pin: '',
		mobile: '',
		email: '', });
		this.props.DismissAlert();
	};

	onOkay = () => {
		this.setState({ showAlert: false , client_name: '',
		region: '',
		title: '',
		first_name: '',
		middle_name: '',
		last_name: '',
		address: '',
		area: '',
		city: '',
		state: '',
		country: '',
		pin: '',
		mobile: '',
		email: '',});
		 
		this.props.DismissAlert();
	};

	onTapBack = () => {
		this.props.onTapBack();
	};
 

	onChangeStatus = () => {
		const value = this.state.status !== true ? true : false;
		this.setState({
			status: value
		});
	};

	onTapAddNewEmp() {

		const { client_name, region,title, first_name, middle_name, last_name, address, area, city, state, country, pin, mobile, email } = this.state;

		this.props.NewClient({ client_name, region,title, first_name, middle_name, last_name, address, area, city, state, country, pin, mobile, email })
		
	}

	handleTextChanges = (event) => {
		if (event.target.id === 'client_name') {
			this.setState({ client_name: event.target.value });
		}else if (event.target.id === 'title') {
			this.setState({ title: event.target.value });
		}else if (event.target.id === 'first_name') {
			this.setState({ first_name: event.target.value });
		} else if (event.target.id === 'middle_name') {
			this.setState({ middle_name: event.target.value });
		} else if (event.target.id === 'last_name') {
			this.setState({ last_name: event.target.value });
		} else if (event.target.id === 'address') {
			this.setState({ address: event.target.value });
		} else if (event.target.id === 'area') {
			this.setState({ area: event.target.value });
		}else if (event.target.id === 'city') {
			this.setState({ city: event.target.value });
		} else if (event.target.id === 'state') {
			this.setState({ state: event.target.value });
		} else if (event.target.id === 'country') {
			this.setState({ country: event.target.value });
		} else if (event.target.id === 'pin') {
			this.setState({ pin: event.target.value });
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

 
	handleRegion = (event) => {
		this.setState({
			region: event.target.value
		});
	}




	//Add Bank
	addClientUI = () => {
		const { classes, regions } = this.props;
		
		const { client_name, first_name, middle_name,
		last_name,address, area, city, state, country, pin, mobile, email } = this.state;

 

		return (
			<Grid container spacing={24}>
				<view>
				</view>
				<Grid item xs={6}>
					<FormControl>
						
						<TextField
							id="client_name"
							label="Client Name"
							className={classes.textField}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={client_name}
						/>

						<NativeSelect
							className={classes.selectEmpty}
							required="true"
							onChange={this.handleRegion.bind(this)}
						>
							<option value="" disabled selected>
								Select Designation
							</option>
							{regions !== undefined && regions.map( (item) => {
								return (<option value={item.id}>{item.region}</option>);
							})}

						</NativeSelect>
						

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
							id="address"
							label="Address"
							className={classes.textField}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={address}
						/> 

						<TextField
							id="area"
							label="Area"
							className={classes.textField}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={area}
						/> 

						<TextField
							id="city"
							label="City"
							className={classes.textField}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={city}
						/> 

						<TextField
							id="state"
							label="State"
							className={classes.textField}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={state}
						/> 
						<TextField
							id="country"
							label="Country"
							className={classes.textField}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={country}
						/> 
						<TextField
							id="pin"
							label="pin"
							className={classes.textField}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={pin}
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

						<Button
							variant="contained"
							color="primary"
							onClick={this.onTapAddNewEmp.bind(this)}
							className={classes.button}
						>
							Add Client
						</Button>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<FormControl />
				</Grid>
			</Grid>
		);
	};

	textContent = () =>{

		const { classes } = this.props;

		return(<view className={classes.formControl}>
				Client Name: 
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
					title={"Add New Client"}
					msg={"Client Added Successfully!"}
				/>


				<Alert
					open={showAlert}
					onCancel={this.onOkay.bind(this)}
					onOkay={this.onOkay.bind(this)}
					title={title}
					msg={msg}
				/>
				
				<Grid container spacing={24}>
					<Grid item xs={1}>
						
					</Grid>
					<Grid item xs={6}>
						<CardBoard>
							{this.textContent()}
						</CardBoard>
					</Grid>
					<Grid item xs={3}>
						<CardBoard>
							Location Contents
						</CardBoard>
					</Grid>
					<Grid item xs={2}>
						
					</Grid>
				
					 
				</Grid>

			</div>
		);
	}
}

AddClient.propTypes = {
	classes: PropTypes.object
};

const mapStateToProps = (state) => ({
	isAdded: state.clientReducer.isAdded,
	regions: state.clientReducer.regions,
});

export default connect(mapStateToProps, { NewClient, GetRegions, DismissAlert }) (withStyles(styles)(AddClient));
