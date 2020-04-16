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
import { GetAttributes , NewEmp, UpdateEmp ,DismissAlert } from '../../store/actions/EmployeeActions';

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

class AddEmp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			name: '',
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

		if(this.props.isEdit){
			const {id,emp_id,title,name,region,designation,mobile,email} = this.props.current_emp;
			this.setState({
				id: id,
				title: title,
				name: name,
				emp_id: emp_id,
				mobile: mobile,
				region: region,
				designation: designation,
				email: email,
				status: true
			});
		}

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



	onOkayForError = () =>{
		this.setState({ showAlert: false });
	}



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

		const { id,title,
		first_name,
		middle_name,
		last_name,
		emp_id,
		mobile,
		region,
		designation,
		email} = this.state;

		if(this.props.isEdit){
			this.props.UpdateEmp({ id, title,
				first_name,
				middle_name,
				last_name,
				emp_id,
				mobile,
				region,
				designation,
				email })
		}else{
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
		
		
	}

	handleTextChanges = (event) => {
		 if (event.target.id === 'name') {
			this.setState({ name: event.target.value });
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


	displayTextContent = () => {


		const { classes, designations, regions } = this.props;
		
		const { name,emp_id,mobile,email } = this.state;


		return(<view className={classes.formControl}>
					<view className={classes.textFields}>

							<NativeSelect
							style={{width: 120, height: 48, marginTop: 0, marginRight: 20}}
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
						 
						</view>


						<view className={classes.textFields}>
							
						<TextField
							id="name"
							label="Name"
							style={{width: 220,  marginTop: 0, marginRight: 20}}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={name}
						/>

						 
					</view>	

					<view className={classes.textFields}>

							<TextField
								id="emp_id"
								label="Employee ID"
								style={{width: 180,  marginTop: 0, marginRight: 20}}
								type="text"
								required="true"
								margin="normal"
								value={emp_id}
								disabled
							/>

							<NativeSelect
								style={{width: 200,height: 48,  marginTop: 0, marginRight: 20}}
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
 

					</view>	
					
					<view className={classes.textFields}>
						
						<TextField
							id="mobile"
							label="Mobile Number"
							style={{width: 220,  marginTop: 0, marginRight: 20}}
							type="text"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={mobile}
						/>

						<TextField
							id="email"
							label="Email ID"
							style={{width: 220,  marginTop: 0, marginRight: 20}}
							type="email"
							required="true"
							margin="normal"
							onChange={this.handleTextChanges.bind(this)}
							value={email}
						/>
					</view>

 
					
					<view className={classes.textFields}>
						<Button
							variant="contained"
							color="primary"
							onClick={this.onTapAddNewEmp.bind(this)}
							className={classes.button}
						>
							Save Changes
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
					title={"Add New Employee"}
					msg={"Employee Added Successfully!"}
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

AddEmp.propTypes = {
	classes: PropTypes.object
};

const mapStateToProps = (state) => ({
	isAdded: state.employeeReducer.isAdded,
	regions: state.employeeReducer.attributes.regions,
	designations: state.employeeReducer.attributes.designations
});

export default connect(mapStateToProps, { GetAttributes, NewEmp, DismissAlert, UpdateEmp }) (withStyles(styles)(AddEmp));
