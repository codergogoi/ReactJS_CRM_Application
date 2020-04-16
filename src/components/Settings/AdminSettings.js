import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


import Grid from '@material-ui/core/Grid';
 import CardBoard from '../Common/CardBoard';
 

// App Classes
import Alert from '../Common/Alert';
import EmployeeIcon from '@material-ui/icons/SupervisorAccount';


import { GetManagers, RemoveRegion } from '../../store/actions/SettingsActions';
import { connect } from 'react-redux';
import { NativeSelect } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import FormLabel from '@material-ui/core/FormLabel'; 

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import RegionManagerTable from './RegionManagerTable';
import UploadDB from './uploadComponent/UploadDB';
 

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
	}
});

class AdminSettings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
				value: 0,
				id: 0,
				isDelete: false,
		};
	}

	componentWillMount(){

		this.props.GetManagers('');

	}
	 
 
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
			isDelete: false
		});
		this.props.DismissAlert();

		if(this.props.isEdit){
			this.props.onTapBack();
		}
	};

	onOkay = () => {
		 
		if(this.props.isEdit){
			this.props.onTapBack();
		}

		this.props.DismissAlert();

	};

	onTapBack = () => {
		this.props.onTapBack();
	};
 
	onOkayForError = () =>{
		this.setState({ showAlert: false });
		if(this.state.isDelete){
			this.onExecuteDeleteCommand();
		}

	}

	onCancelForError = () =>{
		this.setState({ showAlert: false });
		

	}

	onEditRegionManager = (item) => {
		//onEditRegionManager

		console.log('On Edit regin Manager'+ JSON.stringify(item));
		const { id } = item;
	}

	onDeleteRegionManager = (item) => {
		//onDelete Region Manager
		console.log('On Delete Region Manager'+ JSON.stringify(item));
		const { id } = item;
		this.setState({
			isDelete: true,
			id: id,
			showAlert: true,
			msg: 'Are you sure to delete the selected Employee?',
			title: 'Delete Confirmation!'
		});
	} 
  

	onExecuteDeleteCommand = () => {
		this.setState({ isDelete: false});
		const { id } = this.state;
		this.props.RemoveRegion({ id });
		console.log('Working with this id '+ id)
	}


	render() {
		const { classes, managers } = this.props;
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
					onCancel={this.onCancelForError.bind(this)}
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
								<Tab label="Region Manager" icon={<EmployeeIcon />} />
								<Tab label="DB Export" icon={<EmployeeIcon />} />
								</Tabs>

								{value === 0 && (
								<TabContainer>
									{managers !== undefined && 
									(<RegionManagerTable
										data={managers}
										onEditRegionManager={this.onEditRegionManager.bind(this)}
										onDeleteRegionManager={this.onDeleteRegionManager.bind(this)}
                                    />)}
								</TabContainer>
								)}
								{value === 1 && ( 
								<TabContainer>
									<UploadDB />
								</TabContainer>
								)}
						</div>
				) : (
					<Grid container spacing={24}>
						<Grid item xs={3}>
						</Grid>
						<Grid item xs={6}>
							<CardBoard>
								{/* {this.displayTextContent()} */}
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

AdminSettings.propTypes = {
	classes: PropTypes.object
};

const mapStateToProps = (state) => ({
    managers: state.settingsReducer.managers
});

export default connect(mapStateToProps, { 
	 GetManagers,
	 RemoveRegion
 }) (withStyles(styles)(AdminSettings));