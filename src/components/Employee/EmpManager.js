import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

// Icons
import BankIcon from '@material-ui/icons/Payment';
import AddOffersIcon from '@material-ui/icons/CardGiftcard';
import SaveIcon from '@material-ui/icons/Save';
import DownloadIcon from '@material-ui/icons/CloudDownload';

import Table from './EmpTable';
import axios from 'axios';
import Alert from '../Common/Alert';

//App Classes
import CardDiv from '../Common/CardDiv';
import AddEmployee from './AddEmp';

import { connect } from 'react-redux';
import { GetEmployees, GetAttendance, RemoveEmp, DownloadAttendance } from '../../store/actions/EmployeeActions';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import EmployeeIcon from '@material-ui/icons/SupervisorAccount';

import DirectionsIcon from '@material-ui/icons/Directions';
import AttendanceTable from './AttendanceTable';
import ViewTrackingDetails from './ViewTrackingDetails';
import CsvDownload from 'react-json-to-csv'


function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired
};

const styles = (theme) => ({
	root: {
		display: 'flex',
		flexGrow: 1,
		width: '100%'
	},
	searchBar:{
		padding: '2px 4px',
		alignItems: 'center',
		width: 400,
	},
	bar: {
		backgroundColor: '#1a237e'
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
		bottom: theme.spacing.unit * 12,
		left: theme.spacing.unit * 13
	},
	searchView: {
		height: 100,
		backgroundColor: 'red',
		width: 400,
	},
	input: {
		marginLeft: 8,
		flex: 1,
	  },
	  iconButton: {
		padding: 10,
	  },
	  divider: {
		width: 1,
		height: 28,
		margin: 4,
	  },
	  downloadBtn:{
		width: 200,
		display: 'flex',
		backgroundColor: '#ebeef1',
		border: 0

	},
	fab:{
	  backgroundColor: '#900C3F',
	  color: '#FFF'

  	},
	extendedIcon: {
	  marginRight: theme.spacing.unit,
	  color: '#FFF'
	},
});

class EmpManager extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current_emp: '',
			employees: [],
			id: '',
			value: 0,
			isAddNew: false,
			isEdit: false,
			isSearch: false,
			isViewLocation: false
		};
	}

	componentWillReceiveProps(){
		this.setState({ isAddNew: false, isEdit: false, isViewLocation: false });
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	componentWillMount() {
		this.fetchEmployee();
	}


	fetchEmployee = () => {
		this.props.GetEmployees('');
		this.props.GetAttendance('');
		this.props.DownloadAttendance('');

	};

	onTapSaveChanges = () => {
		this.setState({
			showAlert: true,
			msg: 'All changes will be update on Application API Instantly.',
			title: 'Changes Confirmation!'
		});
	};

	onTapRegister() {
		this.setState({ isAddNew: true });
	}

	onTapBack = () => {
		this.setState({ isAddNew: false, isEdit: false, isViewLocation: false });
		this.fetchEmployee();
	}

	onTapViewLocation = (emp) => {
		this.setState({ isViewLocation : true});
	}

	onEditEmp = (emp) => {
		this.setState({
			current_emp: emp,
			isEdit: true,
			isAddNew: true
		})
	}

	onDeleteEmp(emp) {
		const { id } = emp;
		this.setState({
			id: id,
			showAlert: true,
			msg: 'Are you sure to delete the selected Employee?',
			title: 'Delete Confirmation!'
		});
	}

	onExecuteDeleteCommand() {
		const { id } = this.state;
		this.props.RemoveEmp({ id });
	}

	onTapSearch = () => {
		this.setState({isSearch: true});
	}

	onTapAdd = () => {

		this.setState({
			isAddNew: true
		});

	}

	onDisplaySearchView = () => {

		return (
			<div style={styles.searchView}>
					<IconButton className={styles.iconButton} aria-label="Menu">
						<MenuIcon />
					</IconButton>
					<InputBase
						className={styles.input}
						placeholder="Search Employee"
						inputProps={{ 'aria-label': 'Search Employee' }}
					/>
					<IconButton className={styles.iconButton} aria-label="Search">
						<SearchIcon />
					</IconButton>
					<Divider className={styles.divider} />
			</div>
		);
	}

	render() {

		const { classes,employees, attendance,  access, attendance_prev } = this.props;

		const { value, isAddNew, showAlert, title, msg , isSearch, isEdit, current_emp, isViewLocation} = this.state;

		if(isViewLocation){
			return (
				<CardDiv title={'View Location'} isBack={true} onTapBack={this.onTapBack.bind(this)}>
					<ViewTrackingDetails
					  />
				</CardDiv>
			);
		}else if (isAddNew) {
			return (
				<CardDiv title={'Add Employee'} isBack={true} onTapBack={this.onTapBack.bind(this)}>
					<AddEmployee isEdit={isEdit} current_emp={current_emp}  />
				</CardDiv>
			);
		} else {
			return (
				<div>
					<Alert
						open={showAlert}
						onCancel={this.onDismiss.bind(this)}
						onOkay={this.onOkay.bind(this)}
						title={title}
						msg={msg}
					/>

					<CardDiv title={'Employees'} isAdd={false} onTapAdd={this.onTapAdd.bind(this)}>
						 
						<Tabs
							value={value}
							onChange={this.handleChange}
							scrollable
							scrollButtons="on"
							indicatorColor="secondary"
							textColor="secondary"
						>
							<Tab label="Employees" icon={<EmployeeIcon />} />							
							<Tab label="Attendance Logs" icon={<EmployeeIcon />} />
							{attendance_prev !== undefined && 
							<CsvDownload className={classes.downloadBtn} data={attendance_prev}>
								<Fab variant="extended"  aria-label="Delete" className={classes.fab}>
									<DownloadIcon className={classes.extendedIcon} />
										Prev Attendance
								</Fab>
							</CsvDownload>}
						</Tabs>

						{value === 0 && (
							<TabContainer>
								<div>								
								{/* {this.onDisplaySearchView()} */}
								{employees !== undefined && (<Table
									access={access}
									onEditEmp={this.onEditEmp.bind(this)}
									onDeleteEmp={this.onDeleteEmp.bind(this)}
									data={employees}
								/>) }
								
								</div>
							</TabContainer>
						)}

						{value === 1 && (
							<TabContainer>
								{attendance !== undefined && <AttendanceTable
									data={attendance}
									onTapViewLocation = {this.onTapViewLocation.bind(this)}
								/> }
								
							</TabContainer>
						)}
						 

					</CardDiv>
				</div>
			);
		}
	}

	//ALERT
	onDismiss = () => {
		this.setState({ showAlert: false });
	};

	onOkay = () => {
		this.setState({ showAlert: false });
		this.onExecuteDeleteCommand();
	};
	
}

EmpManager.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	employees: state.employeeReducer.employees,
	attendance: state.employeeReducer.attendance,
	attendance_prev: state.employeeReducer.attendance_prev,
});

export default connect(mapStateToProps, { GetEmployees, GetAttendance ,RemoveEmp, DownloadAttendance })(withStyles(styles)(EmpManager));
