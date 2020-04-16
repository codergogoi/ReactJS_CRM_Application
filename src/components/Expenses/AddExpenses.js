import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import NativeSelect from '@material-ui/core/NativeSelect';
import CardBoard from '../Common/CardBoard';
import moment from 'moment';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import DownloadIcon from '@material-ui/icons/CloudDownload'



// Icons
import AddEmployeeIcon from '@material-ui/icons/PersonAdd';
import BackIcon from '@material-ui/icons/ArrowBack';

// App Classes
import Alert from '../Common/Alert';

import { connect } from 'react-redux';
import { GetExpenses, DismissAlert, ApproveExpenses } from '../../store/actions/ExpensesActions';
import { Chip } from '@material-ui/core';
import { BASE_URL } from '../../store/actions/AppConst';

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
	txtTitle:{
		display: 'flex',
		flexDirection: 'row',
		marginTop: 20,
		fontSize: 18,
		padding: 5,
		color: '#5B5B5B',
		alignItems: 'center',
	},
	txtLabel:{
		width: 240,
		fontSize: 18,
		color: '#A2A2A2',
		marginRight: 5,
	},
	buttonAction: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
	},
	button: {
		width: 160,
		height: 40,
		margin: 10,
		backgroundColor: '#900C3F'
	},
	buttonNagetive: {
		width: 160,
		height: 40,
		margin: 10,
		backgroundColor: '#338241'
	},
	attachmentImage: {
		display:'flex',
		width: 400,
		margin: 5,
		borderRadius: 10,
	}

});

function getSteps() {
	return [ 'Offer Details', 'Finish' ];
}

class AddExtension extends React.Component {
	constructor(props) {
		super(props);
		this.state = {	
			id:0,	
			task_id: '',	
			task_title: '',
			description: '',
			expense_date: '',
			emp_name: '',
			client_name: '',
			total_cost: 0.0,
			payment_status: '',
			currency: '',
			
		};
	}

	componentWillMount() {

		if(this.props.isEdit){

			console.log(JSON.stringify(this.props.current_item));

			const { id,task_id,title,description,date,cost,emp_name,client_name, status, currency} = this.props.current_item;

			this.setState({
				id:id,
				task_id: task_id,
				task_title: title,
				description: description,
				expense_date: date,
				emp_name: emp_name,
				client_name: client_name,
				total_cost: cost,
				payment_status: status,
				currency: currency,
			});
		}

	}

	handleNext = () => {
		const { activeStep } = this.state;

		if (activeStep === 0) {
			this.onTapNext();
		} else if (activeStep === 1) {
			this.onPostUpload();
		} else {
			this.handleReset();
		}
	};

	//ALERT
	onDismiss = () => {
		this.setState({ showAlert: false });
		this.props.DismissAlert();
	};

	onOkay = () => {
		this.setState({ showAlert: false });
		this.props.DismissAlert();
		this.onTapBack();
	};

	handleReset = () => {
		this.setState({
			activeStep: 0
		});
	};

	handlePlatform = (event) => {
		this.setState({ aui: event.target.value });
	};

	handleCountryChange = (event) => {
		this.setState({ country: event.target.value });
	};

	onTapBack = () => {
		this.props.onTapBack();
	};


	onTapApproved = () =>{

		const { id } = this.state;
		const status = 2;
		this.props.ApproveExpenses({id, status})

	}

	onTapReject = () => {

		const { id } = this.state;
		const status = 1;
		this.props.ApproveExpenses({id, status})

	}


	onOkayForError = () =>{
		this.setState({ showAlert: false });
	}


	
	displayTextContent = () => {

		const { classes} = this.props;
		const { task_title, description,expense_date,emp_name,client_name,total_cost,payment_status,currency} = this.state;

		return(<view className={classes.formControl}>
						<view className={classes.textFields}>
							<view className={classes.txtTitle}>
								<view className={classes.txtLabel}>Expenses Title : </view> {task_title}
							</view>
						</view>

						<view className={classes.textFields}>
							<view className={classes.txtTitle}>
							<view className={classes.txtLabel}>Type of Expenses : </view> <Chip label={description} className={classes.chip} color="default" />
							</view>
						</view>	

					<view className={classes.textFields}>
						<view className={classes.txtTitle}>
						<view className={classes.txtLabel}>Date : </view>{moment(expense_date).format('Do MMM YYYY')}
						</view>
					</view>	
					
					<view className={classes.textFields}>
						<view className={classes.txtTitle}>
						<view className={classes.txtLabel}>Employee Name: </view>{emp_name}
						</view>
					</view>

					<view className={classes.textFields}>
						<view className={classes.txtTitle}>
						<view className={classes.txtLabel}>Client Name: </view>{client_name} 
						</view>
					</view>


					<view className={classes.textFields}>
						<view className={classes.txtTitle}>
						<view className={classes.txtLabel}> Total Cost: </view> {currency} {total_cost}
						</view>

					</view>
					<view className={classes.textFields}>
						<view className={classes.txtTitle}>
						<view className={classes.txtLabel}>Payment Status: </view>{payment_status == 2 && <Chip label="Approved" className={classes.chip}  color="primary" /> }
							{payment_status == 1 && <Chip label="Rejected" className={classes.chip} color="secondary" /> }
							{payment_status == 0 && <Chip label="Pending" className={classes.chip} color="default" /> }
						</view>
					</view>
					
					
					
					<view className={classes.textFields}>
						<view className={classes.buttonAction}>
							<Button
								variant="contained"
								color="primary"
								onClick={this.onTapReject.bind(this)}
								className={classes.button}
							>
								Reject
							</Button>

							<Button
								variant="contained"
								color="primary"
								onClick={this.onTapApproved.bind(this)}
								className={classes.buttonNagetive}
							>
								Approve
							</Button>
						</view>
					</view>


			</view>);
	}


	onDisplayAttachment = ()  => {
 
		const { classes} = this.props;

		return(
			<div>
				<a href={`${BASE_URL+'uploads/evidence_'+this.state.task_id+'.jpg'}`} target="_blank" download>
					<img className={classes.attachmentImage} src={`${BASE_URL+'uploads/evidence_'+this.state.task_id+'.jpg'}`}/>
				 </a>
			</div>
		);

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
					title={"Save Changes!"}
					msg={"Expenses Details Changed Successfully!"}
				/>

				<Alert
					open={showAlert}
					onCancel={this.onOkayForError.bind(this)}
					onOkay={this.onOkayForError.bind(this)}
					title={title}
					msg={msg}
				/>

				<Grid container spacing={24}>
					<Grid item xs={2}>
					</Grid>
					<Grid item xs={5}>
						<CardBoard>
							{this.displayTextContent()}
						</CardBoard>
					</Grid>
					<Grid item xs={1}>
					</Grid>
					<Grid item xs={4}>
						<CardBoard>
						{this.onDisplayAttachment()}
						</CardBoard>
					</Grid>
					 
				</Grid>

			</div>
		);
	}
}

AddExtension.propTypes = {
	classes: PropTypes.object
};

const mapStateToProps = (state) => ({
	isAdded: state.expensesReducer.isAdded
});

export default connect(mapStateToProps, { GetExpenses, DismissAlert, ApproveExpenses }) (withStyles(styles)(AddExtension));